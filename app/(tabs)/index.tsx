import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Clock = () => {
  return (
    <SafeAreaView className="bg-background flex-1 justify-center items-center">
      <Text className="text-foreground text-6xl font-monregular">16:08:39</Text>
      <View className="flex-row mt-5 space-x-5">
        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-background-100 min-h-[64px] min-w-[160px] justify-center items-center rounded-full"
        >
          <Text className="text-foreground text-xl font-monmedium">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-accent-100 min-h-[64px] min-w-[160px] justify-center items-center rounded-full"
        >
          <Text className="text-foreground text-xl font-monmedium">Start</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Clock;
