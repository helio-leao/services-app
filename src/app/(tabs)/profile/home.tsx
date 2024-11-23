import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import workersImage from "@/assets/images/workers.png";
import CustomButton from "@/src/components/CustomButton";

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
        <CustomButton
          label="Seja um prestador de serviços"
          onPress={() => router.push("/profile/disclaimer")}
        />
        <CustomButton label="Entrar" onPress={handleSignin} />
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
});
