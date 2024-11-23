import MaskedInput from "@/src/components/MaskedInput";
import { PHONE_REGEX } from "@/src/constants/validationRegex";
import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";

export default function CellphonePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [cellphone, setCellphone] = useState("");

  async function handleContinue() {
    if (!isInputValid()) return;

    setIsLoading(true);

    try {
      const { data: user } = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/users/searchByCellphone/${cellphone}`
      );

      if (user) {
        setIsLoading(false);
        Alert.alert("Atenção", "Já existe cadastro com esse telefone.");
        return;
      }

      router.push({
        pathname: "/profile/email",
        params: { cellphone: cellphone },
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Oops", "Ocorreu um erro.");
    }

    setIsLoading(false);
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
        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.buttonText}>Continuar</Text>
          )}
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