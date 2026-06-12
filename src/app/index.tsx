import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Menubar from "./components/menubar";

export default function App() {
  return (
    <LinearGradient
      colors={['black','darkblue', 'black', 'darkred', 'black']}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, marginTop: 50 }}>
        
        <ScrollView style={styles.body}>
          <Text style={styles.welcome}>
            Bem-vindo ao FitnessFree, user.name!
          </Text>
          <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.title}>Hoje</Text>
              <View style={styles.section}>
                <View>
                  <Text> Sessões</Text>
                  <View style={styles.item}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        alignSelf: "center",
                      }}
                    >
                      8
                    </Text>
                    <Text>Sessões</Text>
                  </View>
                </View>
                <View>
                  <Text> Progresso</Text>
                  <View style={styles.item}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        alignSelf: "center",
                      }}
                    >
                      75%
                    </Text>
                    <Text>Progresso</Text>
                  </View>
                </View>
                <View>
                  <Text> Tarefas</Text>
                  <View style={styles.item}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        alignSelf: "center",
                      }}
                    >
                      3
                    </Text>
                    <Text>Tarefas</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.title}>Faturamento mês</Text>
              <View style={styles.section}>
                <View style={styles.item}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      alignSelf: "center",
                    }}
                  >
                    1000€
                  </Text>
                  <Text>
                    -------------------------------------------------------------------------
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.title}>Clientes</Text>
              <View style={styles.item}>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>Maria</Text>
                <Text>Horário Agendado</Text>
              </View>
              <View style={styles.item}>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>José</Text>
                <Text>Horário Agendado</Text>
              </View>
              <View style={styles.item}>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>Joana</Text>
                <Text>Horário Agendado</Text>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.title}>Clientes</Text>
              <View style={styles.item}>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>Maria</Text>
                <Text>Horário Agendado</Text>
              </View>
              <View style={styles.item}>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>José</Text>
                <Text>Horário Agendado</Text>
              </View>
              <View style={styles.item}>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>Joana</Text>
                <Text>Horário Agendado</Text>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.title}>Clientes</Text>
              <View style={styles.item}>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>Maria</Text>
                <Text>Horário Agendado</Text>
              </View>
              <View style={styles.item}>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>José</Text>
                <Text>Horário Agendado</Text>
              </View>
              <View style={styles.item}>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>Joana</Text>
                <Text>Horário Agendado</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <Menubar />
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    gap: 100,
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  card: {
    width: "90%",
    padding: 20,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-around",
    textAlign: "center",
    marginTop: 20,
  },
  welcome: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 20,
    alignSelf: "center",
    color: "#ffffff",
  },
  item: {
    marginTop: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 10,
  },
});
