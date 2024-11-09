import MaskedInput from "@/src/components/MaskedInput";
import { PHONE_REGEX } from "@/src/constants/validationRegex";
import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

export default function CellphoneScreen() {
  const [cellphone, setCellphone] = useState("");

  function handleContinue() {
    if (!isInputValid()) return;

    router.push({
      pathname: "/(profile)/(signed-out)/email",
      params: { cellphone: cellphone },
    });
  }

  function isInputValid() {
    if (!PHONE_REGEX.test(cellphone)) {
      Alert.alert("Atenção", "O telefone deve ter 11 números.");
      return false;
    }
    return true;
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      {/* TEXT AND INPUT SECTION */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Insira o seu número de celular.</Text>
        <Text style={{ marginBottom: 20 }}>
          Seu número será seu acesso ao aplicativo.
        </Text>
        <Text style={styles.title}>Celular</Text>
        <MaskedInput
          style={styles.input}
          type="phone"
          onChangeText={setCellphone}
          value={cellphone}
        />
      </View>

      {/* BUTTONS SECTION */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continuar</Text>
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
