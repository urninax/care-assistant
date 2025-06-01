import { View, StyleSheet, Text } from "react-native"
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export const TaskWidget = ({style, label, current, total, unit, isCircular}) => {
    const progress = (current / total) * 100;

    return (
        isCircular ? (
            <View style={style}>
                <Text style={[styles.label]}>{label}</Text>
                <View style={styles.circularProgressContainer}>
                    <AnimatedCircularProgress
                        size={120}
                        width={13}
                        fill={progress}
                        tintColor="#ff4d4d"
                        backgroundColor="#ffe6e6"
                        rotation={0}
                        childrenContainerStyle={{borderWidth: 2, borderColor: 'lightgrey'}}
                    >
                        {() => (
                        <Text style={[styles.stepsText]}>
                            {`${total-current} ${unit} \nRemaining`}
                        </Text>
                        )}
                    </AnimatedCircularProgress>
                </View>
            </View>
        ) : (
            <View style={style}>
                
            </View>
        )
    )
}

const styles = StyleSheet.create({
    label: {
        // fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 18,
        marginLeft: 5,
        marginTop: 3,
    },
    stepsText: {
        fontSize: 15,
        textAlign: 'center',
    },
    circularProgressContainer: {
        alignItems: 'center',
        marginTop: 10
    }
})