import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { useFonts, Poppins_300Light, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { ThemeContext } from '../../utils/theme-context';

export const ProgressBar =  ({current, total}) => {
    const percentage = (current / total) * 100;
    const color = percentage >= 80 
        ? 'green'
        : percentage >= 50
        ? 'orange'
        : 'red'
    
    const { scheme } = useContext(ThemeContext)
    const styles = getStyles(scheme)

    return (
        <View style={styles.progressRow}>
            <View style={styles.progressBackground}>
                <View style={[styles.progressFill, {width : `${percentage}%`, backgroundColor: color}]} />
            </View>
            <Text style={[styles.progressText]}>{current} / {total}</Text>
        </View>
    )
}


const getStyles = (scheme) =>
    StyleSheet.create({
        progressRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 20,
            marginTop: 12
        },
        progressBackground: {
            flex: 1,
            backgroundColor: '#eee',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'lightgray',
            overflow: 'hidden',
        },
        progressFill: {
            height: '100%',
            borderRadius: 4
        },
        progressText: {
            paddingLeft: 20,
            fontSize: 18,
            lineHeight: 18,
            textAlign: 'right',
            color: scheme === "dark" ? "#fff" : "#000"
        }
})