"use client";

import { HandleCalendarContext } from "@/context/CalendarContext";
import next from "next";
import { useContext, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaPlus, FaBars } from "react-icons/fa";
import { useWindowSize } from "@/hooks/useWindowSize";

export default function Calendar({ openDrawer }) {
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
          className="flex hover:cursor-pointer items-center flex-col p-2 lg:p-4  w-1/7 min-h-32 aspect-square bg-base-100 text-base-100 "
        >
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
                  className="flex rounded-lg p-1 bg-red-400 text-red-900 justify-center animate-pulse"
                ></p>
              );
            }
          })}
        </button>
      );
    }

    // Fill in days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      let currentDayStyle = " bg-base-100 text-base-content";
      if (i == currentDay && month == todaysMonth && year == todaysYear) {
        currentDayStyle = " bg-success text-base-100 ";
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
          className={`flex hover:cursor-pointer items-center flex-col p-2 lg:p-4 w-1/7 min-h-32 aspect-square  ${currentDayStyle} `}
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
          className="flex hover:cursor-pointer items-center flex-col p-2 lg:p-4 w-1/7 min-h-32 aspect-square bg-base-100 text-base-100 "
        >
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
    <div className="flex flex-col lg:ml-16 ">
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

          <button
            className="btn btn-app bg-base-100 border-neutral btn-md"
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

          <button
            className="btn btn-app bg-base-100 border-neutral btn-md"
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
        <FaBars className="flex lg:hidden text-[32px]" />
      </div>
      <div className="flex flex-col w-full rounded-xl gap-4">
        <div
          id="mobileView"
          className="lg:hidden flex px-6 justify-between items-center gap-4"
        >
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
              <option value="Month">View month</option>
              <option value="Week">View week</option>
              <option value="Day">View day</option>
            </select>
          </div>

          <select className="hidden lg:flex select ui-app w-1/3">
            <option>Filter</option>
          </select>
        </div>

        <div className="flex w-full pr-6">
          <div className="flex flex-col justify-between w-6 mt-6">
            <p className="text-xs flex h-1/6 w-full  items-center justify-start">
              {firstWeekOfMonth}
            </p>
            <p className="text-xs flex h-1/6 items-center justify-start">
              {firstWeekOfMonth + 1}
            </p>
            <p className="text-xs flex h-1/6 items-center justify-start">
              {firstWeekOfMonth + 2}
            </p>
            <p className="text-xs flex h-1/6 items-center justify-start">
              {firstWeekOfMonth + 3}
            </p>
            <p className="text-xs flex h-1/6 items-center justify-start">
              {firstWeekOfMonth + 4}
            </p>
            <p className="text-xs flex h-1/6 items-center justify-start">
              {firstWeekOfMonth + 5}
            </p>
          </div>
          <div className="flex flex-col w-full ">
            <div className="flex w-full justify-between bg-neutral border divide-x divide-neutral">
              <p className="flex flex-1  justify-center items-center bg-base-100">
                Mon
              </p>
              <p className="flex flex-1  justify-center items-center bg-base-100">
                Tue
              </p>
              <p className="flex flex-1  justify-center items-center bg-base-100">
                Wed
              </p>
              <p className="flex flex-1  justify-center items-center bg-base-100">
                Thur
              </p>
              <p className="flex flex-1  justify-center items-center bg-base-100">
                Fri
              </p>
              <p className="flex flex-1 justify-center items-center bg-base-100">
                Sat
              </p>
              <p className="flex flex-1  justify-center items-center bg-base-100">
                Sun
              </p>
            </div>
            <div className="flex flex-wrap h-max bg-neutral border divide-x divide-y divide-neutral">
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
        onClick={openDrawer}
        id="+"
        className="fixed flex items-center hover:cursor-pointer justify-center rounded-full right-10 bottom-8 w-16 h-16 bg-base-100 border-2 border-neutral shadow-lg "
      >
        <h4 className="text-neutral text-3xl">
          <FaPlus />
        </h4>
      </button>
    </div>
  );
}
