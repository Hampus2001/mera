"use client";

import { HandleCalendarContext } from "@/context/CalendarContext";
import { useContext, useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { FaPlus } from "react-icons/fa";

export default function WeekCalendar() {
  //Get x and y coordinates for modal window
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { width, height } = useWindowSize();
  console.log(width, height);
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

  function getDaysInCurrentWeek() {
    const newCalendar = [];

    // Create a new date object based on `todaysState`
    const baseDate = new Date(year, month, todaysState);
    console.log("base", baseDate);
    const currentDay = (baseDate.getDay() + 6) % 7; // Adjust so Monday = 0, ..., Sunday = 6

    for (let i = 0; i < 7; i++) {
      let currentDayString = "";

      if (i == 0) {
        currentDayString = "Mon";
      } else if (i == 1) {
        currentDayString = "Tue";
      } else if (i == 2) {
        currentDayString = "Wed";
      } else if (i == 3) {
        currentDayString = "Thur";
      } else if (i == 4) {
        currentDayString = "Fri";
      } else if (i == 5) {
        currentDayString = "Sat";
      } else if (i == 6) {
        currentDayString = "Sun";
      }

      const dayDate = new Date(baseDate);
      dayDate.setDate(baseDate.getDate() - currentDay + i); // Calculate each day in the week

      const dayStyle =
        dayDate.toDateString() === todaysDate.toDateString()
          ? "bg-secondary text-secondary-content"
          : "bg-base-100";

      newCalendar.push(
        <div
          key={i}
          className={`grid w-full grid-rows-26 grid-cols-1 justify-start items-start min-h-screen border-b-2 border-l-2 border-gray-300 ${dayStyle}`}
        >
          <p className="flex w-full justify-center lg:justify-start items-center lg:p-4 p-0 border-b border-gray-300 row-span-1 h-full">
            {currentDayString}
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
                  className="flex w-full row-start-3 rounded-lg p-3 lg-p-1 bg-red-400 text-red-900 justify-center hover:cursor-pointer"
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
  }, [todaysState, month, year, redDays]);

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
                setMonth(e.target.value);
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

          <div className="flex w-full justify-between gap-4">
            <select
              value={activeCalendar}
              onChange={(e) => setActiveCalendar(e.target.value)}
              className="select ui-app"
            >
              <option value="Month">Month Format</option>
              <option value="Week">Week Format</option>
              <option value="Day">Day Format</option>
            </select>

            <select></select>
          </div>
        </div>

        <div className="grid text-xs grid-cols-8 grid-rows-26 grid-auto-rows-[4rem] grid-auto-col w-full h-screen text-start ">
          <p className="flex justify-center items-center  row-span-2 lg:p-4 p-0  col-start-1 row-start-1 h-full"></p>
          {Array.from({ length: 24 }).map((_, index) => (
            <p
              key={index}
              className={`flex text-xs lg:text-sm justify-center items-center lg:p-4 p-0 col-start-1 row-start-${
                index + 2
              }`}
            >
              {index.toString().padStart(2, "0")}:00
            </p>
          ))}
          <div className="flex col-span-7 row-start-1">{calendar}</div>
        </div>
      </div>
      {showModal && (
        <div
          className={`absolute bg-white w-auto p-4 gap-4 rounded-xl h-auto`}
          style={{
            top: position.y > height - 50 ? position.y : position.y - 20,
            left:
              position.x > width - 200
                ? width - 150
                : position.x < 0
                ? 0
                : position.x,
          }}
        >
          <button
            className="btn btn-app btn-neutral"
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
        id="+"
        className="fixed flex items-center hover:cursor-pointer justify-center rounded-full right-4 bottom-8 w-16 h-16 bg-neutral shadow-lg "
      >
        <h4 className="text-primary text-3xl">
          <FaPlus />
        </h4>
      </button>
    </>
  );
}
