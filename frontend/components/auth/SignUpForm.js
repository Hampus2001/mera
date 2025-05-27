"use client";

import { HandleWorkspaceContext } from "@/context/WorkspaceContext";
import { useContext, useState } from "react";

export default function SignupForm() {
  const {
    setStep,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    companyId,
    roles,
    users,
    setUsers,
    createUser,
    setCreateUsers,
  } = useContext(HandleWorkspaceContext);

  return (
    <div>
      <h2 className="text-3xl leading-loose pb-8 lg:pb-6">
        We've been expecting you...
      </h2>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          value={createUser.username}
          onChange={(e) =>
            setCreateUsers({ ...createUser, username: e.target.value })
          }
          placeholder="Username"
          className="input w-full"
          required
        />
        <input
          type="password"
          value={createUser.password}
          onChange={(e) =>
            setCreateUsers({ ...createUser, password: e.target.value })
          }
          placeholder="Password"
          className="input w-full"
          required
        />
        <input
          type="email"
          value={createUser.email}
          onChange={(e) =>
            setCreateUsers({ ...createUser, email: e.target.value })
          }
          placeholder="Email"
          className="input w-full"
          required
        />
      </form>
      <div className="mt-4">
        <button
          className="btn btn-primary w-full"
          onClick={() => {
            setStep("customize");
            setUsers(...users, createUser);
          }}
        >
          Next
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <p>
          Already have an account?
          <span className="link ml-2" onClick={() => setStep("login")}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
