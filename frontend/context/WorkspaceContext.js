"use client";

import { createContext, useEffect, useState } from "react";

export const HandleWorkspaceContext = createContext([]);

export default function WorkspaceContext({ children }) {
  const [companyId, setCompanyId] = useState(null);

  useEffect(() => {
    console.log("company_id", companyId);
  }, [companyId]);

  return (
    <HandleWorkspaceContext.Provider value={{ companyId, setCompanyId }}>
      {children}
    </HandleWorkspaceContext.Provider>
  );
}
