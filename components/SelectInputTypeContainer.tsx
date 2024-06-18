import {  Pressable, ScrollView, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { ListContainer } from "@/utils/ListContainer";

type InputSelectProps = {
  onSelect: (selected: string) => void;
  
};

type TypeContainer = {
  id: number;
  container: string;
};

export function SelectInputContainerList({ onSelect }: InputSelectProps) {
  const [showDropdown, setShowDropDown] = useState(false);
  const [selected, setSelected] = useState("");

  function selectOptionList({ container, id }: TypeContainer) {
    setSelected(`${id}-${container}`);
    setShowDropDown(false);
    onSelect(String(id));
  }

  return (
    <View style={{ maxHeight: 80, position: "relative", width: 200 }}>
      <Pressable
        style={styles.pressable}
        onPress={() => setShowDropDown(!showDropdown)}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[
            styles.text,
            { borderWidth: showDropdown ? 2 : 0.5 },
          ]}
        >
          {selected ? selected : "Tipo de recipiente"}
        </Text>
      </Pressable>
      {showDropdown && (
        <ScrollView style={styles.dropdown}>
          {ListContainer.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.category}>{item.category}</Text>
              {item.container.map((type: TypeContainer) => (
                <Pressable onPress={() => selectOptionList(type)} key={type.id}>
                  <Text style={styles.containerText}>
                    {type.id}-{type.container}
                  </Text>
                </Pressable>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 8,
  },
  text: {
    overflow: 'hidden',
    paddingLeft: 10,
    padding: 4,
    borderRadius: 10,
  },
  dropdown: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'white',
    padding: 4,
    top: 40,
    maxHeight: 200,  // Adjust based on your needs
    width: '100%',
  },
  item: {
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    paddingVertical: 4,
  },
  category: {
    fontWeight: 'bold',
  },
  containerText: {
    marginLeft: 16,
  },
});
