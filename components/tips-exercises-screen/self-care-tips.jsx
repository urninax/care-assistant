import React, { useContext, useMemo } from 'react';
import { Text, StyleSheet, View, ScrollView, Platform } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { ThemeContext } from '../../utils/theme-context';

const items = [
    ['🤗 Hug it out', 'Recent research has shown that physical touch—that means hugs, handshakes, and massage—can improve well-being and lessen pain, depression, and anxiety.'],
    ['🙏 Count your blessings', 'Being grateful is good for you. Science shows that it can boost happiness and positive emotions.'],
    ['📞 Phone a friend', 'Connecting with a friend when you\'re feeling lonely or sad can work mood-lifting miracles.'],
    ['🎨 Make something with your hands', 'Working with your hands and making some kind of art, whether it’s drawing, making pottery, crafting something, or creating or painting furniture can help reduce anxiety.'],
    ['🧘 Do some yoga stretching', 'Stretching relaxes and loosens the body, of course, but there’s also evidence that it can ease your mind.'],
    ['🎵 Play your fav song', 'Listening to something you love can help distract your brain from whatever you are anxious about and just make you happy.'],
    ['📵 Don\'t check your phone right when you wake up', 'Resist the urge to look at your device first thing when you wake up. Instead, take time to set your intentions for the day.'],
    ['🚶‍♀️ Take a lunchtime stroll', 'Research shows that 15 minutes of walking can potentially boost concentration and energy throughout the workday.'],
    ['📺 Take time to zone out', 'Need permission to just turn your brain off with a movie or series? Here it is.'],
    ['🍎 Stash the cookie jar', 'And set out a giant fruit bowl instead — you’ll be more likely to reach for an apple or a banana.'],
    ['👀 Give your eyes a break', 'Prevent digital eyestrain (dry eyes, headaches, and blurred vision) by following the rule of 20: Every 20 minutes, take a 20-second break to look at something 20 feet away.'],
    ['🐶 Do some heavy petting', 'Research shows that playing with dogs and cats is good for both improving your mood and for stress relief.'],
    ['🧹 Clear some clutter', 'Getting rid of that stack of mail, the pile of shoes by the door, and the overflow from your closet may improve your sense of well-being.'],
    ['🤝 Donate your time', 'Volunteering gives people purpose, which raises their self-esteem and lowers loneliness.'],
    ['🌳 Get outdoors', 'Being in nature — especially in motion — boosts mood, sharpens thinking, and makes you feel calmer and more generous.'],
];

export const SelfCareTips = () => {
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

export default SelfCareTips;
