import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import axios from "axios";
import User from "@/src/types/User";
import userPicturePlaceholder from "@/assets/images/user-picture-placeholder.jpg";

export default function DetailsPage() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios(
          `${process.env.EXPO_PUBLIC_API_URL}/users/${userId}`
        );
        setUser(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        Alert.alert("Oops", "Ocorreu um erro.");
      }
    })();
  }, []);

  function handleContactUser() {
    Linking.openURL(
      `http://api.whatsapp.com/send?phone=+55${user?.contact.cellphone}`
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView
        style={[styles.screenContainer, { justifyContent: "center" }]}
      >
        <ActivityIndicator size={"large"} style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView>
        {/* ICONS SECTION */}
        <View style={styles.sectionContainer}>
          <View style={styles.professionalDataContainer}>
            <Image
              source={`data:${user?.picture?.mimeType};base64,${user?.picture?.base64}`}
              placeholder={userPicturePlaceholder}
              style={{ width: 160, height: 160 }}
            />

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <FontAwesome name="star" size={50} color="#ee0" />
              <Text>{4.8} (235) Avaliações</Text>
            </View>
          </View>
        </View>

        {/* PROFESSIONAL INFO SECTION */}
        <View style={[styles.sectionContainer, { paddingHorizontal: 40 }]}>
          <Text style={styles.subtitle}>{user?.name}</Text>
          <Text>{user?.address.street}</Text>
          <Text>Preço médio: R$ {250.0}</Text>
        </View>

        {/* PROFESSIONAL QUALIFICATIONS SECTION */}
        <View style={styles.sectionContainer}>
          <Text>Serviços:</Text>
          <View style={{ paddingHorizontal: 20 }}>
            <Text>
              {user?.service.category.name} - {user?.service.subcategory.name}
            </Text>
            <Text>{user?.service.description}</Text>
          </View>
        </View>

        {/* PROFESSIONAL CONTACTS SECTION */}
        <View style={styles.sectionContainer}>
          <Text>Contatos:</Text>
          <View style={{ paddingHorizontal: 20 }}>
            <Text>Whatsapp: {user?.contact.cellphone}</Text>
            <Text>Email: {user?.contact.email}</Text>
          </View>
        </View>

        {/* CONTACT PROFESSIONAL SECTION */}
        <TouchableOpacity
          style={[
            styles.sectionContainer,
            { flexDirection: "row", gap: 10, alignItems: "center" },
          ]}
          onPress={handleContactUser}
        >
          <Text>Falar com {user?.name}</Text>
          <Entypo name="chat" size={24} color="black" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  professionalDataContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
  },
});
