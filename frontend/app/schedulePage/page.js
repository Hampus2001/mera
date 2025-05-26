"use client";

import MonthCalendar from "@/components/MonthCalendar";
import WeekCalendar from "@/components/WeekCalendar";
import DayCalendar from "@/components/DayCalendar";
import { useState, useContext } from "react";
import ScheduleNav from "@/components/ScheduleNav";
import { HandleCalendarContext } from "@/context/CalendarContext";

import AdminDrawer from "@/components/AdminDrawer";
import Sidebar from "@/components/Sidebar";

export default function SchedulePage() {
  //Get "röda dagar"

  const [drawerOpen, setDrawerOpen] = useState(true);
  const { activeCalendar } = useContext(HandleCalendarContext);

  return (
    <>
      <Sidebar />

      <div className="w-screen overflow-hidden">
        <ScheduleNav />
        <div className="lg:pl-16 w-full h-full">
          {activeCalendar == "Month" && (
            <MonthCalendar openDrawer={() => setDrawerOpen(true)} />
          )}
          {activeCalendar == "Week" && <WeekCalendar />}
          {activeCalendar == "Day" && <DayCalendar />}
        </div>
      </div>
      <AdminDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
