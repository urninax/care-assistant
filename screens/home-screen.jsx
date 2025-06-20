import { StyleSheet, View, Text, TextInput, Platform, Pressable, Keyboard, TouchableOpacity } from "react-native";
import { Image } from 'expo-image'
import { ProgressBar } from '../components/home-screen/progress-bar'
import { SharedContext } from "../utils/shared-context";
import { useContext, useRef} from "react";
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from "../utils/theme-context";
import { useNavigation } from "@react-navigation/native";

const TREE_STAGE_GIFS = {
  "-2": require("../images/tree-yellow-stage2-1.4-0.55-0.1-cropped.gif"),
  "-1": require("../images/tree-yellow-stage1-1.2-0.75-0.45-cropped.gif"),
  "0":  require("../images/tree-green-stage0-cropped.gif"),
  "1":  require("../images/tree-pink-stage1-1.5-0.65-1.4-cropped.gif"),
  "2":  require("../images/tree-pink-stage2-1.75-0.5-1.6-cropped.gif"),
};



export const HomeScreen = () => {
  const { completedTasksCount, totalTasksCount, treeName, setTreeName, treeStage } = useContext(SharedContext);
  const { scheme, theme } = useContext(ThemeContext);
  const navigation = useNavigation();

  const styles = getStyles(scheme, theme);

  const treeNameInputRef = useRef(null)
  const gifSource =
    TREE_STAGE_GIFS[treeStage] ?? TREE_STAGE_GIFS["0"];

  return (
    <>
      <Pressable style={styles.screen} onPress={() => Keyboard.dismiss()} android_ripple={{ color: 'transparent' }}>
        <View style={styles.treeNameContainer}>
          <View style={styles.treeNameContentWrapper}>
            <View style={[styles.treeNameInputContainer, styles.shadow]}>
              <TextInput
                ref={treeNameInputRef}
                style={[styles.treeNameInput, styles.textColor, Platform.OS === 'android' && { paddingVertical: 0, includeFontPadding: false }, {fontFamily: 'Poppins_300Light'}]}
                placeholder="Name your tree"
                placeholderTextColor={theme.dark ? "gray" : 'lightgray'}
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
            source={gifSource}
            style={styles.gif}
            contentFit="contain"
          />
        </View>
        <View style={styles.motivationalTextContainer}>
          <Text style={[styles.motivationalText1, styles.shadow, styles.textColor]}>{`Your tree is healing!`}</Text>
          <Text style={[styles.motivationalText2, styles.shadow, styles.textColor]}>{`Keep it this way!`}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Tasks")} style={[styles.progressContainer, styles.shadow]}>
          <View style={styles.progressTextContainer}>
            <Text style={[styles.label, styles.textColor]}>Your progress</Text>
            <Ionicons name='chevron-forward-outline' size={20} style={[{ marginLeft: 'auto' }, styles.textColor]}></Ionicons>
          </View>
            <ProgressBar current={completedTasksCount} total={totalTasksCount} />
        </TouchableOpacity>
      </Pressable>
    </>
  );
};

const getStyles = (scheme, theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: "center",
      backgroundColor: theme.colors.background
    },
    treeNameContainer: {
      flexDirection: 'row',
      width: '100%',
      height: '5%',
      marginTop: 15,
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
      borderColor: theme.colors.border,
      borderRadius: 8,
      backgroundColor: theme.colors.view,
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
      borderColor: theme.colors.border,
      borderRadius: 8,
      backgroundColor: theme.colors.view,
      alignItems: 'center',
      justifyContent: 'center',
    },
    treeNameInput: {
      fontSize: 20,
      width: '100%',
      textAlign: 'center',
    },
    treeContainer: {
      marginTop: 'auto',
      height: '60%',
      width: '90%',
      borderColor: 'lightgray',
    },
    gif: {
      height: '100%',
      width: '100%'
    },
    motivationalTextContainer: {
      marginTop: 10,
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
      borderColor: 'lightgray',
      marginTop: 10,
      marginBottom: 10,
    },
    taskWidget: {
      height: '100%',
      width: '45%',
      padding: 8,
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
      borderColor: theme.colors.border,
      borderRadius: 10,
      marginTop: 'auto',
      marginBottom: 'auto',
      backgroundColor: theme.colors.view,
      paddingHorizontal: 15,
      justifyContent:'center',
    },  
    progressTextContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    label: {
      fontFamily: 'Poppins_400Regular',
      fontSize: 18,
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
    textColor: {
      color: theme.colors.text
    }
  });
