"use client";

import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Menubar from "../../components/menubar";

type Appointment = { id: number; client: string; date: string; time: string };

export default function Calendar() {
  const [client, setClient] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, client: "John Doe", date: "2024-07-01", time: "10:00" },
    { id: 2, client: "Jane Smith", date: "2024-07-02", time: "14:00" },
  ]);

  const nextCount = useMemo(
    () =>
      appointments.filter(
        (item) => item.date >= new Date().toISOString().split("T")[0],
      ).length,
    [appointments],
  );

  function addAppointment() {
    if (!client || !date || !time) return alert("Please fill in all fields");
    setAppointments((prev) => [
      ...prev,
      { id: Date.now(), client, date, time },
    ]);
    setClient("");
    setDate("");
    setTime("");
  }

  return (
    <LinearGradient
      colors={["black", "darkblue", "black", "darkred", "black"]}
      style={{ flex: 1 }}
    >
      <ScrollView style={[styles.container, { marginTop: 50 }]}>
        <Text style={styles.title}>Agenda</Text>
        <Text style={styles.description}>
          Organize atendimentos e evite conflito de horário.
        </Text>

        {/* Estatísticas */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{appointments.length}</Text>
            <Text>Agendados</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{nextCount}</Text>
            <Text>Próximos</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>76%</Text>
            <Text>Ocupação</Text>
          </View>
        </View>

        {/* Formulário */}
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Novo Agendamento</Text>

          <TextInput
            style={styles.input}
            placeholder="Cliente"
            value={client}
            onChangeText={setClient}
          />

          <TextInput
            style={styles.input}
            placeholder="Data (AAAA-MM-DD)"
            value={date}
            onChangeText={setDate}
          />

          <TextInput
            style={styles.input}
            placeholder="Hora (HH:MM)"
            value={time}
            onChangeText={setTime}
          />

          <TouchableOpacity style={styles.button} onPress={addAppointment}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        {/* Lista */}
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Agenda do Dia</Text>

          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={styles.clientName}>{item.client}</Text>
                <Text>
                  {item.date} às {item.time}
                </Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
      <Menubar />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },

  description: {
    marginBottom: 20,
    color: "#fff",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statCard: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
  },

  statValue: {
    fontSize: 20,
    fontWeight: "bold",
  },

  panel: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
  },

  panelTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  listItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  clientName: {
    fontWeight: "bold",
  },
});
