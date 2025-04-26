"use client";

import { useContext, useState } from "react";
import LandingNav from "@/components/LandingNav";
import { HandleWorkspaceContext } from "@/context/WorkspaceContext";

/* const users = [
  { id: 1, name: "Irene ", role: "UI/UX" },
  { id: 2, name: "Joel ", role: "UI/UX" },
  { id: 3, name: "Hampus", role: "Backend" },
  { id: 4, name: "Justus", role: "DevOps" },
  { id: 5, name: "Mohamed", role: "Frontend" },
]; */

export default function UserSchedule() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [newShift, setNewShift] = useState({ date: "", start: "", end: "" });
  const { contextId } = useContext(HandleWorkspaceContext);
  const [users, setUsers] = useState();

  const handleAddShift = () => {
    if (selectedUser && newShift.date && newShift.start && newShift.end) {
      const shift = {
        userId: selectedUser.id,
        date: newShift.date,
        start: newShift.start,
        end: newShift.end,
      };
      setShifts([...shifts, shift]);
      setNewShift({ date: "", start: "", end: "" });
    }
  };

  //Send data and get data from server
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
      <div className="flex flex-col min-h-screen items-center p-36 gap-10 font-instrument">
        <div className="flex w-full flex-col gap-5 p-10 m-10 bg-blue-200 dark:bg-slate-800 rounded-xl border-8 border-blue-300 dark:border-slate-700 shadow-lg">
          <h2 className="text-3xl font-bold text-black dark:text-white">
            User Schedule
          </h2>

          <button className="btn btn-lg btn-primary" onClick={getUsersAndTime}>
            test
          </button>

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
        </div>
      </div>
    </>
  );
}
