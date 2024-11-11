import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="home" options={{ title: "Perfil" }} />
      <Stack.Screen name="disclaimer" options={{ title: "Signup" }} />
      <Stack.Screen name="cellphone" options={{ title: "Telefone" }} />
      <Stack.Screen name="email" options={{ title: "Email" }} />
      <Stack.Screen name="service-category" options={{ title: "Categoria" }} />
      <Stack.Screen
        name="service-subcategory"
        options={{ title: "Subcategoria" }}
      />
      <Stack.Screen
        name="personal-data"
        options={{ title: "Dados Pessoais" }}
      />
      <Stack.Screen name="signin" options={{ title: "Signin" }} />
      <Stack.Screen
        name="account-verification"
        options={{ title: "Verificação de Conta" }}
      />
      <Stack.Screen name="one-time-password" options={{ title: "Signin" }} />

      <Stack.Screen name="edit/[userId]" options={{ title: "Perfil" }} />
    </Stack>
  );
}
