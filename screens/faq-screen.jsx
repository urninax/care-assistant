import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from '../utils/theme-context';
import { useContext } from 'react';

const faqs = [
    {
        question: 'Why should I complete daily tasks?',
        answer: 'Every completed task nourishes your tree. It\'s a way to visualize your progress and stay motivated.',
    },
    {
        question: 'Why isn\'t my tree blooming?',
        answer: 'The tree starts blooming when you complete tasks regularly. Missing days slows its growth. Consistency is key!',
    },
    {
        question: 'How can I help my tree grow faster?',
        answer: 'Complete tasks from different categories. This helps your tree grow balanced.',
    },
    {
        question: 'What happens if I don\'t complete tasks?',
        answer: 'If you neglect your tree for too long, it might wither. But don\'t worry — you can always start caring for it again!',
    },
    {
        question: 'Can I transplant my tree?',
        answer: 'Transplanting isn’t possible yet, but you can reset your progress and start a new self-care journey.',
    },
    {
        question: 'Can I customize my tasks?',
        answer: 'Yes! You can add, edit, or remove tasks to fit your personal self-care goals.',
    },
    {
        question: 'How is my progress saved?',
        answer: 'All your tasks and progress are saved locally on your device using secure storage.',
    },
    {
        question: 'Will the app remind me to complete tasks?',
        answer: 'Currently, reminders are not available, but we plan to add notifications in future updates.',
    },
    {
        question: 'Is my data shared with anyone?',
        answer: 'No, your data stays private on your device and is never shared without your permission.',
    },
];


const FAQScreen = () => {
    const {theme} = useContext(ThemeContext);
    const styles = getStyles(theme)

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.header}>Frequently Asked Questions</Text>
            <View style={styles.treeContainer}>
                <Ionicons name="leaf" size={64} color="#4CAF50" />
                <Text style={styles.treeText}>Your tree blooms as you take care of yourself 🌸</Text>
            </View>
            {faqs.map((faq, index) => (
                <View key={index} style={styles.card}>
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionMark}>❓</Text>
                        <Text style={styles.question}>{faq.question}</Text>
                    </View>
                    <Text style={styles.answer}>{faq.answer}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const getStyles = (theme) => 
    StyleSheet.create({
        container: { 
            flex: 1,
            // padding: 16,
        },
        contentContainer: {
            padding: 13,
        },
        header: { 
            fontSize: 24, 
            // fontWeight: 'bold', 
            fontFamily: 'Poppins_700Bold',
            textAlign: 'center', 
            marginBottom: 16,
            color: theme.colors.text
        },
        treeContainer: {
            alignItems: 'center',
            marginBottom: 24,
            padding: 16,
            backgroundColor: theme.dark ? '#1e2f23' : '#d0edd4',
            borderRadius: 12,
        },
        treeText: { 
            marginTop: 8, 
            fontSize: 16, 
            fontFamily: 'Poppins_400Regular',
            textAlign: 'center', 
            color: theme.dark ? '#4CAF50' : '#2e7d32',
        },
        card: {
            backgroundColor: theme.colors.view,
            borderRadius: 10,
            padding: 16,
            marginBottom: 12,
            elevation: 2,
        },
        questionContainer: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            width: '100%'
        },
        questionMark: {
            fontSize: 16, 
            fontWeight: '600',
            marginBottom: 8,
            color: theme.colors.text,
        },
        question: { 
            fontSize: 16, 
            fontFamily: 'Poppins_600SemiBold',
            marginBottom: 8,
            color: theme.colors.text,
            flexShrink: 1,
            flexWrap: 'wrap', 
        },
        answer: { 
            fontSize: 14, 
            color: theme.colors.secondaryText,
            fontFamily: 'Poppins_400Regular'
        },
});
//
export default FAQScreen;
