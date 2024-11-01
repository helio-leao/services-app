import { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { useAuth } from "@/src/contexts/AuthContext";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

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

export default function EditUserScreen() {
  const { userId } = useLocalSearchParams();
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [celphone, setCelphone] = useState("");
  const [gender, setGender] = useState(GENDER_OPTIONS[0].value);
  const [zip, setZip] = useState("");
  const [district, setDistrict] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceSubcategory, setServiceSubcategory] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const { data: user } = await axios(`${API_URL}/users/${userId}`);
      setServiceTitle(user.service.title);
      setServiceDescription(user.service.description);
      setName(user.name);
      setEmail(user.contact.email);
      setCelphone(user.contact.celphone);
      setGender(user.gender);
      setZip(user.address.zip);
      setDistrict(user.address.district);
      setAddressStreet(user.address.street);
      setZip(user.address.zip);
      setNumber(user.address.number);
      setComplement(user.address.complement);
      setServiceCategory(user.service.category.name);
      setServiceSubcategory(user.service.subcategory.name);
      setIsLoading(false);
    }
    fetchUser();
  }, []);

  async function handleUpdateUser() {
    // TODO: disable edit button

    const updatedUserData = {
      name: name,
      gender: gender,
      contact: {
        email: email,
        celphone: celphone,
      },
      address: {
        zip: zip,
        district: district,
        street: addressStreet,
        number: number,
        complement: complement,
      },
      service: {
        title: serviceTitle,
        description: serviceDescription,
      },
    };

    try {
      await axios.patch(`${API_URL}/users/${userId}`, updatedUserData);
      Alert.alert("Atenção", "Atualizado com sucesso.");
    } catch (error) {
      console.error(error);
      Alert.alert("Atenção", "A operação não pôde ser concluída.");
    }
  }

  if (isLoading) {
    return (
      <SafeAreaView
        style={[styles.screenContainer, { justifyContent: "center" }]}
      >
        <ActivityIndicator size={"large"} />
      </SafeAreaView>
    );
  }

  function handleSignout() {
    logout();
    router.replace("/(profile)/(signed-out)/home");
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView>
        <View style={{ width: 300, alignSelf: "center" }}>
          <TouchableOpacity
            style={{ alignSelf: "flex-end", paddingVertical: 20 }}
            onPress={handleSignout}
          >
            <Text style={{ textDecorationLine: "underline", color: "#00F" }}>
              Sair
            </Text>
          </TouchableOpacity>
        </View>
        {/* PHOTO SECTION */}
        <View
          style={[
            styles.inputsContainer,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 0,
            },
          ]}
        >
          <View style={{ gap: 10 }}>
            <Image
              style={styles.selectImage}
              source={
                "https://s3-alpha-sig.figma.com/img/92d2/0070/2f18d0b7571b941a11bfc36b838b0aec?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UiCTgYB51SppZof98Ev4WrTQSbdiedBb5tI8naNyS841OOFljgfwq2rZhJuADLcJW-tMo1-FnrOO5D8pkTGRZ2iIiX7gtQ0sbF6DhJO~zCWnN7u06jQB7Ib-D86b7beZDPez4P6li0jMixU6gs~TOky8zRaAANerhWEgjzKh4Va9jOsQTNXuqqk0qGu~5MB0xtUMnFPZAF8dnwAI63SFn~tB7lgQkEJhJpQPzm2uAVhQiD9DxJ-xpmRBhTFLEKSPyA7Zz8bXvgoRkmJ3gqq7vUPuMyJfkrNYBaSbKpsYa56PDYscPVALtrbUUP1c~3fihkQPjzx363hvRGEqzcdstQ__"
              }
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#000",
                borderRadius: 8,
                alignItems: "center",
                paddingVertical: 10,
                width: 60,
              }}
            >
              <Text style={styles.buttonText}>Foto</Text>
            </TouchableOpacity>
          </View>
          <Text>No Meu APP desde 2024</Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#000",
              borderRadius: 8,
              alignSelf: "flex-end",
              alignItems: "center",
              paddingVertical: 10,
              width: 60,
            }}
            onPress={() => setIsEditingEnabled((prev) => !prev)}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        </View>

        {/* SERVICE SECTION */}
        <View style={styles.sectionTitleContainer}>
          <Text style={[styles.title, { width: 300 }]}>Meu serviço</Text>
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.title}>Título do serviço</Text>
          <TextInput
            style={styles.input}
            editable={isEditingEnabled}
            onChangeText={setServiceTitle}
            value={serviceTitle}
          />

          <Text style={styles.title}>Descrição</Text>
          <TextInput
            style={styles.input}
            editable={isEditingEnabled}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            onChangeText={setServiceDescription}
            value={serviceDescription}
          />

          <Text style={styles.title}>{serviceCategory}</Text>
          <Text style={[styles.title, { marginLeft: 20 }]}>
            {serviceSubcategory}
          </Text>
        </View>

        {/* PERSONAL DATA SECTION */}
        <View style={styles.sectionTitleContainer}>
          <Text style={[styles.title, { width: 300 }]}>Dados Pessoais</Text>
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.title}>Nome</Text>
          <TextInput
            style={styles.input}
            editable={isEditingEnabled}
            onChangeText={setName}
            value={name}
          />

          <Text style={styles.title}>Email</Text>
          <TextInput
            style={styles.input}
            editable={isEditingEnabled}
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
          />

          <Text style={styles.title}>Celular</Text>
          <TextInput
            style={styles.input}
            editable={isEditingEnabled}
            keyboardType="number-pad"
            onChangeText={setCelphone}
            value={celphone}
          />

          <Text style={styles.title}>Sexo</Text>
          <View style={{ borderWidth: 1, borderRadius: 8 }}>
            <Picker
              enabled={isEditingEnabled}
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

        {/* ADDRESS SECTION */}
        <View style={styles.sectionTitleContainer}>
          <Text style={[styles.title, { width: 300 }]}>Endereço</Text>
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.title}>CEP</Text>
          <TextInput
            style={styles.input}
            editable={isEditingEnabled}
            keyboardType="number-pad"
            onChangeText={setZip}
            value={zip}
          />

          <Text style={styles.title}>Bairro</Text>
          <TextInput
            style={styles.input}
            editable={isEditingEnabled}
            onChangeText={setDistrict}
            value={district}
          />

          <Text style={styles.title}>Endereço</Text>
          <TextInput
            style={styles.input}
            editable={isEditingEnabled}
            onChangeText={setAddressStreet}
            value={addressStreet}
          />

          <Text style={styles.title}>Número</Text>
          <TextInput
            style={styles.input}
            editable={isEditingEnabled}
            onChangeText={setNumber}
            value={number}
          />

          <Text style={styles.title}>Complemento</Text>
          <TextInput
            style={styles.input}
            editable={isEditingEnabled}
            onChangeText={setComplement}
            value={complement}
          />
        </View>

        {/* BUTTONS SECTION */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: !isEditingEnabled ? "#888" : "#000" },
            ]}
            onPress={handleUpdateUser}
            disabled={!isEditingEnabled}
          >
            <Text style={styles.buttonText}>Salvar alterações</Text>
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
  sectionTitleContainer: {
    backgroundColor: "#aaa",
    alignItems: "center",
    paddingVertical: 10,
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
  selectImage: {
    width: 60,
    height: 60,
  },
});
