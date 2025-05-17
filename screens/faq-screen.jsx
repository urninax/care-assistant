import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Frequently Asked Questions</Text>
            <View style={styles.treeContainer}>
                <Ionicons name="leaf" size={64} color="#4CAF50" />
                <Text style={styles.treeText}>Your tree blooms as you take care of yourself 🌸</Text>
            </View>
            {faqs.map((faq, index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.question}>❓ {faq.question}</Text>
                    <Text style={styles.answer}>{faq.answer}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fdfdfd', padding: 16 },
    header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
    treeContainer: {
        alignItems: 'center',
        marginBottom: 24,
        padding: 16,
        backgroundColor: '#e8f5e9',
        borderRadius: 12,
    },
    treeText: { marginTop: 8, fontSize: 16, textAlign: 'center', color: '#2e7d32' },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
    },
    question: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
    answer: { fontSize: 14, color: '#555' },
});
//
export default FAQScreen;
