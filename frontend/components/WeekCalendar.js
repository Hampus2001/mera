"use client";

import { HandleCalendarContext } from "@/context/CalendarContext";
import { useContext, useEffect, useState } from "react";

export default function WeekCalendar() {
  //Get x and y coordinates for modal window
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const getCoordinates = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPosition({
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
    });
  };

  const [calendar, setCalendar] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

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

  const [todaysState, setTodaysState] = useState(todaysDate.getDate());

  function getDaysInCurrentWeek() {
    const newCalendar = [];

    // Create a new date object based on `todaysState`
    const baseDate = new Date(year, month, todaysState);
    console.log("base", baseDate);
    const currentDay = baseDate.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

    for (let i = 0; i < 7; i++) {
      let currentDayString = "";

      if (i == 0) {
        currentDayString = "Sun";
      } else if (i == 1) {
        currentDayString = "Mon";
      } else if (i == 2) {
        currentDayString = "Tue";
      } else if (i == 3) {
        currentDayString = "Wed";
      } else if (i == 4) {
        currentDayString = "Thur";
      } else if (i == 5) {
        currentDayString = "Fri";
      } else if (i == 6) {
        currentDayString = "Sat";
      }

      const dayDate = new Date(baseDate);
      dayDate.setDate(baseDate.getDate() - currentDay + i); // Calculate each day in the week

      const dayStyle =
        dayDate.toDateString() === todaysDate.toDateString()
          ? "bg-secondary"
          : "bg-base-100";

      newCalendar.push(
        <div
          key={i}
          className={`grid w-full grid-rows-26 grid-cols-1 justify-start items-start min-h-screen border-b-2 border-l-2 border-gray-300 ${dayStyle}`}
        >
          <p className="flex w-full lg:p-4 p-0 border-b border-gray-300 row-span-2 h-full">
            {currentDayString} - {dayDate.getDate()}
          </p>

          {redDays.map((holiday) => {
            if (
              holiday.date ==
              year +
                "-" +
                (month + 1 < 10 ? "0" + (month + 1) : month + 1) +
                "-" +
                (dayDate.getDate() < 10
                  ? "0" + dayDate.getDate()
                  : dayDate.getDate())
            ) {
              return (
                <button
                  onClick={(e) => {
                    setSelectedDate(
                      year +
                        "-" +
                        (month + 1 < 10 ? "0" + (month + 1) : month + 1) +
                        "-" +
                        (dayDate.getDate() < 10
                          ? "0" + dayDate.getDate()
                          : dayDate.getDate())
                    );
                    setSelectedEvents(holiday.name);
                    getCoordinates(e);
                    setShowModal(true);
                  }}
                  key={dayDate.getDate()}
                  className="flex w-full row-start-3 rounded-lg p-3 lg-p-1 bg-red-400 text-red-900 justify-center"
                >
                  <p className="hidden lg:flex">{holiday.name}</p>
                </button>
              );
            }
          })}
        </div>
      );
    }

    setCalendar(newCalendar);
  }

  useEffect(() => {
    getDaysInCurrentWeek();
  }, [todaysState, month, year]);

  return (
    <>
      <div className="flex flex-col gap-4 lg:p-4 p-0 w-full">
        <div className="flex lg:p-4 p-0 gap-4">
          <h4>
            {monthString} - {year}
          </h4>

          <button
            className="btn btn-app btn-secondary"
            onClick={() => {
              const newDate = new Date(year, month, todaysState - 7);
              setTodaysState(newDate.getDate());
              setMonth(newDate.getMonth());
              setYear(newDate.getFullYear());
            }}
          >
            Previous
          </button>
          <button
            className="btn btn-app btn-secondary"
            onClick={() => {
              const newDate = new Date(year, month, todaysState + 7);
              setTodaysState(newDate.getDate());
              setMonth(newDate.getMonth());
              setYear(newDate.getFullYear());
            }}
          >
            Next
          </button>
        </div>

        <div className="grid text-xs grid-cols-8 grid-rows-26 grid-auto-rows-[4rem] grid-auto-col w-full h-screen text-start border border-gray-300">
          <p className="border-b row-span-2 lg:p-4 p-0 border-gray-300 col-start-1 row-start-1 h-full">
            Time
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-3">
            00:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-4">
            01:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-5">
            02:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-6">
            03:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-7">
            04:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-8">
            05:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-9">
            06:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-10">
            07:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-11">
            08:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-12">
            09:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-13">
            10:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-14">
            11:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-15">
            12:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-16">
            13:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-17">
            14:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-18">
            15:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-19">
            16:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-20">
            17:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-21">
            18:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-22">
            19:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-23">
            20:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-24">
            21:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-25">
            22:00
          </p>
          <p className="border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-26">
            23:00
          </p>
          <div className="flex col-span-7">{calendar}</div>
        </div>
      </div>
      {showModal && (
        <div
          className={`absolute bg-white w-1/6 p-4 gap-4 rounded-xl h-auto`}
          style={{ top: position.y, left: position.x }}
        >
          <button
            className="btn btn-app btn-accent"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          <p>{selectedDate}</p>
          <hr></hr>
          <h4>{selectedEvents ? selectedEvents : ""}</h4>
        </div>
      )}
    </>
  );
}
