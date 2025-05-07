"use client";

import { useEffect, useState } from "react";

export default function Calendar() {
  const todaysDate = new Date();
  const todaysMonth = todaysDate.getMonth();
  const todaysYear = todaysDate.getFullYear();
  const [calendar, setCalendar] = useState([]);
  const [month, setMonth] = useState(todaysMonth);
  const [year, setYear] = useState(todaysYear);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function getDaysInCurrentMonth() {
    const newCalendar = [];

    const currentDate = new Date();
    const currentYear = parseInt(year);
    const currentMonth = parseInt(month); // 0-based (0 = January, 11 = December)
    const currentDay = currentDate.getDate();
    console.log(currentDay);
    // Get the first day of the current month
    const firstDayOfCurrentMonth = new Date(currentYear, currentMonth, 1);
    const firstDayOfWeek = firstDayOfCurrentMonth.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // Adjust so the calendar starts on a Monday
    const daysFromPreviousMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    // Get the last day of the previous month
    const lastDayOfPreviousMonth = new Date(currentYear, currentMonth, 0);
    const daysInPreviousMonth = lastDayOfPreviousMonth.getDate();

    // Get the last day of the current month
    const lastDayOfCurrentMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfCurrentMonth.getDate();

    // Fill in days from the previous month
    for (
      let i = daysInPreviousMonth - daysFromPreviousMonth + 1;
      i <= daysInPreviousMonth;
      i++
    ) {
      newCalendar.push(
        <button
          onClick={() => {
            if (currentMonth == 0) {
              setSelectedDate(`${currentYear}-${currentMonth}-${i}`);
              setShowModal(true);
            } else {
              setSelectedDate(`${currentYear}-${currentMonth}-${i}`);
              setShowModal(true);
            }
          }}
          key={`prev-${i}`}
          className="flex hover:cursor-pointer flex-col p-5 gap-2 w-full h-44 rounded-lg bg-red-100 text-red-900 shadow-md"
        >
          <p className="text-2xl font-extrabold">{i}</p>
        </button>
      );
    }

    // Fill in days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      let currentDayStyle = " bg-red-300 shadow-red-500";
      if (i == currentDay && month == todaysMonth && year == todaysYear) {
        currentDayStyle = " bg-red-400 shadow-red-600";
      }
      newCalendar.push(
        <button
          onClick={() => {
            setSelectedDate(`${currentYear}-${currentMonth + 1}-${i}`);
            setShowModal(true);
          }}
          key={`current-${i}`}
          className={`flex hover:cursor-pointer flex-col p-5 gap-2 w-full h-44 rounded-lg ${currentDayStyle} text-red-900 shadow-md`}
        >
          <p className="text-2xl font-extrabold">{i}</p>
        </button>
      );
    }

    // Fill in days from the next month to make a total of 42 days
    const totalDaysDisplayed = 42;

    const remainingDays = totalDaysDisplayed - newCalendar.length;
    for (let i = 1; i <= remainingDays; i++) {
      newCalendar.push(
        <button
          onClick={() => {
            if (currentMonth == 11) {
              setSelectedDate(`${currentYear}-${currentMonth + 2}-${i}`);
              setShowModal(true);
            } else {
              setSelectedDate(`${currentYear}-${currentMonth + 2}-${i}`);
              setShowModal(true);
            }
          }}
          key={`next-${i}`}
          className="flex hover:cursor-pointer flex-col p-5 gap-2 w-full h-44 rounded-lg bg-red-100 text-red-900 shadow-md"
        >
          <p className="text-2xl font-extrabold">{i}</p>
        </button>
      );
    }

    setCalendar(newCalendar);
  }

  useEffect(() => {
    getDaysInCurrentMonth();
  }, [month, year]);

  return (
    <>
      <div className="flex flex-col w-full rounded-xl  gap-5 p-10 m-10">
        <div className="flex gap-10">
          <select
            className="flex font-bold w-1/6 outline-none text-red-900 text-2xl p-2 rounded-xl "
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
            }}
          >
            <option value={todaysYear - 2}>{todaysYear - 2}</option>
            <option value={todaysYear - 1}>{todaysYear - 1}</option>
            <option value={todaysYear}>{todaysYear}</option>
            <option value={todaysYear + 1}>{todaysYear + 1}</option>
            <option value={todaysYear + 2}>{todaysYear + 2}</option>
          </select>
          <select
            className="flex font-bold w-1/6 outline-none text-red-900 text-2xl p-2 rounded-xl "
            value={month}
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
        </div>

        <div className="grid grid-cols-7 grid-rows-1 gap-2">
          <p className="flex justify-center font-bold text-2xl text-red-900">
            mon
          </p>
          <p className="flex justify-center font-bold text-2xl text-red-900">
            tue
          </p>
          <p className="flex justify-center font-bold text-2xl text-red-900">
            wed
          </p>
          <p className="flex justify-center font-bold text-2xl text-red-900">
            thur
          </p>
          <p className="flex justify-center font-bold text-2xl text-red-900">
            fri
          </p>
          <p className="flex justify-center font-bold text-2xl text-red-900">
            sat
          </p>
          <p className="flex justify-center font-bold text-2xl text-red-900">
            sun
          </p>
        </div>

        <div
          className={`w-full grid grid-cols-7 ${
            calendar.length % 10 === 0
              ? `grid-rows-${calendar.length / 10}`
              : `grid-rows-${Math.floor(calendar.length / 10) + 1}`
          } gap-2`}
        >
          {calendar}
        </div>
      </div>
      {showModal && (
        <div className="fixed top-0 bg-white w-full rounded-xl min-h-screen">
          <button
            className="flex p-5 text-xl font-bold text-center hover:cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          <p className="text-3xl font-bold">{selectedDate}</p>
        </div>
      )}
    </>
  );
}
