import { View } from "react-native";
import ControlButton from "./ControlButton";

interface ControlButtonGroupProps {
  cancelTitle: string;
  confirmTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ControlButtonGroup = ({
  cancelTitle,
  confirmTitle,
  onCancel,
  onConfirm,
}: ControlButtonGroupProps) => {
  return (
    <View className="flex-row mt-6">
      <ControlButton
        title={cancelTitle}
        containerStyles="bg-background-100"
        onPress={onCancel}
      />
      <ControlButton
        title={confirmTitle}
        containerStyles="bg-accent-100"
        onPress={onConfirm}
      />
    </View>
  );
};

export default ControlButtonGroup;
