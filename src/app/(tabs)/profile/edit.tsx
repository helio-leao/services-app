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
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { useAuth } from "@/src/contexts/AuthContext";
import * as ImagePicker from "expo-image-picker";
import userPicturePlaceholder from "@/assets/images/user-picture-placeholder.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "@/src/types/User";
import GenderPicker, { GENDER_OPTIONS } from "@/src/components/GenderPicker";
import ASYNC_STORAGE_KEYS from "@/src/constants/asyncStorageKeys";
import MaskedInput from "@/src/components/MaskedInput";
import {
  CEP_REGEX,
  EMAIL_REGEX,
  PHONE_REGEX,
} from "@/src/constants/validationRegex";
import { normalizeString } from "@/src/utils/stringUtils";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function EditPage() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [serviceDescription, setServiceDescription] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [gender, setGender] = useState(GENDER_OPTIONS[0].value);
  const [zip, setZip] = useState("");
  const [district, setDistrict] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceSubcategory, setServiceSubcategory] = useState("");
  const [joinedAt, setJoinedAt] = useState("");

  const [picture, setPicture] = useState("");
  const [mimeType, setMimeType] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data: user } = await axios(`${API_URL}/users/${userId}`);
        updateUserStates(user);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        Alert.alert("Oops", "Ocorreu um erro.");
      }
    })();
  }, []);

  function updateUserStates(user: User) {
    setServiceDescription(user.service?.description || "");
    setPrice(user.service?.price?.toFixed(2).toString() || "");
    setName(user.name);
    setEmail(user.contact.email);
    setCellphone(user.contact.cellphone);
    setGender(user.gender);
    setZip(user.address.zip);
    setDistrict(user.address.district);
    setAddressStreet(user.address.street);
    setZip(user.address.zip);
    setNumber(user.address.number);
    setComplement(user.address.complement);
    setServiceCategory(user.service?.category?.name || "");
    setServiceSubcategory(user.service?.subcategory?.name || "");
    setJoinedAt(new Date(user.createdAt!).getFullYear().toString());
    setPicture(user.picture?.base64 || "");
    setMimeType(user.picture?.mimeType || "");
  }

  async function handleUpdateUser() {
    if (!isInputValid()) return;

    const updatedUserData: User = {
      name: normalizeString(name),
      gender: gender,
      contact: {
        email: email,
        cellphone: cellphone,
      },
      address: {
        zip: zip,
        district: normalizeString(district),
        street: normalizeString(addressStreet),
        number: normalizeString(number),
        complement: normalizeString(complement),
      },
      service: {
        description: normalizeString(serviceDescription),
        price: Number(price),
      },
    };

    setIsSaving(true);

    try {
      const { data: updatedUser } = await axios.patch(
        `${API_URL}/users/${userId}`,
        updatedUserData
      );
      updateUserStates(updatedUser);
      await storeUpdatedUser(updatedUser);
      Alert.alert("Atenção", "Atualizado com sucesso.");
    } catch (error) {
      console.error(error);
      Alert.alert("Oops", "Ocorreu um erro.");
    }

    setIsSaving(false);
  }

  async function handlePictureUpdate() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.5,
      base64: true,
    });

    if (result.canceled) {
      return;
    }

    const { mimeType, base64 } = result.assets[0];

    const updatedUserData = {
      picture: {
        base64,
        mimeType,
      },
    };

    setIsSaving(true);

    try {
      const { data: updatedUser } = await axios.patch(
        `${API_URL}/users/${userId}`,
        updatedUserData
      );
      await storeUpdatedUser(updatedUser);
      setPicture(base64 || "");
      setMimeType(mimeType || "");
    } catch (error) {
      console.error(error);
      Alert.alert("Oops", "Ocorreu um erro.");
    }

    setIsSaving(false);
  }

  function isInputValid() {
    if (!EMAIL_REGEX.test(email)) {
      Alert.alert("Atenção", "Formato do email inválido.");
      return false;
    }
    if (!PHONE_REGEX.test(cellphone)) {
      Alert.alert("Atenção", "O telefone deve ter 11 números.");
      return false;
    }
    // if (!CEP_REGEX.test(zip)) {
    //   Alert.alert("Atenção", "O CEP deve ter 8 números.");
    //   return false;
    // }
    return true;
  }

  async function handleSignout() {
    try {
      await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.USER_SESSION);
      logout();
      router.replace("/profile/home");
    } catch (error) {
      console.log(error);
      Alert.alert("Oops", "Não foi possível deslogar.");
    }
  }

  async function storeUpdatedUser(user: User) {
    try {
      await AsyncStorage.setItem(
        ASYNC_STORAGE_KEYS.USER_SESSION,
        JSON.stringify(user)
      );
    } catch (error) {
      console.log(error);
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
              alignItems: "center",
              paddingTop: 0,
            },
          ]}
        >
          <View>
            <Image
              style={styles.selectImage}
              source={`data:${mimeType};base64,${picture}`}
              placeholder={userPicturePlaceholder}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#000",
                alignItems: "center",
                paddingVertical: 6,
              }}
              onPress={handlePictureUpdate}
              disabled={isSaving}
            >
              {isSaving ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.buttonText}>Foto</Text>
              )}
            </TouchableOpacity>
          </View>
          <Text>No Meu APP desde {joinedAt}</Text>
        </View>

        {/* SERVICE SECTION */}
        <View style={styles.sectionTitleContainer}>
          <Text style={[styles.title, { width: 300 }]}>Meu serviço</Text>
        </View>
        <View style={styles.inputsContainer}>
          <Text style={styles.title}>Descrição</Text>
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={4}
            maxLength={300}
            textAlignVertical="top"
            onChangeText={setServiceDescription}
            value={serviceDescription}
          />

          <Text style={styles.title}>Valor do serviço</Text>
          <MaskedInput
            style={styles.input}
            type="currency"
            onChangeText={setPrice}
            value={price}
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
          <TextInput style={styles.input} onChangeText={setName} value={name} />

          <Text style={styles.title}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
          />

          <Text style={styles.title}>Celular</Text>
          <MaskedInput
            style={styles.input}
            type="phone"
            onChangeText={setCellphone}
            value={cellphone}
          />

          <Text style={styles.title}>Sexo</Text>
          <GenderPicker
            gender={gender}
            onValueChange={(itemValue, _itemIndex) => setGender(itemValue)}
          />
        </View>

        {/* ADDRESS SECTION */}
        <View style={styles.sectionTitleContainer}>
          <Text style={[styles.title, { width: 300 }]}>Endereço</Text>
        </View>
        <View style={styles.inputsContainer}>
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
        </View>

        {/* BUTTONS SECTION */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#000" }]}
            onPress={handleUpdateUser}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.buttonText}>Salvar alterações</Text>
            )}
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
    width: 90,
    aspectRatio: 3 / 4,
  },
});
