import React, { createContext, useEffect, useRef } from "react";
import { useState, useMemo, useContext } from "react";
import { TaskContext } from "./task-context";
import * as FileSystem from 'expo-file-system';
import AsyncStorage from "@react-native-async-storage/async-storage";

const getDateString = (date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export const SharedContext = createContext({
  treeName: "",
  setTreeName: () => {},
  avatarUri: "",
  setAvatarUri: () => {},
  completedTasksCount: 0,
  totalTasksCount: 0,
  streakCount: 0,
  treeStage: 0
});

export function SharedContextProvider({ children }) {
  const { tasks } = useContext(TaskContext);
  const [streakCount, setStreakCount] = useState(0);
  const [treeStage, setTreeStage] = useState(0);
  const [treeName, setTreeName] = useState("");
  const [avatarUri, setAvatarUri] = useState('');
  const [dailyStatus, setDailyStatus] = useState({});

  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    (async () => {
      try{
        const [
          storedStreak,
          storedTreeStage,
          storedTreeName,
          storedAvatarUri,
          storedDailyStatusJson,
          storedLastResetDate,
        ] = await Promise.all([
          AsyncStorage.getItem("streakCount"),
          AsyncStorage.getItem("treeStage"),
          AsyncStorage.getItem("treeName"),
          AsyncStorage.getItem("avatarUri"),
          AsyncStorage.getItem("dailyStatus"),
          AsyncStorage.getItem("lastResetDate"),
        ]);

        if(storedStreak){
          setStreakCount(Number(storedStreak));
        }
        if(storedTreeStage){
          setTreeStage(Number(storedTreeStage));
        }
        if(storedTreeName){
          setTreeName(storedTreeName);
        }
        if(storedAvatarUri){
          const fileInfo = await FileSystem.getInfoAsync(storedAvatarUri);
          if(fileInfo.exists){
            setAvatarUri(storedAvatarUri);
          }else{
            setAvatarUri('')
            await AsyncStorage.removeItem('avatarUri')
          }
        }
        if(storedDailyStatusJson){
          setDailyStatus(JSON.parse(storedDailyStatusJson));
        }
      }catch (e){
        console.warn("Failed to load SharedContext from AsyncStorage", e);
        setStreakCount(0);
        setTreeStage(0);
        setTreeName("");
        setAvatarUri("");
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('streakCount', String(streakCount));
  }, [streakCount])

  useEffect(() => {
    AsyncStorage.setItem('treeStage', String(treeStage));
  }, [treeStage])

  useEffect(() => {
    AsyncStorage.setItem('treeName', treeName);
  }, [treeName])

  useEffect(() => {
    AsyncStorage.setItem('avatarUri', avatarUri);
  }, [avatarUri])

  useEffect(() => {
    AsyncStorage.setItem("dailyStatus", JSON.stringify(dailyStatus));
  }, [dailyStatus]);

  const { completedTasksCount, totalTasksCount } = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.current >= t.total).length;
    return { totalTasksCount: total, completedTasksCount: completed };
  }, [tasks]);

  useEffect(() => {
    const tryRewardStreak = async () => {
      const totalTasks = tasks.length;
      const totalProgress =
        totalTasks === 0
          ? 0
          : tasks.reduce((acc, t) => acc + (t.total > 0 ? t.current / t.total : 0), 0) /
            totalTasks;

      const today = new Date();
      const todayStr = today.toDateString();
      const todayKey = getDateString(today)

      let lastEvaluatedDate = await AsyncStorage.getItem("lastEvaluatedDate");

      if (lastEvaluatedDate === todayStr) {
        return;
      }

      if (totalProgress >= 0.6) {
        setStreakCount((prev) => prev + 1);
        setTreeStage((prev) => (prev + 1 > 2 ? 2 : prev + 1));

        setDailyStatus((prev) => {
          const copy = { ...prev, [todayKey]: true };
          AsyncStorage.setItem("dailyStatus", JSON.stringify(copy)).catch(console.warn);
          return copy;
        });

        await AsyncStorage.setItem("lastEvaluatedDate", todayStr);
      }
    };

    tryRewardStreak();
  }, [tasks]);

  const penalizeIfMissed = async () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const todayStr = today.toDateString();
    const yesterdayKey = getDateString(yesterday);

    const lastResetDate = await AsyncStorage.getItem("lastResetDate");

    if (lastResetDate === todayStr) {
      return;
    }

    const storedDailyJson = await AsyncStorage.getItem("dailyStatus");
    const currentDaily = storedDailyJson ? JSON.parse(storedDailyJson) : {};

    const wasSuccessful = currentDaily[yesterdayKey] === true;
    if (!wasSuccessful) {
      console.log("day was not successful")
      setStreakCount(0);
      setTreeStage((prev) => (prev - 1 < -2 ? -2 : prev - 1));

      if (currentDaily[yesterdayKey] === undefined) {
        const copy = { ...currentDaily, [yesterdayKey]: false };
        setDailyStatus(copy);
        await AsyncStorage.setItem("dailyStatus", JSON.stringify(copy));
      }
    }
    await AsyncStorage.setItem("lastResetDate", todayStr);
  };

  useEffect(() => {
    const computeMsUntilNextMidnight = () => {
      const now = new Date();
      const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0,
        0
      );
      return tomorrow.getTime() - now.getTime();
    };

    const msUntilMidnight = computeMsUntilNextMidnight();
    timeoutRef.current = setTimeout(async () => {
      await penalizeIfMissed();

      intervalRef.current = setInterval(() => {
        penalizeIfMissed();
      }, 24 * 60 * 60 * 1000);
    }, msUntilMidnight);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <SharedContext.Provider
      value={{
        treeName, setTreeName,
        avatarUri, setAvatarUri,
        completedTasksCount,
        totalTasksCount,
        streakCount,
        treeStage,
        dailyStatus
      }}
    >
      {children}
    </SharedContext.Provider>
  );
}
