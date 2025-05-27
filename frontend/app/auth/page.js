"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { HandleWorkspaceContext } from "@/context/WorkspaceContext";
import LogInSingInBar from "@/components/LoginSignInNavBar";

import LoginForm from "@/components/auth/LogInForm";
import SignupForm from "@/components/auth/SignUpForm";
import CustomizeForm from "@/components/auth/CustomizeForm";
import CreateUsersForm from "@/components/auth/CreateUsersForm";

export default function AuthPage() {
  const { step, setStep } = useContext(HandleWorkspaceContext);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [roles, setRoles] = useState("");
  const [meraTheme, setMeraTheme] = useState("");
  const [monthView, setMonthView] = useState("");

  const { setContextId, setActiveUser } = useContext(HandleWorkspaceContext);
  const router = useRouter();

  const sharedProps = {
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
    setContextId,
    setActiveUser,
    router,
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-full z-50">
        <LogInSingInBar />
      </div>
      <section className="flex justify-center items-center h-screen w-screen overflow-hidden pt-0 lg:pt-12">
        <div className="card bg-base-100 lg:max-w-3xl shadow-none lg:shadow-lg p-8 lg:p-12 w-full flex flex-col gap-y-8">
          {step === "login" && <LoginForm {...sharedProps} />}
          {step === "signup" && <SignupForm {...sharedProps} />}
          {step === "customize" && <CustomizeForm {...sharedProps} />}
          {step === "createUsers" && <CreateUsersForm />}
        </div>
      </section>
    </>
  );
}
