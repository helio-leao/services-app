import { useAuth } from "@/src/contexts/AuthContext";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "@/src/types/User";
import ASYNC_STORAGE_KEYS from "@/src/constants/asyncStorageKeys";
import { ONE_TIME_PASSWORD_REGEX } from "@/src/constants/validationRegex";
import CustomButton from "@/src/components/CustomButton";
import { colors } from "@/src/constants/colors";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function OneTimePasswordPage() {
  const { login } = useAuth();
  const { cellphone } = useLocalSearchParams<{ cellphone: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [code, setCode] = useState("");

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
    }
    setIsLoading(false);
  }

  async function handleVerification() {
    if (!isInputValid()) return;

    setIsLoading(true);

    try {
      const { data: user } = await axios.post(`${API_URL}/auth/signin`, {
        cellphone,
        code,
      });
      await storeLoggedUser(user);

      login(user);
      router.dismissAll();
      router.replace({
        pathname: "/profile/edit",
        params: { userId: user._id },
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Oops", "Ocorreu um erro.");
    }
    setIsLoading(false);
  }

  async function storeLoggedUser(user: User) {
    try {
      await AsyncStorage.setItem(
        ASYNC_STORAGE_KEYS.USER_SESSION,
        JSON.stringify(user)
      );
    } catch (error) {
      console.log(error);
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
