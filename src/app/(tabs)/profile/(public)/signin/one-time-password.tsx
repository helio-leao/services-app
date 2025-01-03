import { useAuth } from "@/src/contexts/AuthContext";
import axios from "axios";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
import { ONE_TIME_PASSWORD_REGEX } from "@/src/constants/validationRegex";
import CustomButton from "@/src/components/CustomButton";
import { colors } from "@/src/constants/colors";
import { useNavigationState } from "@react-navigation/native";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function OneTimePasswordPage() {
  const { signin } = useAuth();
  const { cellphone, verified } = useLocalSearchParams<{
    cellphone: string;
    verified: "true" | "false";
  }>();
  const [isLoading, setIsLoading] = useState(true);
  const [code, setCode] = useState("");

  const canGoBack = useNavigationState((state) => state.index > 0);

  useEffect(() => {
    handleSendCode();
  }, []);

  async function handleSendCode() {
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${API_URL}/auth/send-sms-verification`,
        {
          cellphone,
        }
      );

      if (data.ok) {
        Alert.alert(
          "Atenção",
          "Código enviado por SMS. Válido por 10 minutos."
        );
      } else {
        Alert.alert(
          "Atenção",
          "Não foi possível enviar o código ao telefone especificado."
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Oops", "Ocorreu um erro.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignupVerification() {
    if (!isInputValid()) return;

    setIsLoading(true);

    try {
      const { data: user } = await axios.post(
        `${API_URL}/auth/verify-account`,
        {
          cellphone,
          code,
        }
      );
      await signin(user);
    } catch (error) {
      console.log(error);
      Alert.alert("Oops", "Ocorreu um erro.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSigninVerification() {
    if (!isInputValid()) return;

    setIsLoading(true);

    try {
      const { data: user } = await axios.post(`${API_URL}/auth/signin`, {
        cellphone,
        code,
      });
      await signin(user);
    } catch (error) {
      console.log(error);
      Alert.alert("Oops", "Ocorreu um erro.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerification() {
    if (verified === "true") {
      await handleSigninVerification();
    } else {
      await handleSignupVerification();
    }
  }

  function isInputValid() {
    if (!ONE_TIME_PASSWORD_REGEX.test(code)) {
      Alert.alert("Atenção", "O código deve ter 6 números.");
      return false;
    }
    return true;
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Stack.Screen options={{ title: canGoBack ? "" : "Verificar Conta" }} />

      {/* UPPER SECTION */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Código</Text>
        <TextInput
          style={styles.input}
          placeholder="999999"
          maxLength={6}
          keyboardType="number-pad"
          onChangeText={setCode}
          value={code}
        />
        <TouchableOpacity
          style={{ alignSelf: "center", paddingVertical: 20 }}
          onPress={handleSendCode}
          disabled={isLoading}
        >
          <Text style={{ textDecorationLine: "underline", color: "#00F" }}>
            Reenviar Código
          </Text>
        </TouchableOpacity>
      </View>

      {/* LOWER SECTION */}
      <View style={styles.buttonsContainer}>
        <CustomButton
          label="Verificar"
          onPress={handleVerification}
          isLoading={isLoading}
        />
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
