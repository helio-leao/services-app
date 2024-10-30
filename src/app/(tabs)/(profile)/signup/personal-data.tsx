import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { router } from "expo-router";

const GENDER_OPTIONS = [
  {
    label: "Masculino",
    value: "MASCULINO",
  },
  {
    label: "Feminino",
    value: "FEMININO",
  },
  {
    label: "Outros",
    value: "OUTROS",
  },
];

export default function PersonalDataScreen() {
  const params = useLocalSearchParams();
  const [name, setName] = useState("");
  const [zip, setZip] = useState("");
  const [district, setDistrict] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [gender, setGender] = useState(GENDER_OPTIONS[0].value);

  async function handleContinuePress() {
    const { celphone, email, selectedCategoryId, selectedSubcategoryId } =
      params;

    const newUser = {
      name: name,
      gender: gender,
      address: {
        street: addressStreet,
        zip: zip,
        number: number,
        complement: complement,
        district: district,
      },
      contact: {
        email: email,
        celphone: celphone,
      },
      service: {
        category: selectedCategoryId,
        subcategory: selectedSubcategoryId,
      },
    };

    try {
      const { data: savedUser } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/users`,
        newUser
      );

      Alert.alert(
        "Parabéns!\nSeu cadastro foi concluído.",
        "Agora você pode prestar seus serviços e aumentar sua cartela de clientes com segurança e rapidez.",
        [
          {
            text: "Ok! Entendi",
            onPress: () =>
              router.navigate({
                pathname: "/(profile)/signin/edit-user",
                params: { userId: savedUser._id },
              }),
          },
        ]
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Atenção", "Não foi possível completar a operação.");
    }
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
          <TextInput
            style={styles.input}
            placeholder="99999-999"
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
          <View style={{ borderWidth: 1, borderRadius: 8 }}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue, _itemIndex) => setGender(itemValue)}
            >
              {GENDER_OPTIONS.map((genderOption) => (
                <Picker.Item
                  key={genderOption.label}
                  label={genderOption.label}
                  value={genderOption.value}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* BUTTONS SECTION */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleContinuePress}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
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
  },
  buttonsContainer: {
    gap: 10,
    marginBottom: 20,
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
