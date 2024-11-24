import { Feather } from "@expo/vector-icons";
import { TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../constants/colors";

type SearchBarProps = {
  onChangeText?: (text: string) => void;
  value?: string;
  disabled?: boolean;
  onSubmit?: () => void;
};

export default function SearchBar({
  onChangeText,
  value,
  disabled,
  onSubmit,
}: SearchBarProps) {
  return (
    <View>
      <TextInput
        style={styles.searchBar}
        placeholder="Encontre seu serviço..."
        onChangeText={onChangeText}
        value={value}
        onEndEditing={onSubmit}
        editable={!disabled}
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={onSubmit}
        disabled={disabled}
      >
        <Feather name="search" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 50,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: colors.background,
  },
  searchButton: {
    position: "absolute",
    right: 25,
    top: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
