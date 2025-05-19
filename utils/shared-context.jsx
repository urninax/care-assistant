import React, { createContext } from "react";
import { useState } from "react";

export const SharedContext = createContext({});

export function SharedContextProvider({ children }) {
  const [treeName, setTreeName] = useState("");
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [totalTasksCount, setTotalTasksCount] = useState(0);

  return (
    <SharedContext.Provider
      value={{
        treeName, setTreeName,
        completedTasksCount, setCompletedTasksCount,
        totalTasksCount, setTotalTasksCount,
      }}
    >
      {children}
    </SharedContext.Provider>
  );
}
