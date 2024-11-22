import { Redirect } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import { ActivityIndicator } from "react-native";

export default function IndexPage() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} size={"large"} />;
  }

  return <Redirect href={"/home"} />;
}
