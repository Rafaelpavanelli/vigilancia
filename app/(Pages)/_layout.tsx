import { Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabBarPages() {
  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
        <Stack.Screen
          name="Register/Area/[area]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register/Visit/[home]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="streets/[residences]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="registerArea"
          options={{
            headerShown: false,
            presentation: 'transparentModal',
            
          }}
        />
      </Stack>
  );
}