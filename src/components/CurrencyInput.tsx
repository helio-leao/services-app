import { StyleProp, TextInput, TextStyle } from "react-native";
import { useEffect, useState } from "react";

function maskCurrency(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{1})$/, "R$ 0,0$1");
  value = value.replace(/^(\d{2})$/, "R$ 0,$1");
  value = value.replace(/^(\d+)(\d{2})$/, "R$ $1,$2");
  return value;
}

type MaskedInputProps = {
  style?: StyleProp<TextStyle>;
  value?: number;
  onChangeText?: (text?: number) => void;
};

export default function MaskedInput({
  style,
  value,
  onChangeText,
}: MaskedInputProps) {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (value == undefined) {
      setDisplayValue("");
    } else {
      setDisplayValue(maskCurrency(value.toFixed(2)));
    }
  }, [value]);

  function handleSendNormalizedText(text: string) {
    if (text === "R$ 0,0") {
      // NOTE: when the user deletes the last number that's not part of the mask
      onChangeText?.(undefined);
    } else {
      // NOTE: removes the mask special characters and returns a NUMBER
      const maskedText = maskCurrency(text);
      const number = Number(
        maskedText.replace(",", ".").replace(/[^\d\.]/g, "")
      );
      onChangeText?.(number);
    }
  }

  return (
    <TextInput
      style={style}
      placeholder={"R$ 999,99"}
      keyboardType={"number-pad"}
      onChangeText={handleSendNormalizedText}
      value={displayValue}
    />
  );
}
