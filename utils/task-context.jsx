import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TaskContext = createContext({});

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const stored = await AsyncStorage.getItem('tasks');
        setTasks(stored ? JSON.parse(stored) : []);
    };

    const saveTasks = async (updatedTasks) => {
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    return (
        <TaskContext.Provider value={{ tasks, setTasks, saveTasks }}>
            {children}
        </TaskContext.Provider>
    );
};
