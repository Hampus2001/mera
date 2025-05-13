"use client";

import MonthCalendar from "@/components/MonthCalendar";
import WeekCalendar from "@/components/WeekCalendar";
import { useState } from "react";

export default function SchedulePage() {
  const [activeCalendar, setActiveCalendar] = useState("Month");

  return (
    <div className="flex flex-col items-center gap-10 m-5 lg:m-20 font-instrument">
      <div className="flex w-full">
        <select
          className="select ui-app"
          value={activeCalendar}
          onChange={(e) => setActiveCalendar(e.target.value)}
        >
          <option value="Month">Month</option>
          <option value="Week">Week</option>
        </select>
      </div>
      {activeCalendar == "Month" && <MonthCalendar />}
      {activeCalendar == "Week" && <WeekCalendar />}
    </div>
  );
}
