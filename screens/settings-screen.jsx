import { Text, View, Button, StyleSheet, TouchableOpacity, Platform } from "react-native"
import { useContext } from "react";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { ThemeContext } from "../utils/theme-context";

export const SettingsScreen = () => {
    const { scheme, setScheme, theme } = useContext(ThemeContext);
    const styles = getStyles(theme);

    return (
      <SafeAreaProvider>
        <SafeAreaView style = {styles.container}>
          {/* <View style = {styles.container1}>
          <Text style = {styles.titleText}>Current Theme: {scheme}</Text>
          </View>
          <Text style = {styles.spaces}>{'\n'}</Text>
          <Button title="System" onPress={() => setScheme('system') } color = "darkblue"/>
          <Text style = {styles.spaces}>{'\n'}</Text>
          <Button title="Light" onPress={() => setScheme('light')} color = "darkblue"/>
          <Text style = {styles.spaces}>{'\n'}</Text>
          <Button title="Dark" onPress={() => setScheme('dark')} color = "darkblue"/> */}
          <View style={styles.container1}>
            <Text style={styles.titleText}>Current Theme: {scheme}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.themeButton, styles.shadow]}
                onPress={() => setScheme('system')}
              >
                <Text style={styles.buttonText}>System</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.themeButton, styles.shadow]}
                onPress={() => setScheme('light')}
              >
                <Text style={styles.buttonText}>Light</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.themeButton, styles.shadow]}
                onPress={() => setScheme('dark')}
              >
                <Text style={styles.buttonText}>Dark</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      
    );
}

const getStyles = (theme) =>
  StyleSheet.create({
    // titleText: {
    //   fontSize: 20,
    //   fontWeight: 'bold',
    //   color:  scheme === "dark" ? "black" : "white",
    //   textAlign: 'center',
    // },
    // container1: {
    //   backgroundColor: scheme === "dark" ? "lightgrey" : "darkgrey",
    // },
    // spaces: {
    //   fontSize: 5,
    // },
    // container: {
    //   flex: 1,
    //   justifyContent: 'space-between',
    //   padding: 5,
    //   marginHorizontal: 75,
    //   marginVertical: 25,
    // },
    container: {
      flex: 1,
      padding: 20,
    },
    container1: {
      alignItems: 'center',
      marginBottom: 20,
    },
    titleText: {
      fontSize: 18,
      fontFamily: 'Poppins_600SemiBold',
      color: theme.colors.text
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
    themeButton: {
      backgroundColor: theme.colors.view,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginHorizontal: 5,
    },
    buttonText: {
      color: theme.colors.text,
      fontFamily: 'Poppins_600SemiBold',
      fontSize: 16,
    },
    shadow: {
      shadowColor: '#000',
      ...Platform.select({
        ios:{
          shadowOpacity: 0.5,
          shadowRadius: 7,
          shadowOffset: {
            height: 0,
            width: 0
          }
        },
        android:{
          elevation: 5
        }
      })
    },
  });