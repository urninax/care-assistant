import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

export const ProgressBar =  ({current, total}) => {
    const percentage = (current / total) * 100;
    const color = percentage >= 80 
        ? 'green'
        : percentage >= 50
        ? 'orange'
        : 'red'

    return (
        <View style={styles.progressContainer}>
            <View style={styles.contentContainer}>
                <Text style={styles.label}>Your progress</Text>
                <View style={styles.progressRow}>
                    <View style={styles.progressBackground}>
                        <View style={[styles.progressFill, {width : `${percentage}%`, backgroundColor: color}]} />
                    </View>
                    <Text style={styles.progressText}>{current} / {total}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    progressContainer: {
        height: 70,
        width: '90%',
        borderWidth: 1,
        borderColor: '#555555',
        borderRadius: 8,
        marginTop: 15
    },
    contentContainer: {
        marginTop: 7,
        marginHorizontal: 15
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18
    },
    progressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 20,
        marginTop: 10,
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
        fontWeight: '600',
        fontSize: 18,
        textAlign: 'right'
    }
})