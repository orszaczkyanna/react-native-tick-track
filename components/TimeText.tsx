import { Text } from "react-native";
import { moderateScale } from "react-native-size-matters";

const TimeText = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      className="text-foreground-100 font-inconsolata text-center" // monospace
      style={{ fontSize: moderateScale(76) }}
    >
      {children}
    </Text>
  );
};

export default TimeText;
