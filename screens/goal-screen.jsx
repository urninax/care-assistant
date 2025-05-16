import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../utils/theme-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CurrentGoals } from "../components/goal-screen/current-goals";
import { PauseGoals } from "../components/goal-screen/pause-goals";
import { PastGoals } from "../components/goal-screen/past-goals";

const GoalTab = createMaterialTopTabNavigator();

// GoalScreen nur zum navigieren der Subscreens (CurrentGoals, PauseGoals, PastGoals)
export const GoalScreen = () => {
  const { scheme } = useContext(ThemeContext);

  return (
    <GoalTab.Navigator
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
      <GoalTab.Screen
        name="CurrentGoals"
        component={CurrentGoals}
        options={{
          tabBarLabel: "Current",
        }}
      />
      <GoalTab.Screen
        name="PauseGoals"
        component={PauseGoals}
        options={{
          tabBarLabel: "On Pause",
        }}
      />
      <GoalTab.Screen
        name="PastGoals"
        component={PastGoals}
        options={{
          tabBarLabel: "Past",
        }}
      />
    </GoalTab.Navigator>
  );
};

const getStyles = (scheme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: scheme == "dark" ? "#121212" : "#fff",
    },
  });
