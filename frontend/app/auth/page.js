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
  const {
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
    setContextId,
    setActiveUser,
  } = useContext(HandleWorkspaceContext);

  const router = useRouter();

  return (
    <>
      <div className="absolute top-0 left-0 w-full z-50">
        <LogInSingInBar />
      </div>
      <section className="flex justify-center items-center h-screen w-screen overflow-hidden pt-0 lg:pt-12">
        <div className="card bg-base-100 lg:max-w-3xl shadow-none lg:shadow-lg p-8 lg:p-12 w-full flex flex-col gap-y-8">
          {step === "login" && <LoginForm />}
          {step === "signup" && <SignupForm />}
          {step === "customize" && <CustomizeForm />}
          {step === "createUsers" && <CreateUsersForm />}
        </div>
      </section>
    </>
  );
}
