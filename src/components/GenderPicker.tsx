import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors } from "../constants/colors";

export const GENDER_OPTIONS = [
  {
    label: "Masculino",
    value: "Masculino",
  },
  {
    label: "Feminino",
    value: "Feminino",
  },
  {
    label: "Outros",
    value: "Outros",
  },
];

type GenderPickerProps = {
  gender: string;
  onValueChange: (itemValue: string, itemIndex: number) => void;
};

export default function GenderPicker({
  gender,
  onValueChange,
}: GenderPickerProps) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: colors.background,
      }}
    >
      <Picker selectedValue={gender} onValueChange={onValueChange}>
        {GENDER_OPTIONS.map((genderOption) => (
          <Picker.Item
            key={genderOption.label}
            label={genderOption.label}
            value={genderOption.value}
          />
        ))}
      </Picker>
    </View>
  );
}
