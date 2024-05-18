import { useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { InputForm } from "@/components/InputForm";
type NumberType = {
  number: string;
};
const schemaArea = yup.object({
  number: yup.string().required("Campo obrigatório"),
});

export default function RegisterHome() {
  const { street } = useLocalSearchParams();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaArea),
  });

  return (
    <View className="flex-1 justify-center  px-20">
      <Text className="text-3xl text-center">Numero</Text>
      <InputForm
        control={control}
        errorMessage={errors.number?.message}
        isLabel
        title="Numero da casa"
        name="number"
      />
      <View className="gap-4">
        <Pressable
          onPress={() => {}}
          className="px-4  py-2 h-12 justify-center items-center bg-teal-500 rounded-md "
        >
          <Text className="text-white">Finalizar</Text>
        </Pressable>
        <Pressable
          onPress={() => {}}
          className="px-4  py-2 h-12 justify-center items-center bg-teal-700 rounded-md "
        >
          <Text className="text-white">Adicionar mais casas</Text>
        </Pressable>
      </View>
    </View>
  );
}
