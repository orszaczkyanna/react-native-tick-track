import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { Audio } from "expo-av";

// ---- 1. A Context által megosztott adatok típusának definiálása ----
interface SoundContextType {
  playSound: () => Promise<void>;
  isMuted: boolean;
  setMuted: Dispatch<SetStateAction<boolean>>;
}

// ---- 2. Context létrehozása ----
const SoundContext = createContext<SoundContextType | undefined>(undefined);

// ---- 3. Custom hook létrehozása a Context használatának egyszerűsítésére és ellenőrzésére ----
export const useSoundContext = () => {
  //   return useContext(SoundContext);
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSoundContext must be used within a SoundProvider");
  }
  return context;
};

// ---- 4. A Provider komponens definiálása, amely a Context értékeit biztosítja ----
const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [soundAudio, setSoundAudio] = useState<Audio.Sound>();
  const [isMuted, setMuted] = useState<boolean>(true);

  // Execute once when the component mounts
  useEffect(() => {
    // Load the sound
    const loadSound = async (): Promise<void> => {
      if (!soundAudio) {
        console.log("Loading Sound");
        const { sound } = await Audio.Sound.createAsync(
          require("@/assets/audio/tick.wav")
        );
        setSoundAudio(sound);
      }
    };
    loadSound();

    // Configure audio playback settings
    const setupAudioMode = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true, // Allows sound playback in silent mode
          staysActiveInBackground: true, // Keeps the sound active when the app runs in the background
          // interruptionModeAndroid: 1, // Do not mix sounds with other audio sources
          // interruptionModeIOS: 1,
        });
        console.log("setupAudioMode");
      } catch (error) {
        console.log("Error while setting audio mode\n", error);
      }
    };
    setupAudioMode();

    // Cleanup Function
    return () => {
      soundAudio?.unloadAsync().then(() => {
        setSoundAudio(undefined); // Clear the state to ensure it reloads if needed
        console.log("Unloading Sound");
      });
    };
  }, []);

  // Play ticking sound
  const playSound = async (): Promise<void> => {
    try {
      if (soundAudio) {
        const status = await soundAudio.getStatusAsync();
        if (status.isLoaded) {
          await soundAudio.setPositionAsync(0); // Ensure playback starts from the beginning
          await soundAudio.playAsync();
        }
      }
    } catch (error) {
      console.error("Error while trying to play sound\n", error);
    }
  };

  return (
    <SoundContext.Provider value={{ playSound, isMuted, setMuted }}>
      {children}
    </SoundContext.Provider>
  );
};

export default SoundProvider;
