import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Busca" }} />
      <Stack.Screen
        name="professional-details/index"
        options={{ title: "Detalhes" }}
      />
    </Stack>
  );
}
