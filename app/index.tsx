import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from "@gluestack-ui/themed";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
  
  import {
  FlatList,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Neighbor } from "@/modules/Neighbor/typeorm/entities/neighbor";
import { makeGetNeighborsUseCase } from "@/modules/Neighbor/factories/make-create-get-neighbor-use-case";
  export default function RegisterNeighborhood() {
   
    const [neighbors, setNeighbors] = useState<Neighbor[] | null>(null)

    async function fetchNeighbors() {
      const getNeighborsUseCase = makeGetNeighborsUseCase()

      try {
        const { neighbors } = await getNeighborsUseCase.execute()

        setNeighbors(neighbors)
      } catch (e) {
        console.log(e)
      }
    }

    useEffect(() => {
      fetchNeighbors()
    }, [])

    return (
      <View className="flex-1 flex-col px-4 pt-10 gap-8 items-center">
        <Text className="text-2xl ">Áreas</Text>
        <FlatList
          className="w-full "
          data={neighbors}
          renderItem={(item) => (
            <Accordion
              m="$5"
              width="100%"
              size="lg"
              variant="filled"
              type="single"
              isCollapsible={true}
              isDisabled={false}
            >
              <AccordionItem value={String(item.item.neighborNumber)}>
                <AccordionHeader>
                  <AccordionTrigger>
                    {({ isExpanded }) => {
                      return (
                        <View className="flex-row justify-between border-b-[1px] items-center px-2">
                          <AccordionTitleText className="text-2xl py-4">
                            Área {item.item.neighborNumber}
                          </AccordionTitleText>
                          <View className="flex-row justify-center items-center">
                        <Link href={`Register/Area/${item.item.neighborNumber}`}>Cadastrar</Link>
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
      </View>
    );
  }
  