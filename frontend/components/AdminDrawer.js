"use client";

import { useContext, useState } from "react";
import { HandleCalendarContext } from "@/context/CalendarContext";
import { HandleWorkspaceContext } from "@/context/WorkspaceContext";

export default function AdminDrawer() {
  const { shifts, setShifts } = useContext(HandleCalendarContext);
  const { users, company } = useContext(HandleWorkspaceContext);

  const [newShift, setNewShift] = useState({
    user_id: "",
    schedule_name: "",
    date: "",
    start: "",
    end: "",
    break_duration: "",
    description: "",
    role: "",
    recurrence: "",
  });

  const uniqueRoles = Array.from(
    new Set(shifts.map((shift) => shift.role).filter(Boolean))
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const shiftToAdd = {
      ...newShift,
      company_id: company || null,
    };

    setShifts((prevShifts) => [...prevShifts, shiftToAdd]);

    setNewShift({
      user_id: "",
      schedule_name: "",
      date: "",
      start: "",
      end: "",
      break_duration: "",
      description: "",
      role: "",
      recurrence: "",
    });

    console.log("New shift added:", shiftToAdd);
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-4 text-base-content w-full"
      >
        {/* User select */}
        <div className="flex flex-col gap-y-2 w-full">
          <label className="text-base-100 text-sm font-medium ml-2">
            Users
          </label>
          <select
            value={newShift.user_id}
            onChange={(e) =>
              setNewShift((prev) => ({ ...prev, user_id: e.target.value }))
            }
            className="select w-full"
          >
            <option value="">Pick a User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        {/* Role select */}
        <div className="flex flex-col gap-y-2 w-full">
          <label className="text-base-100 text-sm font-medium ml-2">Role</label>
          <select
            value={newShift.role}
            onChange={(e) =>
              setNewShift((prev) => ({ ...prev, role: e.target.value }))
            }
            className="select w-full"
          >
            <option value="">Pick a role</option>
            {uniqueRoles.length > 0 ? (
              uniqueRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))
            ) : (
              <>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </>
            )}
          </select>
        </div>

        {/* Date */}
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

        {/* Time */}
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
              className="input w-full"
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-y-2 w-full">
          <label className="text-base-100 text-sm font-medium ml-2">
            Comments
          </label>
          <textarea
            placeholder="Add shift description"
            value={newShift.description}
            onChange={(e) =>
              setNewShift((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="textarea w-full"
          />
        </div>

        {/* Recurrence */}
        <div className="flex flex-col gap-y-2 w-full">
          <label className="text-base-100 text-sm font-medium ml-2">
            Recurrence
          </label>
          <select
            value={newShift.recurrence}
            onChange={(e) =>
              setNewShift((prev) => ({
                ...prev,
                recurrence: e.target.value,
              }))
            }
            className="select w-full "
          >
            <option value="">None</option>
            <option value="once_week">Once a week</option>
            <option value="everyday">Every day</option>
          </select>
        </div>

        {/* <button type="submit" className="btn btn-primary w-full mt-4">
          Add Shift
        </button> */}
      </form>
    </div>
  );
}
