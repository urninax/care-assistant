import React, { useState, useEffect, useLayoutEffect, useContext} from 'react';
import {
    View, Text, StyleSheet, FlatList,
    TextInput, TouchableOpacity, Modal, Button, Platform
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { ProgressBar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../utils/theme-context';
import { SharedContext } from '../utils/shared-context';

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
    if (progress < 0.9) return 'More than halfway done!';
    if (progress < 1) return 'Almost done!';
    return 'Good job!';
};

const getProgressColor = (progress) => {
    if (progress >= 0.8) return 'green';
    if (progress >= 0.4) return 'orange';
    return 'red';
};

const CircularProgress = ({ progress, radius = 50, strokeWidth = 10, color = '#007AFF', progressTextStyle, motivationalTextStyle, strokeBackgroundColor }) => {
    const normalizedProgress = Math.min(Math.max(progress, 0), 1);
    const size = radius * 2 + strokeWidth;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - normalizedProgress);

    return (
        <View style={{ alignItems: 'center', justifyContent: 'top' }}>
            <Svg width={size} height={size}>
                <Circle
                    stroke={strokeBackgroundColor}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                <Circle
                    stroke={color}
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
            <Text style={progressTextStyle}>
                {`${Math.round(normalizedProgress * 100)}%`}
            </Text>
            <Text style={motivationalTextStyle}>
                {getProgressMessage(normalizedProgress)}
            </Text>
        </View>
    );
};

