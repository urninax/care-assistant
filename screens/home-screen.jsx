import { StyleSheet, View, Text, TextInput, Platform, Pressable, Keyboard, TouchableOpacity } from "react-native";
import { Image } from 'expo-image'
import { ProgressBar } from '../components/home-screen/progress-bar'
import { useFonts, Poppins_400Regular, Poppins_300Light } from '@expo-google-fonts/poppins';
import { TaskWidget } from "../components/home-screen/task-widget";
import { SharedContext } from "../utils/shared-context";
import { useContext, useState, useRef  } from "react";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from "../utils/theme-context";

export const HomeScreen = () => {
  const {treeName, setTreeName} = useContext(SharedContext);
  const { scheme } = useContext(ThemeContext);

  const styles = getStyles(scheme);

  const treeNameInputRef = useRef(null)

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_300Light
  });

  if (!fontsLoaded) {
    return;
  }

  return (
    <>
      <Pressable style={styles.screen} onPress={() => Keyboard.dismiss()} android_ripple={{ color: 'transparent' }}>
        {/* <View style={styles.taskWidgetsContainer}>
          <TaskWidget 
            style={styles.taskWidget}
            label='Progress'
            current={300}
            total={450}
            unit='g'
            isCircular={true}
          />
          <View style={styles.taskWidget}>

          </View>
        </View> */}
        <View style={styles.treeNameContainer}>
          <View style={styles.treeNameContentWrapper}>
            <View style={[styles.treeNameInputContainer, styles.shadow]}>
              <TextInput
                ref={treeNameInputRef}
                style={[styles.treeNameInput, styles.textColor, Platform.OS === 'android' && { paddingVertical: 0 }, {fontFamily: 'Poppins_300Light'}]}
                placeholder="Name your tree"
                placeholderTextColor={scheme === "dark" ? "gray" : 'lightgray'}
                returnKeyType="done"
                value={treeName}
                onChangeText={setTreeName}
                />
            </View>
            <TouchableOpacity style={[styles.editTreeNameIconContainer, styles.shadow]} onPress={() => treeNameInputRef.current?.focus()}>
              <Ionicons name='pencil' size={25} style={styles.textColor}></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.treeContainer}>
          <Image
            source={require('../images/hamster-meme.gif')}
            style={styles.gif}
          />
        </View>
        <View style={styles.motivationalTextContainer}>
          <Text style={[styles.motivationalText1, styles.shadow, styles.textColor]}>{`Your tree is healing!`}</Text>
          <Text style={[styles.motivationalText2, styles.shadow, styles.textColor]}>{`Keep it this way!`}</Text>
        </View>
        <TouchableOpacity style={[styles.progressContainer, styles.shadow]}>
          <View style={styles.progressTextContainer}>
            <Text style={[styles.label, styles.textColor]}>Your progress</Text>
            <Ionicons name='chevron-forward-outline' size={20} style={[{ marginLeft: 'auto' }, styles.textColor]}></Ionicons>
          </View>
            <ProgressBar current={4} total={5} />
        </TouchableOpacity>
      </Pressable>
    </>
  );
};

const getStyles = (scheme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: "center",
      backgroundColor: scheme == 'dark' ? '#121212' : '#fff'
    },
    treeNameContainer: {
      flexDirection: 'row',
      width: '100%',
      height: '5%',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    treeNameContentWrapper: {
      width: '70%',
      height: '90%',
      position: 'relative',
    },
    treeNameInputContainer: {
      width: '100%',
      height: '100%',
      borderWidth: 1,
      borderColor: scheme === 'dark' ? "#1c1c1e" : "lightgray",
      borderRadius: 8,
      backgroundColor: scheme === 'dark' ? '#1c1c1e' : 'white',
      alignItems: 'center',
      justifyContent: 'center'
    },
    editTreeNameIconContainer: {
      position: 'absolute',
      left: '100%',
      marginLeft: 5,
      height: '100%',
      aspectRatio: 1,
      borderWidth: 1,
      borderColor: scheme === 'dark' ? "#1c1c1e" : "lightgray",
      borderRadius: 8,
      backgroundColor: scheme === 'dark' ? '#1c1c1e' : 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    treeNameInput: {
      fontSize: 25,
      width: '100%',
      textAlign: 'center'
    },
    treeContainer: {
      marginTop: 10,
      height: '70%',
      width: '90%',
      borderWidth: 1,
      borderColor: 'lightgray',
    },
    gif: {
      height: '100%',
      width: '100%'
    },
    motivationalTextContainer: {
      marginTop: 5,
      width: '90%',
      borderColor: 'lightgray',
    },
    motivationalText1: {
      fontSize: 23,
      fontWeight: '400',
      textAlign: 'center',
      fontFamily: 'Poppins_400Regular',
    },
    motivationalText2: {
      fontSize: 18,
      fontWeight: '300',
      textAlign: 'center',
      fontFamily: 'Poppins_300Light',
    },
    taskWidgetsContainer: {
      width: '90%',
      height: '23%',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 30,
      alignItems: 'center',
      // borderWidth: 1,
      borderColor: 'lightgray',
      marginTop: 10,
      marginBottom: 10,
    },
    taskWidget: {
      height: '100%',
      width: '45%',
      padding: 8,
      // borderWidth: 1,
      borderColor: 'lightgray',
      borderRadius: 10,
      backgroundColor: '#ededed',

      shadowOpacity: 0.3,
      shadowOffset: {
        width: 2,
        height: 3
      },
      shadowRadius: 10
    },
    progressContainer: {
      height: '11%',
      width: '90%',
      borderWidth: 1,
      borderColor: scheme === 'dark' ? "#1c1c1e" : "lightgray",
      borderRadius: 10,
      marginTop: 10,
      backgroundColor: scheme === 'dark' ? '#1c1c1e' : 'white',
      paddingHorizontal: 15,
      justifyContent:'center',
    },  
    progressTextContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    label: {
        // fontWeight: 'bold',
        fontFamily: 'Poppins_400Regular',
        fontSize: 18,
    },
    shadow: {
      shadowOpacity: 0.2,
      shadowOffset: {
        width: 1,
        height: 1
      },
      shadowRadius: 7,
      shadowColor: scheme === "dark" ? "#fff" : "#000"
    },
    textColor: {
      color: scheme === "dark" ? "#fff" : "#000"
    }
  });
