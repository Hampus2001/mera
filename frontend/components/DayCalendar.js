"use client";

import { HandleCalendarContext } from "@/context/CalendarContext";
import { useContext, useEffect, useState } from "react";

import { FaArrowLeft, FaArrowRight, FaPlus, FaBars } from "react-icons/fa";

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
  const [lastDayOfCurrentMonth, setLastDayOfCurrentMonth] = useState(
    new Date(year, month + 1, 0)
  );
  const [daysInMonth, setDaysInMonth] = useState(
    lastDayOfCurrentMonth.getDate()
  );

  function getDaysInCurrentWeek() {
    const newCalendar = [];

    const lastDayOfMonth = new Date(year, month + 1, 0);
    setDaysInMonth(lastDayOfMonth.getDate());

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
        ? "bg-base-100" //Change bgColor of todays date.
        : "bg-base-100";

    newCalendar.push(
      <div
        key={dayDate}
        className={`flex flex-col w-full justify-start items-start h-full border-b border-l border-gray-300 ${dayStyle}`}
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
      <div className="flex flex-col gap-4 lg:p-4 p-0 w-full h-screen">
        <div
          id="desktopView"
          className="flex w-full h-20 px-6 rounded-full items-center justify-between bg-base-100 text-neutral"
        >
          <h1 className="text-[32px]">MERA</h1>

          <div className="hidden lg:flex gap-4">
            <select
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              className="select ui-app w-fit"
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
              className="select ui-app w-fit"
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

            <select
              className="select ui-app"
              value={todaysState}
              onChange={(e) => setTodaysState(parseInt(e.target.value))}
            >
              {Array.from({ length: daysInMonth }).map((_, index) => (
                <option value={index + 1} key={index + 1}>
                  {year}-{month + 1 < 10 ? "0" + (month + 1) : month + 1}-
                  {index + 1 < 10 ? "0" + (index + 1) : index + 1}
                </option>
              ))}
            </select>

            <select
              value={activeCalendar}
              onChange={(e) => setActiveCalendar(e.target.value)}
              className="select ui-app w-fit"
            >
              <option value="Month">View month</option>
              <option value="Week">View week</option>
              <option value="Day">View day</option>
            </select>
            <select className="select ui-app w-fit">
              <option>Filter</option>
            </select>
          </div>

          <div className="hidden lg:flex w-fit justify-between items-center gap-4">
            <button className="btn btn-app bg-base-100 border-neutral btn-md">
              Settings
            </button>
            <button className="btn btn-app btn-primary btn-md">Share</button>
          </div>
          <FaBars className="flex lg:hidden text-[32px]" />
        </div>
        <div
          id="toggleDate"
          className="flex lg:hidden flex-col w-full justify-between gap-4"
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
              className="select ui-app"
              value={todaysState}
              onChange={(e) => setTodaysState(parseInt(e.target.value))}
            >
              {Array.from({ length: daysInMonth }).map((_, index) => (
                <option value={index + 1} key={index + 1}>
                  {year}-{month + 1 < 10 ? "0" + (month + 1) : month + 1}-
                  {index + 1 < 10 ? "0" + (index + 1) : index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-grow text-xs w-full gap-1 text-start bg-base-100">
          <div className="flex flex-col w-fit mt-6  justify-between items-center bg-base-100">
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
          <div className="flex flex-col w-full border devide-x devide-y devide-neutral">
            <div className="flex justify-center items-center border-b border-neutral h-6">
              <p>
                {currentDayString} - {todaysState}
              </p>
            </div>
            <div className="flex w-full h-full">{calendar}</div>
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
