import { Image } from "expo-image";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";
import User from "@/src/types/User";
import userPicturePlaceholder from "@/assets/images/user-picture-placeholder.jpg";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const favoriteServices = [
  {
    _id: "1",
    image:
      "https://s3-alpha-sig.figma.com/img/92d2/0070/2f18d0b7571b941a11bfc36b838b0aec?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aAcjz~URQdPRvXDcBPokQ6O0dfyh9YjTAuMRVEOleCI~QsIgPYHMJTJlss-S0bVFgKZw7A0yHjbsomhB7vMwb2TJUOKroER6uGbT2b8mfuJAXMLADLaqxbVayf-wqEk0SIEIjDH2n731WS8JQx1S--j-aWP9CvbpiA1Hf48OSi1CRLFjyvksHXWHQDsYQl4vV3mwPsixsBIrzNv3b3hVrgRaNPKbG3-Gi82AOJedWvjLtBDNzmNcttbPHVlO7HyQOdJNjDLxXX4VTu2GDySWsCbYU1CYigXgSqaMkG2mupQdkpaP-R0WSqBKETYMTQL~lwju4I1qIvYF-j9ANLffow__",
    name: "Carpinteiro",
  },
  {
    _id: "2",
    image:
      "https://s3-alpha-sig.figma.com/img/5dae/6900/2430450e23c63ae1c5ad6608d178ed8b?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AeqM3nSfg2AyapNqdEv1C012fD8X22ki7L27qN-EDTKw~k2KdZXhKOu7-VFrk7oYNfOeZcU6SNu37zrFzaRG8ThYHZfScwlZZzrKSNqf674Fn4QudvAoGkT5t4HmBNdW3j-5mBhENzypcB72O6VzR~wwrG~3-ZeKUfPSJQ~zPfZIUNih74lkIyTp~gA4ih1WiD3l2DsbemOsw-nK6vzUSvaQR9VClq-e6bykYFkt3Ku50hMZAfrBHzY~JI~JQ1FhataaJKCP-cgNklTr3XpQdrh7qXVH0pu~Yp2vwiWjEsmMXw4amjbHXrfJGXFym3NGfD-ogRTdGH3uiMPprMHiQQ__",
    name: "Encanador",
  },
  {
    _id: "3",
    image:
      "https://s3-alpha-sig.figma.com/img/4782/da00/5b975a57cc75ad29969448ad6520be58?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aa2kqSCdXPj3y-Og3bM-KlhHHnYPsqiBQ6UG9JWBszDVm7Y2ID-g8O9V7cU4RHL9dBA-o7fAmHRpbLnHg4RrdU49CYQzlQFXXUASZBLENeTsU1jedq4EcGiPk0i3N02HbqYXGKej9nZGVlSDOLVFNRGLzy39bGM17H-bWCP0I0F7dCD8rVPovoS3a6y-03De37ZF~CFHAX3RvLxfesUB5rzt6-82~1-mPpilJqEkuOfHfNLkgyVPWR4FN9WdLlnQA36S3Qu6lU98eaVsIEqhNQ7WA17pTsreyCiuP7jkSTjPfYaOF-Vted2p9Tk4fVWsDtRWLbQ-KixtM6rVCsMlsg__",
    name: "Capinador",
  },
];

export default function SearchScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios(`${API_URL}/users`);
        setAllUsers(data);
      } catch (error) {
        console.log(error);
        Alert.alert("Oops", "Ocorreu um erro.");
      }
      setIsLoading(false);
    })();
  }, []);

  async function handleSearch() {
    setIsLoading(true);

    if (!searchQuery) {
      setSearchedUsers([]);
    } else {
      try {
        const { data } = await axios(`${API_URL}/users/search/${searchQuery}`);
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
          onEndEditing={handleSearch}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
          disabled={isLoading}
        >
          <Feather name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* DYNAMIC MAIN SECTION */}
      {isLoading ? (
        <ActivityIndicator size={"large"} style={{ flex: 1 }} />
      ) : searchedUsers.length > 0 ? (
        <SearchResults users={searchedUsers} />
      ) : (
        <DefaultMainSection users={allUsers} />
      )}
    </SafeAreaView>
  );
}

const DefaultMainSection = ({ users }: { users: User[] }) => {
  function getUniqueJobCategories() {
    const jobCategories = new Set<string>();

    for (const user of users) {
      jobCategories.add(user.service.category.name);
    }
    return Array.from(jobCategories);
  }

  function formatServicesDataForScreen() {
    // NOTE: [{ title: "Profession", data: [ users: User[]] }, { title: "Profession2", data: [ users: User[]] }]
    const uniqueJobCategories = getUniqueJobCategories();
    const formatedServices = uniqueJobCategories.map((categoryName) => ({
      title: categoryName,
      data: users.filter((user) => user.service.category.name === categoryName),
    }));
    return formatedServices;
  }

  const services = formatServicesDataForScreen();

  return (
    <ScrollView>
      {/* FAVORITES SECTION */}
      {/* <View>
        <View style={styles.favoritesHeader}>
          <Text style={styles.title}>FAVORITOS</Text>
          <Feather name="star" size={18} color="black" />
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.favoriteCardsContainer}
          data={[...favoriteServices, ...favoriteServices]}
          renderItem={({ item }) => (
            <View style={styles.favoriteCardContainer}>
              <Image style={styles.image} source={item.image} />
              <Text>{item.name}</Text>
            </View>
          )}
        />
      </View> */}

      {/* CLOSE SERVICES SECTION */}
      <View>
        <View style={styles.closeServicesHeader}>
          <Text style={styles.title}>Serviços mais próximos</Text>
        </View>

        {services.map((service) => (
          <View style={styles.closeServiceRowContainer} key={service.title}>
            <View style={styles.closeServiceRowHeader}>
              <Text style={styles.subtitle}>{service.title}</Text>
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.favoriteCardsContainer}
              data={service.data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.favoriteCardContainer}
                  onPress={() =>
                    router.push({
                      pathname: "/service-details",
                      params: { userId: item._id },
                    })
                  }
                >
                  <Image
                    style={styles.image}
                    source={`data:${item.picture?.mimeType};base64,${item.picture?.base64}`}
                    placeholder={userPicturePlaceholder}
                  />
                  <Text>{item.name.split(" ")[0]}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

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
                pathname: `/service-details`,
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
  subtitle: {
    fontSize: 16,
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
  favoritesHeader: {
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  favoriteCardsContainer: {
    gap: 20,
    paddingHorizontal: 20,
  },
  favoriteCardContainer: {
    gap: 10,
    alignItems: "center",
  },
  closeServiceRowContainer: {
    gap: 20,
    marginBottom: 20,
  },
  closeServicesHeader: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  closeServiceRowHeader: {
    paddingHorizontal: 20,
  },
  image: {
    height: 80,
    width: 60,
  },
});
