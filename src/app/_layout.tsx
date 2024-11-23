import { Slot } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import { useEffect } from "react";
import {
  setStatusBarStyle,
  setStatusBarBackgroundColor,
} from "expo-status-bar";

export default function Layout() {
  useEffect(() => {
    setStatusBarStyle("light");
    setStatusBarBackgroundColor("#1a7bc1", true);
  }, []);

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
