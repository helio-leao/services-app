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
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "@/src/types/User";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function OTPVerificationScreen() {
  const { login } = useAuth();
  const { cellphone } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    handleSendCode();
  }, []);

  async function handleSendCode() {
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
  }

  async function handleVerification() {
    setIsLoading(true);

    try {
      const { data: user } = await axios.post(`${API_URL}/auth/signin`, {
        cellphone,
        code,
      });

      await storeLoggedUser(user);

      login(user);
      router.dismissAll();
      router.replace(`/(profile)/(signed-in)/${user._id}`);
    } catch (error) {
      console.log(error);
      Alert.alert("Oops", "Ocorreu um erro.");
    }

    setIsLoading(false);
  }

  async function storeLoggedUser(user: User) {
    try {
      await AsyncStorage.setItem("@user_session", JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
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
        >
          <Text style={{ textDecorationLine: "underline", color: "#00F" }}>
            Reenviar Código
          </Text>
        </TouchableOpacity>
      </View>

      {/* LOWER SECTION */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleVerification}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.buttonText}>Verificar</Text>
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
