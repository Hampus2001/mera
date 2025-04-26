"use client";

import { createContext, useEffect, useState } from "react";

export const HandleWorkspaceContext = createContext([]);

export default function WorkspaceContext({ children }) {
  const [contextId, setContextId] = useState(null);

  useEffect(() => {
    console.log("company_id", contextId);
  }, [contextId]);

  return (
    <HandleWorkspaceContext.Provider value={{ contextId, setContextId }}>
      {children}
    </HandleWorkspaceContext.Provider>
  );
}
