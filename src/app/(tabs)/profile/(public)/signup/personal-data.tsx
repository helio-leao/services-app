import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import { router } from "expo-router";
import GenderPicker, { GENDER_OPTIONS } from "@/src/components/GenderPicker";
import MaskedInput from "@/src/components/MaskedInput";
import { CEP_REGEX } from "@/src/constants/validationRegex";
import { normalizeString } from "@/src/utils/stringUtils";
import CustomButton from "@/src/components/CustomButton";
import { colors } from "@/src/constants/colors";

export default function PersonalDataPage() {
  const { cellphone, email, selectedCategoryId, selectedSubcategoryId } =
    useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [zip, setZip] = useState("");
  const [district, setDistrict] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [gender, setGender] = useState(GENDER_OPTIONS[0].value);

  async function handleSaveUser() {
    if (!isInputValid()) return;

    const newUser = {
      name: normalizeString(name),
      gender: gender,
      address: {
        street: normalizeString(addressStreet),
        zip: zip,
        number: normalizeString(number),
        complement: normalizeString(complement),
        district: normalizeString(district),
      },
      contact: {
        email: email,
        cellphone: cellphone,
      },
      service: {
        category: selectedCategoryId,
        subcategory: selectedSubcategoryId,
      },
    };

    setIsLoading(true);

    try {
      const { data: savedUser } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/signup`,
        newUser
      );

      // NOTE: change the message to the cellphone-verification screen???
      Alert.alert(
        "Parabéns!\nSeu cadastro foi concluído.",
        "Agora você pode prestar seus serviços e aumentar sua cartela de clientes com segurança e rapidez.",
        [
          {
            text: "Ok! Entendi",
            onPress: () => {
              router.dismissAll();
              router.replace({
                pathname: "/profile/signup/account-verification",
                params: { cellphone: savedUser.contact.cellphone },
              });
            },
          },
        ]
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Oops", "Ocorreu um erro.");
    } finally {
      setIsLoading(false);
    }
  }

  function isInputValid() {
    // if (!CEP_REGEX.test(zip)) {
    //   Alert.alert("Atenção", "O CEP deve ter 8 números.");
    //   return false;
    // }
    return true;
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView>
        {/* INPUTS SECTION */}
        <View style={styles.inputsContainer}>
          <Text style={[styles.title, { marginBottom: 20 }]}>
            Informe seus dados pessoais
          </Text>

          <Text style={styles.title}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            onChangeText={setName}
            value={name}
          />

          <Text style={styles.title}>CEP</Text>
          <MaskedInput
            style={styles.input}
            type="cep"
            onChangeText={setZip}
            value={zip}
          />

          <Text style={styles.title}>Bairro</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDistrict}
            value={district}
          />

          <Text style={styles.title}>Endereço</Text>
          <TextInput
            style={styles.input}
            onChangeText={setAddressStreet}
            value={addressStreet}
          />

          <Text style={styles.title}>Número</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            onChangeText={setNumber}
            value={number}
          />

          <Text style={styles.title}>Complemento</Text>
          <TextInput
            style={styles.input}
            onChangeText={setComplement}
            value={complement}
          />

          <Text style={styles.title}>Sexo</Text>
          <GenderPicker
            gender={gender}
            onValueChange={(itemValue, _itemIndex) => setGender(itemValue)}
          />
        </View>

        {/* BUTTONS SECTION */}
        <View style={styles.buttonsContainer}>
          <CustomButton
            label="Continuar"
            onPress={handleSaveUser}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  inputsContainer: {
    paddingVertical: 20,
    gap: 10,
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
    marginBottom: 20,
  },
});
