"use client";

import { HandleCalendarContext } from "@/context/CalendarContext";
import { useContext, useEffect, useState } from "react";

export default function WeekCalendar() {
  const [calendar, setCalendar] = useState([]);
  const {
    redDays,
    setRedDays,
    year,
    setYear,
    month,
    setMonth,
    monthString,
    setMonthString,
    todaysDate,
    todaysYear,
    todaysMonth,
  } = useContext(HandleCalendarContext);

  function getDaysInCurrentMonth() {
    const newCalendar = [];

    const currentDayDate = todaysDate.getDate();
    const currentDay = todaysDate.getDay(); // sun = 0 ...... sat = 6

    for (let i = 0; i < 7; i++) {
      if (i == currentDay) {
        newCalendar.push(
          <div
            key={i}
            className="flex w-1/7 p-4 justify-center min-h-screen bg-secondary border-b-2 border-l-2 border-gray-300"
          >
            <p>{currentDayDate}</p>
          </div>
        );
      } else if (i < currentDay) {
        const generatedDayDate = currentDayDate - currentDay + i;
        newCalendar.push(
          <div
            key={i}
            className="flex w-1/7 p-4 justify-center min-h-screen bg-base-100 border-b-2 border-l-2 border-gray-300"
          >
            <p>{generatedDayDate}</p>
          </div>
        );
      } else if (i > currentDay) {
        const generatedDayDate = currentDayDate + i - currentDay;

        newCalendar.push(
          <div
            key={i}
            className="flex w-1/7 p-4 justify-center min-h-screen bg-base-100 border-b-2 border-l-2 border-gray-300"
          >
            <p>{generatedDayDate}</p>
          </div>
        );
      }
    }

    setCalendar(newCalendar);
  }

  useEffect(() => {
    getDaysInCurrentMonth();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <h4>
          {monthString} - {year}
        </h4>
      </div>

      <div className="flex w-full">
        <div className="flex flex-col justify-between p-4 border-b-2 border-l-2 border-t-2 border-gray-300">
          <p className="border-b border-gray-300">Time</p>
          <p className="border-b border-gray-300">00:00</p>
          <p className="border-b border-gray-300">01:00</p>
          <p className="border-b border-gray-300">02:00</p>
          <p className="border-b border-gray-300">03:00</p>
          <p className="border-b border-gray-300">04:00</p>
          <p className="border-b border-gray-300">05:00</p>
          <p className="border-b border-gray-300">06:00</p>
          <p className="border-b border-gray-300">07:00</p>
          <p className="border-b border-gray-300">08:00</p>
          <p className="border-b border-gray-300">09:00</p>
          <p className="border-b border-gray-300">10:00</p>
          <p className="border-b border-gray-300">11:00</p>
          <p className="border-b border-gray-300">12:00</p>
          <p className="border-b border-gray-300">13:00</p>
          <p className="border-b border-gray-300">14:00</p>
          <p className="border-b border-gray-300">15:00</p>
          <p className="border-b border-gray-300">16:00</p>
          <p className="border-b border-gray-300">17:00</p>
          <p className="border-b border-gray-300">18:00</p>
          <p className="border-b border-gray-300">19:00</p>
          <p className="border-b border-gray-300">20:00</p>
          <p className="border-b border-gray-300">21:00</p>
          <p className="border-b border-gray-300">22:00</p>
          <p className="border-b border-gray-300">23:00</p>
        </div>
        <div className="flex w-full border-r-2 border-t-2 border-gray-300">
          {calendar}
        </div>
      </div>
    </div>
  );
}
