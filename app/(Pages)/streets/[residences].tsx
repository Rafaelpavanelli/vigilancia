import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, ToastAndroid, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { makeGetHousesByStreetIdUseCase } from "@/modules/House/factories/make-get-houses-by-street-id-use-case";
import { House } from "@/typeorm/entities";

export default function Residences() {
  const [houseNumbers, setHouseNumbers] = useState<House[]>([]);
  const { residences } = useLocalSearchParams();
  const navigation = useRouter();

  async function GetHouses() {
    try {
      const getHousesByStreetIdUseCase = makeGetHousesByStreetIdUseCase();

      const { houses } = await getHousesByStreetIdUseCase.execute(
        residences as string
      );

      setHouseNumbers(houses);
    } catch (error) {
      console.error(error);
      ToastAndroid.show("Erro ao buscar casas", ToastAndroid.SHORT);
    }
  }

  useEffect(() => {
    GetHouses();
  }, [residences]);

  return (
    <View className="relative py-20 px-10 h-full pb-5 ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap gap-4 w-full">
          {houseNumbers ? (
            houseNumbers.map((house, index) => (
              <Pressable onPress={()=>{navigation.push(`/Register/Visit/${house.id}`)}} key={index}>
                <View
                  className="w-28 h-28 border-2 border-black rounded-md justify-center items-center"
                  key={index}
                >
                  <AntDesign name="home" size={34} color="black" />
                  <Text className="text-xl" key={index}>
                    {house.houseNumber}
                  </Text>
                </View>
              </Pressable>
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
