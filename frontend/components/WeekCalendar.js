"use client";

import { HandleCalendarContext } from "@/context/CalendarContext";
import { useContext } from "react";

export default function WeekCalendar() {
  const {
    redDays,
    setRedDays,
    year,
    setYear,
    month,
    setMonth,
    monthString,
    setMonthString,
  } = useContext(HandleCalendarContext);

  return (
    <div>
      <div></div>
    </div>
  );
}
