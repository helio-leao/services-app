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

export default function HomePage() {
  function handleSignin() {
    router.push("/profile/signin");
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      {/* TEXT SECTION */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Meu App</Text>
        <Text>Bem-vindo ao Meu App</Text>
        <Text>Alcance clientes da sua região todos os dias.</Text>
      </View>

      {/* IMAGE */}
      <Image style={styles.image} source={workersImage} />

      {/* BUTTONS SECTION */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/profile/disclaimer")}
        >
          <Text style={styles.buttonText}>Seja um prestador de serviços</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignin}>
          <Text style={styles.buttonText}>Entrar</Text>
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
    alignItems: "center",
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  image: {
    width: 160,
    height: 160,
    alignSelf: "center",
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
