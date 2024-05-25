import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { Pressable, Text, ToastAndroid, View } from 'react-native'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { InputForm } from '@/components/InputForm'
import { makeCreateHouseUseCase } from '@/modules/House/factories/make-create-house-use-case'
import { useState } from 'react'
type NumberType = {
  number: string
}
const schemaArea = yup.object({
  number: yup.string().required('Campo obrigatório'),
})

export default function RegisterHome() {
  const [loading, setLoading] = useState(false)
  const navigation = useRouter()
  const { street } = useLocalSearchParams()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaArea),
  })
  async function CreateHouseAndEnd({ number }: NumberType) {
    try {
      const createHouseUseCase = makeCreateHouseUseCase()
      await createHouseUseCase.execute({
        houseNumber: Number(number),
        streetId: String(street),
        addressComplement: '',
      })
      navigation.push({
        pathname: '/streets/[id]',
        params: { id: street },
      })
    } catch (error) {
      ToastAndroid.show(`erro ${error}`, ToastAndroid.SHORT)
    }
  }
  async function CreateHouseAndRestart({ number }: NumberType) {
    try {
      const createHouseUseCase = makeCreateHouseUseCase()
      await createHouseUseCase.execute({
        houseNumber: Number(number),
        streetId: String(street),
        addressComplement: '',
      })
      navigation.push(`/Register/Street/${street}`)
    } catch (error) {
      ToastAndroid.show(`erro ${error}`, ToastAndroid.SHORT)
    }
  }

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
          onPress={handleSubmit(CreateHouseAndEnd)}
          className="px-4  py-2 h-12 justify-center items-center bg-teal-500 rounded-md "
        >
          <Text className="text-white">Finalizar</Text>
        </Pressable>
        <Pressable
          onPress={handleSubmit(CreateHouseAndRestart)}
          className="px-4  py-2 h-12 justify-center items-center bg-teal-700 rounded-md "
        >
          <Text className="text-white">Adicionar mais casas</Text>
        </Pressable>
      </View>
    </View>
  )
}
