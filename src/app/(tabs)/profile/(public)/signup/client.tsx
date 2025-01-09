import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import clientImage from "@/assets/images/user-client.png";
import CustomButton from "@/src/components/CustomButton";

export default function ClientPage() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      {/* IMAGE AND TEXT SECTION */}
      <View>
        <Image style={styles.image} source={clientImage} />

        {/* TEXT SECTION */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Cadastre-se como cliente</Text>
          <Text style={styles.text}>
            Encontre os melhores serviços da sua região com segurança e com
            melhor custo benefício
          </Text>
        </View>
      </View>

      {/* BUTTONS SECTION */}
      <View style={styles.buttonsContainer}>
        <CustomButton
          label="Vamos começar"
          onPress={() =>
            router.push({
              pathname: "/profile/signup/cellphone",
              params: { accountType: "client" },
            })
          }
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
});
