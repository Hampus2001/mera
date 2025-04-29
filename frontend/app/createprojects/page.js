"use client";

import { useContext, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import LandingNav from "@/components/LandingNav";
import { HandleWorkspaceContext } from "@/context/WorkspaceContext";

export default function UserSchedule() {
  const { contextId } = useContext(HandleWorkspaceContext);
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState("");
  const [memberCount, setMemberCount] = useState(1);
  const [calendarTemplate, setCalendarTemplate] = useState("default");
  const [theme, setTheme] = useState("light");

  const [selectedUser, setSelectedUser] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [newShift, setNewShift] = useState({
    company_id: contextId,
    date: "",
    start: "",
    end: "",
  });

  const [users, setUsers] = useState();

  const handleNextStep = () => {
    if (projectName && memberCount && calendarTemplate && theme) {
      setStep(2);
      getUsersAndTime();
    } else {
      alert("Please fill out all project details!");
    }
  };

  const handleAddShift = () => {
    if (selectedUser && newShift.date && newShift.start && newShift.end) {
      const shift = {
        company_id: contextId,
        userId: selectedUser.id,
        date: newShift.date,
        start: newShift.start,
        end: newShift.end,
      };
      setShifts([...shifts, shift]);
      sendShift();
      setNewShift({ date: "", start: "", end: "" });
    }
  };

  async function sendShift() {
    const response = await fetch("http://localhost:3001/sendShift", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contextId, newShift }),
    });

    const allShifts = await response.json();
    console.log("all shifts:", allShifts);
  }

  async function getUsersAndTime() {
    const response = await fetch("http://localhost:3001/sendUsers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contextId }),
    });

    const filteredUsers = await response.json();
    console.log("users", filteredUsers);
    setUsers(filteredUsers);
  }

  const userShifts = shifts.filter((s) => s.userId === selectedUser?.id);

  return (
    <>
      <LandingNav variant="appMode" />
      <div className="flex flex-col min-h-screen items-center p-20 gap-10 font-instrument">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-row w-full p-10 m-10 bg-blue-200 dark:bg-slate-800 rounded-xl border-8 border-blue-300 dark:border-slate-700 shadow-lg"
            >
              {/* Left Sidebar */}
              <div className="w-1/3 flex flex-col gap-8 pr-10 border-r-4 border-blue-300 dark:border-slate-700">
                <h2 className="text-4xl font-bold text-black dark:text-white">
                  Create New Project
                </h2>

                {/* Project Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-lg font-semibold text-black dark:text-white">
                    Project Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter project name..."
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="p-3 rounded-xl bg-white dark:bg-slate-700 border"
                  />
                </div>

                {/* Member Count Buttons */}
                <div className="flex flex-col gap-2">
                  <label className="text-lg font-semibold text-black dark:text-white">
                    Number of Members
                  </label>
                  <div className="flex gap-4">
                    {["<5", "5-15", "15+"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setMemberCount(option)}
                        className={`px-6 py-3 rounded-xl font-bold ${
                          memberCount === option
                            ? "bg-blue-500 text-white"
                            : "bg-white dark:bg-slate-700 text-black dark:text-white border"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme Selection Buttons */}
                <div className="flex flex-col gap-2">
                  <label className="text-lg font-semibold text-black dark:text-white">
                    Theme
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {["Madrid", "Oslo", "Shanghai", "New York"].map((city) => (
                      <button
                        key={city}
                        onClick={() => setTheme(city)}
                        className={`py-4 rounded-xl font-bold ${
                          theme === city
                            ? "bg-blue-500 text-white"
                            : "bg-white dark:bg-slate-700 text-black dark:text-white border"
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleNextStep}
                  className="mt-6 w-full bg-blue-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow transition-all"
                >
                  GENERATE
                </button>
              </div>

              {/* Right Main Content */}
              <div className="w-2/3 flex flex-col pl-10">
                <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">
                  Choose a Calendar Template
                </h3>
                <div className="grid grid-cols-2 gap-8">
                  {["default", "modern", "classic", "creative"].map(
                    (template) => (
                      <div
                        key={template}
                        onClick={() => setCalendarTemplate(template)}
                        className={`cursor-pointer p-6 rounded-2xl border-4 ${
                          calendarTemplate === template
                            ? "border-blue-500"
                            : "border-transparent"
                        } bg-white dark:bg-slate-700 shadow-lg flex flex-col items-center justify-center transition-all hover:scale-105`}
                      >
                        {/* Placeholder for image */}
                        <div className="w-40 h-32 bg-gray-300 dark:bg-gray-600 rounded-xl mb-4" />
                        <p className="text-xl capitalize text-black dark:text-white">
                          {template}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2 (User Dropdown + Shift System) */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col w-full gap-5 p-10 m-10 bg-blue-200 dark:bg-slate-800 rounded-xl border-8 border-blue-300 dark:border-slate-700 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-black dark:text-white">
                User Schedule
              </h2>

              <select
                className="p-3 rounded-xl bg-blue-300 dark:bg-slate-600 dark:text-white text-black font-semibold"
                onChange={(e) =>
                  setSelectedUser(
                    users.find((u) => u.id === parseInt(e.target.value))
                  )
                }
              >
                <option value="">Select a user</option>
                {users?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>

              {selectedUser && (
                <div className="bg-white dark:bg-slate-700 p-5 rounded-xl shadow-md text-black dark:text-white">
                  <h3 className="text-2xl font-bold">{selectedUser.name}</h3>
                  <p className="text-lg">Role: {selectedUser.role}</p>

                  <div className="mt-5">
                    <h4 className="font-bold">Add Work Shift</h4>

                    <input
                      type="date"
                      value={newShift.date}
                      onChange={(e) =>
                        setNewShift({ ...newShift, date: e.target.value })
                      }
                      className="border p-2 rounded-md mr-2 bg-white dark:bg-slate-600 text-black dark:text-white"
                    />

                    <select
                      className="p-2 rounded-md border mr-2 bg-white dark:bg-slate-600 text-black dark:text-white"
                      value={newShift.start}
                      onChange={(e) =>
                        setNewShift({ ...newShift, start: e.target.value })
                      }
                    >
                      <option value="">from</option>
                      {Array.from({ length: 24 }, (_, hour) =>
                        ["00", "15", "30", "45"].map((minute) => {
                          const time = `${hour
                            .toString()
                            .padStart(2, "0")}:${minute}`;
                          return (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          );
                        })
                      ).flat()}
                    </select>

                    <select
                      className="p-2 rounded-md border mr-2 bg-white dark:bg-slate-600 text-black dark:text-white"
                      value={newShift.end}
                      onChange={(e) =>
                        setNewShift({ ...newShift, end: e.target.value })
                      }
                    >
                      <option value="">to</option>
                      {Array.from({ length: 24 }, (_, hour) =>
                        ["00", "15", "30", "45"].map((minute) => {
                          const time = `${hour
                            .toString()
                            .padStart(2, "0")}:${minute}`;
                          return (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          );
                        })
                      ).flat()}
                    </select>

                    <button
                      onClick={handleAddShift}
                      className="bg-blue-400 dark:bg-blue-600 px-4 py-2 rounded-lg text-white font-bold shadow cursor-pointer"
                    >
                      Add Shift
                    </button>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-bold">Shifts</h4>
                    <ul className="list-disc pl-5">
                      {userShifts.map((shift, index) => (
                        <li key={index}>
                          {shift.date} || {shift.start} - {shift.end}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
