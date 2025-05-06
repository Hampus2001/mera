"use client";

import { createContext, useEffect, useState } from "react";

export const HandleWorkspaceContext = createContext([]);

export default function WorkspaceContext({ children }) {
  const [contextId, setContextId] = useState(1746442347439);

  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    console.log("active user", activeUser);
  }, [activeUser]);

  return (
    <HandleWorkspaceContext.Provider
      value={{ contextId, setContextId, activeUser, setActiveUser }}
    >
      {children}
    </HandleWorkspaceContext.Provider>
  );
}
