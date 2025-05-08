"use client";

import { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import LandingNav from "@/components/LandingNav";
import { HandleWorkspaceContext } from "@/context/WorkspaceContext";

export default function UserSchedule() {
  const { contextId } = useContext(HandleWorkspaceContext);
  const [projectName, setProjectName] = useState("");
  const [memberCount, setMemberCount] = useState("<5");
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

  useEffect(() => {
    if (contextId) {
      setNewShift((prev) => ({ ...prev, company_id: contextId }));
      getUsersAndTime();
    }
  }, [contextId]);

  const [users, setUsers] = useState([]);

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
      sendShift(shift);
      setNewShift({ company_id: contextId, date: "", start: "", end: "" });
    }
  };

  async function sendShift(shift) {
    try {
      const response = await fetch("http://localhost:3001/sendShift", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shift),
      });
      const allShifts = await response.json();
      console.log("all shifts:", allShifts);
    } catch (err) {
      console.error("Error sending shift:", err);
    }
  }

  async function getUsersAndTime() {
    try {
      const response = await fetch("http://localhost:3001/sendUsers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contextId }),
      });
      const filteredUsers = await response.json();
      setUsers(filteredUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }

  const userShifts = shifts.filter((s) => s.userId === selectedUser?.id);

  return (
    <>
      <LandingNav variant="appMode" />
      <div className="flex min-h-screen">
        {/* Main Content */}
        <div className="flex flex-col flex-grow items-center px-8 pt-24 pb-16 gap-10 ">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-6xl flex flex-col gap-10"
          >
            {/* Project Setup */}
            <div className="bg-secondary p-10 rounded-box shadow-xl border border-base-300 flex flex-col lg:flex-row gap-10">
              {/* Left Panel */}
              <div className="lg:w-1/3 flex flex-col gap-6 pr-0 lg:pr-10 border-b lg:border-b-0 lg:border-r border-base-300">
                <h2 className="text-4xl text-base-content">
                  Create New Project
                </h2>

                <div className="form-control">
                  <label className="label font-semibold">Project Name</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name..."
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label font-semibold">
                    Number of Members
                  </label>
                  <div className="flex gap-2">
                    {["<5", "5-15", "15+"].map((option) => (
                      <button
                        key={option}
                        onClick={() => setMemberCount(option)}
                        className={`btn ${
                          memberCount === option ? "btn-primary" : "btn-outline"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-control">
                  <label className="label font-semibold">Theme</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Madrid", "Oslo", "Shanghai", "New York"].map((city) => (
                      <button
                        key={city}
                        onClick={() => setTheme(city)}
                        className={`btn ${
                          theme === city ? "btn-primary" : "btn-outline"
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel */}
              <div className="lg:w-2/3">
                <h2 className="text-2xl mb-4 text-center text-base-content">
                  Choose a Calendar Template
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {["default", "modern", "classic", "creative"].map(
                    (template) => (
                      <div
                        key={template}
                        onClick={() => setCalendarTemplate(template)}
                        className={`card cursor-pointer shadow-md transition-all hover:scale-105 ${
                          calendarTemplate === template
                            ? "border-primary border-4"
                            : "border border-base-300"
                        }`}
                      >
                        <div className="card-body items-center">
                          <div className="w-24 h-16 bg-base-300 rounded"></div>
                          <p className="capitalize text-base-content">
                            {template}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* User Scheduling */}
            <div className="bg-secondary p-10 rounded-box shadow-xl border border-base-300 w-full">
              <h2 className="text-3xl text-base-content mb-6">User Schedule</h2>

              <select
                className="select select-bordered w-full max-w-sm mb-6"
                onChange={(e) =>
                  setSelectedUser(
                    users.find((u) => u.id === parseInt(e.target.value))
                  )
                }
              >
                <option value="">Select a user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>

              {selectedUser && (
                <div className="bg-base-100 p-6 rounded-box shadow border border-base-300">
                  <h3 className="text-2xl font-bold">{selectedUser.name}</h3>
                  <p className="text-base">Role: {selectedUser.role}</p>

                  <div className="mt-5 space-y-2">
                    <h4 className="font-bold">Add Work Shift</h4>
                    <input
                      type="date"
                      value={newShift.date}
                      onChange={(e) =>
                        setNewShift({ ...newShift, date: e.target.value })
                      }
                      className="input input-bordered w-full max-w-xs"
                    />

                    <div className="flex flex-wrap gap-2 mt-2">
                      <select
                        className="select select-bordered"
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
                        className="select select-bordered"
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
                        className="btn btn-primary"
                      >
                        Add Shift
                      </button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-bold">Shifts</h4>
                    <ul className="list-disc ml-5">
                      {userShifts.map((shift, index) => (
                        <li key={index}>
                          {shift.date} || {shift.start} - {shift.end}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      {/* Drawer */}
      <div className="drawer drawer-end fixed z-40">
        {/* Drawer toggle input */}
        <input
          id="my-drawer-4"
          type="checkbox"
          className="drawer-toggle peer hidden"
        />

        {/* Drawer content (main page content area) */}
        <div className="drawer-content">
          {/* Toggle button */}
          <label
            htmlFor="my-drawer-4"
            className="btn btn-primary fixed right-4 top-20 z-50 peer-checked:hidden"
          >
            Open drawer
          </label>
        </div>

        {/* Drawer sidebar on the right */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            className="drawer-overlay"
            aria-label="close sidebar"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <li>
              <a>Overview</a>
            </li>
            <li>
              <a>Mail</a>
            </li>
            <li>
              <a>Tasks</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
