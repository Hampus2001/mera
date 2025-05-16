"use client";

import { useContext, useEffect, useState } from "react";
import { HandleWorkspaceContext } from "@/context/WorkspaceContext";

export default function AdminDrawer() {
  const { activeUser } = useContext(HandleWorkspaceContext);
  const [users, setUsers] = useState([]);
  const [newShift, setNewShift] = useState({
    user_id: "",
    schedule_name: "",
    date: "",
    start: "",
    end: "",
    break_duration: "",
    description: "",
  });

  // Only fetch users if admin is logged in
  useEffect(() => {
    if (activeUser?.admin) {
      fetch("http://localhost:3001/sendUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contextId: activeUser.company_id }),
      })
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.error("Failed to fetch users:", err));
    }
  }, [activeUser]);

  // Conditionally render for admin only
  if (!activeUser?.admin) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/sendShift", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contextId: activeUser.company_id,
          newShift,
        }),
      });

      const data = await res.json();
      console.log("Shift saved:", data);
    } catch (err) {
      console.error("Failed to send shift:", err);
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow-md max-w-xl mx-auto bg-white mt-8">
      <h2 className="text-xl font-semibold mb-4">Create New Shift</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          required
          value={newShift.user_id}
          onChange={(e) =>
            setNewShift((prev) => ({ ...prev, user_id: e.target.value }))
          }
          className="select w-full"
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Schedule Name"
          value={newShift.schedule_name}
          onChange={(e) =>
            setNewShift((prev) => ({ ...prev, schedule_name: e.target.value }))
          }
          className="input w-full"
          required
        />

        <input
          type="date"
          value={newShift.date}
          onChange={(e) =>
            setNewShift((prev) => ({ ...prev, date: e.target.value }))
          }
          className="input w-full"
          required
        />

        <input
          type="time"
          placeholder="Start"
          value={newShift.start}
          onChange={(e) =>
            setNewShift((prev) => ({ ...prev, start: e.target.value }))
          }
          className="input w-full"
          required
        />

        <input
          type="time"
          placeholder="End"
          value={newShift.end}
          onChange={(e) =>
            setNewShift((prev) => ({ ...prev, end: e.target.value }))
          }
          className="input w-full"
          required
        />

        <input
          type="number"
          placeholder="Break duration (min)"
          value={newShift.break_duration}
          onChange={(e) =>
            setNewShift((prev) => ({
              ...prev,
              break_duration: e.target.value,
            }))
          }
          className="input w-full"
          required
        />

        <textarea
          placeholder="Description"
          value={newShift.description}
          onChange={(e) =>
            setNewShift((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          className="textarea w-full"
        />

        <button type="submit" className="btn btn-primary w-full">
          Save Shift
        </button>
      </form>
    </div>
  );
}
