import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}>
      <Tabs.Screen
        name="search"
        options={{
          title: "Busca",
          tabBarIcon: ({ color, focused, size }) => (
            <Feather name="search" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
