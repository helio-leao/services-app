import { Image } from "expo-image";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import User from "@/src/types/User";
import userPicturePlaceholder from "@/assets/images/user-picture-placeholder.jpg";
import SearchBar from "@/src/components/SearchBar";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function SearchPage() {
  const params = useLocalSearchParams<{ searchQuery: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);

  useEffect(() => {
    if (params.searchQuery) {
      setSearchQuery(params.searchQuery);
      handleSearch(params.searchQuery);
    }
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
      <SearchBar
        disabled={isLoading}
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmit={() => handleSearch(searchQuery)}
      />

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
        renderItem={({ item: user }) => (
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
                params: { userId: user._id },
              })
            }
          >
            <View style={{ alignItems: "center", gap: 2 }}>
              <Image
                style={{ width: 60, aspectRatio: 3 / 4 }}
                source={`data:${user.picture?.mimeType};base64,${user.picture?.base64}`}
                placeholder={userPicturePlaceholder}
              />
              <Text>{user.name.split(" ")[0]}</Text>
            </View>
            <View>
              <Text style={styles.title}>
                {user.service?.subcategory?.name}
              </Text>
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
                <Text>{user.service?.category?.name}</Text>
              </View>
              {user?.service?.price && (
                <Text>
                  Preço médio: R$
                  {user?.service.price?.toFixed(2).toString().replace(".", ",")}
                </Text>
              )}
              <Text>{user.address.street}</Text>
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
  image: {
    height: 80,
    width: 60,
  },
});
