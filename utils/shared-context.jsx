import React, { createContext } from "react";
import { useState } from "react";

export const SharedContext = createContext({});

export function SharedContextProvider({ children }) {
  const [treeName, setTreeName] = useState("");

  return (
    <SharedContext.Provider
      value={{
        treeName,
        setTreeName,
      }}
    >
      {children}
    </SharedContext.Provider>
  );
}
