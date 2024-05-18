import { Button, Pressable, Text, TextInput, View } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { InputForm } from "@/components/InputForm";

type StreetType = {
  street: string;
};
const schemaArea = yup.object({
  street: yup.string().required("Campo obrigatório"),
});
export default function RegisterStreet() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaArea),
  });
  const { area } = useLocalSearchParams();
  function handleStreet({ street }: StreetType) {
    router.navigate(`Register/Street/${street}`);
  }

  return (
    <View className="h-screen w-screen justify-center px-20">
      <Text className="text-2xl">Área {area}</Text>
      <InputForm
        control={control}
        errorMessage={errors.street?.message}
        isLabel
        title="Rua"
        name="street"
      />
      <View className="flex-row gap-4 justify-between mt-10">
        <Link asChild href={"/"}>
          <Pressable className="px-4 py-2 h-12 justify-center items-center bg-red-500 rounded-md ">
            <Text className="text-white w-full">Cancelar</Text>
          </Pressable>
        </Link>

        <Pressable
          onPress={handleSubmit(handleStreet)}
          className="px-4  py-2 h-12 justify-center items-center bg-teal-500 rounded-md "
        >
          <Text className="text-white">Próximo</Text>
        </Pressable>
      </View>
    </View>
  );
}
