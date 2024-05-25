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

export default function Visit() {
  return (
    <View>
      <Text>Visita</Text>
      <Select>
        <SelectTrigger>
          <SelectInput placeholder="Status da visita" />
          <SelectIcon>
            <Icon
              as={
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color="black"
                />
              }
            />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {ALLOWED_STATUSES.map((status, index) => (
              <SelectItem label={status} value={status} key={index} />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>
    </View>
  )
}
