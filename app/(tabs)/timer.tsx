import { useState, useEffect, useRef } from "react";
import { Pressable } from "react-native";
import { useTimerContext } from "@/context/TimerContext";
import { useSoundContext } from "@/context/SoundContext";
import { useIsFocused } from "@react-navigation/native";
import { displayFormattedTime } from "@/utils/timeUtils";
import Container from "@/components/Container";
import TimeText from "@/components/TimeText";
import TimeInput from "@/components/TimeInput";
import ControlButtonGroup from "@/components/ControlButtonGroup";
import MuteButton from "@/components/MuteButton";

const Timer = () => {
  const { showTimeInput, setShowTimeInput, inputTime } = useTimerContext();
  const { playSound, isMuted } = useSoundContext();
  const isFocused = useIsFocused();

  const [isRunning, setRunning] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(inputTime); // finish - now
  const finishTimeRef = useRef<number>(0); // now + remaining
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  // Set the remaining time when the input time changes
  useEffect(() => {
    setRemainingTime(inputTime);
  }, [inputTime]);

  // Update the remaining time when the timer is running
  useEffect(() => {
    if (isRunning) {
      const tick = () => {
        // Stop the timer when it reaches the finish time
        if (finishTimeRef.current <= Date.now()) {
          setRunning(false);
          return;
        }

        // Update the remaining time
        setRemainingTime(finishTimeRef.current - Date.now());

        // Play the ticking sound if applicable
        if (!isMuted && isFocused) {
          playSound();
        }

        // Schedule the next tick based on the remaining time until the next whole second
        timeoutIdRef.current = setTimeout(tick, 1000 - (Date.now() % 1000));
      };

      // Call the tick() function
      // Schedule the initial tick to align with the next whole second
      timeoutIdRef.current = setTimeout(tick, 1000 - (Date.now() % 1000));
    }

    // Cleanup function to clear the timeout
    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, [isRunning, isMuted, isFocused]);

  // Show the time input fields
  const handleTimeDisplayPress = () => {
    setShowTimeInput(true);
    if (isRunning) setRunning(false);
  };

  // Start the timer
  const start = (): void => {
    setRunning(true);
    finishTimeRef.current = Date.now() + remainingTime;
    console.log("Start");
  };

  // Pause the timer
  const pause = (): void => {
    setRunning(false);
    console.log("Pause");
  };

  // Reset the timer: stop and set the remaining time to the original input value
  const reset = (): void => {
    setRemainingTime(inputTime);
    setRunning(false);
    console.log("Reset");
  };

  // Toggle between start and pause
  const toggle = (): void => {
    isRunning ? pause() : start();
  };

  return (
    <Container>
      <MuteButton />
      {showTimeInput ? (
        <TimeInput />
      ) : (
        <>
          <Pressable onPress={handleTimeDisplayPress}>
            <TimeText>{displayFormattedTime(remainingTime)}</TimeText>
          </Pressable>
          <ControlButtonGroup
            cancelTitle="Reset"
            confirmTitle={isRunning ? "Pause" : "Start"}
            onCancel={reset}
            onConfirm={toggle}
          />
        </>
      )}
    </Container>
  );
};

export default Timer;
