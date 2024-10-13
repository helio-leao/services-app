import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

export default function PersonalData() {
  const params = useLocalSearchParams();
  const [name, setName] = useState("");
  const [cep, setCep] = useState("");
  const [gender, setGender] = useState("");

  return (
    <SafeAreaView style={styles.screenContainer}>
      {/* INPUTS SECTION */}
      <View style={styles.textContainer}>
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
          onChangeText={setCep}
          value={cep}
        />
        <Text style={styles.title}>Sexo</Text>
        <TextInput
          style={styles.input}
          onChangeText={setGender}
          value={gender}
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
          <Text style={styles.buttonText}>Continuar</Text>
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
  selectImage: {
    width: 40,
    height: 40,
  },
  selectButton: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderRadius: 8,
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
