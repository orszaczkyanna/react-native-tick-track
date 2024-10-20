import { useState, useEffect, useRef } from "react";
import { useSoundContext } from "@/context/SoundContext";
import { useIsFocused } from "@react-navigation/native";
import { displayFormattedTime } from "@/utils/timeUtils";
import Container from "@/components/Container";
import TimeText from "@/components/TimeText";
import ControlButtonGroup from "@/components/ControlButtonGroup";
import MuteButton from "@/components/MuteButton";

const Stopwatch = () => {
  const { playSound, isMuted } = useSoundContext();
  const isFocused = useIsFocused();

  const [isRunning, setRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0); // now - start
  const startTimeRef = useRef<number>(0); // now - elapsed
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  // Update the elapsed time when the stopwatch is running
  useEffect(() => {
    if (isRunning) {
      const tick = () => {
        // Update the elapsed time
        setElapsedTime(Date.now() - startTimeRef.current);

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

  // Reset the stopwatch: stop and set the elapsed time to 0
  const reset = (): void => {
    setElapsedTime(0);
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
      <TimeText>{displayFormattedTime(elapsedTime)}</TimeText>
      <ControlButtonGroup
        cancelTitle="Reset"
        confirmTitle={isRunning ? "Pause" : "Start"}
        onCancel={reset}
        onConfirm={toggle}
      />
    </Container>
  );
};

export default Stopwatch;
