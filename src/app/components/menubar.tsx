import { Link } from "expo-router";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";

export default function Menubar() {
  return (
    <View style={styles.navbar}>

    <Link href="./index" asChild>
      <Pressable>
        <Image source={require('../assets/home.png')} style={styles.icon} />
      </Pressable>
    </Link>

    <Link href="../../pages/(personalPages)/clients" asChild>
      <Pressable>
        <Image source={require('../assets/supervisor.png')} style={styles.icon} />
      </Pressable>
    </Link>

    <Link href="../../pages/(personalPages)/calendar" asChild>
      <Pressable>
        <Image source={require('../assets/calendar.png')} style={styles.icon} />
      </Pressable>
    </Link>

    <Link href="../../pages/(personalPages)/finance" asChild>
      <Pressable>
        <Image source={require('../assets/baseline_savings_black_18.png')} style={styles.icon} />
      </Pressable>
    </Link>
  </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    backgroundColor: "#ffffffff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 40,
  },
  logo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
  links: {
    flexDirection: "row",
    gap: 12,
  },
  link: {
    fontSize: 14,
    color: "#ffffff",
  },
  icon: {
    width: 24,
    height: 24,
  },
});