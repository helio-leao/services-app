import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ProfessionalDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text>Professional Details - {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
