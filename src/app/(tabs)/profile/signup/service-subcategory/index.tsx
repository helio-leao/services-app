import { Image } from "expo-image";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const categories = [
  {
    name: "Trabalhos Acadêmicos",
    picture:
      "https://s3-alpha-sig.figma.com/img/860f/a6eb/da444b507ed4d835220eef7eaeb6f61f?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FpmEY4Mlow~zlMbUjkokqumN8YIA4d6SIrlWXVbE8gesOsU868U2vs2mA0UFVJR3VIaxArGKqasQ3gGVeRmf0CiX8m-5UXoUAndp7FQLqmB9TnERytNKVoQO4dn8NTFIyuk~ZxIjd--rjFiHM7UwcVnz9WcE4BL4JnOs9Rnwt~2yOWUGBfq-x-MQjiAXIoGOFhHu4cAqY-h7MSSwQHx23rVTWt7GE9f~d4UUJV0PStVJFe6zFmm18MOERGj2UGEtZ0V1ztyqYiMRwPyyZKaRXW-LrPCcUOCYhmfvhMdpaRZev4QzBnU5BXiQTZPRhWRYg2LROi-9TRGNTAmDsacSUQ__",
  },
  {
    name: "Idiomas",
    picture:
      "https://s3-alpha-sig.figma.com/img/860f/a6eb/da444b507ed4d835220eef7eaeb6f61f?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FpmEY4Mlow~zlMbUjkokqumN8YIA4d6SIrlWXVbE8gesOsU868U2vs2mA0UFVJR3VIaxArGKqasQ3gGVeRmf0CiX8m-5UXoUAndp7FQLqmB9TnERytNKVoQO4dn8NTFIyuk~ZxIjd--rjFiHM7UwcVnz9WcE4BL4JnOs9Rnwt~2yOWUGBfq-x-MQjiAXIoGOFhHu4cAqY-h7MSSwQHx23rVTWt7GE9f~d4UUJV0PStVJFe6zFmm18MOERGj2UGEtZ0V1ztyqYiMRwPyyZKaRXW-LrPCcUOCYhmfvhMdpaRZev4QzBnU5BXiQTZPRhWRYg2LROi-9TRGNTAmDsacSUQ__",
  },
  {
    name: "Reforço Escolar",
    picture:
      "https://s3-alpha-sig.figma.com/img/860f/a6eb/da444b507ed4d835220eef7eaeb6f61f?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FpmEY4Mlow~zlMbUjkokqumN8YIA4d6SIrlWXVbE8gesOsU868U2vs2mA0UFVJR3VIaxArGKqasQ3gGVeRmf0CiX8m-5UXoUAndp7FQLqmB9TnERytNKVoQO4dn8NTFIyuk~ZxIjd--rjFiHM7UwcVnz9WcE4BL4JnOs9Rnwt~2yOWUGBfq-x-MQjiAXIoGOFhHu4cAqY-h7MSSwQHx23rVTWt7GE9f~d4UUJV0PStVJFe6zFmm18MOERGj2UGEtZ0V1ztyqYiMRwPyyZKaRXW-LrPCcUOCYhmfvhMdpaRZev4QzBnU5BXiQTZPRhWRYg2LROi-9TRGNTAmDsacSUQ__",
  },
  {
    name: "Música",
    picture:
      "https://s3-alpha-sig.figma.com/img/860f/a6eb/da444b507ed4d835220eef7eaeb6f61f?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FpmEY4Mlow~zlMbUjkokqumN8YIA4d6SIrlWXVbE8gesOsU868U2vs2mA0UFVJR3VIaxArGKqasQ3gGVeRmf0CiX8m-5UXoUAndp7FQLqmB9TnERytNKVoQO4dn8NTFIyuk~ZxIjd--rjFiHM7UwcVnz9WcE4BL4JnOs9Rnwt~2yOWUGBfq-x-MQjiAXIoGOFhHu4cAqY-h7MSSwQHx23rVTWt7GE9f~d4UUJV0PStVJFe6zFmm18MOERGj2UGEtZ0V1ztyqYiMRwPyyZKaRXW-LrPCcUOCYhmfvhMdpaRZev4QzBnU5BXiQTZPRhWRYg2LROi-9TRGNTAmDsacSUQ__",
  },
];

export default function ServiceSubcategory() {
  const params = useLocalSearchParams();
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  return (
    <SafeAreaView style={styles.screenContainer}>
      {/* TEXT AND SELECT SECTION */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Selecione a opção que mais se encaixa no seu perfil
        </Text>

        <View style={{ gap: 8 }}>
          {categories.map((option) => (
            <TouchableOpacity
              key={option.name}
              style={[
                styles.selectButton,
                {
                  backgroundColor:
                    selectedSubcategory === option.name ? "#aaf" : "#ddd",
                },
              ]}
              onPress={() =>
                setSelectedSubcategory((prev) =>
                  prev === option.name ? "" : option.name
                )
              }
            >
              <Image source={option.picture} style={styles.selectImage} />
              <Text style={styles.title}>{option.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* BUTTONS SECTION */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: !selectedSubcategory ? "#888" : "#000" },
          ]}
          disabled={!selectedSubcategory}
          onPress={() =>
            router.push({
              pathname: "/profile/signup/personal-data",
              params: { ...params, selectedSubcategory },
            })
          }
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
