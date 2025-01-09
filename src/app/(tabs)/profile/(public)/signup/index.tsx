import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import professionalImage from "@/assets/images/user-professional.png";
import clientImage from "@/assets/images/user-client.png";
import CustomButton from "@/src/components/CustomButton";

export default function AccountTypePage() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={{ gap: 10 }}>
        <Image style={styles.image} source={professionalImage} />
        <Text style={styles.text}>Seja um profissional</Text>
        <CustomButton
          label="Seja um profissional"
          onPress={() => router.push("/profile/signup/professional")}
        />
      </View>

      <View style={{ gap: 10 }}>
        <Image style={styles.image} source={clientImage} />
        <Text style={styles.text}>Seja um cliente</Text>
        <CustomButton
          label="Cliente"
          onPress={() => router.push("/profile/signup/client")}
        />
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
  image: {
    width: 120,
    height: 120,
    alignSelf: "center",
  },
  text: {
    alignSelf: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
