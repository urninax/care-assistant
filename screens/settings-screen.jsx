import { Text, View, Button, StyleSheet, TouchableOpacity, Platform } from "react-native"
import { useContext } from "react";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { ThemeContext } from "../utils/theme-context";
import { ProfileAvatar } from "../components/profile-screen/profile-avatar";
import { useProfileAvatar } from "../utils/useProfileAvatar";

export const SettingsScreen = () => {
    const { scheme, setScheme, theme } = useContext(ThemeContext);
    const { openMenu } = useProfileAvatar();
    const styles = getStyles(theme);

    return (
      <SafeAreaProvider>
        <SafeAreaView style = {styles.container}>
          <View style={styles.container1}>
            <View style={styles.profilePictureContainer}>
              <ProfileAvatar
                containerStyle={styles.profilePictureInnerContainer}
                imageStyle={styles.profilePicture}
              />
            </View>
            <TouchableOpacity onPress={openMenu} style={styles.editProfilePictureTextContainer}>
              <Text style={styles.editProfilePictureText}>Edit Profile Picture</Text>
            </TouchableOpacity>
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
    container: {
      flex: 1,
      padding: 20,
    },
    container1: {
      alignItems: 'center',
      marginBottom: 20,
    },
    profilePictureContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    profilePictureInnerContainer: {
      alignItems: 'center',
      height: 65,
      aspectRatio: 1,
      borderRadius: 60,
      overflow: 'hidden',
    },
    profilePicture: {
      height: '100%',
      width: '100%',
    },
    editProfilePictureTextContainer:{
      marginVertical: 7,
      paddingVertical: 5,
    },
    editProfilePictureText: {
      fontFamily: 'Poppins_400Regular',
      color: 'blue',
      fontSize: 15
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