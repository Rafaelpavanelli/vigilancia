import {
  Icon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@gluestack-ui/themed'
import { Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { ALLOWED_STATUSES } from '@/utils/allowed-visitation-statuses'
import {
  Pressable,
  Text,
  View,
  FlatList,
  StyleSheet,
  Button,
} from 'react-native'
import { ALLOWED_STATUSES } from '@/utils/allowed-visitation-statuses'
import { SelectInput } from '@/components/SelectInput'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import * as yup from 'yup'
import { InputForm } from '@/components/InputForm'
import { useLocalSearchParams } from 'expo-router'
import { SelectInputContainerList } from '@/components/SelectInputTypeContainer'
import { Switch } from '@gluestack-ui/themed'

const schemaArea = yup.object({
  containers: yup
    .array()
    .of(
      yup.object({
        containerType: yup.string().required('Selecione um tipo de recipiente'),
        quantity: yup
          .number()
          .required('Precisa ter um valor')
          .min(1, 'Valor precisa ser maior que 0')
          .positive()
          .integer(),
        withWater: yup.boolean(),
        withLarve: yup.boolean(),
      })
    )
    .required(),
})

type ContainerFormData = {
  containerType: string
  quantity: number
  withWater: boolean
  withLarve: boolean
}

type FormData = {
  containers: ContainerFormData[]
}

export default function Visit() {
  const [visitStatus, setVisitStatus] = useState('fechado')
  const { home } = useLocalSearchParams()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schemaArea),
    defaultValues: {
      containers: [
        { containerType: '', quantity: 0, withWater: false, withLarve: false },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'containers',
  })

  function handleLogin(log: string) {
    setVisitStatus(String(log))
  }

  function saveVisit(data: FormData) {
    console.log(data)
  }

  return (
    <View style={styles.container}>
      <Text>Visita</Text>
      <SelectInput
        title="Trabalho"
        items={ALLOWED_STATUSES}
        onSelect={handleLogin}
      />
      {visitStatus === 'trabalhado' && (
        <View style={styles.formContainer}>
          <FlatList
            data={fields}
            renderItem={({ item, index }) => (
              <View key={item.id} style={styles.itemContainer}>
                <SelectInputContainerList
                  onSelect={(value) =>
                    setValue(`containers[${index}].containerType`, value)
                  }
                />
                <InputForm
                  title="Quantidade"
                  name={`containers[${index}].quantity`}
                  control={control}
                  keyboardType="numeric"
                  errorMessage={errors.containers?.[index]?.quantity?.message}
                />
                <Controller
                  name={`containers[${index}].withWater`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.switchContainer}>
                      <Text>Possui água?</Text>
                      <Switch value={value} onToggle={onChange} />
                    </View>
                  )}
                />
                <Controller
                  name={`containers[${index}].withLarve`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.switchContainer}>
                      <Text>Possui Larva?</Text>
                      <Switch value={value} onToggle={onChange} />
                    </View>
                  )}
                />
                {fields.length > 1 && (
                  <Button title="Remover" onPress={() => remove(index)} />
                )}
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
          <Button
            title="Adicionar item"
            onPress={() =>
              append({
                containerType: '',
                quantity: 0,
                withWater: false,
                withLarve: false,
              })
            }
          />
          <Pressable
            onPress={handleSubmit(saveVisit)}
            style={styles.saveButton}
          >
            <Text className="text-white text-xl">Salvar Visita</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  formContainer: {
    width: '100%',
    padding: 16,
  },
  itemContainer: {
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  saveButton: {
    marginTop: 16,
    backgroundColor: '#0dc9e2',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
})
