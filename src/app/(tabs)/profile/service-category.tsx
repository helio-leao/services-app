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
import CustomButton from "@/src/components/CustomButton";
import { colors } from "@/src/constants/colors";

export default function ServiceCategoryPage() {
  const params = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState<ServiceCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios(
          `${process.env.EXPO_PUBLIC_API_URL}/serviceCategories`
        );
        setCategoryOptions(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        Alert.alert("Oops", "Ocorreu um erro.");
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={[styles.container, { marginTop: 20 }]}>
        <Text style={styles.title}>
          Selecione a categoria dos serviços que você vai realizar
        </Text>
      </View>

      {/* SELECT SECTION */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* select buttons */}
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          {isLoading ? (
            <ActivityIndicator
              size={"large"}
              color={colors.primary}
              style={{ flex: 1 }}
            />
          ) : categoryOptions.length === 0 ? (
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
              {categoryOptions.map((option) => (
                <TouchableOpacity
                  key={option._id}
                  style={[
                    styles.selectButton,
                    {
                      backgroundColor:
                        selectedCategoryId === option._id
                          ? colors.primary
                          : colors.background,
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
                  <Text
                    style={[
                      styles.title,
                      {
                        color:
                          selectedCategoryId === option._id
                            ? colors.background
                            : "#000",
                      },
                    ]}
                  >
                    {option.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* confirm button */}
          <View style={styles.buttonsContainer}>
            <CustomButton
              label="Continuar"
              onPress={() =>
                router.push({
                  pathname: "/profile/service-subcategory",
                  params: { ...params, selectedCategoryId },
                })
              }
              disabled={!selectedCategoryId}
            />
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
});
