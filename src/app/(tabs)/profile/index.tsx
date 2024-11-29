import { useAuth } from "@/src/contexts/AuthContext";
import { Redirect } from "expo-router";

export default function Index() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href={"/profile/(auth)"} />;
  } else {
    return <Redirect href={"/profile/(public)"} />;
  }
}
