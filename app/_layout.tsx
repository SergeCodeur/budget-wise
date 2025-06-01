import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ErrorBoundary } from "./error-boundary";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <RootLayoutNav />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="expense/new" 
        options={{ 
          title: "Add Expense",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
          },
        }} 
      />
      <Stack.Screen 
        name="expense/[id]" 
        options={{ 
          title: "Expense Details",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
          },
        }} 
      />
      <Stack.Screen 
        name="categories" 
        options={{ 
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="categories/new" 
        options={{ 
          title: "Add Category",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
          },
        }} 
      />
      <Stack.Screen 
        name="categories/edit" 
        options={{ 
          title: "Edit Category",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
          },
        }} 
      />
    </Stack>
  );
}