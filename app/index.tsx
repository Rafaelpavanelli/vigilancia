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
import { Link, useRouter } from "expo-router";
import { data } from "@/utils/FakeData";
export default function RegisterNeighborhood() {
  const router = useRouter();
  return (
    <View className="flex-1 flex-col px-4 pt-10 gap-8 items-center relative">
      <Text className="text-2xl ">Áreas</Text>
      <FlatList
        className="w-full "
        data={data}
        
        ListEmptyComponent={() => <View className="justify-between items-center w-full h-96"><Text className="text-center text-3xl">Sem Áreas Cadastradas</Text><Link className="text-2xl p-4 border-2 border-gray-400 rounded-xl text-center" href={'(Pages)/registerArea'}>Cadastrar Área</Link></View>}
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
            <AccordionItem value={String(item.item.area)}>
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }) => {
                    return (
                      <View className="flex-row justify-between border-b-[1px] items-center px-2">
                        <AccordionTitleText className="text-2xl py-4">
                          Área {item.item.area}
                        </AccordionTitleText>
                        <View className="flex-row justify-center items-center">
                          <Link href={`Register/Area/${item.item.area}`}>
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
                    {street.name}
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
