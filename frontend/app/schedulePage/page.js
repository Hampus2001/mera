"use client";

import MonthCalendar from "@/components/MonthCalendar";
import WeekCalendar from "@/components/WeekCalendar";

export default function SchedulePage() {
  return (
    <div className="flex flex-col items-center gap-10 m-5 lg:m-20 font-instrument">
      <MonthCalendar />
      <WeekCalendar />
    </div>
  );
}
