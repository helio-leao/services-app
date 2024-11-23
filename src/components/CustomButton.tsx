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
};

export default function CustomButton({
  containerStyle,
  onPress,
  isLoading,
  label,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, containerStyle]}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.buttonText}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    width: 300,
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  buttonText: {
    color: "#fff",
  },
});
