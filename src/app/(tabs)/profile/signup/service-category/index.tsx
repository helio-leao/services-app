import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
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
    name: "Assistência Técnica",
    picture:
      "https://s3-alpha-sig.figma.com/img/9d21/5142/c282a2746eb1283713b44afd414e1fd2?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KLsoKCb37iiFb2qnzzjo3~FRLMz1B7-vg7JI85dYx0pcuHwAbYT3gDEEgCAwvuZ3etBVN0SoqVnvmnn3NZXJHBxWsEki11w77E0Py2dEiloCkv8n4waMxlTuE0ty4Jla0n2Hp39QyXAweK-UhyoADV8zBRzujlj372fAPXTL5D7l3X2oBFzddIvNxG2GJTfEXY2Ic906RUsykIcL2IiLahplBklnlbLABHHmf9OF4EXGZFjmKWwFzSVO4FuyBPmP8sHO-CnYTBw4EkZdGkSqfytqbAFQf9fiwfliT3tEorInftAKiR5OLgkb568QGE4Jpi3lS2rlms66dvtAgLyLKQ__",
  },
  {
    name: "Domésticos",
    picture:
      "https://s3-alpha-sig.figma.com/img/4e81/5c85/33210768d97194f03b29027427817438?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YKz7NTO7j2HDwBVHjuSKaj28rV~UkPtW09Tm-7jtGjRiCjZjsBunt1A4HBL5Jj13TGaSho62uI9AODbEd2VZL1hCDJVN0uX3dq0X9Ol4MUxgHO~NSOuxMzgD-KkhPr0Wafj4RCD8mHorNJQvbCBmhUcUpCPS7cufcM9YRc4s6rrHldHb~o~X2xMjGxB101HUKbVYRHkT-8rpOuczgGj80srxNtxZNI4zWzq3h55YInLkNpRnpPFj7eddP0j2y-3cNRAJ3LM8mCr8vL5w8cCDJJBD3j-uOOob~EqHBYl4OtpWn8rby8NVnXdQVJTcSAkXdUIXufjFksu29uKFeMl67g__",
  },
  {
    name: "Reparos",
    picture:
      "https://s3-alpha-sig.figma.com/img/07d8/4682/5a49cbcb202f55897954e67a7cad8716?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JXiaUU1QOFoRLoU1ytPGXS--77KL1fIkt8zCBR~7kAasaSFE0FfdHfvLDGqTMZfgeO4W2MMwDGp6Bdg~GYlGacU9gy-fVBPFiqstAp8TOfvP5ty~3XOz8Bz2yYX5o-TAI59iOm1GFUR3EDiooYlRM8dOBOE96aKhWwl7OrEgsMR0ldrp4-43KsOUK7wMvu0cZULbsjyUJt2-VqdTl4tLAMracsqcZqtwbyrJry6QJtXk~5YH70pzkk5ni8YSrIeAq5H9xppjoBS6ALKFO2s9LLMgs-lwByoL~fXT3u-PAGZU2fa9eNqjMu1U4Wmjio8HUMO7X~rRFtJ~FqlVa25imA__",
  },
  {
    name: "Aulas",
    picture:
      "https://s3-alpha-sig.figma.com/img/860f/a6eb/da444b507ed4d835220eef7eaeb6f61f?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FpmEY4Mlow~zlMbUjkokqumN8YIA4d6SIrlWXVbE8gesOsU868U2vs2mA0UFVJR3VIaxArGKqasQ3gGVeRmf0CiX8m-5UXoUAndp7FQLqmB9TnERytNKVoQO4dn8NTFIyuk~ZxIjd--rjFiHM7UwcVnz9WcE4BL4JnOs9Rnwt~2yOWUGBfq-x-MQjiAXIoGOFhHu4cAqY-h7MSSwQHx23rVTWt7GE9f~d4UUJV0PStVJFe6zFmm18MOERGj2UGEtZ0V1ztyqYiMRwPyyZKaRXW-LrPCcUOCYhmfvhMdpaRZev4QzBnU5BXiQTZPRhWRYg2LROi-9TRGNTAmDsacSUQ__",
  },
];

export default function ServiceCategory() {
  const params = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <SafeAreaView style={styles.screenContainer}>
      {/* TEXT AND SELECT SECTION */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Selecione a categoria dos serviços que você vai realizar
        </Text>

        <View style={{ gap: 8 }}>
          {categories.map((option) => (
            <TouchableOpacity
              key={option.name}
              style={[
                styles.selectButton,
                {
                  backgroundColor:
                    selectedCategory === option.name ? "#aaf" : "#ddd",
                },
              ]}
              onPress={() =>
                setSelectedCategory((prev) =>
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
            { backgroundColor: !selectedCategory ? "#888" : "#000" },
          ]}
          disabled={!selectedCategory}
          onPress={() =>
            router.push({
              pathname: "/profile/signup/service-subcategory",
              params: { ...params, selectedCategory },
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
