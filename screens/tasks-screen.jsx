import React, { useState, useEffect, useLayoutEffect, useContext} from 'react';
import {
    View, Text, StyleSheet, FlatList,
    TextInput, TouchableOpacity, Modal, Button, Platform, Alert
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { ProgressBar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { ThemeContext } from '../utils/theme-context';
import { SharedContext } from '../utils/shared-context';
import { TaskContext } from '../utils/task-context';

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
    const { completedTasksCount, totalTasksCount} = useContext(SharedContext)
    const { tasks, setTasks } = useContext(TaskContext);
    const styles = getStyles(theme)

    const [newTask, setNewTask] = useState({ title: '', category: '', current: '', total: '' });
    const [modalVisible, setModalVisible] = useState(false);
    const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);
    const [editTaskModalVisible, setEditTaskModalVisible] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [addValue, setAddValue] = useState('');

    const [taskToDelete, setTaskToDelete] = useState(null);
    const [taskToEdit, setTaskToEdit] = useState({ title: '', category: '', current: '', total: '' });
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setAddTaskModalVisible(true)} style={{ marginRight: 16 }}>
                    <Ionicons name="add" size={28} color={theme.colors.activeTab} />
                </TouchableOpacity>
            )
        });
    }, [navigation, theme]);

    const totalProgress = tasks.length
        ? tasks.reduce((acc, task) => acc + (task.total > 0 ? task.current / task.total : 0), 0) / tasks.length
        : 0;

    
    const handleAddTask = () => {
        if(!newTask.title || !newTask.category){
            Alert.alert('Please enter both a category and a title.')
            return;
        }
        if(!newTask.total){
            Alert.alert('Total should not be empty.')
            return;
        }
        if(!newTask.current){
            Alert.alert('Current should not be empty.')
            return;
        }
        if(parseInt(newTask.total) <= 0){
            Alert.alert('Total must be greater than zero');
            return;
        }
        if(parseInt(newTask.current) <= 0){
            Alert.alert('Current must be greater than zero');
            return;
        }
        const newId = (tasks.length + 1).toString();
        const newTaskEntry = { ...newTask, current: parseInt(newTask.current), total: parseInt(newTask.total), id: newId };
        const updatedTasks = [...tasks, newTaskEntry];
        setTasks(updatedTasks);
        setNewTask({ title: '', category: '', current: '', total: '' });
        setAddTaskModalVisible(false);

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

    const openEditModal = (task) => {
        setTaskToEdit(task);
        setEditTaskModalVisible(true);
    }

    const handleEditTask = () => {
        if(taskToEdit){
            const updatedTasks = tasks.map(task =>
                task.id === taskToEdit.id
                    ? { ...taskToEdit, current: task.current}
                    : task
            );
            setTasks(updatedTasks);
            setTaskToEdit({ title: '', category: '', current: '', total: '' });
        }
        setEditTaskModalVisible(false)
    }

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
        const color = progress >= 0.7
            ? 'green'
            : progress >= 0.5
            ? 'orange'
            : 'red'

        return (
            <View style={[styles.taskContainer, styles.shadow]}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.progressContainer}>
                    <Text style={styles.progress}>{`${item.current}/${item.total}`}</Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={() => openAddValueModal(item)}>
                            <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openEditModal(item)} style={{marginHorizontal: 8}}>
                            <Ionicons name="pencil-outline" size={23} color="#007AFF" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openDeleteModal(item)}>
                            <Ionicons name="trash-outline" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>

                <ProgressBar
                    progress={progress}
                    color={color}
                    style={styles.progressBar}
                />
            </View>
        );
    };

    const capitalize = (s) =>
        s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();      

    const categories = [...new Set(tasks.map(task => task.category.trim().toLowerCase()))];

    const renderCategory = ({ item: category }) => {
        const displayName = capitalize(category);
        const tasksInCategory = tasks.filter(
            task => task.category.trim().toLowerCase() === category
        );
        return (
            <View style={styles.categoryContainer}>
                <Text style={styles.categoryHeader}>{displayName}</Text>
                <FlatList
                    data={tasksInCategory}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
        )
    };

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
                            <TextInput placeholder="Current" placeholderTextColor={theme.colors.secondaryText} keyboardType="numeric" value={newTask.current} onChangeText={(text) => setNewTask({ ...newTask, current: text.replace(/[^0-9]/g, '') })} style={styles.input} />
                            <TextInput placeholder="Total" placeholderTextColor={theme.colors.secondaryText} keyboardType="numeric" value={newTask.total} onChangeText={(text) => setNewTask({ ...newTask, total: text.replace(/[^0-9]/g, '') })} style={styles.input} />
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

                <Modal visible={editTaskModalVisible} transparent animationType="fade">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalHeader}>Edit Task</Text>
                            <Text style={styles.modalLabel}>Category</Text>
                            <TextInput placeholder="Category" placeholderTextColor={theme.colors.secondaryText} value={taskToEdit.category} onChangeText={(text) => setTaskToEdit({ ...taskToEdit, category: text })} style={styles.input} />
                            <Text style={styles.modalLabel}>Title</Text>
                            <TextInput placeholder="Title" placeholderTextColor={theme.colors.secondaryText} value={taskToEdit.title} onChangeText={(text) => setTaskToEdit({ ...taskToEdit, title: text })} style={styles.input} />
                            <Text style={styles.modalLabel}>Total</Text>
                            <TextInput placeholder="Total" placeholderTextColor={theme.colors.secondaryText} keyboardType="numeric" value={String(taskToEdit.total)} onChangeText={(text) => setTaskToEdit({ ...taskToEdit, total: text.replace(/[^0-9]/g, '') })} style={styles.input} />
                            <Button title="Edit" onPress={handleEditTask} />
                            <Button title="Cancel" color="red" onPress={() => setEditTaskModalVisible(false)} />
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
    title: { fontSize: 18, fontFamily: 'Poppins_500Medium', color: theme.colors.text},
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: theme.colors.view, padding: 20, borderRadius: 10, width: '80%' },
    modalHeader: { fontSize: 20, fontFamily: 'Poppins_700Bold', marginBottom: 12, color: theme.colors.text, textAlign: 'center' },
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
    modalLabel: {
        fontSize: 15,
        fontFamily: 'Poppins_500Medium',
        marginTop: 5,
        marginLeft: 5,
        color: theme.colors.text
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
