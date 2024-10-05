import { Tabs } from "expo-router";
import { Feather, Entypo, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { moderateScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";

const TabLayout = () => {
  const iconSize: number = moderateScale(28);

  return (
    <SafeAreaView className="flex-1">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primaryAccent,
          tabBarInactiveTintColor: Colors.secondaryForeground,
          tabBarStyle: {
            height: moderateScale(84),
            backgroundColor: Colors.secondaryBackground,
            borderTopColor: Colors.secondaryForeground,
            paddingTop: moderateScale(12),
          },
          tabBarLabelStyle: {
            fontSize: moderateScale(12),
            fontFamily: "Montserrat-Medium",
            marginBottom: moderateScale(12),
            marginTop: moderateScale(4),
          },
          tabBarLabelPosition: "below-icon",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Clock",
            tabBarIcon: ({ color }) => (
              <Feather name="clock" size={iconSize} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="stopwatch"
          options={{
            title: "Stopwatch",
            tabBarIcon: ({ color }) => (
              <Entypo name="stopwatch" size={iconSize} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="timer"
          options={{
            title: "Timer",
            tabBarIcon: ({ color }) => (
              <Ionicons name="timer-outline" size={iconSize} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabLayout;
