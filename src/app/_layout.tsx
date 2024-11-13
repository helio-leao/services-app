import { Slot } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <Slot />
    </AuthProvider>
  );
}
