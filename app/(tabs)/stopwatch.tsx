import { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import Container from "@/components/Container";
import TimeDisplay from "@/components/TimeDisplay";
import ControlButton from "@/components/ControlButton";

const Stopwatch = () => {
  const [isRunning, setRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0); // Date.now() - startTimeRef.current
  const startTimeRef = useRef<number>(0); // Date.now() - elapsedTime
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null); // setInterval(callback, milliseconds)

  // Start and stop the interval
  useEffect(() => {
    if (isRunning) {
      // Start the interval that updates the elapsed time every 100ms
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 100);
    }

    // Cleanup Function: clear the interval
    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  // Start the stopwatch
  const start = (): void => {
    setRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
    console.log("Start");
  };

  // Pause the stopwatch
  const pause = (): void => {
    setRunning(false);
    console.log("Pause");
  };

  // Toggle between start and pause
  const toggle = (): void => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  };

  // Reset the stopwatch: stop and set the elapsed time to 0
  const reset = (): void => {
    setElapsedTime(0);
    setRunning(false);
    console.log("Reset");
  };

  // Format elapsed milliseconds to a two-digit string
  const formatTime = (time: number): string => {
    return String(Math.floor(time)).padStart(2, "0");
  };

  // Display the elapsed time in hours, minutes, and seconds
  const displayTime = (): string => {
    let hours = formatTime(elapsedTime / (1000 * 60 * 60));
    let minutes = formatTime((elapsedTime / (1000 * 60)) % 60);
    let seconds = formatTime((elapsedTime / 1000) % 60);
    // let milliseconds = formatTime((elapsedTime % 1000) / 10);

    if (hours === "00") {
      return `${minutes}:${seconds}`;
    }

    return `${hours}:${minutes}:${seconds}`;
    // return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <Container>
      <TimeDisplay>{displayTime()}</TimeDisplay>
      <View className="flex-row mt-6">
        <ControlButton
          title="Reset"
          containerStyles="bg-background-100"
          onPress={() => reset()}
        />
        <ControlButton
          title={isRunning ? "Pause" : "Start"}
          containerStyles="bg-accent-100"
          onPress={() => toggle()}
        />
      </View>
    </Container>
  );
};

export default Stopwatch;
