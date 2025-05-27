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
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-4 text-base-content w-full"
      >
        <div className="flex flex-col gap-y-2 w-full">
          <label className="text-base-100 text-sm font-medium ml-2">
            Users
          </label>
          <select
            value={newShift.user_id}
            onChange={(e) =>
              setNewShift((prev) => ({ ...prev, user_id: e.target.value }))
            }
            className=" select w-full"
          >
            <option>Pick a User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <label className="text-base-100 text-sm font-medium ml-2">Role</label>
          <select
            value={newShift.role}
            onChange={(e) =>
              setNewShift((prev) => ({ ...prev, role: e.target.value }))
            }
            className="select w-full "
          >
            <option value="">Pick a role</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <label className="text-base-100 text-sm font-medium ml-2">Date</label>
          <input
            type="date"
            value={newShift.date}
            onChange={(e) =>
              setNewShift((prev) => ({ ...prev, date: e.target.value }))
            }
            className="input w-full"
          />
        </div>
        <div className="flex items-start justify-start gap-4 w-full">
          <div className="flex flex-col w-full gap-y-2">
            <label className="text-base-100 text-sm font-medium ml-2">
              Start
            </label>
            <input
              type="time"
              value={newShift.start}
              onChange={(e) =>
                setNewShift((prev) => ({ ...prev, start: e.target.value }))
              }
              className="input w-full"
            />
          </div>
          <div className="flex flex-col w-full gap-y-2">
            <label className="text-base-100 text-sm font-medium ml-2">
              End
            </label>
            <input
              type="time"
              value={newShift.end}
              onChange={(e) =>
                setNewShift((prev) => ({ ...prev, end: e.target.value }))
              }
              className="input w-full "
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-2 w-full">
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
            className=" textarea w-full  "
          />
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <label className="text-base-100 text-sm font-medium ml-2">
            Recurrence
          </label>
          <select
            value={newShift.recurrence}
            onChange={(e) =>
              setNewShift((prev) => ({ ...prev, recurrance: e.target.value }))
            }
            className="select w-full "
          >
            <option value="">None</option>
            <option value="once_week">Once a week</option>
            <option value="everyday">Every day</option>
          </select>
        </div>
      </form>
    </div>
  );
}
