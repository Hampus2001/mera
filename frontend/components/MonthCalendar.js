"use client";

import { HandleCalendarContext } from "@/context/CalendarContext";
import next from "next";
import { useContext, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
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
              console.log("hit", holiday.date, thisDayDate);
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
  }, [month, redDays]);

  return (
    <>
      <div className="flex flex-col w-full rounded-xl gap-4">
        <div className="lg:hidden flex w-full justify-center gap-4">
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

          <h4 className="flex justify-center items-center">
            {monthString} - {year}
          </h4>

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

        <div>
          <div className="grid grid-cols-7 grid-rows-1">
            <p className="flex justify-center font-bold  text-base-content border-base-200 border-t border-l border-r">
              mon
            </p>
            <p className="flex justify-center font-bold  text-base-content border-base-200 border-t border-l border-r">
              tue
            </p>
            <p className="flex justify-center font-bold  text-base-content border-base-200 border-t border-l border-r">
              wed
            </p>
            <p className="flex justify-center font-bold  text-base-content border-base-200 border-t border-l border-r">
              thur
            </p>
            <p className="flex justify-center font-bold  text-base-content border-base-200 border-t border-l border-r">
              fri
            </p>
            <p className="flex justify-center font-bold  text-base-content border-base-200 border-t border-l border-r">
              sat
            </p>
            <p className="flex justify-center font-bold  text-base-content border-base-200 border-t border-l border-r">
              sun
            </p>
          </div>

          <div className="flex lg:h-auto min-h-screen flex-wrap border-t-2 border-r-2 border-base-200">
            {calendar}
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
    </>
  );
}
