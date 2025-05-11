import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { FiltersProvider } from "./utils/filters-context";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { HomeScreen } from "./screens/home-screen";
import { CalendarScreen } from './screens/calendar-screen'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <FiltersProvider>
      <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: 'black',
              tabBarInactiveTintColor: 'gray',
              tabBarIconStyle: { width: 28, height: 28 }
            }}
          >
            <Tab.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{
                tabBarIcon: ({focused, color, size}) => {
                  return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color}></Ionicons>
                }
              }}
            />
            <Tab.Screen
              name="Calendar"
              component={CalendarScreen}
              options={{
                tabBarIcon: ({focused, color, size}) => {
                  return <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={size} color={color}></Ionicons>
                }
              }}
            />
          </Tab.Navigator>
      </NavigationContainer>
    </FiltersProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
