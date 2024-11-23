import { Image } from "expo-image";
import { router } from "expo-router";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import workersImage from "@/assets/images/workers.png";

export default function DisclaimerPage() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      {/* IMAGE AND TEXT SECTION */}
      <View>
        <Image style={styles.image} source={workersImage} />

        {/* TEXT SECTION */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Cadastre seus serviços</Text>
          <Text style={styles.text}>
            Faça parte da maior rede de prestadores de serviços da região. Se
            destaque e aumente sua clientela diariamente.
          </Text>
        </View>
      </View>

      {/* BUTTONS SECTION */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/profile/cellphone")}
        >
          <Text style={styles.buttonText}>Vamos começar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },
  textContainer: {
    width: 300,
    alignSelf: "center",
    alignItems: "center",
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  text: {
    textAlign: "center",
  },
  image: {
    width: 160,
    height: 160,
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonsContainer: {
    gap: 10,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 8,
    width: 300,
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  buttonText: {
    color: "#fff",
  },
});