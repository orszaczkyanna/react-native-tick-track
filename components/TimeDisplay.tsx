import { ReactNode } from "react";
import { Text } from "react-native";
import { moderateScale } from "react-native-size-matters";

const TimeDisplay = ({ children }: { children: ReactNode }) => {
  return (
    // <Text className="text-foreground text-[10svh] font-monregular">
    <Text
      className="text-foreground font-monregular text-center"
      style={{ fontSize: moderateScale(64) }}
    >
      {children}
    </Text>
  );
};

export default TimeDisplay;
