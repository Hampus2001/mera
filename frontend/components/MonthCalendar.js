"use client";

import { HandleCalendarContext } from "@/context/CalendarContext";
import next from "next";
import { useContext, useEffect, useRef, useState } from "react";

export default function Calendar() {
  //states
  const todaysDate = new Date();
  const todaysMonth = todaysDate.getMonth();
  const todaysYear = todaysDate.getFullYear();
  const [calendar, setCalendar] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState([]);

  //Get x and y coordinates for modal window
  const [position, setPosition] = useState({ x: 0, y: 0 });
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
      i <= daysInPreviousMonth;
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
          className="flex hover:cursor-pointer items-center flex-col p-2 lg:p-4 border-b-2 border-l-2 border-gray-300 w-1/7 aspect-square bg-base-200 text-base-content "
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
          className={`flex hover:cursor-pointer items-center flex-col p-2 lg:p-4  border-b-2 border-l-2 border-gray-300 w-1/7 aspect-square  ${currentDayStyle} text-base-content `}
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
          className="flex hover:cursor-pointer items-center flex-col p-2 lg:p-4 border-b-2 border-l-2 border-gray-300 w-1/7 aspect-square bg-base-200 text-base-content "
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

    setCalendar(newCalendar);
  }

  useEffect(() => {
    getDaysInCurrentMonth();
  }, [month]);

  return (
    <>
      <div className="flex flex-col w-full rounded-xl gap-4">
        <div className="flex gap-4">
          <h4>
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
