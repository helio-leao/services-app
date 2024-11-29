import { colors } from "@/src/constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Redirect, router, Stack } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";

// TODO: stack screenOptions is same in all stacks layout. centralize it
export default function Layout() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href={"/profile/(auth)"} />;
  }

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
      <Stack.Screen name="index" options={{ title: "Perfil" }} />

      <Stack.Screen name="signup/index" options={{ title: "" }} />
      <Stack.Screen name="signup/cellphone" options={{ title: "" }} />
      <Stack.Screen name="signup/email" options={{ title: "" }} />
      <Stack.Screen name="signup/service-category" options={{ title: "" }} />
      <Stack.Screen name="signup/service-subcategory" options={{ title: "" }} />
      <Stack.Screen name="signup/personal-data" options={{ title: "" }} />
      <Stack.Screen
        name="signup/account-verification"
        options={{ title: "" }}
      />

      <Stack.Screen name="signin/index" options={{ title: "" }} />
      <Stack.Screen name="signin/one-time-password" options={{ title: "" }} />
    </Stack>
  );
}
