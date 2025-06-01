import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet, Platform, Text } from 'react-native';
import { useFonts, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { useContext } from 'react';
import { ThemeContext } from '../../utils/theme-context';
import { useNavigation } from '@react-navigation/native';

export const PageButton = ({iconName, buttonText, navigateTo}) => {
    const { theme } = useContext(ThemeContext)
    const navigation = useNavigation();
    
    const styles = getStyles(theme)

    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
    });
    
    if (!fontsLoaded) {
        return;
    }

    const onPress = () => {
        navigation.navigate(navigateTo)
    }

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, styles.shadow]}>
            <View style={styles.buttonIconContainer}>
                <Ionicons name={iconName} style={styles.buttonIcon}></Ionicons>
            </View>
            <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

const getStyles = (theme) => 
    StyleSheet.create({
        button: {
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 20,
            height: 85,
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 8,
            backgroundColor: theme.colors.view
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
            fontSize: 33,
            color: theme.colors.text
        },
        buttonText: {
            fontSize: 18,
            fontFamily: 'Poppins_500Medium',
            color: theme.colors.text
        },
        shadow: {
            shadowColor: "#000",
            ...Platform.select({
              ios:{
                shadowOpacity: 0.5,
                shadowOffset: {
                  width: 0,
                  height: 0
                },
                shadowRadius: 7,
              },
              android:{
                elevation: 5
              }
            })
        },
    })