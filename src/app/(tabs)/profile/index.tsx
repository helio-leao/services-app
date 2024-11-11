import { useAuth } from "@/src/contexts/AuthContext";
import { Redirect } from "expo-router";

export default function IndexPage() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href={`/profile/edit/${user._id}`} />;
  } else {
    return <Redirect href={"/profile/home"} />;
  }
}
