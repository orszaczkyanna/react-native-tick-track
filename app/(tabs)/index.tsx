import { useState, useEffect, useRef } from "react";
import { useSoundContext } from "@/context/SoundContext";
import Container from "@/components/Container";
import TimeDisplay from "@/components/TimeDisplay";
import MuteButton from "@/components/MuteButton";

const Clock = () => {
  const { playSound, isMuted } = useSoundContext();

  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // Initialize with null to prevent errors during cleanup checks

  // Update the currentTime state
  useEffect(() => {
    const tick = () => {
      setCurrentTime(Date.now());

      if (!isMuted) {
        playSound();
      }

      timeoutIdRef.current = setTimeout(tick, 1000);
    };

    tick();

    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, [isMuted]);

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
      <TimeDisplay>{displayTime()}</TimeDisplay>
    </Container>
  );
};

export default Clock;
