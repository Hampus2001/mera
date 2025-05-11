"use client";

import MonthCalendar from "@/components/MonthCalendar";

export default function SchedulePage() {
  return (
    <div className="flex flex-col items-center gap-10 mt-20 font-instrument">
      <MonthCalendar />
    </div>
  );
}
