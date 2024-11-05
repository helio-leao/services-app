import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";

export default function SigninScreen() {
  const [cellphone, setCellphone] = useState("");

  async function handleSignin() {
    // TODO: verify if phone number is valid

    const { data: user } = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/users/searchByCellphone/${cellphone}`
    );

    if (!user) {
      return Alert.alert("Atenção", "Usuário não encontrado");
    }

    if (user.verified) {
      router.push({
        pathname: `/(profile)/(signed-out)/otp-verification`,
        params: { cellphone: user.contact.cellphone },
      });
    } else {
      router.push({
        pathname: `/(profile)/(signed-out)/account-verification`,
        params: { cellphone: user.contact.cellphone },
      });
    }
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      {/* TEXT AND INPUT SECTION */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Celular</Text>
        <TextInput
          style={styles.input}
          placeholder="(DDD) 99999-9999"
          keyboardType="number-pad"
          onChangeText={setCellphone}
          value={cellphone}
        />
      </View>

      {/* BUTTONS SECTION */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignin}>
          <Text style={styles.buttonText}>Signin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  textContainer: {
    gap: 4,
    width: 300,
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 300,
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
