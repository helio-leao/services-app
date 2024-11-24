import { Redirect } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
import icon from "@/assets/images/icon.png";
import { Image } from "expo-image";
import { setStatusBarStyle } from "expo-status-bar";
import { useEffect } from "react";
import { colors } from "../constants/colors";

export default function IndexPage() {
  const { isLoading } = useAuth();

  useEffect(() => {
    setStatusBarStyle("light");
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={icon} />
        <ActivityIndicator size={"large"} color={colors.background} />
      </SafeAreaView>
    );
  }

  return <Redirect href={"/home"} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  logo: {
    width: 360,
    aspectRatio: 1,
  },
});
