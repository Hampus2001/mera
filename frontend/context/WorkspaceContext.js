"use client";

import { createContext, useEffect, useState } from "react";

export const HandleWorkspaceContext = createContext([]);

export default function WorkspaceContext({ children }) {
  const [contextId, setContextId] = useState(1746442347439);
  const [activeUser, setActiveUser] = useState(null);
  const [activeUserId, setActiveUserId] = useState(null);

  //Create account data
  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [roles, setRoles] = useState("");
  const [meraTheme, setMeraTheme] = useState("");
  const [monthView, setMonthView] = useState("Month");
  const [users, setUsers] = useState([]);

  const [createUser, setCreateUsers] = useState({
    company_id: contextId,
    user_id: users.length + 1,
    username: "",
    password: "",
    role: "",
    email: "",
    admin: true,
  });

  useEffect(() => {
    if (activeUserId != null) {
      console.log("active userid", activeUserId);
      const active = users.find((user) => user.user_id == activeUserId);
      console.log("active user", active.username);
      setActiveUser(active.username);
    }
  }, [activeUserId && users]);

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
        createUser,
        setCreateUsers,
        activeUserId,
        setActiveUserId,
      }}
    >
      {children}
    </HandleWorkspaceContext.Provider>
  );
}
