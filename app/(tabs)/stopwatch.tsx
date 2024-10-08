import { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import Container from "@/components/Container";
import TimeDisplay from "@/components/TimeDisplay";
import ControlButton from "@/components/ControlButton";
import { Audio } from "expo-av";

const Stopwatch = () => {
  const [isRunning, setRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0); // Date.now() - startTimeRef.current
  const startTimeRef = useRef<number>(0); // Date.now() - elapsedTime
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // setInterval(callback, milliseconds)

  useEffect(() => {
    if (isRunning) {
      // Recursive Function: a function that calls itself
      const tick = () => {
        // Update elapsed time
        setElapsedTime(Date.now() - startTimeRef.current);

        // Play ticking sound
        playSound();

        // Re-schedule the timeout for the next tick
        timeoutIdRef.current = setTimeout(tick, 1000);
      };

      tick();
    }

    // Cleanup Function: clear the timeout
    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
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

  //  ---- Audio from expo-av ----
  const [soundAudio, setSoundAudio] = useState<Audio.Sound>();

  const initializeSound = async (): Promise<Audio.Sound> => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/audio/tick.wav")
    );
    setSoundAudio(sound);
    return sound;
  };

  const playSound = async (): Promise<void> => {
    try {
      // If there is soundAudio then use it, otherwise initialize the sound
      // let sound = soundAudio ? soundAudio : await initializeSound();
      let sound = soundAudio || (await initializeSound());
      const status = await sound.getStatusAsync();

      if (status.isLoaded) {
        await sound.setPositionAsync(0); // Ensure playback starts from the beginning
        await sound.playAsync();
      } else {
        sound = await initializeSound();
        await sound.setPositionAsync(0);
        await sound.playAsync();
      }
    } catch (error) {
      console.error("Error while trying to play sound\n", error);
    }
  };

  useEffect(() => {
    // Cleanup Function
    return () => {
      soundAudio?.unloadAsync();
    };
  }, [soundAudio]);

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
