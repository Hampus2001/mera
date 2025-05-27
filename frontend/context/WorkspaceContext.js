"use client";

import { createContext, useEffect, useState } from "react";

export const HandleWorkspaceContext = createContext([]);

export default function WorkspaceContext({ children }) {
  const [contextId, setContextId] = useState(1746442347439);
  const [activeUser, setActiveUser] = useState(null);

  //Create account data
  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [roles, setRoles] = useState("");
  const [meraTheme, setMeraTheme] = useState("");
  const [monthView, setMonthView] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("active user", activeUser);
  }, [activeUser]);

  useEffect(() => {
    console.log("users", users);
  }, [users]);
  return (
    <HandleWorkspaceContext.Provider
      value={{
        contextId,
        setContextId,
        activeUser,
        setActiveUser,
        step,
        setStep,
        email,
        setEmail,
        username,
        setUsername,
        password,
        setPassword,
        company,
        setCompany,
        roles,
        setRoles,
        meraTheme,
        setMeraTheme,
        monthView,
        setMonthView,
        users,
        setUsers,
      }}
    >
      {children}
    </HandleWorkspaceContext.Provider>
  );
}
