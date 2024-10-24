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
import ServiceCategory from "@/src/types/ServiceCategory";

export default function ServiceCategoryScreen() {
  const params = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axios(
          `${process.env.EXPO_PUBLIC_API_URL}/serviceCategories`
        );
        setCategories(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        Alert.alert("Atenção", "Não foi possível obter a lista de categorias.");
      }
    }
    fetchCategories();
  }, []);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView
        contentContainerStyle={{
          minHeight: "100%",
          justifyContent: "space-between",
          paddingVertical: 20,
        }}
      >
        {/* SELECT SECTION */}
        <View style={styles.selectContainer}>
          <Text style={styles.title}>
            Selecione a categoria dos serviços que você vai realizar
          </Text>

          {isLoading ? (
            <View
              style={{
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size={"large"} />
            </View>
          ) : (
            <View style={{ gap: 8, marginVertical: 10 }}>
              {categories.map((option) => (
                <TouchableOpacity
                  key={option._id}
                  style={[
                    styles.selectButton,
                    {
                      backgroundColor:
                        selectedCategoryId === option._id ? "#aaf" : "#ddd",
                    },
                  ]}
                  onPress={() =>
                    setSelectedCategoryId((prev) =>
                      prev === option._id ? "" : option._id
                    )
                  }
                >
                  <Image
                    source={option.pictureUrl}
                    style={styles.selectImage}
                  />
                  <Text style={styles.title}>{option.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* BUTTONS SECTION */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: !selectedCategoryId ? "#888" : "#000" },
            ]}
            disabled={!selectedCategoryId}
            onPress={() =>
              router.push({
                pathname: "/profile/signup/service-subcategory",
                params: { ...params, selectedCategoryId },
              })
            }
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
  },
  selectContainer: {
    flex: 1,
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
    padding: 14,
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
