import { View } from "react-native";
import ControlButton from "./ControlButton";

interface ControlButtonGroupProps {
  isRunning: boolean;
  onReset: () => void;
  onStart: () => void;
  onPause: () => void;
}

const ControlButtonGroup = ({
  isRunning, // Indicates if the stopwatch/timer is currently running
  onReset,
  onStart,
  onPause,
}: ControlButtonGroupProps) => {
  // Toggle between start and pause
  const toggle = (): void => {
    isRunning ? onPause() : onStart();
  };

  return (
    <View className="flex-row mt-6">
      <ControlButton
        title="Reset"
        containerStyles="bg-background-100"
        onPress={onReset}
      />
      <ControlButton
        title={isRunning ? "Pause" : "Start"}
        containerStyles="bg-accent-100"
        onPress={toggle}
      />
    </View>
  );
};

export default ControlButtonGroup;
