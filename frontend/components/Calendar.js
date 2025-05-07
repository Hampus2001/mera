"use client";

import { useEffect, useRef, useState } from "react";

export default function Calendar() {
  const todaysDate = new Date();
  const todaysMonth = todaysDate.getMonth();
  const todaysYear = todaysDate.getFullYear();
  const [calendar, setCalendar] = useState([]);
  const [month, setMonth] = useState(todaysMonth);
  const [year, setYear] = useState(todaysYear);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [monthString, setMonthString] = useState("");

  //Get x and y coordinates for modal window

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const getCoordinates = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPosition({
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
    });
  };

  useEffect(() => {
    console.log(position);
  }, [position]);

  function getDaysInCurrentMonth() {
    convertMonthToString();

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
          onClick={(e) => {
            if (currentMonth == 0) {
              setSelectedDate(`${currentYear}-${currentMonth}-${i}`);
              setShowModal(true);
              getCoordinates(e);
            } else {
              setSelectedDate(`${currentYear}-${currentMonth}-${i}`);
              setShowModal(true);
              getCoordinates(e);
            }
          }}
          key={`prev-${i}`}
          className="flex hover:cursor-pointer flex-col p-5 border-b-2 border-l-2 border-gray-300 w-1/7 aspect-square bg-base-100 text-base-content "
        >
          <p className=" font-extrabold">{i}</p>
        </button>
      );
    }

    // Fill in days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      let currentDayStyle = " bg-base-200 ";
      if (i == currentDay && month == todaysMonth && year == todaysYear) {
        currentDayStyle = " bg-base-300 ";
      }
      newCalendar.push(
        <button
          onClick={(e) => {
            setSelectedDate(`${currentYear}-${currentMonth + 1}-${i}`);
            setShowModal(true);
            getCoordinates(e);
          }}
          key={`current-${i}`}
          className={`flex hover:cursor-pointer flex-col p-5  border-b-2 border-l-2 border-gray-300 w-1/7 aspect-square  ${currentDayStyle} text-base-content `}
        >
          <p className=" font-extrabold">{i}</p>
        </button>
      );
    }

    // Fill in days from the next month to make a total of 42 days
    const totalDaysDisplayed = 42;

    const remainingDays = totalDaysDisplayed - newCalendar.length;
    for (let i = 1; i <= remainingDays; i++) {
      newCalendar.push(
        <button
          onClick={(e) => {
            if (currentMonth == 11) {
              setSelectedDate(`${currentYear}-${currentMonth + 2}-${i}`);
              setShowModal(true);
              getCoordinates(e);
            } else {
              setSelectedDate(`${currentYear}-${currentMonth + 2}-${i}`);
              setShowModal(true);
              getCoordinates(e);
            }
          }}
          key={`next-${i}`}
          className="flex hover:cursor-pointer flex-col p-5 border-b-2 border-l-2 border-gray-300 w-1/7 aspect-square bg-base-100 text-base-content"
        >
          <p>{i}</p>
        </button>
      );
    }

    setCalendar(newCalendar);
  }

  function convertMonthToString() {
    if (month === 0) {
      setMonthString("January");
    } else if (month === 1) {
      setMonthString("February");
    } else if (month === 2) {
      setMonthString("March");
    } else if (month === 3) {
      setMonthString("April");
    } else if (month === 4) {
      setMonthString("May");
    } else if (month === 5) {
      setMonthString("June");
    } else if (month === 6) {
      setMonthString("July");
    } else if (month === 7) {
      setMonthString("August");
    } else if (month === 8) {
      setMonthString("September");
    } else if (month === 9) {
      setMonthString("October");
    } else if (month === 10) {
      setMonthString("November");
    } else if (month === 11) {
      setMonthString("December");
    }
  }

  useEffect(() => {
    getDaysInCurrentMonth();
  }, [month]);

  return (
    <>
      <div className="flex flex-col w-3/4 rounded-xl gap-4">
        <div className="flex gap-4">
          <h4 className="w-1/5">
            {monthString} - {year}
          </h4>
          <button
            className="btn btn-app btn-secondary btn-sm md:btn-md lg:btn-lg"
            onClick={() => {
              if (month != 0) {
                setMonth(month - 1);
              } else if (month == 0) {
                setYear(year - 1);
                setMonth(11);
              }
            }}
          >
            Privious
          </button>

          <button
            className="btn btn-app btn-secondary btn-sm md:btn-md lg:btn-lg"
            onClick={() => {
              if (month != 11) {
                setMonth(month + 1);
              } else if (month == 11) {
                setYear(year + 1);
                setMonth(0);
              }
            }}
          >
            Next
          </button>
        </div>

        <div className="grid grid-cols-7 grid-rows-1 gap-2">
          <p className="flex justify-center font-bold  text-base-content">
            mon
          </p>
          <p className="flex justify-center font-bold  text-base-content">
            tue
          </p>
          <p className="flex justify-center font-bold  text-base-content">
            wed
          </p>
          <p className="flex justify-center font-bold  text-base-content">
            thur
          </p>
          <p className="flex justify-center font-bold  text-base-content">
            fri
          </p>
          <p className="flex justify-center font-bold  text-base-content">
            sat
          </p>
          <p className="flex justify-center font-bold  text-base-content">
            sun
          </p>
        </div>

        <div className="flex flex-wrap border-t-2 border-r-2 border-gray-300">
          {calendar}
        </div>
      </div>
      {showModal && (
        <div
          className={`absolute bg-white w-1/6 rounded-xl h-96`}
          style={{ top: position.y, left: position.x }}
        >
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
