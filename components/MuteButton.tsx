import { useSoundContext } from "@/context/SoundContext";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { moderateScale } from "react-native-size-matters";

const MuteButton = () => {
  const { isMuted, setMuted } = useSoundContext();

  const toggleMute = () => {
    console.log(`${isMuted ? "Unmute" : "Mute"}`); // based on the previous state
    setMuted((prevMuted) => !prevMuted); // useState is an asynchronous hook
  };

  return (
    <Pressable
      onPress={() => toggleMute()}
      className="active:opacity-80 absolute top-10 right-6"
    >
      <Ionicons
        name={isMuted ? "volume-mute" : "volume-medium"}
        size={moderateScale(30)}
        color={Colors.primaryForeground}
      />
    </Pressable>
  );
};

export default MuteButton;
