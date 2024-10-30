import { useAuth } from "@/src/contexts/AuthContext";
import { Redirect } from "expo-router";

export default function Index() {
  const { user } = useAuth();

  if (user) {
    <Redirect href={"/(tabs)/(profile)/signin/edit-user"} />;
  } else {
    <Redirect href={"/(tabs)/(profile)/signup"} />;
  }
}
