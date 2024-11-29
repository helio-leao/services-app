import CustomButton from "@/src/components/CustomButton";
import { colors } from "@/src/constants/colors";
import { EMAIL_REGEX } from "@/src/constants/validationRegex";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";

export default function EmailPage() {
  const params = useLocalSearchParams();
  const [email, setEmail] = useState("");

  function handleContinue() {
    if (!isInputValid()) return;

    router.push({
      pathname: "/profile/signup/service-category",
      params: { ...params, email },
    });
  }

  function isInputValid() {
    if (!EMAIL_REGEX.test(email)) {
      Alert.alert("Atenção", "Formato do email inválido.");
      return false;
    }
    return true;
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      {/* TEXT AND INPUT SECTION */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Entre com seu email.</Text>
        <Text style={{ marginBottom: 20 }}>
          Seu email será o nosso canal de comunicação.
        </Text>
        <Text style={styles.title}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira seu email"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
      </View>

      {/* BUTTONS SECTION */}
      <View style={styles.buttonsContainer}>
        <CustomButton label="Continuar" onPress={handleContinue} />
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
    backgroundColor: colors.background,
  },
  buttonsContainer: {
    gap: 10,
  },
});
