import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Perfil" }} />
      <Stack.Screen name="signup/index" options={{ title: "Signup" }} />
      <Stack.Screen name="signup/phone/index" options={{ title: "Telefone" }} />
      <Stack.Screen name="signup/email/index" options={{ title: "Email" }} />
      <Stack.Screen
        name="signup/service-category/index"
        options={{ title: "Categoria" }}
      />
    </Stack>
  );
}
