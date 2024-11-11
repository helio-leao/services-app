import { Image } from "expo-image";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import User from "@/src/types/User";
import userPicturePlaceholder from "@/assets/images/user-picture-placeholder.jpg";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function SearchPage() {
  const params = useLocalSearchParams<{ searchQuery: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);

  useEffect(() => {
    setSearchQuery(params.searchQuery);
    handleSearch(params.searchQuery);
  }, [params.searchQuery]);

  async function handleSearch(query: string) {
    setIsLoading(true);

    if (!query) {
      setSearchedUsers([]);
    } else {
      try {
        const { data } = await axios(`${API_URL}/users/search/${query}`);
        setSearchedUsers(data);
      } catch (error) {
        console.log(error);
        Alert.alert("Oops", "Ocorreu um erro.");
      }
    }
    setIsLoading(false);
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      {/* SEARCH BAR */}
      <View>
        <TextInput
          style={styles.searchBar}
          placeholder="Encontre seu serviço..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          onEndEditing={() => handleSearch(searchQuery)}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => handleSearch(searchQuery)}
          disabled={isLoading}
        >
          <Feather name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size={"large"} style={{ flex: 1 }} />
      ) : searchedUsers.length > 0 ? (
        <SearchResults users={searchedUsers} />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Não há resutados.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const SearchResults = ({ users }: { users: User[] }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginBottom: 20, marginHorizontal: 20 }}>
        <Text style={styles.title}>Serviços</Text>
      </View>

      <FlatList
        data={users}
        contentContainerStyle={{
          gap: 10,
          paddingBottom: 20,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: "#eee",
              flexDirection: "row",
              gap: 20,
              borderRadius: 8,
            }}
            onPress={() =>
              router.push({
                pathname: `/search/details`,
                params: { userId: item._id },
              })
            }
          >
            <View style={{ alignItems: "center" }}>
              <Image
                style={{ width: 60, height: 60 }}
                source={`data:${item.picture?.mimeType};base64,${item.picture?.base64}`}
                placeholder={userPicturePlaceholder}
              />
              <Text>{item.name.split(" ")[0]}</Text>
            </View>
            <View>
              <Text style={styles.title}>{item.service.subcategory.name}</Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Text>4.8</Text>
                <FontAwesome name="star" size={18} color="#dd0" />
                <Text>(235)</Text>
                <Text>{item.service.category.name}</Text>
              </View>
              <Text>Preço médio R$ 250,00</Text>
              <Text>{item.address.street}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  searchBar: {
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 50,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  searchButton: {
    position: "absolute",
    right: 25,
    top: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 80,
    width: 60,
  },
});
