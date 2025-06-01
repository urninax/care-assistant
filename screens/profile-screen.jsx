import { Text, View, StyleSheet } from "react-native"
import { useContext, useState } from "react";
import { ThemeContext } from "../utils/theme-context";
import { ScrollView } from "react-native";
import { Image } from 'expo-image'
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { ProfileAvatar } from "../components/profile-screen/profile-avatar";
import { PageButton } from "../components/profile-screen/page-button";


export const ProfileScreen = () => {
    const { scheme, theme } = useContext(ThemeContext);
    const styles = getStyles(scheme, theme)

    return (
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView 
            style={styles.screen}
            contentContainerStyle={styles.contentContainer}
            contentInsetAdjustmentBehavior="automatic">
            <View style={styles.profilePictureContainer}>
              <ProfileAvatar
                containerStyle={styles.profilePictureInnerContainer}
                imageStyle={styles.profilePicture}
              />
            </View>
            <View style={styles.usernameContainer}>
              <Text style={styles.username}>urninax</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <PageButton iconName='settings-outline' buttonText='Settings' navigateTo='Settings'/>
              {/* <PageButton iconName='notifications-outline' buttonText='Activity'/> */}
              <PageButton iconName='chatbubbles-outline' buttonText='FAQ' navigateTo='FAQ'/>
            </View>
            <View style={styles.streakContainer}>
              <View style={styles.streakHeaderContainer}>
                <Text style={styles.streakHeaderText}>6-week streak</Text>
              </View>
              <View style={styles.streakIconContainer}>
                <View style={styles.streakIconInnerContainer}>
                  <Image 
                    source={require('../images/flame.svg')}
                    style={styles.streakIcon}
                  />
                  <View style={styles.streakTextContainer}>
                    <Text 
                      style={styles.streakText}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.5}
                    >6</Text>
                  </View>
                </View>
              </View>
              <View style={styles.streakMotivationalTextContainer}>
                <Text style={styles.streakMotivationalText}>{`Do your tasks to keep your streak going!`}</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
}

const getStyles = (scheme, theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    profilePictureContainer: {
      height: 100,
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
    usernameContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    username: {
      fontSize: 20,
      fontFamily: 'Poppins_700Bold',
      color: theme.colors.text
    },
    buttonsContainer: {
      flexDirection: 'column',
      paddingVertical: 15,
    },
    streakContainer: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 20,
      paddingVertical: 20,
      marginTop: 5,
      backgroundColor: theme.colors.view
    },
    streakHeaderContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    streakHeaderText: {
      fontSize: 20,
      fontFamily: 'Poppins_700Bold',
      color: theme.colors.text
    },
    streakIconContainer: {
      height: 130,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20
    },
    streakIconInnerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      aspectRatio: 1,
    },
    streakIcon: {
      height: '100%',
      width: '100%',
    },
    streakMotivationalTextContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20
    },
    streakMotivationalText: {
      fontSize: 15,
      fontFamily: 'Poppins_300Light',
      textAlign: 'center',
      color: theme.colors.text
    },
    streakTextContainer: {
      position: 'absolute',
      height: 50,
      aspectRatio: 1,
      top: '40%',
      left: '20%',
      alignContent: 'center',
      justifyContent: 'center'
    },
    streakText: {
      color: '#E1E1E1',
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center'
    },
  })