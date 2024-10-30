import { useAuth } from "@/src/contexts/AuthContext";
import { Redirect } from "expo-router";

export default function Index() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href={"/(tabs)/(profile)/signin/edit-user"} />;
  } else {
    return <Redirect href={"/(tabs)/(profile)/signup"} />;
  }
}
