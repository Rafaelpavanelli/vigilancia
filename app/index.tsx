import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from "@gluestack-ui/themed";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


import { FlatList, Text, View,  Pressable } from "react-native";

import { FlatList, Text, View, Button, Pressable } from "react-native";
import { Link, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Neighbor } from "@/modules/Neighbor/typeorm/entities/neighbor";
import { makeGetNeighborsUseCase } from "@/modules/Neighbor/factories/make-create-get-neighbor-use-case";
import { AppDataSource } from "@/ormconfig";

export default function RegisterNeighborhood() {
  const [neighbors, setNeighbors] = useState<Neighbor[] | null>(null)

  const router = useRouter();

  const fetchNeighbors = useCallback(async () => {
    if (!AppDataSource.isInitialized) {
      try {
        await AppDataSource.initialize();
      } catch (initializationError) {
        console.error('Erro ao inicializar dataSource', initializationError);
        return;
      }
    }

    const getNeighborsUseCase = makeGetNeighborsUseCase();

    try {
      const { neighbors } = await getNeighborsUseCase.execute();
      setNeighbors(neighbors);
    } catch (e) {
      console.error('Erro ao buscar os bairros', e);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchNeighbors();
    }, [fetchNeighbors])
  );

  return (
    <View className="flex-1 flex-col px-4 pt-10 gap-8 items-center relative">
      <Text className="text-2xl ">Áreas</Text>
      <FlatList
        className="w-full "
        data={neighbors}
        ListEmptyComponent={() => <Link href={""}></Link>}
        renderItem={(item) => (
          <Accordion
          //@ts-ignore
            m="$5"
            width="100%"
            size="lg"
            variant="filled"
            type="single"
            isCollapsible={true}
            isDisabled={false}
          >
            <AccordionItem value={String(item.item.id)}>
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }) => {
                    return (
                      <View className="flex-row justify-between border-b-[1px] items-center px-2">
                        <AccordionTitleText className="text-2xl py-4">
                          Área {item.item.neighborNumber}
                        </AccordionTitleText>
                        <View className="flex-row justify-center items-center">
                          <Link href={{
                            pathname: 'Register/Area/[area]',
                            params: {area: item.item.neighborNumber, neighborId: item.item.id}
                          }}>
                            Cadastrar
                          </Link>
                          {isExpanded ? (
                            <MaterialIcons
                              name="keyboard-arrow-up"
                              size={24}
                              color="black"
                            />
                          ) : (
                            <MaterialIcons
                              name="keyboard-arrow-down"
                              size={24}
                              color="black"
                            />
                          )}
                        </View>
                      </View>
                    );
                  }}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent className="mx-2">
                {item.item.streets.map((street, index) => (
                  <Link
                    href={`streets/${street.id}`}
                    className="mt-4  border-b-[1px] border-gray-700 py-2 text-gray-600"
                    key={index}
                  >
                    {street.streetName}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      />
      <Pressable
        onPress={() => router.push("(Pages)/registerArea")}
        style={{
          width: 60,
          backgroundColor: "#00fdf1",
          height: 60,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          position: 'absolute',
          bottom: 12,
          right: 12
        }}
      >
        <Text className="text-2xl">+</Text>
      </Pressable>
    </View>
  );
}
