import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { FiltersProvider } from "./utils/filters-context";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {NavigationContainer} from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from "react-native";

import { HomeScreen } from "./screens/home-screen";
import { CalendarScreen } from './screens/calendar-screen'
import { ProfileScreen } from "./screens/profile-screen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-outline" size={27} color="#000" />
          </TouchableOpacity>
        ),
      })}/>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  )
}

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
              name="HomeStack" 
              component={HomeStack} 
              options={{
                tabBarIcon: ({focused, color, size}) => {
                  return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color}></Ionicons>
                },
                headerShown: false
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
