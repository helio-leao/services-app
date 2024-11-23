import {
  KeyboardTypeOptions,
  StyleProp,
  TextInput,
  TextStyle,
} from "react-native";
import { useEffect, useState } from "react";

function maskCurrency(value: string) {
  let maskedValue = value.replace(/\D/g, "");
  maskedValue = maskedValue.replace(/^[0]+/, "");
  maskedValue = maskedValue.replace(/^(\d{1})$/, "R$ 0,0$1");
  maskedValue = maskedValue.replace(/^(\d{2})$/, "R$ 0,$1");
  maskedValue = maskedValue.replace(/^(\d+)(\d{2})$/, "R$ $1,$2");
  return maskedValue;
}

type MaskedInputProps = {
  style?: StyleProp<TextStyle>;
  editable?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
};

export default function MaskedInput({
  style,
  editable,
  value,
  onChangeText,
}: MaskedInputProps) {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (value) {
      setDisplayValue(maskCurrency(value));
    } else {
      setDisplayValue("");
    }
  }, [value]);

  function handleChangeText(value: string) {
    const maskedCurrency = maskCurrency(value);
    onChangeText?.(maskedCurrency.replace(",", ".").replace(/[^\d\.]/g, ""));
  }

  return (
    <TextInput
      style={style}
      editable={editable}
      placeholder={"R$ 999,99"}
      keyboardType={"decimal-pad"}
      onChangeText={handleChangeText}
      value={displayValue}
    />
  );
}
