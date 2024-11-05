import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="(signed-out)/home" options={{ title: "Perfil" }} />
      <Stack.Screen
        name="(signed-out)/disclaimer"
        options={{ title: "Signup" }}
      />
      <Stack.Screen
        name="(signed-out)/cellphone"
        options={{ title: "Telefone" }}
      />
      <Stack.Screen name="(signed-out)/email" options={{ title: "Email" }} />
      <Stack.Screen
        name="(signed-out)/service-category"
        options={{ title: "Categoria" }}
      />
      <Stack.Screen
        name="(signed-out)/service-subcategory"
        options={{ title: "Subcategoria" }}
      />
      <Stack.Screen
        name="(signed-out)/personal-data"
        options={{ title: "Dados Pessoais" }}
      />
      <Stack.Screen name="(signed-out)/signin" options={{ title: "Signin" }} />
      <Stack.Screen
        name="(signed-out)/account-verification"
        options={{ title: "Verificação de Conta" }}
      />

      <Stack.Screen name="(signed-in)/[userId]" options={{ title: "Perfil" }} />
    </Stack>
  );
}
