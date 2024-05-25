import { Button, Pressable, Text, TextInput, View } from 'react-native'
import { Link, router, useLocalSearchParams } from 'expo-router'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { InputForm } from '@/components/InputForm'
import { makeCreateStreetUseCase } from '@/modules/Street/factories/make-create-street-use-case'

type StreetType = {
  streetName: string
}
const schemaArea = yup.object({
  streetName: yup.string().required('Campo obrigatório'),
})
export default function RegisterStreet() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaArea),
  })
  const { area, neighborId } = useLocalSearchParams()

  async function handleStreet({ streetName }: StreetType) {
    const createStreetUseCase = makeCreateStreetUseCase()

    const { street } = await createStreetUseCase.execute({
      name: streetName,
      neighborId: neighborId as string,
    })

    router.navigate(`Register/Street/${street.id}`)
  }

  return (
    <View className="h-screen w-screen justify-center px-20">
      <Text className="text-2xl">Área {area}</Text>
      <InputForm
        control={control}
        errorMessage={errors.streetName?.message}
        isLabel
        title="Rua"
        name="streetName"
      />
      <View className="flex-row gap-4 justify-between mt-10">
        <Link asChild href={'/'}>
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
  )
}
