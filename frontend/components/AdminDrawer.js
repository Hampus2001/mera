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

  // // Only fetch users if admin is logged in
  // useEffect(() => {
  //   if (activeUser?.admin) {
  //     fetch("http://localhost:3001/sendUsers", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ contextId: activeUser.company_id }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => setUsers(data))
  //       .catch((err) => console.error("Failed to fetch users:", err));
  //   }
  // }, [activeUser]);

  // // Conditionally render for admin only
  // if (!activeUser?.admin) return null;

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
    <div className="p-4 mx-auto bg-neutral text-neutral-content mt-4">
      <form onSubmit={handleSubmit} className="space-y-4 text-neutral">
        <label className="text-base-100 text-sm font-medium ml-2">Users</label>
        <select
          required
          value={newShift.user_id}
          onChange={(e) =>
            setNewShift((prev) => ({ ...prev, user_id: e.target.value }))
          }
          className="rounded-xl select w-full mt-2 mb-6"
        >
          <option value="">Pick a User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        <label className="text-base-100 text-sm font-medium ml-2">Role</label>
        <select
          value={newShift.role}
          onChange={(e) =>
            setNewShift((prev) => ({ ...prev, role: e.target.value }))
          }
          className="select w-full rounded-xl mt-2 mb-6"
        >
          <option value="">Pick a role</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>

        <label className="text-base-100 text-sm font-medium ml-2">Date</label>
        <input
          type="date"
          value={newShift.date}
          onChange={(e) =>
            setNewShift((prev) => ({ ...prev, date: e.target.value }))
          }
          className="input w-full rounded-xl mt-2 mb-6"
          required
        />
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-base-100 text-sm font-medium ml-2">
              Start
            </label>
            <input
              type="time"
              value={newShift.start}
              onChange={(e) =>
                setNewShift((prev) => ({ ...prev, start: e.target.value }))
              }
              className="input rounded-xl w-full mt-2 mb-6"
              required
            />
          </div>
          <div className="flex-1 mb-0">
            <label className="text-base-100 text-sm font-medium ml-2">
              End
            </label>
            <input
              type="time"
              value={newShift.end}
              onChange={(e) =>
                setNewShift((prev) => ({ ...prev, end: e.target.value }))
              }
              className="input w-full rounded-xl mt-2 mb-6"
              required
            />
          </div>
        </div>
        <label className="text-base-100 text-sm font-medium ml-2">
          Comments
        </label>
        <textarea
          placeholder="This is my Bio description that I've added to my profile"
          value={newShift.description}
          onChange={(e) =>
            setNewShift((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          className=" rounded-xl textarea w-full h-32 mt-2 mb-6 "
        />
        <label className="text-base-100 text-sm font-medium ml-2">
          Regularly
        </label>
        <select
          value={newShift.regularly}
          onChange={(e) =>
            setNewShift((prev) => ({ ...prev, regularly: e.target.value }))
          }
          className="select w-full rounded-xl mt-2 mb-6"
        >
          <option value="">One-time only</option>
          <option value="once_week">Once a week</option>
          <option value="everyday">Every day</option>
        </select>
        <button
          type="submit"
          className="btn btn-neutral rounded-full  border-neutral-content w-full"
        >
          Add to My Schedule
        </button>
      </form>
    </div>
  );
}
