import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../utils/theme-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CurrentGoals } from "../components/goal-screen/current-goals";
import { PauseGoals } from "../components/goal-screen/pause-goals";
import { PastGoals } from "../components/goal-screen/past-goals";

const Tab = createMaterialTopTabNavigator();

// GoalScreen nur zum navigieren der Subscreens (CurrentGoals, PauseGoals, PastGoals)
export const GoalScreen = () => {
  const { scheme } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: scheme === "dark" ? "#0A84FF" : "black",
        tabBarInactiveTintColor: scheme === "dark" ? "#8E8E93" : "gray",
        tabBarStyle: {
          backgroundColor: scheme === "dark" ? "#1c1c1e" : "#fff",
        },
        tabBarIndicatorStyle: {
          backgroundColor: scheme === "dark" ? "#0A84FF" : "black",
        },
        tabBarLabelStyle: {
          fontSize: 18,
        },
      }}
    >
      <Tab.Screen
        name="CurrentGoals"
        component={CurrentGoals}
        options={{
          tabBarLabel: "Current",
        }}
      />
      <Tab.Screen
        name="PauseGoals"
        component={PauseGoals}
        options={{
          tabBarLabel: "On Pause",
        }}
      />
      <Tab.Screen
        name="PastGoals"
        component={PastGoals}
        options={{
          tabBarLabel: "Past",
        }}
      />
    </Tab.Navigator>
  );
};
