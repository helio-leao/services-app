import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="signup/index" options={{ title: "Perfil" }} />
      <Stack.Screen name="signup/disclaimer" options={{ title: "Signup" }} />
      <Stack.Screen name="signup/celphone" options={{ title: "Telefone" }} />
      <Stack.Screen name="signup/email" options={{ title: "Email" }} />
      <Stack.Screen
        name="signup/service-category"
        options={{ title: "Categoria" }}
      />
      <Stack.Screen
        name="signup/service-subcategory"
        options={{ title: "Subcategoria" }}
      />
      <Stack.Screen
        name="signup/personal-data"
        options={{ title: "Dados Pessoais" }}
      />
      <Stack.Screen name="signin/edit-user" options={{ title: "Perfil" }} />
    </Stack>
  );
}
