import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { data } from "@/utils/FakeData";
import AntDesign from "@expo/vector-icons/AntDesign";

interface NumberData {
  id: number;
  numero: number;
}

interface StreetData {
  id: string;
  name: string;
  numbers: NumberData[];
}

interface AreaData {
  area: number;
  streets: StreetData[];
}

export default function Residences() {
  const { residences } = useLocalSearchParams();

  if (residences) {
    function getHouseNumbersByStreetId(streetId: string): number[] {
      for (const area of data) {
        for (const street of area.streets) {
          if (street.id === streetId) {
            return street.numbers.map((number) => number.numero);
          }
        }
      }
      return [];
    }
    const houseNumbers = getHouseNumbersByStreetId(String(residences));
    return (
      <View className="relative py-20 px-10 h-full pb-5 ">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap gap-4 w-full">
          {houseNumbers ? (
            houseNumbers.map((value, index) => (
              <View className="w-28 h-28 border-2 border-black rounded-md justify-center items-center" key={index}>
                <AntDesign name="home" size={34} color="black" />
                <Text className="text-xl" key={index}>
                  {value}
                </Text>
              </View>
            ))
          ) : (
            <Text>Nenhuma casa registrada</Text>
          )}
           </View>
        </ScrollView>
        <View className="absolute bottom-4 right-4 h-20 w-20 justify-center items-center rounded-full bg-green-300 z-10">
          <Pressable onPress={() => console.log(residences)}>
            <Text className="text-2xl text-white">+</Text>
          </Pressable>
        </View>
      </View>
    );
  } else {
    router.back();
  }
}
