import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Perfil" }} />
      <Stack.Screen name="signup/index" options={{ title: "Signup" }} />
      <Stack.Screen name="signup/phone/index" options={{ title: "Telefone" }} />
    </Stack>
  );
}
