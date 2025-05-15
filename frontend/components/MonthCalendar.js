"use client";

import { HandleCalendarContext } from "@/context/CalendarContext";
import next from "next";
import { useContext, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa";
import { useWindowSize } from "@/hooks/useWindowSize";

export default function Calendar() {
  //states
  const todaysDate = new Date();
  const todaysMonth = todaysDate.getMonth();
  const todaysYear = todaysDate.getFullYear();
  const [calendar, setCalendar] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [firstWeekOfMonth, setFirstWeekOfMonth] = useState("");

  //Get x and y coordinates for modal window
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { width, height } = useWindowSize();

  const getCoordinates = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPosition({
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
    });
  };

  //Get "röda dagar"
  const {
    redDays,
    setRedDays,
    year,
    setYear,
    month,
    setMonth,
    monthString,
    setMonthString,
    activeCalendar,
    setActiveCalendar,
    getISOWeekNumber,
  } = useContext(HandleCalendarContext);

  useEffect(() => {
    if (showModal == true) {
      const selectedHoliday = redDays?.find(
        (holiday) => holiday.date == selectedDate
      );
      if (selectedHoliday != undefined) {
        setSelectedEvents(selectedHoliday.name);
      }
    }
  }, [showModal]);

  function getDaysInCurrentMonth() {
    const newCalendar = [];

    const currentDate = new Date();
    const currentYear = parseInt(year);
    const currentMonth = parseInt(month); // 0-based (0 = January, 11 = December)
    const currentDay = currentDate.getDate();

    const monthStartWeek = getISOWeekNumber(
      `${currentYear}-${
        currentMonth + 1 < 10 ? "0" + (currentMonth + 1) : currentMonth + 1
      }-01`
    );
    setFirstWeekOfMonth(monthStartWeek);

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

    //convert month 6 to 06 and leave dubble digit months
    let activeMonth = 0;
    if (currentMonth < 10) {
      activeMonth = "0" + currentMonth;
    } else if (currentMonth > 9) {
      activeMonth = currentMonth;
    }

    // Fill in days from the previous month
    for (
      let i = daysInPreviousMonth - daysFromPreviousMonth + 1;
      i <= daysInPreviousMonth + 1;
      i++
    ) {
      newCalendar.push(
        <button
          onClick={(e) => {
            if (currentMonth == 0) {
              setSelectedDate(`${currentYear - 1}-12-${i < 10 ? "0" + i : i}`);
              setSelectedEvents([]);
              setShowModal(true);
              getCoordinates(e);
            } else {
              setSelectedDate(
                `${currentYear}-${
                  currentMonth < 10 ? "0" + currentMonth : currentMonth
                }-${i < 10 ? "0" + i : i}`
              );
              setSelectedEvents([]);
              setShowModal(true);
              getCoordinates(e);
            }
          }}
          key={`prev-${i}`}
          className="flex hover:cursor-pointer items-center flex-col p-2 lg:p-4 border-b-2 border-l-2 border-base-200 w-1/7 aspect-square bg-base-200 text-base-content "
        >
          <p>{i}</p>

          {redDays?.map((holiday) => {
            let thisDayDate = "";
            if (currentMonth == 0) {
              thisDayDate =
                currentYear - 1 + "-" + 12 + "-" + (i < 10 ? "0" + i : i);
            } else if (currentMonth > 0 && currentMonth < 10) {
              thisDayDate =
                currentYear +
                "-" +
                "0" +
                currentMonth +
                "-" +
                (i < 10 ? "0" + i : i);
            } else if (currentMonth > 0 && currentMonth > 9) {
              thisDayDate =
                currentYear + "-" + currentMonth + "-" + (i < 10 ? "0" + i : i);
            }

            if (holiday.date == thisDayDate) {
              return (
                <p
                  key={i}
                  className="flex  rounded-lg p-1 bg-red-400 text-red-900 justify-center animate-pulse"
                ></p>
              );
            }
          })}
        </button>
      );
    }

    // Fill in days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      let currentDayStyle = " bg-base-100 ";
      if (i == currentDay && month == todaysMonth && year == todaysYear) {
        currentDayStyle = " bg-secondary ";
      }
      newCalendar.push(
        <button
          onClick={(e) => {
            setSelectedDate(
              `${currentYear}-${
                currentMonth + 1 < 10
                  ? "0" + (currentMonth + 1)
                  : currentMonth + 1
              }-${i < 10 ? "0" + i : i}`
            );
            setSelectedEvents([]);
            setShowModal(true);
            getCoordinates(e);
          }}
          key={`current-${i}`}
          className={`flex hover:cursor-pointer items-center flex-col p-2 lg:p-4  border-b-2 border-l-2 border-base-200 w-1/7 aspect-square  ${currentDayStyle} text-base-content `}
        >
          <p>{i}</p>
          {redDays?.map((holiday) => {
            let thisDayDate = `${currentYear}-${(currentMonth + 1)
              .toString()
              .padStart(2, "0")}-${i.toString().padStart(2, "0")}`;

            if (holiday.date == thisDayDate) {
              return (
                <p
                  key={i}
                  className="flex  rounded-lg p-1 bg-red-400 text-red-900 justify-center animate-pulse"
                ></p>
              );
            }
          })}
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
              setSelectedDate(`${currentYear + 1}-01-${i < 10 ? "0" + i : i}`);
              setSelectedEvents([]);
              setShowModal(true);
              getCoordinates(e);
            } else {
              setSelectedDate(
                `${currentYear}-${
                  currentMonth + 2 < 10
                    ? "0" + (currentMonth + 2)
                    : currentMonth + 2
                }-${i < 10 ? "0" + i : i}`
              );
              setSelectedEvents([]);
              setShowModal(true);
              getCoordinates(e);
            }
          }}
          key={`next-${i}`}
          className="flex hover:cursor-pointer items-center flex-col p-2 lg:p-4 border-b-2 border-l-2 border-base-200 w-1/7 aspect-auto lg:aspect-square bg-base-200 text-base-content "
        >
          <p>{i}</p>

          {redDays?.map((holiday) => {
            let thisDayDate = "";
            if (currentMonth == 11) {
              thisDayDate =
                currentYear + 1 + "-" + "01" + "-" + (i < 10 ? "0" + i : i);
            } else if (currentMonth > 0 && currentMonth < 10) {
              thisDayDate =
                currentYear +
                "-" +
                "0" +
                (currentMonth + 2) +
                "-" +
                (i < 10 ? "0" + i : i);
            } else if (currentMonth > 0 && currentMonth > 9) {
              thisDayDate =
                currentYear +
                "-" +
                (currentMonth + 2) +
                "-" +
                (i < 10 ? "0" + i : i);
            }

            if (holiday.date == thisDayDate) {
              return (
                <p
                  key={i}
                  className="flex  rounded-lg p-1 bg-red-400 text-red-900 justify-center animate-pulse"
                ></p>
              );
            }
          })}
        </button>
      );
    }

    setCalendar(newCalendar);
  }

  useEffect(() => {
    getDaysInCurrentMonth();
  }, [month, year, redDays]);

  return (
    <>
      <div className="flex flex-col w-full rounded-xl gap-4">
        <div className="lg:hidden flex justify-between items-center gap-4">
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

            <select
              value={activeCalendar}
              onChange={(e) => setActiveCalendar(e.target.value)}
              className="select ui-app w-full"
            >
              <option value="Month">Month Format</option>
              <option value="Week">Week Format</option>
              <option value="Day">Day Format</option>
            </select>
          </div>

          <div
            id="toggleMonth"
            className="hidden lg:flex w-full justify-between items-center gap-4"
          >
            <button
              className="btn btn-app btn-primary btn-sm md:btn-md lg:btn-lg"
              onClick={() => {
                if (month != 0) {
                  setMonth(month - 1);
                } else if (month == 0) {
                  setYear(year - 1);
                  setMonth(11);
                }
              }}
            >
              <FaArrowLeft />
            </button>

            <p className="flex justify-center items-center">
              {monthString} - {year}
            </p>

            <button
              className="btn btn-app btn-primary btn-sm md:btn-md lg:btn-lg"
              onClick={() => {
                if (month != 11) {
                  setMonth(month + 1);
                } else if (month == 11) {
                  setYear(year + 1);
                  setMonth(0);
                }
              }}
            >
              <FaArrowRight />
            </button>
          </div>
          <select className="hidden lg:flex select ui-app w-1/3">
            <option>Filter</option>
          </select>
        </div>

        <div>
          <div className="grid grid-cols-20 w-full">
            <div className="col-span-1 flex justify-center items-center font-bold">
              W
            </div>
            <div className="col-span-19 grid grid-cols-7">
              <p className="flex justify-center items-center">Mon</p>
              <p className="flex justify-center items-center">Tue</p>
              <p className="flex justify-center items-center">Wed</p>
              <p className="flex justify-center items-center">Thur</p>
              <p className="flex justify-center items-center">Fri</p>
              <p className="flex justify-center items-center">Sat</p>
              <p className="flex justify-center items-center">Sun</p>
            </div>
          </div>
          <div className="flex">
            <div className=" grid grid-cols-1 grid-rows-6 w-2/12">
              <p className="text-xs flex row-start-1 items-center justify-center">
                {firstWeekOfMonth}
              </p>
              <p className="text-xs flex row-start-2 items-center justify-center">
                {firstWeekOfMonth + 1}
              </p>
              <p className="text-xs flex row-start-3 items-center justify-center">
                {firstWeekOfMonth + 2}
              </p>
              <p className="text-xs flex row-start-4 items-center justify-center">
                {firstWeekOfMonth + 3}
              </p>
              <p className="text-xs flex row-start-5 items-center justify-center">
                {firstWeekOfMonth + 4}
              </p>
              <p className="text-xs flex row-start-6 items-center justify-center">
                {firstWeekOfMonth + 5}
              </p>
            </div>
            <div className="flex lg:h-auto min-h-screen flex-wrap border-t-2 border-r-2 border-base-200">
              {calendar}
            </div>
          </div>
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
