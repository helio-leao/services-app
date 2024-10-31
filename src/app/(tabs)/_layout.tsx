import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        unmountOnBlur: true,
      }}
    >
      <Tabs.Screen
        name="(search)"
        options={{
          title: "Busca",
          tabBarIcon: ({ color, focused, size }) => (
            <Feather name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused, size }) => (
            <AntDesign name="profile" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
