import React, { useState } from "react";
import { Pressable, ScrollView, Text, ToastAndroid, View } from "react-native";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { data } from "@/utils/FakeData";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GetHouseByStreetIdUseCase } from "@/modules/House/use-cases/get-houses-by-street-id-use-case";

interface NumberData {
  id: number;
  numero: number;
}

export default function Residences() {
  const [houseNumbers, setHouseNumbers] = useState([]);
  const { residences } = useLocalSearchParams();
  const navigation = useRouter();
  async function GetHouses() {
    try {
      const getHouseUseCase = null; // função
    } catch (error) {
      ToastAndroid.show("Erro ao buscar casas", ToastAndroid.SHORT);
    }
  }
  return (
    <View className="relative py-20 px-10 h-full pb-5 ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap gap-4 w-full">
          {houseNumbers ? (
            houseNumbers.map((value, index) => (
              <View
                className="w-28 h-28 border-2 border-black rounded-md justify-center items-center"
                key={index}
              >
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
        <Pressable
          onPress={() => navigation.push(`/Register/Street/${residences}`)}
        >
          <Text className="text-2xl text-white">+</Text>
        </Pressable>
      </View>
    </View>
  );
}
