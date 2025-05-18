// RootNavigator.js
import React, { useContext, useMemo, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons' 
import { TouchableOpacity } from "react-native";
import { StatusBar } from "react-native";

import { ThemeContext } from "./utils/theme-context";
import { HomeScreen } from "./screens/home-screen";
import { CalendarScreen } from "./screens/calendar-screen";
import { ProfileScreen } from "./screens/profile-screen";
import { GoalScreen } from "./screens/goal-screen";
import TasksScreen from "./screens/tasks-screen";

Ionicons.loadFont()


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  const { scheme, theme } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.tabBar
        },
        headerTintColor: theme.colors.headerTint,
        // headerTitleStyle: {
        //   fontSize: 30,
        //   fontWeight: "bold",
        // },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity style={{paddingRight: 15}} onPress={() => navigation.navigate("Profile")}>
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
  const { scheme, theme } = useContext(ThemeContext);

  return (
    <>
      <StatusBar 
        barStyle={scheme === 'dark' ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.statusBar}
      />
      <NavigationContainer theme={theme}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: theme.colors.activeTab,
            tabBarInactiveTintColor: theme.colors.inactiveTab,
            tabBarIconStyle: { width: 28, height: 28 },
            tabBarStyle: {
              backgroundColor: theme.colors.tabBar,
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
              // headerRight: () => (
              //   <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              //     <Ionicons
              //       name="person-outline"
              //       size={25}
              //       color={scheme === "dark" ? "#FFF" : "#2C2C2E"}
              //     />
              //   </TouchableOpacity>
              // ),
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
              name={"Tasks"}
              component={TasksScreen}
              options={{
                  tabBarIcon: ({ focused, color, size }) => (
                      <Ionicons name={focused ? "checkmark-done" : "checkmark-done-outline"} size={size} color={color} />
                  ),
          }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
