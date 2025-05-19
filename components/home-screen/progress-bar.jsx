import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../../utils/theme-context';

export const ProgressBar =  ({current, total}) => {
    const percentage = (current / total) * 100;
    const color = percentage >= 70 
        ? 'green'
        : percentage >= 50
        ? 'orange'
        : 'red'
    
    const { scheme, theme } = useContext(ThemeContext)
    const styles = getStyles(scheme,theme)

    return (
        <View style={styles.progressRow}>
            <View style={styles.progressBackground}>
                <View style={[styles.progressFill, {
                    width : total > 0 ? `${percentage}%` : '0%', 
                    backgroundColor: color}]
                } />
            </View>
            <Text style={[styles.progressText]}>{current} / {total}</Text>
        </View>
    )
}


const getStyles = (scheme, theme) =>
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
            backgroundColor: theme.colors.secondary,
            borderRadius: 5,
            overflow: 'hidden',
        },
        progressFill: {
            height: '100%',
            borderRadius: 4,
        },
        progressText: {
            paddingLeft: 20,
            fontSize: 18,
            lineHeight: 18,
            textAlign: 'right',
            color: theme.colors.text
        }
})