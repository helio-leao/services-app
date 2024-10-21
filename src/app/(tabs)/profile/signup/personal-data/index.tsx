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
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function PersonalData() {
  const params = useLocalSearchParams();
  const [name, setName] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [gender, setGender] = useState("");

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
            onChangeText={setCep}
            value={cep}
          />
          <Text style={styles.title}>Endereço</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEndereco}
            value={endereco}
          />

          <Text style={styles.title}>Número</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNumero}
            value={numero}
          />

          <Text style={styles.title}>Complemento</Text>
          <TextInput
            style={styles.input}
            onChangeText={setComplemento}
            value={complemento}
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

        {/* BUTTONS SECTION */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Alert.alert(
                "Parabéns!\nSeu cadastro foi concluído.",
                "Agora você pode prestar seus serviços e aumentar sua cartela de clientes com segurança e rapidez.",
                [
                  {
                    text: "Ok! Entendi",
                    onPress: () => {},
                  },
                ]
              );
            }}
          >
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
