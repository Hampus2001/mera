"use client";

import MyCalendar from "@/components/BigCalendar";

export default function SchedulePage() {
  return (
    <div className="flex flex-col items-center p-20 gap-10 font-instrument">
      <div className="w-full">
        <MyCalendar />
      </div>
    </div>
  );
}
