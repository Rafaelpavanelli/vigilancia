import { Controller, UseFormProps } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'

type Props = {
  name: string
  control: any
  errorMessage?: string
  title: string
  isLabel?: boolean
  keyboardType?: 'numeric' | 'default'
}

export function InputForm({
  control,
  errorMessage = '',
  name,
  title,
  isLabel,
  keyboardType = 'default',
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <View className="">
          {isLabel && (
            <Text
              style={{
                textAlign: 'left',
                paddingHorizontal: 4,
                paddingVertical: 4,
                color: '#121215',
              }}
            >
              {title}
            </Text>
          )}
          <TextInput
            style={{
              borderWidth: 1,
              padding: 4,
              width: 'auto',
              borderRadius: 4,
              borderColor: errorMessage ? 'red' : 'black',
              minWidth: 200,
            }}
            onChangeText={onChange}
            placeholder={title}
            keyboardType={keyboardType}
          />
          <Text style={{ color: 'red' }}>{errorMessage}</Text>
        </View>
      )}
    />
  )
}
