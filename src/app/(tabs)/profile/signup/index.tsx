import { Image } from "expo-image";
import { router } from "expo-router";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Signup() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      {/* IMAGE AND TEXT SECTION */}
      <View>
        <Image
          style={styles.image}
          source={
            "https://s3-alpha-sig.figma.com/img/1a97/a654/382b9fe57f65129d674c2233263540ab?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yz9Xny~IcKwnM1wkSxz5MuKOgBjiALk1X~mz9pwQS7PrI656T0auAtz7PlP2f76eKg5KZnkXE5cMRGWMg4nLpe1cZmAA43hx-~D8IPmhSOFLDCer~njhlTflGpBERDInYzi9wjFt7BqXPVE6AyXfRMmSMNEMXQQLUwGzg3pRJO8B8z-7sWTvUKpgFSPL2yMunMMnHIJf8VlYWH7eOWi3DpJcWxBXVfi2oFGFfLL8GUwEMvb57B33bZ1N9RQOyWlbfAw9q6VIeM-He9f3SL212~M6lxKis5Nvt7Y5Yzm~4I0JtHVKh1yLYosvTwHqj7YdxEWY5ovqX7dXW6Mz5vqGog__"
          }
        />

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
          onPress={() => router.push("/profile/signup/phone")}
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
