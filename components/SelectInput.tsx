
import { Text, View} from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import { StyleSheet } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type InputSelectProps = {
    onSelect: (selected:string)=>void,
    items: any[],
    title: string
}
export  function SelectInput({onSelect,items,title}:InputSelectProps) {
  return (
   <View>
     <SelectDropdown 
     data={items}
     onSelect={(selected)=>onSelect(selected)}
     renderButton={(selectedItem) => {
      return (
        <View style={styles.dropdownButtonStyle}>
          <Text style={styles.dropdownButtonTxtStyle}>
            {(selectedItem && selectedItem) || 'Status da visita'}
          </Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        </View>
      );
    }}
    renderItem={(item, index, isSelected) => {
      return (
        <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
          <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}
  /> 
   </View>
  );
}
const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 200,
    height: 40,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#121214'
,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '300',
    color: '#151E26',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});