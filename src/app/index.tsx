import { Redirect } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
import appLogo from "@/assets/images/app-logo.png";
import { Image } from "expo-image";
import { setStatusBarStyle } from "expo-status-bar";
import { useEffect } from "react";

export default function IndexPage() {
  const { isLoading } = useAuth();

  useEffect(() => {
    setStatusBarStyle("light");
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={appLogo} />
        <ActivityIndicator size={"large"} color={"white"} />
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
    backgroundColor: "#497ABD",
  },
  logo: {
    width: 300,
    aspectRatio: 1,
  },
});
