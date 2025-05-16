"use client";

import MonthCalendar from "@/components/MonthCalendar";
import WeekCalendar from "@/components/WeekCalendar";
import DayCalendar from "@/components/DayCalendar";
import { useContext, useState } from "react";

import { HandleCalendarContext } from "@/context/CalendarContext";
import AdminDrawer from "@/components/AdminDrawer";

export default function SchedulePage() {
  const { activeCalendar, setActiveCalendar } = useContext(
    HandleCalendarContext
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center gap-5 lg:gap-10 p-4 h-screen font-instrument">
        {activeCalendar == "Month" && (
          <MonthCalendar openDrawer={() => setDrawerOpen(true)} />
        )}
        {activeCalendar == "Week" && <WeekCalendar />}
        {activeCalendar == "Day" && <DayCalendar />}
      </div>
      <AdminDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
