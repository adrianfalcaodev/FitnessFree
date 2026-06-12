import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  type DocumentData,
} from "firebase/firestore";

import { auth, db } from "./firebase";

export type UserRole = "user" | "personal" | "admin";
export type InviteStatus = "pending" | "accepted" | "expired";
export type RelationshipStatus = "active" | "inactive";

// Estrutura de dados para perfis e convites

//Criação do tenantId para futuros casos de multi-tenancy, embora não seja utilizado na fase 1, é importante ter essa estrutura desde o início para facilitar a expansão futura do sistema.
export type UserProfile = {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  displayName: string;
  tenantId?: string | null;
  createdAt?: DocumentData;
  updatedAt?: DocumentData;
};

export type PersonalProfile = {
  uid: string;
  bio?: string;
  specialties?: string[];
  clientCount?: number;
  createdAt?: DocumentData;
  updatedAt?: DocumentData;
};

export type ClientProfile = {
  uid: string;
  personalId: string;
  goals?: string;
  notes?: string;
  status: "active" | "inactive";
  createdAt?: DocumentData;
  updatedAt?: DocumentData;
};

export type Invite = {
  id: string;
  personalId: string;
  clientEmail: string;
  clientName: string;
  token: string;
  status: InviteStatus;
  expiresAt?: Timestamp;
  acceptedAt?: DocumentData;
  createdAt?: DocumentData;
  updatedAt?: DocumentData;
};

type RegisterInput = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

type RegisterPersonalInput = Omit<RegisterInput, "role">;

type RegisterClientFromInviteInput = {
  token: string;
  password: string;
};

export function observeAuthState(
  callback: Parameters<typeof onAuthStateChanged>[1]
) {
  return onAuthStateChanged(auth, callback);
}

export function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function registerWithProfile({
  name,
  email,
  password,
  role,
}: RegisterInput) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(credential.user, {
    displayName: name.trim(),
  });

  await setDoc(
    doc(db, "users", credential.user.uid),
    {
      uid: credential.user.uid,
      name: name.trim(),
      displayName: name.trim(),
      email: credential.user.email ?? email,
      role,
      tenantId: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  return credential;
}

/**
 * Fase 1: registo público apenas para personal.
 */
export async function registerPersonal({
  name,
  email,
  password,
}: RegisterPersonalInput) {
  const credential = await registerWithProfile({
    name,
    email,
    password,
    role: "personal",
  });

  await setDoc(
    doc(db, "personalProfiles", credential.user.uid),
    {
      uid: credential.user.uid,
      bio: "",
      specialties: [],
      clientCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  return credential;
}

export function requestPasswordReset(email: string) {
  return sendPasswordResetEmail(auth, email);
}

export function logout() {
  return signOut(auth);
}

export async function getUserProfile(uid: string) {
  const snapshot = await getDoc(doc(db, "users", uid));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as UserProfile;
}

export function getRedirectPathByRole(role: UserRole | null | undefined) {
  // Todos os perfis entram no dashboard após login.
  // O dashboard faz a personalização da UI conforme o role.
  void role;
  return "/dashboard";
}

function generateInviteToken() {
  if (typeof globalThis !== "undefined" && globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `invite_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
}

export async function createClientInvite(
  personalId: string,
  clientEmail: string,
  clientName: string
) {
  const token = generateInviteToken();
  const inviteRef = doc(collection(db, "invites"));
  const expiresAt = Timestamp.fromDate(
    new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
  ); // 7 dias

  await setDoc(inviteRef, {
    personalId,
    clientEmail: clientEmail.trim().toLowerCase(),
    clientName: clientName.trim(),
    token,
    status: "pending" as InviteStatus,
    expiresAt,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return { id: inviteRef.id, token };
}

export async function getInviteByToken(token: string): Promise<Invite | null> {
  const invitesRef = collection(db, "invites");
  const q = query(invitesRef, where("token", "==", token), limit(1));
  const snap = await getDocs(q);

  if (snap.empty) return null;

  const first = snap.docs.at(0);
  if (!first) return null;
  return {
    id: first.id,
    ...(first.data() as Omit<Invite, "id">),
  };
}

export async function registerClientFromInvite({
  token,
  password,
}: RegisterClientFromInviteInput) {
  const invite = await getInviteByToken(token);

  if (!invite) {
    throw new Error("Convite inválido.");
  }

  if (invite.status !== "pending") {
    throw new Error("Este convite já foi utilizado ou está inativo.");
  }

  const isExpired =
    invite.expiresAt instanceof Timestamp &&
    invite.expiresAt.toMillis() < Date.now();

  if (isExpired) {
    await updateDoc(doc(db, "invites", invite.id), {
      status: "expired",
      updatedAt: serverTimestamp(),
    });
    throw new Error("Convite expirado.");
  }

  const credential = await createUserWithEmailAndPassword(
    auth,
    invite.clientEmail,
    password
  );

  await updateProfile(credential.user, {
    displayName: invite.clientName,
  });

  await setDoc(
    doc(db, "users", credential.user.uid),
    {
      uid: credential.user.uid,
      name: invite.clientName,
      displayName: invite.clientName,
      email: invite.clientEmail,
      role: "user",
      tenantId: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  await setDoc(
    doc(db, "clientProfiles", credential.user.uid),
    {
      uid: credential.user.uid,
      personalId: invite.personalId,
      status: "active",
      goals: "",
      notes: "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  const relationshipRef = doc(collection(db, "relationships"));
  await setDoc(relationshipRef, {
    personalId: invite.personalId,
    clientId: credential.user.uid,
    status: "active" as RelationshipStatus,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  await updateDoc(doc(db, "invites", invite.id), {
    status: "accepted",
    acceptedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return credential;
}