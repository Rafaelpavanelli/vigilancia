import React from "react";
import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { data } from "@/utils/FakeData";

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
            return street.numbers.map(number => number.numero);
          }
        }
      }
      return [];
    }
    const houseNumbers = getHouseNumbersByStreetId(String(residences));
    console.log(houseNumbers);
    return(
        <View>
            {houseNumbers? houseNumbers.map((value,index)=> <Text key={index}>{value}</Text>): <Text>Nenhuma casa registrada</Text>}
        </View>
    )
  } else {
    router.back(); // ou alguma outra representação adequada para o caso de `residences` ser undefined
  }
}
