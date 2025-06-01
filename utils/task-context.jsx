import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const TaskContext = createContext({
    tasks: [],
    setTasks: () => {},
});

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(defaultTasks);

    useEffect(() => {
        (async () => {
          try {
            const stored = await AsyncStorage.getItem('tasks');
            if (stored) {
                setTasks(JSON.parse(stored));
            }
          } catch (e) {
            console.warn('Failed to load tasks', e);
            setTasks([]);
          }
        })();
      }, []);
    
    useEffect(() => {
        AsyncStorage.setItem('tasks', JSON.stringify(tasks)).catch(console.warn);
    }, [tasks]);

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    );
};
