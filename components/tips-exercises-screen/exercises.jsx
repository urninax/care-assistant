import React, { useContext, useMemo } from 'react';
import { Text, StyleSheet, View, ScrollView, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../../utils/theme-context';

const items = [
    ['💪 Push‑up',
        'Assume a strong plank position, hands stacked directly below elbows and shoulders. Bend your elbows to slowly lower your chest to the floor, then push back up explosively while keeping your arms from flaring.'],
    ['📦 Feet‑elevated Push‑up',
        'Kick both feet up onto a box or bench. Place your hands shoulder‑width apart on the floor. Lower your nose toward the ground, pause, and push back up explosively.'],
    ['🤏 Close‑grip Push‑up',
        'Assume a strong plank with your hands almost touching. Lower your chest under control, keeping elbows close, then push back up explosively.'],
    ['📝 Write in a journal',
        'Keep a paper notebook or a note app handy and jot down thoughts every day.'],
    ['🪑 Bench/Box Dip',
        'Sit on the edge of a box or bench with legs outstretched. Shift your hips forward, lower until you feel a chest stretch, then straighten your arms explosively.'],
    ['⬇️ Down‑up',
        'Hinge, squat, and place your hands shoulder‑width apart on the ground. Kick both legs back to a plank without letting your hips sag, jump feet back in, and stand.'],
    ['🔥 Burpee',
        'Squat down, place hands between your feet, jump back into a push‑up, lower chest, press up, jump feet forward, and explode vertically with hands overhead.'],
    ['🏋️ Squat',
        'Stand tall, sink hips back and down until your hips are below knee level. Drive back up, keeping heels grounded and torso upright.'],
    ['🚶‍♂️ Forward Lunge',
        'Step forward, lowering until the rear knee gently touches the ground. Drive back to standing and repeat with the other leg.'],
    ['🦵 Pistol Squat',
        'Stand on one leg, extend the other forward, and slowly lower until your hip crease passes below the knee. Pause, then drive back up.'],
    ['🧗 Pull‑up',
        'Hang from a bar with an overhand grip. Pull yourself up by driving elbows down and squeezing shoulder blades until chin clears the bar.'],
    ['🦘 Jump Squat',
        'Squat down, swing arms, and explode straight up. Land softly into the next squat.'],
    ['↩️ Reverse Lunge',
        'Step backward, lowering until the rear knee touches lightly. Drive forward to standing and alternate legs.'],
    ['🧍 Straight‑arm Plank',
        'Hold a rigid plank from ankles to shoulders with arms straight. Tuck pelvis, squeeze core, and maintain tension throughout.'],
    ['🧲 Hanging Knee Raises',
        'Hang from a bar, engage abs, and raise knees toward your chest. Pause, then lower under control.'],
];


export const Exercises = () => {
    const { theme } = useContext(ThemeContext);
    const styles = getStyles(theme);

    const randomIndices = useMemo(() => {
        const pool = Array.from({ length: items.length }, (_, i) => i);
        pool.sort(() => 0.5 - Math.random());
        return pool.slice(0, 6);
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    {randomIndices.map((idx) => {
                        const [title, description] = items[idx];
                        return (
                            <View key={title} style={[styles.card, styles.shadow]}>
                                <Text style={styles.title}>{title}</Text>
                                <Text style={styles.description}>{description}</Text>
                            </View>
                        );
                    })}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const getStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        content: {
            padding: 16,
            flexGrow: 1
        },
        card: {
            backgroundColor: theme.colors.view,
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
        },
        title: {
            fontSize: 20,
            fontFamily: 'Poppins_700Bold',
            color: theme.colors.text,
            marginBottom: 8,
            textAlign: 'center',
        },
        description: {
            fontSize: 14,
            lineHeight: 20,
            color: theme.colors.secondaryText,
            textAlign: 'justify',
            fontFamily: 'Poppins_400Regular'
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
    });
};

export default Exercises;
