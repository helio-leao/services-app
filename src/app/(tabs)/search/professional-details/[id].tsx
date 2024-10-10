import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const professionalDetails = {
  image:
    "https://s3-alpha-sig.figma.com/img/bb36/fa10/31a72cc531af356e7a1eb9ecbd208ac7?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nSM8h7Soxxhdm0b46wyKi-U8ap2vD8Uk4MOb6KeRRaCBTj6zmnZ3A4~SVEkg2OuAwhisat1I0Hr6FgPAvipT6nyFYHKPZK7jSsi7L677kLBNxRnYPhKzzaL3B0XZuuAtm6uEi1LVkN5-JqRPbRQZ4p2DPoCoEeCAd4WaxygRIS4~kNWCK4L6YYY~QYJMovIRL83CFvYUoDsb1vZmOPSfWq--7k9isyI6BUprDj7XX1zYmowGlt2wg-MsTgnjTE1FrRihgvyk0ywTbb~YVdmJwdESg2eS-pwSF8RqdzzzRhBk-7sEgQANPScLNi-O1S-MIhsBNX0USAbuANLLIQLWfQ__",
  name: "Sérgio",
  address: "R. José Malaquias Guerra, 195 - Cabaceira ",
  averagePrice: 250,
  services: [
    "Reparos automotivos",
    "serviços de funilaria",
    "reforma nos bancos e estofados",
    "consertos dos botões e do painel",
    "substituição das pelas, calotas, volante e tapetes",
  ],
  email: "servioservicos@gmail.com",
  whatsapp: "(87) 9 9880-0000",
  rating: 4.8,
  ratingCount: 235,
};

export default function Search() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView>
        {/* ICONS SECTION */}
        <View style={styles.sectionContainer}>
          <View style={styles.professionalDataContainer}>
            <Image
              source={professionalDetails.image}
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
              <Text>
                {professionalDetails.rating} ({professionalDetails.ratingCount})
                Avaliações
              </Text>
            </View>
          </View>
        </View>

        {/* PROFESSIONAL INFO SECTION */}
        <View style={[styles.sectionContainer, { paddingHorizontal: 40 }]}>
          <Text style={styles.subtitle}>
            {professionalDetails.name} ({id})
          </Text>
          <Text>{professionalDetails.address}</Text>
          <Text>
            Preço médio: R$ {professionalDetails.averagePrice.toFixed(2)}
          </Text>
        </View>

        {/* PROFESSIONAL QUALIFICATIONS SECTION */}
        <View style={styles.sectionContainer}>
          <Text>Serviços:</Text>
          <View style={{ paddingHorizontal: 20 }}>
            {professionalDetails.services.map((service) => (
              <Text key={service}>{service}</Text>
            ))}
          </View>
        </View>

        {/* PROFESSIONAL CONTACTS SECTION */}
        <View style={styles.sectionContainer}>
          <Text>Contatos:</Text>
          <View style={{ paddingHorizontal: 20 }}>
            <Text>Whatsapp: {professionalDetails.whatsapp}</Text>
            <Text>Email: {professionalDetails.email}</Text>
          </View>
        </View>

        {/* CONTACT PROFESSIONAL SECTION */}
        <TouchableOpacity
          style={[
            styles.sectionContainer,
            { flexDirection: "row", gap: 10, alignItems: "center" },
          ]}
        >
          <Text>Falar com {professionalDetails.name}</Text>
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
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
  },
});
