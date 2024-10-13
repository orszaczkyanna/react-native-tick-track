import { useState, useEffect, useRef } from "react";
import { displayFormattedTime } from "@/utils/timeUtils";
import Container from "@/components/Container";
import TimeDisplay from "@/components/TimeDisplay";
import ControlButtonGroup from "@/components/ControlButtonGroup";

import { useSoundContext } from "@/context/SoundContext";
import { useIsFocused } from "@react-navigation/native";
import MuteButton from "@/components/MuteButton";

const Stopwatch = () => {
  const [isRunning, setRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0); // Date.now() - startTimeRef.current
  const startTimeRef = useRef<number>(0); // Date.now() - elapsedTime
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // setInterval(callback, milliseconds)

  const { playSound, isMuted } = useSoundContext();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isRunning) {
      // Recursive Function: a function that calls itself
      const tick = () => {
        // Update elapsed time
        setElapsedTime(Date.now() - startTimeRef.current);

        // Play the ticking sound if it's not muted
        if (!isMuted && isFocused) {
          playSound();
        }

        // Re-schedule the timeout for the next tick
        timeoutIdRef.current = setTimeout(tick, 1000);
      };

      tick();
    }

    // Cleanup Function: clear the timeout
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

  return (
    <Container>
      <MuteButton />
      <TimeDisplay>{displayFormattedTime(elapsedTime)}</TimeDisplay>
      <ControlButtonGroup
        isRunning={isRunning}
        onStart={start}
        onPause={pause}
        onReset={reset}
      />
    </Container>
  );
};

export default Stopwatch;
