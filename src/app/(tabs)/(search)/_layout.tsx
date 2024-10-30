import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="search" options={{ title: "Busca" }} />
      <Stack.Screen name="service-details" options={{ title: "Detalhes" }} />
    </Stack>
  );
}
