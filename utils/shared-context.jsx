import React, { createContext } from "react";
import { useState, useMemo, useContext } from "react";
import { TaskContext } from "./task-context";

export const SharedContext = createContext({
  treeName: "",
  setTreeName: () => {},
  completedTasksCount: 0,
  totalTasksCount: 0,
});

export function SharedContextProvider({ children }) {
  const { tasks } = useContext(TaskContext);
  const [treeName, setTreeName] = useState("");
  const [avatarUri, setAvatarUri] = useState('');

  const { completedTasksCount, totalTasksCount } = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.current >= t.total).length;
    return { totalTasksCount: total, completedTasksCount: completed };
  }, [tasks]);

  return (
    <SharedContext.Provider
      value={{
        treeName, setTreeName,
        avatarUri, setAvatarUri,
        completedTasksCount,
        totalTasksCount,
      }}
    >
      {children}
    </SharedContext.Provider>
  );
}
