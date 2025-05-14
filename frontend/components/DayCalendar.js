"use client";

import { HandleCalendarContext } from "@/context/CalendarContext";
import { useContext, useEffect, useState } from "react";

export default function DayCalendar() {
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

    let currentDayString = "";

    if (currentDay == 0) {
      currentDayString = "Sun";
    } else if (currentDay == 1) {
      currentDayString = "Mon";
    } else if (currentDay == 2) {
      currentDayString = "Tue";
    } else if (currentDay == 3) {
      currentDayString = "Wed";
    } else if (currentDay == 4) {
      currentDayString = "Thur";
    } else if (currentDay == 5) {
      currentDayString = "Fri";
    } else if (currentDay == 6) {
      currentDayString = "Sat";
    }

    const dayDate = new Date(baseDate);

    const dayStyle =
      dayDate.toDateString() === todaysDate.toDateString()
        ? "bg-secondary"
        : "bg-base-100";

    newCalendar.push(
      <div
        key={dayDate}
        className={`grid w-full grid-rows-25 grid-cols-1 justify-start items-start min-h-screen border-b border-l border-gray-300 ${dayStyle}`}
      >
        <p
          className={`flex ${
            dayDate.toDateString() === todaysDate.toDateString()
              ? "bg-secondary border-secondary-content text-secondary-content"
              : "bg-base-100 border-gray-300"
          } px-4 items-center font-bold justify-start w-full lg:p-4 p-0 border-b-2 row-span-1 h-full`}
        >
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
                className="flex w-full row-start-2 rounded-lg p-3 lg-p-1 bg-red-400 text-red-900 justify-center hover:cursor-pointer"
              >
                <p className="">{holiday.name}</p>
              </button>
            );
          }
        })}
      </div>
    );

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
              const newDate = new Date(year, month, todaysState - 1);
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
              const newDate = new Date(year, month, todaysState + 1);
              setTodaysState(newDate.getDate());
              setMonth(newDate.getMonth());
              setYear(newDate.getFullYear());
            }}
          >
            Next
          </button>
        </div>

        <div className="grid text-xs grid-cols-8 grid-rows-26 grid-auto-rows-[4rem] grid-auto-col w-full h-screen text-start border border-gray-300">
          <p className="flex items-center justify-center border-b row-span-2 lg:p-4 p-0 border-gray-300 col-start-1 row-start-1 h-full">
            Time
          </p>
          {Array.from({ length: 24 }).map((_, index) => (
            <p
              key={index}
              className={`flex text-xs lg:text-sm justify-center items-center border-b lg:p-4 p-0 border-gray-300 col-start-1 row-start-${
                index + 3
              }`}
            >
              {index.toString().padStart(2, "0")}:00
            </p>
          ))}

          <div className="flex col-span-7">{calendar}</div>
        </div>
      </div>
      {showModal && (
        <div
          className={`absolute bg-white w-auto p-4 gap-4 rounded-xl h-auto`}
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
