import {
  Pressable,
  Text,
  View,
  FlatList,
  StyleSheet,
  Button,
} from 'react-native'
import { ALLOWED_STATUSES } from '@/utils/allowed-visitation-statuses'
import { CONTROL_MEASURE_TYPE } from '@/utils/control-measure-type'
import { SelectInput } from '@/components/SelectInput'
import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'
import * as yup from 'yup'
import { InputForm } from '@/components/InputForm'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { SelectInputContainerList } from '@/components/SelectInputTypeContainer'
import { makeCreateVisitationUseCase } from '@/modules/Visitation/factories/make-create-visitation-use-case'
import { makeGetVisitsByHouseIdUseCase } from '@/modules/Visitation/factories/make-get-visits-by-house-id-use-case'

const schemaArea = yup.object({
  containers: yup
    .array()
    .of(
      yup.object({
        type: yup.string().required('Selecione um tipo de recipiente'),
        quantity: yup
          .number()
          .required('Precisa ter um valor')
          .min(1, 'Valor precisa ser maior que 0')
          .positive()
          .integer(),
        withWater: yup.number(),
        withLarve: yup.number(),
        controlMeasure: yup
          .string()
          .required('Selecione uma medida de controle'),
      })
    )
    .required(),
})

type ContainerFormData = {
  type: string
  quantity: number
  withWater?: number
  withLarve?: number
  controlMeasure: string
}

type FormData = {
  containers: ContainerFormData[]
}

export default function Visit() {
  const navigate = useRouter()
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
      containers: [],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'containers',
  })
  async function fetchVisits() {
    try {
      const useCase = makeGetVisitsByHouseIdUseCase()

      const { visits } = await useCase.execute(home as string)

      console.log(
        visits.map((visit) => visit.containers.map((container) => container))
      )
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchVisits()
  }, [])

  function handleLogin(log: string) {
    setVisitStatus(String(log))
  }

  async function saveVisit(data: FormData) {
    try {
      const createVisitUseCase = makeCreateVisitationUseCase()
      const { visitation } = await createVisitUseCase.execute({
        houseId: home as string,
        status: visitStatus,
        visitControlMeasures: data.containers.map(
          (container) => container.controlMeasure
        ),
        containers: data.containers,
      })
      navigate.back()
    } catch (error) {
      console.log('Erro ao salvar visita ', error)
    }
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
                    setValue(`containers.${index}.type`, value)
                  }
                />
                <InputForm
                  title="Quantidade"
                  name={`containers[${index}].quantity`}
                  control={control}
                  keyboardType="numeric"
                  errorMessage={errors.containers?.[index]?.quantity?.message}
                />
                <InputForm
                  title="Com Água"
                  name={`containers[${index}].withWater`}
                  control={control}
                  keyboardType="numeric"
                  errorMessage={errors.containers?.[index]?.withWater?.message}
                />
                <InputForm
                  title="Com Larva"
                  name={`containers[${index}].withLarve`}
                  control={control}
                  keyboardType="numeric"
                  errorMessage={errors.containers?.[index]?.withLarve?.message}
                />
                <SelectInput
                  title="Medida de Controle"
                  items={CONTROL_MEASURE_TYPE}
                  onSelect={(value) =>
                    setValue(`containers.${index}.controlMeasure`, value)
                  }
                />
                <Text>{errors.root?.message}</Text>
                <Button title="Remover" onPress={() => remove(index)} />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
          <View style={styles.buttonsContainer}>
            <Button
              title="Adicionar item"
              onPress={() =>
                append({
                  type: '',
                  quantity: 0,
                  withWater: 0,
                  withLarve: 0,
                  controlMeasure: '',
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
    paddingTop: 80,
    position: 'relative',
  },
  formContainer: {
    width: '100%',
    padding: 16,
    paddingBottom: 90,
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
  buttonsContainer: {},
})
