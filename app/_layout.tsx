import { useEffect } from "react";
import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import SoundProvider from "@/context/SoundContext";
import TimerProvider from "@/context/TimerContext";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Inconsolata-Regular": require("../assets/fonts/Inconsolata-Regular.ttf"),
  });

  useEffect(() => {
    if (error) console.log(error);
    if (loaded) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded) {
    // console.log("Fonts are loading...");
    return null;
  }

  return (
    <SoundProvider>
      <TimerProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        {/* Global StatusBar configuration for the entire application */}
        <StatusBar style="light" backgroundColor={Colors.primaryBackground} />
      </TimerProvider>
    </SoundProvider>
  );
};

export default RootLayout;
