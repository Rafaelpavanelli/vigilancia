import { Pressable, Text, View } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { InputForm } from '@/components/InputForm'
import { useRouter } from 'expo-router'
import { makeCreateNeighborUseCase } from '@/modules/Neighbor/factories/make-create-neighbor-use-case'
type AreaType = {
  area: string
}
const schemaArea = yup.object({
  area: yup.string().required('Campo obrigatório'),
})
export default function RegisterArea() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaArea),
  })
  const router = useRouter()

  async function createNeighbor({ area }: AreaType) {
    const createNeighborUseCase = makeCreateNeighborUseCase()

    await createNeighborUseCase.execute({
      neighborNumber: Number(area),
    })

    router.back()
  }

  return (
    <View className=" w-screen h-full justify-center items-center bg-[#2727275e]">
      <View className=" absolute w-80 h-96  justify-between items-center border-2 p-4 rounded-lg bg-white z-10">
        <Text className="text-3xl ">Informe a área</Text>
        <InputForm
          control={control}
          name="area"
          title="Área"
          errorMessage={errors.area?.message}
          keyboardType="numeric"
        />
        <View className="flex-row gap-4">
          <Pressable
            onPress={() => router.back()}
            className="w-32 h-14 justify-center items-center  my-2 rounded-xl bg-red-200"
          >
            <Text>Cancelar</Text>
          </Pressable>
          <Pressable
            onPress={handleSubmit(createNeighbor)}
            className="w-32 h-14 justify-center items-center  my-2 rounded-xl bg-teal-500"
          >
            <Text className="text-white">Cadastrar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
