"use client";

import MonthCalendar from "@/components/MonthCalendar";
import WeekCalendar from "@/components/WeekCalendar";
import DayCalendar from "@/components/DayCalendar";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import NavAppMobile from "@/components/NavAppMobile";

export default function SchedulePage() {
  const [activeCalendar, setActiveCalendar] = useState("Month");

  return (
    <>
      {/* <Navbar /> */}
      <NavAppMobile className="flex lg:hidden" />
      <div className="flex flex-col items-center gap-5 lg:gap-10  lg:m-20 font-instrument">
        {activeCalendar == "Month" && <MonthCalendar />}
        {activeCalendar == "Week" && <WeekCalendar />}
        {activeCalendar == "Day" && <DayCalendar />}
        <div className="flex w-full">
          <select
            className="select ui-app"
            value={activeCalendar}
            onChange={(e) => setActiveCalendar(e.target.value)}
          >
            <option value="Month">Month</option>
            <option value="Week">Week</option>
            <option value="Day">Day</option>
          </select>
        </div>
      </div>
    </>
  );
}
