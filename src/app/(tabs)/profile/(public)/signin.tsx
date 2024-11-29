import CustomButton from "@/src/components/CustomButton";
import MaskedInput from "@/src/components/MaskedInput";
import { colors } from "@/src/constants/colors";
import { PHONE_REGEX } from "@/src/constants/validationRegex";
import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, SafeAreaView, Text, View, Alert } from "react-native";

export default function SigninPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [cellphone, setCellphone] = useState("");

  async function handleSignin() {
    if (!isInputValid()) return;

    setIsLoading(true);

    try {
      const { data: user } = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/users/searchByCellphone/${cellphone}`
      );

      if (!user) {
        return Alert.alert("Atenção", "Usuário não encontrado");
      }

      if (user.verified) {
        router.push({
          pathname: `/profile/one-time-password`,
          params: { cellphone: user.contact.cellphone },
        });
      } else {
        router.push({
          pathname: `/profile/account-verification`,
          params: { cellphone: user.contact.cellphone },
        });
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Oops", "Ocorreu um erro.");
    } finally {
      setIsLoading(false);
    }
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
        <CustomButton
          label="Signin"
          onPress={handleSignin}
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
