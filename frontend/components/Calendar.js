"use client";

import { useEffect, useState } from "react";

export default function Calendar() {
  const [calendar, setCalendar] = useState([]);
  const [month, setMonth] = useState();

  function getDaysInCurrentMonth() {
    const newCalendar = [];

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = parseInt(month); // 0-based (0 = January, 11 = December)

    // Get the last day of the current month
    const lastDayOfCurrentMonth = new Date(currentYear, currentMonth + 1, 0);

    // The day of the month will give us the total number of days in the current month
    const daysInMonth = lastDayOfCurrentMonth.getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      newCalendar.push(
        <div
          key={i}
          className="flex flex-col bg-red-300 p-5 gap-2 w-full h-44 rounded-lg  text-red-950 shadow-md shadow-red-500"
        >
          <p className="text-2xl font-extrabold">{i}</p>
          <div>
            <p>Se din tid här:</p>
            <p>klicka för att se allas pass</p>
          </div>
        </div>
      );
    }
    setCalendar(newCalendar);
  }

  useEffect(() => {
    getDaysInCurrentMonth();
  }, [month]);

  return (
    <div className="flex flex-col rounded-xl border-8 border-red-300 bg-red-100 gap-5 p-10 m-10">
      <select
        className="flex font-bold w-1/6 bg-red-300 p-2 rounded-xl shadow-md shadow-red-400 "
        onChange={(e) => {
          setMonth(e.target.value);
        }}
      >
        <option value="0">January</option>
        <option value="1">February</option>
        <option value="2">Mars</option>
        <option value="3">April</option>
        <option value="4">May</option>
        <option value="5">June</option>
        <option value="6">Juli</option>
        <option value="7">August</option>
        <option value="8">September</option>
        <option value="9">October</option>
        <option value="10">November</option>
        <option value="11">December</option>
      </select>

      <div
        className={`grid grid-cols-10 ${
          calendar.length % 10 === 0
            ? `grid-rows-${calendar.length / 10}`
            : `grid-rows-${Math.floor(calendar.length / 10) + 1}`
        } gap-2`}
      >
        {calendar}
      </div>
    </div>
  );
}
