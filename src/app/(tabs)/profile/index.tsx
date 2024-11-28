import { useAuth } from "@/src/contexts/AuthContext";
import { Redirect } from "expo-router";

export default function Index() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href={"/profile/edit"} />;
  } else {
    return <Redirect href={"/profile/home"} />;
  }
}
