import { colors } from "@/src/constants/colors";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router, Stack } from "expo-router";

// TODO: stack screenOptions is same in all stacks layout. centralize it
export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "",
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
      <Stack.Screen name="index" options={{ title: "Busca" }} />
      <Stack.Screen name="details" options={{ title: "Detalhes" }} />
    </Stack>
  );
}
