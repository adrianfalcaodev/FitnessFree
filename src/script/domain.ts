import type { DocumentData, Timestamp } from "firebase/firestore";

/**
 * Timestamp genérico para entidades de domínio.
 * Aceita Timestamp do Firestore, Date, ou DocumentData em cenários de leitura parcial.
 */
export type DomainTimestamp = Timestamp | Date | DocumentData | null | undefined;

/**
 * Roles do sistema.
 * Fase atual: personal e user.
 */
export type UserRole = "personal" | "user" | "admin";

/**
 * Status compartilhados.
 */
export type InviteStatus = "pending" | "accepted" | "expired";
export type RelationshipStatus = "active" | "inactive";
export type ClientStatus = "active" | "inactive";
export type WorkoutStatus = "active" | "archived";
export type ScheduleStatus = "requested" | "confirmed" | "canceled" | "completed";
export type AttendanceStatus = "pending" | "present" | "absent";
export type ScheduleSource = "personal" | "client";
export type FinancialType = "income" | "expense";

/**
 * Usuários e perfis.
 */
export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  displayName: string;
  tenantId?: string | null;
  createdAt?: DomainTimestamp;
  updatedAt?: DomainTimestamp;
}

export interface PersonalProfile {
  uid: string;
  bio?: string;
  specialties?: string[];
  photoUrl?: string;
  clientCount?: number;
  createdAt?: DomainTimestamp;
  updatedAt?: DomainTimestamp;
}

export interface ClientProfile {
  uid: string;
  personalId: string;
  status: ClientStatus;
  birthDate?: string;
  height?: number;
  goals?: string;
  notes?: string;
  createdAt?: DomainTimestamp;
  updatedAt?: DomainTimestamp;
}

export interface Relationship {
  id: string;
  personalId: string;
  clientId: string;
  status: RelationshipStatus;
  startedAt?: DomainTimestamp;
  endedAt?: DomainTimestamp;
  createdAt?: DomainTimestamp;
  updatedAt?: DomainTimestamp;
}

export interface Invite {
  id: string;
  personalId: string;
  clientEmail: string;
  clientName: string;
  token: string;
  status: InviteStatus;
  expiresAt?: DomainTimestamp;
  acceptedAt?: DomainTimestamp;
  createdAt?: DomainTimestamp;
  updatedAt?: DomainTimestamp;
}

/**
 * Exercícios e treinos.
 */
export interface Exercise {
  id: string;
  personalId: string;
  name: string;
  muscleGroup: string;
  equipment?: string;
  instructions?: string;
  isArchived: boolean;
  createdAt?: DomainTimestamp;
  updatedAt?: DomainTimestamp;
}

export interface Workout {
  id: string;
  personalId: string;
  clientId: string;
  name: string;
  objective?: string;
  notes?: string;
  status: WorkoutStatus;
  createdAt?: DomainTimestamp;
  updatedAt?: DomainTimestamp;
}

export interface WorkoutItem {
  id: string;
  workoutId: string;
  exerciseId: string;
  sets: number;
  reps: string;
  restSeconds?: number;
  order: number;
  createdAt?: DomainTimestamp;
  updatedAt?: DomainTimestamp;
}

/**
 * Avaliações físicas.
 */
export interface PhysicalAssessment {
  id: string;
  personalId: string;
  clientId: string;
  assessedAt: DomainTimestamp;
  weight?: number;
  bodyFat?: number;
  chest?: number;
  waist?: number;
  hip?: number;
  thigh?: number;
  arm?: number;
  notes?: string;
  createdAt?: DomainTimestamp;
  updatedAt?: DomainTimestamp;
}

/**
 * Agendamentos.
 */
export interface ScheduleEvent {
  id: string;
  personalId: string;
  clientId: string;
  startAt: DomainTimestamp;
  endAt: DomainTimestamp;
  source: ScheduleSource;
  status: ScheduleStatus;
  attendance: AttendanceStatus;
  notes?: string;
  createdAt?: DomainTimestamp;
  updatedAt?: DomainTimestamp;
}

/**
 * Financeiro.
 */
export interface FinancialEntry {
  id: string;
  personalId: string;
  clientId?: string;
  type: FinancialType;
  category: string;
  amount: number;
  dueDate?: DomainTimestamp;
  paidAt?: DomainTimestamp;
  monthKey: string; // YYYY-MM
  description?: string;
  createdAt?: DomainTimestamp;
  updatedAt?: DomainTimestamp;
}

/**
 * Chat P2P.
 */
export interface ChatThread {
  id: string;
  personalId: string;
  clientId: string;
  lastMessage?: string;
  lastMessageAt?: DomainTimestamp;
  unreadByPersonal?: number;
  unreadByClient?: number;
  createdAt?: DomainTimestamp;
  updatedAt?: DomainTimestamp;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  senderId: string;
  receiverId: string;
  text: string;
  attachments?: string[];
  sentAt?: DomainTimestamp;
  readAt?: DomainTimestamp;
}

/**
 * Payloads de criação e atualização.
 */
export type CreateClientProfileInput = Omit<
  ClientProfile,
  "uid" | "createdAt" | "updatedAt"
> & { uid: string };

export type UpdateClientProfileInput = Partial<
  Pick<ClientProfile, "status" | "birthDate" | "height" | "goals" | "notes">
>;

export type CreateExerciseInput = Omit<
  Exercise,
  "id" | "isArchived" | "createdAt" | "updatedAt"
> & { isArchived?: boolean };

export type UpdateExerciseInput = Partial<
  Pick<Exercise, "name" | "muscleGroup" | "equipment" | "instructions" | "isArchived">
>;

export type CreateWorkoutInput = Omit<Workout, "id" | "createdAt" | "updatedAt">;
export type UpdateWorkoutInput = Partial<Pick<Workout, "name" | "objective" | "notes" | "status">>;

export type CreateWorkoutItemInput = Omit<WorkoutItem, "id" | "createdAt" | "updatedAt">;
export type UpdateWorkoutItemInput = Partial<Pick<WorkoutItem, "sets" | "reps" | "restSeconds" | "order">>;

export type CreateAssessmentInput = Omit<PhysicalAssessment, "id" | "createdAt" | "updatedAt">;
export type UpdateAssessmentInput = Partial<
  Pick<
    PhysicalAssessment,
    "assessedAt" | "weight" | "bodyFat" | "chest" | "waist" | "hip" | "thigh" | "arm" | "notes"
  >
>;

export type CreateScheduleEventInput = Omit<ScheduleEvent, "id" | "createdAt" | "updatedAt">;
export type UpdateScheduleEventInput = Partial<
  Pick<ScheduleEvent, "startAt" | "endAt" | "status" | "attendance" | "notes">
>;

export type CreateFinancialEntryInput = Omit<FinancialEntry, "id" | "createdAt" | "updatedAt">;
export type UpdateFinancialEntryInput = Partial<
  Pick<FinancialEntry, "type" | "category" | "amount" | "dueDate" | "paidAt" | "description" | "monthKey">
>;