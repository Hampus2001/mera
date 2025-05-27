"use client";

import { HandleWorkspaceContext } from "@/context/WorkspaceContext";
import { useState, useContext } from "react";

export default function CustomizeForm() {
  const {
    setStep,
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
    companyId,
    createUser,
    setCreateUsers,
    setActiveUserId,
  } = useContext(HandleWorkspaceContext);

  return (
    <form className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      <h2 className="text-3xl col-span-full pb-8 lg:pb-6">
        Customize your schedule
      </h2>

      <div className="col-span-1 flex flex-col gap-6">
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company name"
          className="input"
        />

        <input
          value={createUser.role}
          onChange={(e) =>
            setCreateUsers({ ...createUser, role: e.target.value })
          }
          type="text"
          placeholder="What your role?"
          className="input"
        />
      </div>

      <div className="col-span-1 flex flex-col gap-6">
        <select
          value={meraTheme}
          onChange={(e) => setMeraTheme(e.target.value)}
          className="select"
        >
          <option value="">Choose theme</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <select
          value={monthView}
          onChange={(e) => setMonthView(e.target.value)}
          className="select"
        >
          <option value="Month">Month view</option>
          <option value="Week">Week view</option>
          <option value="Day">Day view</option>
        </select>
      </div>
      <button
        type="button"
        className="btn btn-primary w-full col-span-2"
        onClick={() => {
          if (company && createUser.role && monthView && meraTheme) {
            setUsers([createUser]);
            setActiveUserId(createUser.user_id);
            setStep("createUsers");
            console.log(createUser);
          } else {
            alert("Complete all fields!");
          }
        }}
      >
        Next
      </button>
    </form>
  );
}
