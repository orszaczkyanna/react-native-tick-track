import { useState, Dispatch, SetStateAction } from "react";
import { TextInput, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useTimerContext } from "@/context/TimerContext";
import { Colors } from "@/constants/Colors";
import TimeDisplay from "./TimeDisplay";
import ControlButton from "./ControlButton";

interface CustomInputProps {
  placeholder: string;
  setValue: Dispatch<SetStateAction<number>>;
}

const CustomInput = ({ placeholder, setValue }: CustomInputProps) => {
  const validateAndSetValue = (text: string) => {
    let numericValue = Number(text); // if text isn't valid, numericValue will be NaN
    if (numericValue > 99) numericValue = 99;
    // if (placeholder === "MM" || placeholder === "SS") {
    //   if (numericValue > 59) numericValue = 59;
    // }
    setValue(numericValue || 0);
  };

  return (
    <TextInput
      className="text-foreground-100 font-inconsolata text-center rounded-lg"
      style={{
        fontSize: moderateScale(76),
        width: moderateScale(88),
        height: moderateScale(76),
      }}
      placeholderTextColor={Colors.fadedForeground}
      placeholder={placeholder}
      keyboardType="numeric"
      maxLength={2} // Limits the input to 2 characters
      onChangeText={(text) => validateAndSetValue(text)} // setValue(Number(text) || 0)
    />
  );
};

const TimeInput = () => {
  const { setShowTimeInput, setInputTime } = useTimerContext();
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const cancel = () => {
    setShowTimeInput(false);
    // console.log("Cancel");
  };

  const setTime = () => {
    const newTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
    setInputTime(newTime);
    setShowTimeInput(false);
    // console.log(`Set time to ${newTime}`);
  };

  return (
    <>
      <View className="flex-row items-center justify-center">
        <CustomInput placeholder="HH" setValue={setHours} />
        <TimeDisplay>:</TimeDisplay>
        <CustomInput placeholder="MM" setValue={setMinutes} />
        <TimeDisplay>:</TimeDisplay>
        <CustomInput placeholder="SS" setValue={setSeconds} />
      </View>
      <View className="flex-row mt-6">
        <ControlButton
          title="Cancel"
          containerStyles="bg-background-100"
          onPress={cancel}
        />
        <ControlButton
          title="Set" // Set / Confirm / Apply
          containerStyles="bg-accent-100"
          onPress={setTime}
        />
      </View>
    </>
  );
};

export default TimeInput;
