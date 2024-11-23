import { Slot } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import { useEffect } from "react";
import {
  setStatusBarStyle,
  setStatusBarBackgroundColor,
} from "expo-status-bar";
import { colors } from "../constants/colors";

export default function Layout() {
  useEffect(() => {
    setStatusBarStyle("light");
    setStatusBarBackgroundColor(colors.primary, true);
  }, []);

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
