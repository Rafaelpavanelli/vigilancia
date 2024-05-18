import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabBarPages() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "green",tabBarInactiveTintColor: 'gray'}} >
      <Tabs.Screen
        name="index"
        options={{ title: "Áreas", headerShown: false,tabBarIcon:(color)=><Ionicons name="home-outline" size={24} color={color.color} />}}
      />
       <Tabs.Screen
        name="streets/[residences]"
        options={{headerShown: false,href: null,}}
      />
       <Tabs.Screen
        name="Register/Area/[area]"
        options={{headerShown: false,href: null}} 
      />
       <Tabs.Screen
        name="Register/Street/[street]"
        options={{headerShown: false,href: null}} 
      />
       <Tabs.Screen
        name="Register/Visit/[home]"
        options={{headerShown: false,href: null}} 
      />
    </Tabs>
  );
}
