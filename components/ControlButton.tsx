import { Text, Pressable } from "react-native";
import { moderateScale } from "react-native-size-matters";

interface ControlButtonProps {
  title: string;
  containerStyles?: string; // optional
  textStyles?: string; // optional
  onPress: () => void;
}

const ControlButton = ({
  title,
  containerStyles = "", // default value ""
  textStyles = "", // default value ""
  onPress,
}: ControlButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      className={`${containerStyles} h-[10vh] min-w-[36vw] mx-2 justify-center items-center rounded-full active:opacity-70`}
      //   style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
    >
      <Text
        className={`${textStyles} text-foreground font-monmedium`}
        style={{ fontSize: moderateScale(20) }}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default ControlButton;
