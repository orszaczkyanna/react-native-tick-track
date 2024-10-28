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
  maxValue: number;
}

const CustomInput = ({ placeholder, setValue, maxValue }: CustomInputProps) => {
  const inputSize: number = moderateScale(76);
  const [inputText, setInputText] = useState<string>("");

  const validateAndSetValue = (text: string) => {
    let numericValue = Number(text); // if text isn't valid, numericValue will be NaN

    if (isNaN(numericValue) || numericValue < 0) return; // If the value is invalid, return
    if (numericValue > maxValue) numericValue = maxValue; // If the value exceeds the maximum permitted, set maxValue

    setValue(numericValue || 0);
    setInputText(numericValue.toString());
  };

  return (
    <TextInput
      className="text-foreground-100 font-inconsolata text-center rounded-lg"
      style={{
        fontSize: inputSize,
        width: inputSize,
        height: inputSize,
      }}
      selectionColor={Colors.fadedForeground}
      cursorColor={Colors.primaryForeground}
      placeholderTextColor={Colors.fadedForeground}
      placeholder={placeholder}
      keyboardType="numeric"
      maxLength={2} // Limits the input to 2 characters
      onChangeText={(text) => validateAndSetValue(text)} // setValue(Number(text) || 0)
      value={inputText}
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
        <CustomInput placeholder="HH" setValue={setHours} maxValue={99} />
        <TimeText>:</TimeText>
        <CustomInput placeholder="MM" setValue={setMinutes} maxValue={59} />
        <TimeText>:</TimeText>
        <CustomInput placeholder="SS" setValue={setSeconds} maxValue={59} />
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
