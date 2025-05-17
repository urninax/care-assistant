import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, FlatList, SafeAreaView,
    TextInput, TouchableOpacity, Modal, Button
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';

const defaultTasks = [
    { id: '1', category: 'Movement', title: 'Steps', current: 7000, total: 10000 },
    { id: '2', category: 'Movement', title: 'Pull Ups', current: 10, total: 30 },
    { id: '3', category: 'Movement', title: 'Meditation', current: 10, total: 10 },
    { id: '4', category: 'Nutrition', title: 'Protein', current: 80, total: 160 },
    { id: '5', category: 'Nutrition', title: 'Water', current: 500, total: 2000 },
    { id: '6', category: 'Sleep', title: 'Sleep Hours', current: 6, total: 8 },
    { id: '7', category: 'Mental Health', title: 'Gratitude Journal', current: 1, total: 1 },
    { id: '8', category: 'Productivity', title: 'Read Pages', current: 15, total: 30 }
];

const getProgressMessage = (progress) => {
    if (progress === 0) return 'Start right now';
    if (progress < 0.3) return 'Good start';
    if (progress < 0.6) return 'You are doing great!';
    if (progress < 0.9) return 'Go girl!';
    if (progress < 1) return 'Almost done';
    return 'Good job!';
};

const CircularProgress = ({ progress, radius = 50, strokeWidth = 10}) => {
    const normalizedProgress = Math.min(Math.max(progress, 0), 1);
    const size = radius * 2 + strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - normalizedProgress);

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={size} height={size}>
                <Circle
                    stroke="#e6e6e6"
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                <Text style={styles.progressText}>
                    {`${Math.round(normalizedProgress * 100)}%`}
                </Text>
                <Circle
                    stroke="#007AFF"
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${size / 2}, ${size / 2}`}
                />
            </Svg>
            <Text style={{ marginTop: 8, fontWeight: '500' }}>
                {getProgressMessage(normalizedProgress)}
            </Text>
        </View>

    );
};

const TasksScreen = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', category: '', current: 0, total: 0 });
    const [modalVisible, setModalVisible] = useState(false);
    const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [addValue, setAddValue] = useState(0);

    useEffect(() => {
        setTasks(defaultTasks);
    }, []);

    const totalProgress = tasks.length
        ? tasks.reduce((acc, task) => acc + (task.total > 0 ? task.current / task.total : 0), 0) / tasks.length
        : 0;

    const handleAddTask = () => {
        if (newTask.title && newTask.category) {
            const newId = (tasks.length + 1).toString();
            const newTaskEntry = { ...newTask, id: newId };
            const updatedTasks = [...tasks, newTaskEntry];
            setTasks(updatedTasks);
            setNewTask({ title: '', category: '', current: 0, total: 0 });
            setAddTaskModalVisible(false);
        }
    };

    const openAddValueModal = (task) => {
        setCurrentTask(task);
        setAddValue(0);
        setModalVisible(true);
    };

    const handleConfirmAddValue = () => {
        if (currentTask) {
            const updatedTasks = tasks.map(task =>
                task.id === currentTask.id
                    ? { ...task, current: Math.min(task.current + addValue, task.total) }
                    : task
            );
            setTasks(updatedTasks);
        }
        setModalVisible(false);
    };

    const renderItem = ({ item }) => {
        const progress = item.current / item.total;
        return (
            <View style={styles.taskContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text>{`${item.current}/${item.total}`}</Text>
                    <ProgressBar progress={progress} color={progress >= 1 ? 'green' : 'red'} style={styles.progressBar} />
                </View>
                <TouchableOpacity onPress={() => openAddValueModal(item)} style={styles.addButton}>
                    <Ionicons name="add-circle" size={28} color="#007AFF" />
                </TouchableOpacity>
            </View>
        );
    };

    const categories = [...new Set(tasks.map(task => task.category))];

    const renderCategory = ({ item: category }) => (
        <View style={styles.categoryContainer}>
            <Text style={styles.categoryHeader}>{category}</Text>
            <FlatList
                data={tasks.filter(task => task.category === category)}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.header}>Tasks</Text>
                <TouchableOpacity onPress={() => setAddTaskModalVisible(true)}>
                    <Ionicons name="add" size={32} color="#007AFF" />
                </TouchableOpacity>
            </View>

            <View style={styles.ringContainer}>
                <CircularProgress progress={totalProgress} />
            </View>



            <FlatList
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item}
            />

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Enter value to add:</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={String(addValue)}
                            onChangeText={(text) => setAddValue(parseInt(text) || 0)}
                        />
                        <Button title="Confirm" onPress={handleConfirmAddValue} />
                    </View>
                </View>
            </Modal>

            <Modal visible={addTaskModalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>Add New Task</Text>
                        <TextInput placeholder="Category" value={newTask.category} onChangeText={(text) => setNewTask({ ...newTask, category: text })} style={styles.input} />
                        <TextInput placeholder="Title" value={newTask.title} onChangeText={(text) => setNewTask({ ...newTask, title: text })} style={styles.input} />
                        <TextInput placeholder="Current" keyboardType="numeric" value={String(newTask.current)} onChangeText={(text) => setNewTask({ ...newTask, current: parseInt(text) || 0 })} style={styles.input} />
                        <TextInput placeholder="Total" keyboardType="numeric" value={String(newTask.total)} onChangeText={(text) => setNewTask({ ...newTask, total: parseInt(text) || 0 })} style={styles.input} />
                        <Button title="Add Task" onPress={handleAddTask} />
                        <Button title="Cancel" color="red" onPress={() => setAddTaskModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
    ringContainer: { alignItems: 'center', marginBottom: 16 },
    progressText: {
        position: 'absolute',
        alignSelf: 'center',
        //top: '45%',
        fontWeight: 'bold',
        paddingTop:34,
        fontSize: 32
    },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    header: { fontSize: 24, fontWeight: 'bold', paddingTop:5, },
    input: { backgroundColor: '#fff', padding: 8, marginVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
    categoryContainer: { marginBottom: 24 },
    categoryHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 8,borderBottomWidth: 2, width: '100%', textAlign: 'center', borderColor: '#DDDDDDFF', paddingBottom: 10,},
    taskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2
    },
    title: { fontSize: 18, fontWeight: '500' },
    progressBar: { height: 10, borderRadius: 5, marginTop: 4 },
    addButton: { marginLeft: 8 },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' },
    modalHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 }
});
//nigga
export default TasksScreen;
