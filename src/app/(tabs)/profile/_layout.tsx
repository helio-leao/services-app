import { colors } from "@/src/constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { router, Stack } from "expo-router";

// TODO: stack screenOptions is same in all stacks layout. centralize it
export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: ({ canGoBack }) =>
          canGoBack ? (
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
              style={{
                marginHorizontal: 10,
                padding: 4,
                borderRadius: 4,
                backgroundColor: colors.primary,
              }}
            >
              <AntDesign name="arrowleft" size={24} color={colors.background} />
            </TouchableOpacity>
          ) : null,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="home" options={{ title: "Perfil" }} />
      <Stack.Screen name="disclaimer" options={{ title: "" }} />
      <Stack.Screen name="cellphone" options={{ title: "" }} />
      <Stack.Screen name="email" options={{ title: "" }} />
      <Stack.Screen name="service-category" options={{ title: "" }} />
      <Stack.Screen name="service-subcategory" options={{ title: "" }} />
      <Stack.Screen name="personal-data" options={{ title: "" }} />
      <Stack.Screen name="signin" options={{ title: "" }} />
      <Stack.Screen name="account-verification" options={{ title: "" }} />
      <Stack.Screen name="one-time-password" options={{ title: "" }} />

      <Stack.Screen name="edit" options={{ title: "Perfil" }} />
    </Stack>
  );
}
