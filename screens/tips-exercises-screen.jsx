import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../utils/theme-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SelfCareTips } from "../components/tips-exercises-screen/self-care-tips";
import { Exercises } from "../components/tips-exercises-screen/exercises";

const Tab = createMaterialTopTabNavigator();

// TipsExercisesScreen nur zum navigieren der Subscreens (SelfCareTips, Exercises)
export const TipsExercisesScreen = () => {
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
        name="SelfCareTips"
        component={SelfCareTips}
        options={{
          tabBarLabel: "Self Care Tips",
        }}
      />
      <Tab.Screen
        name="Exercises"
        component={Exercises}
        options={{
          tabBarLabel: "Exercises",
        }}
      />
    </Tab.Navigator>
  );
};