const TasksScreen = ({ navigation }) => {
    const { theme } = useContext(ThemeContext)
    const { completedTasksCount, setCompletedTasksCount, totalTasksCount, setTotalTasksCount} = useContext(SharedContext)
    const styles = getStyles(theme)

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', category: '', current: 0, total: 0 });
    const [modalVisible, setModalVisible] = useState(false);
    const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [addValue, setAddValue] = useState('');

    const [taskToDelete, setTaskToDelete] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    useEffect(() => {
        loadTasks();
    }, []);


    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    useEffect(() => {
        const completed = tasks.filter(task => task.current >= task.total).length;
        setCompletedTasksCount(completed);
        setTotalTasksCount(tasks.length);
    }, [tasks]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setAddTaskModalVisible(true)} style={{ marginRight: 16 }}>
                    <Ionicons name="add" size={28} color={theme.colors.activeTab} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    const loadTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            } else {
                setTasks(defaultTasks);
            }
        } catch (error) {
            console.error('Failed to load tasks', error);
        }
    };

    const saveTasks = async (tasksToSave) => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasksToSave));
        } catch (error) {
            console.error('Failed to save tasks', error);
        }
    };

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
        setAddValue('');
        setModalVisible(true);
    };

    const handleConfirmAddValue = () => {
        if (currentTask) {
            const parsed = parseInt(addValue, 10);
            if (isNaN(parsed)) {
                alert('Please enter a valid whole number');
                return;
            }

            const updatedTasks = tasks.map(task =>
                task.id === currentTask.id
                    ? { ...task, current: Math.min(task.current + parsed, task.total) }
                    : task
            );
            setTasks(updatedTasks);
            setAddValue('');
        }
        setModalVisible(false);
    };

    const openDeleteModal = (task) => {
        setTaskToDelete(task);
        setDeleteModalVisible(true);
    };

    const confirmDeleteTask = () => {
        if (taskToDelete) {
            const updatedTasks = tasks.filter(task => task.id !== taskToDelete.id);
            setTasks(updatedTasks);
            setTaskToDelete(null);
            setDeleteModalVisible(false);
        }
    };

    const renderItem = ({ item }) => {
        const progress = item.current / item.total;
        return (
            <View style={[styles.taskContainer, styles.shadow]}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.progressContainer}>
                    <Text style={styles.progress}>{`${item.current}/${item.total}`}</Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={() => openAddValueModal(item)}>
                            <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openDeleteModal(item)} style={{ marginLeft: 12 }}>
                            <Ionicons name="trash-outline" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>

                <ProgressBar
                    progress={progress}
                    color={progress >= 1 ? 'green' : 'red'}
                    style={styles.progressBar}
                />
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
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.taskCounter}>
                    Completed: {completedTasksCount} / {totalTasksCount}
                </Text>

                <View style={styles.ringContainer}>
                    <CircularProgress
                        progress={totalProgress}
                        color={getProgressColor(totalProgress)}
                        progressTextStyle={styles.progressText}
                        motivationalTextStyle={styles.motivationalText}
                        strokeBackgroundColor={theme.dark ? '#2C2C2E' : '#E0E0E0'}
                    />
                </View>

                <FlatList
                    data={categories}
                    renderItem={renderCategory}
                    keyExtractor={(item) => item}
                    contentContainerStyle={{paddingHorizontal: 16}}
                />

                <Modal visible={modalVisible} transparent animationType="fade">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalHeader}>Add value</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                inputMode='numeric'
                                placeholder='Enter amount'
                                value={addValue}
                                onChangeText={(text) => setAddValue(text.replace(/[^0-9]/g, ''))}
                            />
                            <Button title="Confirm" onPress={handleConfirmAddValue} />
                            <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </Modal>

                <Modal visible={addTaskModalVisible} transparent animationType="fade">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalHeader}>Add New Task</Text>
                            <TextInput placeholder="Category" placeholderTextColor={theme.colors.secondaryText} value={newTask.category} onChangeText={(text) => setNewTask({ ...newTask, category: text })} style={styles.input} />
                            <TextInput placeholder="Title" placeholderTextColor={theme.colors.secondaryText} value={newTask.title} onChangeText={(text) => setNewTask({ ...newTask, title: text })} style={styles.input} />
                            <TextInput placeholder="Current" keyboardType="numeric" value={String(newTask.current)} onChangeText={(text) => setNewTask({ ...newTask, current: parseInt(text) || 0 })} style={styles.input} />
                            <TextInput placeholder="Total" keyboardType="numeric" value={String(newTask.total)} onChangeText={(text) => setNewTask({ ...newTask, total: parseInt(text) || 0 })} style={styles.input} />
                            <Button title="Add Task" onPress={handleAddTask} />
                            <Button title="Cancel" color="red" onPress={() => setAddTaskModalVisible(false)} />
                        </View>
                    </View>
                </Modal>

                <Modal visible={deleteModalVisible} transparent animationType="fade">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={{ marginBottom: 20 }}>
                                Are you sure you want to delete the task "{taskToDelete?.title}"?
                            </Text>
                            <Button title="Delete" color="red" onPress={confirmDeleteTask} />
                            <Button title="Cancel" onPress={() => setDeleteModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const getStyles = (theme) => StyleSheet.create({
    container: { 
        flex: 1, 
        paddingTop: 16
    },
    ringContainer: { 
        alignItems: 'center', 
        marginBottom: 16 
    },
    progressText: {
        position: 'absolute',
        alignSelf: 'center',
        paddingTop: 34,
        fontWeight: 'bold',
        fontSize: 32,
        color: theme.colors.text
    },
    motivationalText: {
        color: theme.colors.text,
        marginTop: 8, 
        fontFamily: 'Poppins_500Medium'
    },
    input: { 
        backgroundColor: theme.colors.secondary, 
        padding: 8, 
        marginVertical: 4, 
        borderRadius: 8, 
        color: theme.colors.text
    },
    categoryContainer: { 
        marginBottom: 24 
    },
    categoryHeader: {
        fontSize: 20, 
        fontFamily: 'Poppins_700Bold',
        marginBottom: 8,
        borderBottomWidth: 2, 
        borderBottomColor: theme.colors.secondary,
        width: '100%', 
        textAlign: 'center',
        borderColor: '#DDDDDDFF', 
        paddingBottom: 10,
        color: theme.colors.text
    },
    // taskContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     marginBottom: 12,
    //     padding: 12,
    //     backgroundColor: '#fff',
    //     borderRadius: 8,
    //     elevation: 2
    // },
    title: { fontSize: 18, fontFamily: 'Poppins_500Medium', color: theme.colors.text},
    // progressBar: { height: 15, borderRadius: 5, marginTop: 4 },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: theme.colors.view, padding: 20, borderRadius: 10, width: '80%' },
    modalHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: theme.colors.text, textAlign: 'center' },
    taskCounter: { 
        textAlign: 'center', 
        fontSize: 16, 
        marginBottom: 10,
        fontFamily: 'Poppins_400Regular',
        color: theme.colors.text
    },
    taskContainer: {
        marginBottom: 12,
        padding: 12,
        backgroundColor: theme.colors.view,
        borderRadius: 8,
        elevation: 2,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressBar: {
        height: 15,
        borderRadius: 5,
        width: '100%',
        backgroundColor: theme.colors.secondary
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 3
    },
    progress: {
        fontFamily: 'Poppins_400Regular',
        color: theme.colors.secondaryText
    },
    shadow: {
        shadowColor: "#000",
        ...Platform.select({
        ios:{
            shadowOpacity: 0.5,
            shadowOffset: {
            width: 0,
            height: 0
            },
            shadowRadius: 7,
        },
        android:{
            elevation: 5
        }
        })
    },
});

export default TasksScreen;
