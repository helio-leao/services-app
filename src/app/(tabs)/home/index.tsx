import { Image } from "expo-image";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import axios from "axios";
import User from "@/src/types/User";
import userPicturePlaceholder from "@/assets/images/user-picture-placeholder.jpg";
import SearchBar from "@/src/components/SearchBar";
import { colors } from "@/src/constants/colors";

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

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios(`${API_URL}/users`);
        setAllUsers(data);
      } catch (error) {
        console.log(error);
        Alert.alert("Oops", "Ocorreu um erro.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  async function handleSearch() {
    router.push({ pathname: "/search", params: { searchQuery } });
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <SearchBar
        disabled={isLoading}
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmit={handleSearch}
      />

      {isLoading ? (
        <ActivityIndicator
          size={"large"}
          color={colors.primary}
          style={{ flex: 1 }}
        />
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
      jobCategories.add(user.service?.category?.name!);
    }
    return Array.from(jobCategories);
  }

  function formatServicesDataForScreen() {
    // NOTE: [{ title: "Profession", data: [ users: User[]] }, { title: "Profession2", data: [ users: User[]] }]
    const uniqueJobCategories = getUniqueJobCategories();
    const formatedServices = uniqueJobCategories.map((categoryName) => ({
      title: categoryName,
      data: users.filter(
        (user) => user.service?.category?.name === categoryName
      ),
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
                      pathname: "/home/details",
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
  favoritesHeader: {
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  favoriteCardsContainer: {
    gap: 16,
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
    width: 74,
    aspectRatio: 3 / 4,
    borderRadius: 8,
  },
});
