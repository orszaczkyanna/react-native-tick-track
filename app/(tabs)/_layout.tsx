import { Tabs } from "expo-router";
import { Feather, Entypo, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primaryAccent,
          tabBarInactiveTintColor: Colors.secondaryForeground,
          tabBarStyle: {
            height: 84,
            backgroundColor: Colors.secondaryBackground,
            borderTopColor: Colors.secondaryForeground,
            paddingTop: 12,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "Montserrat-Medium",
            marginBottom: 12,
            marginTop: 4,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Clock",
            tabBarIcon: ({ color }) => (
              <Feather name="clock" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="stopwatch"
          options={{
            title: "Stopwatch",
            tabBarIcon: ({ color }) => (
              <Entypo name="stopwatch" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="timer"
          options={{
            title: "Timer",
            tabBarIcon: ({ color }) => (
              <Ionicons name="timer-outline" size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
