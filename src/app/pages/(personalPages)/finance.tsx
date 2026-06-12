import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useState } from "react";
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

type Entry = {
  id: number;
  description: string;
  value: number;
  type: "entrada" | "saida";
};

export default function FinanceiroScreen() {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState<"entrada" | "saida">("entrada");

  const [entries, setEntries] = useState<Entry[]>([
    {
      id: 1,
      description: "Pacote mensal - Ana",
      value: 350,
      type: "entrada",
    },
    {
      id: 2,
      description: "Plataforma de treino",
      value: 79,
      type: "saida",
    },
  ]);

  const totals = useMemo(() => {
    const entradas = entries
      .filter((e) => e.type === "entrada")
      .reduce((acc, e) => acc + e.value, 0);

    const saidas = entries
      .filter((e) => e.type === "saida")
      .reduce((acc, e) => acc + e.value, 0);

    return {
      entradas,
      saidas,
      saldo: entradas - saidas,
    };
  }, [entries]);

  function addEntry() {
    const parsed = Number(value);

    if (!description || Number.isNaN(parsed) || parsed <= 0) {
      return;
    }

    setEntries((prev) => [
      ...prev,
      {
        id: Date.now(),
        description,
        value: parsed,
        type,
      },
    ]);

    setDescription("");
    setValue("");
    setType("entrada");
  }

  return (
    <LinearGradient
      colors={["black", "darkblue", "black", "darkred", "black"]}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Financeiro</Text>
        <Text style={styles.subtitle}>
          Controle rápido de entradas e custos operacionais.
        </Text>

        {/* Cards de resumo */}
        <View style={styles.statsRow}>
          <View style={styles.card}>
            <Text style={styles.cardValue}>
              R$ {totals.entradas.toFixed(2)}
            </Text>
            <Text>Entradas</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardValue}>R$ {totals.saidas.toFixed(2)}</Text>
            <Text>Saídas</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardValue}>R$ {totals.saldo.toFixed(2)}</Text>
            <Text>Saldo</Text>
          </View>
        </View>

        {/* Formulário */}
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Lançamento</Text>

          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
          />

          <TextInput
            style={styles.input}
            placeholder="Valor"
            keyboardType="numeric"
            value={value}
            onChangeText={setValue}
          />

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={type}
              onValueChange={(itemValue) =>
                setType(itemValue as "entrada" | "saida")
              }
            >
              <Picker.Item label="Entrada" value="entrada" />
              <Picker.Item label="Saída" value="saida" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.button} onPress={addEntry}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>

        {/* Extrato */}
        <ScrollView style={styles.panel}>
          <Text style={styles.panelTitle}>Extrato</Text>

          <FlatList
            data={entries}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.entryItem}>
                <Text style={styles.entryTitle}>{item.description}</Text>

                <Text>{item.type}</Text>

                <Text>R$ {item.value.toFixed(2)}</Text>
              </View>
            )}
          />
        </ScrollView>
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

  subtitle: {
    color: "#fff",
    marginBottom: 20,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  card: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 10,
    alignItems: "center",
  },

  cardValue: {
    fontSize: 18,
    fontWeight: "bold",
  },

  panel: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
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

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
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

  entryItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  entryTitle: {
    fontWeight: "bold",
  },
});
