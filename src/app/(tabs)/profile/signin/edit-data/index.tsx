import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";

export default function PersonalData() {
  const { userId } = useLocalSearchParams();
  const [serviceTitle, setServiceTitle] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [celphone, setCelphone] = useState("");
  const [gender, setGender] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView>
        {/* PHOTO SECTION */}
        <View
          style={[
            styles.inputsContainer,
            { flexDirection: "row", justifyContent: "space-between" },
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
            onChangeText={setServiceTitle}
            value={serviceTitle}
          />

          <Text style={styles.title}>Descrição</Text>
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            onChangeText={setDescription}
            value={description}
          />
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
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            onChangeText={setCelphone}
            value={celphone}
          />

          <Text style={styles.title}>Sexo</Text>
          <View style={{ borderWidth: 1, borderRadius: 8 }}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue, _itemIndex) => setGender(itemValue)}
            >
              <Picker.Item label="Masculino" value="MASCULINO" />
              <Picker.Item label="Feminino" value="FEMININO" />
              <Picker.Item label="Outros" value="OUTROS" />
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
            keyboardType="number-pad"
            onChangeText={setCep}
            value={cep}
          />

          <Text style={styles.title}>Endereço</Text>
          <TextInput
            style={styles.input}
            onChangeText={setAddress}
            value={address}
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
        </View>

        {/* BUTTONS SECTION */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            // onPress={() =>
            //   router.push({
            //     pathname: "/profile/signup/service-subcategory",
            //     params: { ...params, selectedSubcategory },
            //   })
            // }
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
