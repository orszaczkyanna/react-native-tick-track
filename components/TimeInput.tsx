import { useState, Dispatch, SetStateAction } from "react";
import { TextInput, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useTimerContext } from "@/context/TimerContext";
import { Colors } from "@/constants/Colors";
import TimeText from "./TimeText";
import ControlButtonGroup from "./ControlButtonGroup";

interface CustomInputProps {
  placeholder: string;
  setValue: Dispatch<SetStateAction<number>>;
}

const CustomInput = ({ placeholder, setValue }: CustomInputProps) => {
  const inputSize: number = moderateScale(76);

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
        fontSize: inputSize,
        width: inputSize,
        height: inputSize,
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
    console.log("Cancel Set Time");
  };

  const setTime = () => {
    const newTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
    if (newTime == 0) return;
    setInputTime(newTime);
    setShowTimeInput(false);
    console.log("Set Time");
  };

  return (
    <>
      <View className="flex-row items-center justify-center">
        <CustomInput placeholder="HH" setValue={setHours} />
        <TimeText>:</TimeText>
        <CustomInput placeholder="MM" setValue={setMinutes} />
        <TimeText>:</TimeText>
        <CustomInput placeholder="SS" setValue={setSeconds} />
      </View>
      <ControlButtonGroup
        cancelTitle="Cancel"
        confirmTitle="Set" // Set / Confirm / Apply
        onCancel={cancel}
        onConfirm={setTime}
      />
    </>
  );
};

export default TimeInput;
