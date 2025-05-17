import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet, Platform, Text } from 'react-native';
import { useFonts, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { useContext } from 'react';
import { ThemeContext } from '../../utils/theme-context';

export const PageButton = ({iconName, buttonText}) => {
    const { schema } = useContext(ThemeContext)
    
    const styles = getStyles(schema)

    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
    });
    
    if (!fontsLoaded) {
        return;
    }

    return (
        <TouchableOpacity style={[styles.button, styles.shadow]}>
            <View style={styles.buttonIconContainer}>
                <Ionicons name={iconName} style={styles.buttonIcon}></Ionicons>
            </View>
            <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

const getStyles = (scheme) => 
    StyleSheet.create({
        button: {
            borderWidth: 1,
            borderColor: "gray",
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
            fontSize: 33
        },
        buttonText: {
            fontSize: 18,
            fontFamily: 'Poppins_500Medium'
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