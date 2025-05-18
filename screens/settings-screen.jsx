import { Text, View, Button, StyleSheet } from "react-native"
import { useContext } from "react";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { ThemeContext } from "../utils/theme-context";

export const SettingsScreen = () => {
    const { scheme, setScheme } = useContext(ThemeContext);
    const styles = getStyles(scheme);

    return (
      <SafeAreaProvider>
        <SafeAreaView style = {styles.container}>
          <View>
            <View style = {styles.container1}>
            <Text style = {styles.titleText}>Current Theme: {scheme}</Text>
            </View>
            <Text style = {styles.spaces}>{'\n'}</Text>
            <Button title="System" onPress={() => setScheme('system') } color = "darkblue"/>
            <Text style = {styles.spaces}>{'\n'}</Text>
            <Button title="Light" onPress={() => setScheme('light')} color = "darkblue"/>
            <Text style = {styles.spaces}>{'\n'}</Text>
            <Button title="Dark" onPress={() => setScheme('dark')} color = "darkblue"/>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      
    );
}

const getStyles = (scheme) =>
  StyleSheet.create({
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      color:  scheme === "dark" ? "black" : "white",
      textAlign: 'center',
    },
    container1: {
      backgroundColor: scheme === "dark" ? "lightgrey" : "darkgrey",
    },
    spaces: {
      fontSize: 5,
    },
    container: {
      flex: 1,
      justifyContent: 'space-between',
      padding: 5,
      marginHorizontal: 75,
      marginVertical: 25,
    },
  });