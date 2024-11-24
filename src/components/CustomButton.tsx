import {
  TouchableOpacity,
  ActivityIndicator,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from "react-native";
import { colors } from "../constants/colors";

type CustomButtonProps = {
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  isLoading?: boolean;
  label?: string;
  disabled?: boolean;
};

export default function CustomButton({
  containerStyle,
  onPress,
  isLoading,
  label,
  disabled,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.background} />
      ) : (
        <Text style={styles.text}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    width: 300,
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  text: {
    color: colors.background,
  },
});
