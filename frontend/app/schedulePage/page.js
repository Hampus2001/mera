"use client";

import MonthCalendar from "@/components/MonthCalendar";
import WeekCalendar from "@/components/WeekCalendar";
import DayCalendar from "@/components/DayCalendar";
import { useContext, useState } from "react";
import Navbar from "@/components/Navbar";
import NavAppMobile from "@/components/NavAppMobile";
import { HandleCalendarContext } from "@/context/CalendarContext";

export default function SchedulePage() {
  const { activeCalendar, setActiveCalendar } = useContext(
    HandleCalendarContext
  );

  return (
    <>
      {/* <Navbar /> */}
      <NavAppMobile className="flex lg:hidden" />
      <div className="flex flex-col items-center gap-5 lg:gap-10 p-4  lg:m-20 font-instrument">
        {activeCalendar == "Month" && <MonthCalendar />}
        {activeCalendar == "Week" && <WeekCalendar />}
        {activeCalendar == "Day" && <DayCalendar />}
      </div>
    </>
  );
}
