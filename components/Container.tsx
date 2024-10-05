import { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <View className="bg-background flex-1">
      <SafeAreaView className="flex-1 justify-center items-center">
        {children}
      </SafeAreaView>
    </View>
  );
};

export default Container;
