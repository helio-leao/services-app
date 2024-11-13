import { Slot } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import { setStatusBarStyle } from "expo-status-bar";
import { useEffect } from "react";

export default function Layout() {
  useEffect(() => {
    setStatusBarStyle("dark");
  }, []);

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
