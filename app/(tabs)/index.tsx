import { useState, useEffect, useRef } from "react";
import { useSoundContext } from "@/context/SoundContext";
import { useIsFocused } from "@react-navigation/native";
import Container from "@/components/Container";
import TimeText from "@/components/TimeText";
import MuteButton from "@/components/MuteButton";

const Clock = () => {
  const { playSound, isMuted } = useSoundContext();
  const isFocused = useIsFocused();

  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // Initialize with null to prevent errors during cleanup checks

  // Update the currentTime state
  useEffect(() => {
    const tick = () => {
      setCurrentTime(Date.now());

      if (!isMuted && isFocused) {
        playSound();
      }

      timeoutIdRef.current = setTimeout(tick, 1000 - (Date.now() % 1000));
    };

    timeoutIdRef.current = setTimeout(tick, 1000 - (Date.now() % 1000));

    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, [isMuted, isFocused]);

  // Format time to a two-digit string
  const formatTime = (time: number): string => {
    return String(time).padStart(2, "0");
  };

  // Display the current time in hours, minutes, and seconds
  const displayTime = (): string => {
    const date = new Date(currentTime);
    const hours = formatTime(date.getHours());
    const minutes = formatTime(date.getMinutes());
    const seconds = formatTime(date.getSeconds());

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Container>
      <MuteButton />
      <TimeText>{displayTime()}</TimeText>
    </Container>
  );
};

export default Clock;
