import {
  KeyboardTypeOptions,
  StyleProp,
  TextInput,
  TextStyle,
} from "react-native";
import { useEffect, useState } from "react";

function maskPhone(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/g, "$1-$2");
  return value;
}

function maskCep(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{5})(\d)/g, "$1-$2");
  return value;
}

function maskCurrency(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/^[0]+/, "");
  value = value.replace(/^(\d{1})$/, "R$ 0,0$1");
  value = value.replace(/^(\d{2})$/, "R$ 0,$1");
  value = value.replace(/^(\d+)(\d{2})$/, "R$ $1,$2");
  return value;
}

type InputConfig = {
  placeholder: string;
  maxLength?: number;
  keyboardType: KeyboardTypeOptions;
  mask: (value: string) => string;
};

const TYPES: Record<string, InputConfig> = {
  phone: {
    placeholder: "(99) 99999-9999",
    maxLength: 15,
    keyboardType: "phone-pad",
    mask: maskPhone,
  },
  cep: {
    placeholder: "99999-999",
    maxLength: 9,
    keyboardType: "number-pad",
    mask: maskCep,
  },
  currency: {
    placeholder: "R$ 999,99",
    keyboardType: "number-pad",
    mask: maskCurrency,
  },
};

type MaskedInputProps = {
  style?: StyleProp<TextStyle>;
  editable?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  type: "phone" | "cep" | "currency";
};

export default function MaskedInput({
  style,
  editable,
  value,
  onChangeText,
  type,
}: MaskedInputProps) {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (value) {
      setDisplayValue(TYPES[type].mask(value));
    } else {
      setDisplayValue("");
    }
  }, [value]);

  function handleSendNormalizedText(text: string) {
    const maskedText = TYPES[type].mask(text);

    if (type === "currency") {
      onChangeText?.(maskedText.replace(",", ".").replace(/[^\d\.]/g, ""));
    } else {
      onChangeText?.(maskedText.replace(/\D/g, ""));
    }
  }

  return (
    <TextInput
      style={style}
      editable={editable}
      placeholder={TYPES[type].placeholder}
      maxLength={TYPES[type].maxLength}
      keyboardType={TYPES[type].keyboardType}
      onChangeText={handleSendNormalizedText}
      value={displayValue}
    />
  );
}
