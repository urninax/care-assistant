// RootNavigator.js
import React, { useContext, useMemo } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

import { ThemeContext }    from "./utils/theme-context";
import { HomeScreen }       from "./screens/home-screen";
import { CalendarScreen }   from "./screens/calendar-screen";
import { ProfileScreen }    from "./screens/profile-screen";
import { GoalScreen }    from "./screens/goal-screen";
import TasksScreen from "./screens/tasks-screen";
import { SettingsScreen } from "./screens/settings-screen";
import { TipsExercisesScreen } from "./screens/tips-exercises-screen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  const { scheme } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: scheme === "dark" ? "#1c1c1e" : "#FFF",
        },
        headerTintColor: scheme === "dark" ? "#fff" : "#1c1c1e",
        headerTitleStyle: {
          fontSize: 30,
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Ionicons
                name="person-outline"
                size={27}
                color={scheme === "dark" ? "#FFF" : "#2C2C2E"}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  const { scheme } = useContext(ThemeContext);

  const navTheme = useMemo(() => {
    console.log("Theme changed to", scheme);
    return scheme === "dark" ? DarkTheme : DefaultTheme;
  }, [scheme]);

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: scheme === "dark" ? "#0A84FF" : "black",
          tabBarInactiveTintColor: scheme === "dark" ? "#8E8E93" : "gray",
          tabBarIconStyle: { width: 28, height: 28 },

          //   tabBarActiveBackgroundColor: scheme === "dark" ? "#1c1c1e" : "#fff",
          //   tabBarInactiveBackgroundColor: scheme === "dark" ? "#1c1c1e" : "#fff",
          tabBarStyle: {
            backgroundColor: scheme === "dark" ? "#1c1c1e" : "#fff",
          },

          headerStyle: {
            backgroundColor: scheme === "dark" ? "#1c1c1e" : "#fff",
          },
          headerTintColor: scheme === "dark" ? "#fff" : "#red",
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: "bold", // optional
          },
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Goals"
          component={GoalScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "stats-chart" : "stats-chart-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "calendar" : "calendar-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Tips"
          component={TipsExercisesScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "library" : "library-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name={"Tasks"}
          component={TasksScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons 
                name={focused ? "checkmark-done" : "checkmark-done-outline"} 
                size={size} 
                color={color} 
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
