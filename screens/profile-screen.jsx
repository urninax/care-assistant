import { Text, View, StyleSheet, TouchableOpacity, Platform } from "react-native"
import { useContext, useState } from "react";
import { useFonts, Poppins_300Light, Poppins_500Medium, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { ThemeContext } from "../utils/theme-context";
import { ScrollView } from "react-native";
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ProfileAvatar } from "../components/profile-screen/profile-avatar";


export const ProfileScreen = () => {
    // const tabBarHeight = useBottomTabBarHeight();

    const { scheme, setScheme } = useContext(ThemeContext);
    const [showModal, setShowModal] = useState(false);
    const styles = getStyles(scheme)

    const [fontsLoaded] = useFonts({
      Poppins_700Bold,
      Poppins_500Medium,
      Poppins_300Light
    });
    const [imageUri, setImageUri] = useState(null);
    
    if (!fontsLoaded) {
      return;
    }

    const pickImage = async () => {
      // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      // if (status !== 'granted') {
      //   Alert.alert(
      //     'Access denied.',
      //     'Gallery permission is needed to choose profile picture'
      //   );
      //   return;
      // }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
  
      if (!result.canceled) {
        const uri = result.assets ? result.assets[0].uri : result.uri;
        setImageUri(uri);
      }
    };

    return (
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView 
            style={styles.screen}
            contentContainerStyle={styles.contentContainer}
            // contentInset={{ bottom: tabBarHeight }}
            contentInsetAdjustmentBehavior="automatic">
            <View style={styles.profilePictureContainer}>
              <ProfileAvatar
                imageUri={imageUri}
                containerStyle={styles.profilePictureInnerContainer}
                imageStyle={styles.profilePicture}
              />
            </View>
            <View style={styles.usernameContainer}>
              <Text style={styles.username}>urninax</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={[styles.button, styles.shadow]}>
                <View style={styles.buttonIconContainer}>
                  <Ionicons name='settings-outline' size={33} style={styles.buttonIcon}></Ionicons>
                </View>
                <Text style={styles.buttonText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <View style={styles.buttonIconContainer}>
                  <Ionicons name='notifications-outline' size={33} style={styles.buttonIcon}></Ionicons>
                </View>
                <Text style={styles.buttonText}>Activity</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <View style={styles.buttonIconContainer}>
                  <Ionicons name='chatbubbles-outline' size={33} style={styles.buttonIcon}></Ionicons>
                </View>
                <Text style={styles.buttonText}>FAQ</Text>
              </TouchableOpacity>
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
                    // contentFit="contain"
                  />
                  <Text style={styles.streakText}>12</Text>
                </View>
              </View>
              <View style={styles.streakMotivationalTextContainer}>
                <Text style={styles.streakMotivationalText}>{`Do your tasks to keep your streak going!`}</Text>
              </View>
            </View>

            {/* <Text>Current Theme: {scheme}</Text>
            <Button title="System" onPress={() => setScheme('system')} />
            <Button title="Light"    onPress={() => setScheme('light')} />
            <Button title="Dark"      onPress={() => setScheme('dark')} /> */}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
}

const getStyles = (scheme) =>
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
      // marginTop: 15
    },
    username: {
      fontSize: 20,
      fontFamily: 'Poppins_700Bold'
    },
    buttonsContainer: {
      flexDirection: 'column',
      paddingVertical: 15,
    },
    button: {
      borderWidth: 1,
      borderRadius: 20,
      height: 85,
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
      backgroundColor: '#fff'
    },
    buttonIconContainer: {
      height: '100%',
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonIcon: {
      justifyContent: 'center',
      alignItems: 'center',
      aspectRatio: 1,
    },
    buttonText: {
      fontSize: 18,
      fontFamily: 'Poppins_500Medium'
    },
    streakContainer: {
      borderWidth: 1,
      borderRadius: 20,
      paddingVertical: 20,
      marginTop: 5,
      backgroundColor: '#fff'
    },
    streakHeaderContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    streakHeaderText: {
      fontSize: 20,
      fontFamily: 'Poppins_700Bold'
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
      textAlign: 'center'
    },
    streakText: {
      position: 'absolute',
      color: '#fff',
      fontSize: 30,
      marginTop: 25,
      marginRight: 5,
      fontWeight: 'bold',
    },
    shadow: {
      shadowColor: scheme === "dark" ? "#fff" : "#000",
      ...Platform.select({
        ios:{
          shadowOpacity: 0.2,
          shadowOffset: {
            width: 1,
            height: 1
          },
          shadowRadius: 7,
        },
        android:{
          elevation: 5
        }
      })
    },
  })