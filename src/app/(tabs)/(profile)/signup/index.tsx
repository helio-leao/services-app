import { Image } from "expo-image";
import { router } from "expo-router";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignupScreen() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      {/* TEXT SECTION */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Meu App</Text>
        <Text>Bem-vindo ao Meu App</Text>
        <Text>Alcance clientes da sua região todos os dias.</Text>
      </View>

      {/* IMAGE */}
      <Image
        style={styles.image}
        source={
          "https://s3-alpha-sig.figma.com/img/1a97/a654/382b9fe57f65129d674c2233263540ab?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yz9Xny~IcKwnM1wkSxz5MuKOgBjiALk1X~mz9pwQS7PrI656T0auAtz7PlP2f76eKg5KZnkXE5cMRGWMg4nLpe1cZmAA43hx-~D8IPmhSOFLDCer~njhlTflGpBERDInYzi9wjFt7BqXPVE6AyXfRMmSMNEMXQQLUwGzg3pRJO8B8z-7sWTvUKpgFSPL2yMunMMnHIJf8VlYWH7eOWi3DpJcWxBXVfi2oFGFfLL8GUwEMvb57B33bZ1N9RQOyWlbfAw9q6VIeM-He9f3SL212~M6lxKis5Nvt7Y5Yzm~4I0JtHVKh1yLYosvTwHqj7YdxEWY5ovqX7dXW6Mz5vqGog__"
        }
      />

      {/* BUTTONS SECTION */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(profile)/signup/disclaimer")}
        >
          <Text style={styles.buttonText}>Seja um prestador de serviços</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
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
