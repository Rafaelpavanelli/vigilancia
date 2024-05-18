import "reflect-metadata";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { useFonts } from "expo-font";
import { Stack, Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";
import "react-native-reanimated";
import "@/styles/global.css";
import { initializeOrm } from "@/utils/initialize-orm";
import Ionicons from "@expo/vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import { View } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      initializeOrm();
    }
  }, [loaded]);

  if (!loaded) {
    SplashScreen.hideAsync();
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "121214",
        }}
      >
        <LottieView
          autoPlay
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#e4e4e4",
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("@/assets/animations/Animation - 1716073779149.json")}
        />
      </View>
    );
  }

  return <RootLayoutNav />;
}
function RootLayoutNav() {
  return (
    <GluestackUIProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Áreas",
            headerShown: false,
            tabBarIcon: (color) => (
              <Ionicons name="home-outline" size={24} color={color.color} />
            ),
          }}
        />

        <Tabs.Screen
          name="(Pages)"
          options={{ headerShown: false, href: null }}
        />
      </Tabs>
    </GluestackUIProvider>
  );
}
