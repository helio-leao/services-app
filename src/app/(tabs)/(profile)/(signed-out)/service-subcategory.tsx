import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import ServiceSubcategory from "@/src/types/ServiceSubcategory";

export default function ServiceSubcategoryScreen() {
  const params = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [subcategoryOptions, setSubcategoryOptions] = useState<
    ServiceSubcategory[]
  >([]);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      const { selectedCategoryId } = params;
      try {
        const { data } = await axios(
          `${process.env.EXPO_PUBLIC_API_URL}/serviceCategories/${selectedCategoryId}/serviceSubcategories`
        );
        setSubcategoryOptions(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        Alert.alert("Oops", "Ocorreu um erro.");
      }
    }
    fetchCategories();
  }, []);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={[styles.container, { marginTop: 20 }]}>
        <Text style={styles.title}>
          Selecione a opção que mais se encaixa no seu perfil.
        </Text>
      </View>

      {/* SELECT SECTION */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* select buttons */}
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          {isLoading ? (
            <View
              style={[
                styles.container,
                {
                  flex: 1,
                  justifyContent: "center",
                },
              ]}
            >
              <ActivityIndicator size={"large"} />
            </View>
          ) : subcategoryOptions.length === 0 ? (
            <View
              style={[
                styles.container,
                { flex: 1, justifyContent: "center", alignItems: "center" },
              ]}
            >
              <Text>Não há ítens cadastrados</Text>
            </View>
          ) : (
            <View style={[styles.container, { gap: 8, marginVertical: 20 }]}>
              {subcategoryOptions.map((option) => (
                <TouchableOpacity
                  key={option._id}
                  style={[
                    styles.selectButton,
                    {
                      backgroundColor:
                        selectedSubcategoryId === option._id ? "#aaf" : "#ddd",
                    },
                  ]}
                  onPress={() =>
                    setSelectedSubcategoryId((prev) =>
                      prev === option._id ? "" : option._id
                    )
                  }
                >
                  <Image
                    source={option.serviceCategory.pictureUrl}
                    style={styles.selectImage}
                  />
                  <Text style={styles.title}>{option.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* confirm button */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: !selectedSubcategoryId ? "#888" : "#000" },
              ]}
              disabled={!selectedSubcategoryId}
              onPress={() =>
                router.push({
                  pathname: "/(profile)/(signed-out)/personal-data",
                  params: {
                    ...params,
                    selectedSubcategoryId,
                  },
                })
              }
            >
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    width: 300,
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  selectImage: {
    width: 40,
    height: 40,
  },
  selectButton: {
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderRadius: 8,
  },
  buttonsContainer: {
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
