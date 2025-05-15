"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function AdminDrawer({ isOpen, onClose }) {
  // Step 1: Define the state to hold form data
  const [formData, setFormData] = useState({
    user: "",
    role: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    recurrence: "none",
  });

  // Step 2: Handle changes to input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Step 3: Handle form submission (e.g., saving the schedule)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // You can replace the console log with actual submission logic, like sending data to an API
    // onSave(formData);  // Call a function to send the form data
  };

  return (
    <div className={`drawer drawer-end z-50 ${isOpen ? "open" : ""}`}>
      <input
        id="admin-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        readOnly
      />
      <div className="drawer-side z-50">
        <label
          htmlFor="admin-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={onClose}
        />
        <div className="menu p-6 w-96 min-h-full bg-[#713F12] text-[#FBC700] space-y-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white">Create Event</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Choose User */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#FBC700]">Choose User</span>
              </label>
              <select
                name="user"
                className="select select-bordered bg-[#411E03] text-white border-[#411E03] hover:border-[#FBC700] focus:border-[#FBC700] transition-colors"
                value={formData.user}
                onChange={handleChange}
              >
                <option disabled value="">
                  Select a user
                </option>
                <option value="user1">User 1</option>
                <option value="user2">User 2</option>
              </select>
            </div>

            {/* Pick a Role */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#FBC700]">Pick a Role</span>
              </label>
              <select
                name="role"
                className="select select-bordered bg-[#411E03] text-white border-[#411E03] hover:border-[#FBC700] focus:border-[#FBC700] transition-colors"
                value={formData.role}
                onChange={handleChange}
              >
                <option disabled value="">
                  Select a role
                </option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </select>
            </div>

            {/* Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#FBC700]">Date</span>
              </label>
              <input
                type="date"
                name="date"
                className="input input-bordered bg-[#411E03] text-white border-[#411E03] hover:border-[#FBC700] focus:border-[#FBC700] transition-colors"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            {/* Start and End Time */}
            <div className="flex gap-4">
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text text-[#FBC700]">Start Time</span>
                </label>
                <input
                  type="time"
                  name="startTime"
                  className="input input-bordered bg-[#411E03] text-white border-[#411E03] hover:border-[#FBC700] focus:border-[#FBC700] transition-colors"
                  value={formData.startTime}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text text-[#FBC700]">End Time</span>
                </label>
                <input
                  type="time"
                  name="endTime"
                  className="input input-bordered bg-[#411E03] text-white border-[#411E03] hover:border-[#FBC700] focus:border-[#FBC700] transition-colors"
                  value={formData.endTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#FBC700]">Description</span>
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered bg-[#411E03] text-white border-[#411E03] hover:border-[#FBC700] focus:border-[#FBC700] transition-colors"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Recurrence */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#FBC700]">Recurrence</span>
              </label>
              <select
                name="recurrence"
                className="select select-bordered bg-[#411E03] text-white border-[#411E03] hover:border-[#FBC700] focus:border-[#FBC700] transition-colors"
                value={formData.recurrence}
                onChange={handleChange}
              >
                <option value="none">None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {/* Save Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="btn w-full bg-[#FBC700] text-[#411E03] hover:bg-[#713F12] rounded-full py-3 transition-colors border-none"
              >
                Save Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
