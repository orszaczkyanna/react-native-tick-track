import {
  createContext,
  useContext,
  useEffect,
  useState,
  //   Dispatch,
  //   SetStateAction,
  ReactNode,
} from "react";
import { Audio } from "expo-av";

// ---- 1. A Context által megosztott adatok típusának definiálása ----
interface SoundContextType {
  //   soundAudio: Audio.Sound | undefined;
  //   setSoundAudio: Dispatch<React.SetStateAction<Audio.Sound | undefined>>;
  playSound: () => Promise<void>;
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

  // Load the sound once when the component mounts
  useEffect(() => {
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

    // Cleanup Function
    return () => {
      console.log("Unloading Sound");
      soundAudio?.unloadAsync();
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
    <SoundContext.Provider value={{ playSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export default SoundProvider;
