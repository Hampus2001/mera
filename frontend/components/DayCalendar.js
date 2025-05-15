"use client";

import { HandleCalendarContext } from "@/context/CalendarContext";
import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function DayCalendar({ openDrawer }) {
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
    activeCalendar,
    setActiveCalendar,
  } = useContext(HandleCalendarContext);

  const [todaysState, setTodaysState] = useState(todaysDate.getDate());
  const [currentDayString, setCurrentDayString] = useState("");

  function getDaysInCurrentWeek() {
    const newCalendar = [];

    // Create a new date object based on `todaysState`
    const baseDate = new Date(year, month, todaysState);
    console.log("base", baseDate);
    const currentDay = baseDate.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

    if (currentDay == 0) {
      setCurrentDayString("Sunday");
    } else if (currentDay == 1) {
      setCurrentDayString("Monday");
    } else if (currentDay == 2) {
      setCurrentDayString("Tuesday");
    } else if (currentDay == 3) {
      setCurrentDayString("Wednesday");
    } else if (currentDay == 4) {
      setCurrentDayString("Thursday");
    } else if (currentDay == 5) {
      setCurrentDayString("Friday");
    } else if (currentDay == 6) {
      setCurrentDayString("Saturday");
    }

    const dayDate = new Date(baseDate);

    const dayStyle =
      dayDate.toDateString() === todaysDate.toDateString()
        ? "bg-neutral"
        : "bg-base-100";

    newCalendar.push(
      <div
        key={dayDate}
        className={`flex flex-col w-full justify-start items-start min-h-screen border-b border-l border-gray-300 ${dayStyle}`}
      >
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
                className="flex w-full rounded-lg p-3 lg-p-1 bg-red-400 text-red-900 justify-center hover:cursor-pointer"
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
        <div
          id="toggleDate"
          className="flex flex-col w-full justify-between gap-4"
        >
          <div className="flex justify-between gap-4">
            <select
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              className="select ui-app"
            >
              <option value={+year - 2}>{+year - 2}</option>
              <option value={+year - 1}>{+year - 1}</option>
              <option value={+year}>{+year}</option>
              <option value={+year + 1}>{+year + 1}</option>
              <option value={+year + 2}>{+year + 2}</option>
            </select>
            <select
              value={month}
              onChange={(e) => {
                setMonth(parseInt(e.target.value));
              }}
              className="select ui-app"
            >
              <option value="0">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
            </select>
            <select className="select ui-app">
              <option>Filter</option>
            </select>
          </div>

          <div className="flex justify-between gap-4">
            <select
              value={activeCalendar}
              onChange={(e) => setActiveCalendar(e.target.value)}
              className="select ui-app"
            >
              <option value="Month">Month Format</option>
              <option value="Week">Week Format</option>
              <option value="Day">Day Format</option>
            </select>

            <select
              value={(new Date(year, month, todaysState).getDay() + 6) % 7} // Dynamically calculate the day index (Monday = 0, ..., Sunday = 6)
              onChange={(e) => {
                const selectedDay = parseInt(e.target.value); // Get the selected day index (0 = Monday, ..., 6 = Sunday)
                const baseDate = new Date(year, month, todaysState); // Current date
                const currentDay = (baseDate.getDay() + 6) % 7; // Adjust so Monday = 0, ..., Sunday = 6
                const newDate = new Date(baseDate);
                newDate.setDate(baseDate.getDate() - currentDay + selectedDay); // Calculate the new date for the selected day
                setTodaysState(newDate.getDate()); // Update todaysState to the new date
              }}
              className="select ui-app"
            >
              <option value="0">Monday</option>
              <option value="1">Tuesday</option>
              <option value="2">Wednesday</option>
              <option value="3">Thursday</option>
              <option value="4">Friday</option>
              <option value="5">Saturday</option>
              <option value="6">Sunday</option>
            </select>
          </div>
        </div>

        <div className="flex text-xs w-full h-screen gap-1 text-start bg-base-100">
          <div className="flex flex-col w-fit mt-6 h-screen justify-between items-center bg-base-100">
            {Array.from({ length: 24 }).map((_, index) => (
              <p
                key={index}
                className={`flex text-xs lg:text-sm justify-center bg-base-100 items-center
              }`}
              >
                {index.toString().padStart(2, "0")}:00
              </p>
            ))}
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-center items-center">
              <p>
                {currentDayString} - {todaysState}
              </p>
            </div>
            <div className="flex w-full h-screen">{calendar}</div>
          </div>
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
      <button
        onClick={openDrawer}
        id="+"
        className="fixed flex items-center hover:cursor-pointer justify-center rounded-full right-10 bottom-8 w-16 h-16 bg-base-100 border-2 border-neutral shadow-lg "
      >
        <h4 className="text-neutral text-3xl">
          <FaPlus />
        </h4>
      </button>
    </>
  );
}
