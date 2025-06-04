"use client";

import { HandleCalendarContext } from "@/context/CalendarContext";
import { useContext, useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { FaArrowLeft, FaArrowRight, FaPlus, FaBars } from "react-icons/fa";
import { HandleWorkspaceContext } from "@/context/WorkspaceContext";

export default function WeekCalendar({ openDrawer }) {
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
    getISOWeekNumber,
    getDateOfISOWeek,
    displayedWeek,
    setDisplayedWeek,
    todaysState,
    setTodaysState,
    baseDate,
    currentDay,
    shifts,
  } = useContext(HandleCalendarContext);

  const { activeUser, activeUserId } = useContext(HandleWorkspaceContext);

  useEffect(() => {
    getDaysInCurrentWeek();
  }, [activeUserId]);

  function getDaysInCurrentWeek() {
    const newCalendar = [];

    // Create a new date object based on `todaysState`
    const baseDate = new Date(year, month, todaysState);

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
      if (i == 0) {
        const currentWeek = `${year}-${
          month + 1 < 10 && month + 1 != 1 ? "0" + (month + 1) : month + 1
        }-${
          dayDate.getDate() < 10 ? "0" + dayDate.getDate() : dayDate.getDate()
        }`;

        setDisplayedWeek(getISOWeekNumber(currentWeek));
      }
      let date = `${year}-${
        month + 1 < 10 && month + 1 != 1 ? "0" + (month + 1) : month + 1
      }-${
        dayDate.getDate() < 10 ? "0" + dayDate.getDate() : dayDate.getDate()
      }`;
      const displayShifts = [];
      {
        shifts?.map((shift, index) => {
          if (activeUserId != 0) {
            if (shift.date == date && shift.user_id == activeUserId) {
              const startHour = parseInt(shift.start.split(":")[0], 10);
              const endHour = parseInt(shift.end.split(":")[0], 10);
              const rowSpan = endHour - startHour;
              displayShifts.push(
                <p
                  className={`flex w-auto h-full row-span-${rowSpan} col-start-${
                    displayShifts.length + 1
                  } col-span-1 p-5 lg:p-2 bg-primary text-primary-content rounded-lg justify-center items-center text-center hover:cursor-pointer`}
                  style={{
                    gridRowStart: startHour + 2,
                    gridRowEnd: endHour + 2,
                  }}
                  key={index}
                >
                  {shift.start}
                  <br /> - <br /> {shift.end}
                </p>
              );
            }
          } else if (activeUserId == 0) {
            if (shift.date == date) {
              const startHour = parseInt(shift.start.split(":")[0], 10);
              const endHour = parseInt(shift.end.split(":")[0], 10);
              const rowSpan = endHour - startHour;
              displayShifts.push(
                <p
                  className={`flex w-auto h-full row-span-${rowSpan} col-start-${
                    displayShifts.length + 1
                  } col-span-1 p-5 lg:p-2 bg-primary text-primary-content rounded-lg justify-center items-center text-center hover:cursor-pointer`}
                  style={{
                    gridRowStart: startHour + 2,
                    gridRowEnd: endHour + 2,
                  }}
                  key={index}
                >
                  {shift.start}
                  <br /> - <br /> {shift.end}
                </p>
              );
            }
          }
        });
      }
      const displayHolidays = [];
      {
        redDays.map((holiday) => {
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
            displayHolidays.push(
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
                className={`flex w-full row-span-1 col-start-${displayHolidays.length} col-span-1 bg-info text-info-content justify-center items-center card hover:cursor-pointer`}
              >
                <p className="hidden lg:flex p-2">{holiday.name}</p>
              </button>
            );
          }
        });
      }

      const gridCols = displayShifts.length + displayHolidays.length;
      console.log("grid cols", gridCols);

      newCalendar.push(
        <div
          key={i}
          className={`grid p-1 gap-1 bg-base-300 lg:bg-base-100 rounded-2xl lg:rounded-none text-base-content row-span-24 col-start-${
            i + 1
          } columns-${gridCols} grid-rows-24 col-span-1 h-full `}
        >
          {displayHolidays ? displayHolidays : ""}
          {displayShifts ? displayShifts : ""}
        </div>
      );
    }

    setCalendar(newCalendar);
  }

  useEffect(() => {
    getDaysInCurrentWeek();
  }, [todaysState, month, year, redDays]);

  return (
    <div className="h-[calc(100vh-16rem)] lg:h-[calc(100vh-5.5rem)] z-0 grid grid-cols-15  grid-rows-25 w-full pr-8 lg:pr-0 bg-base-100">
      <div className="grid grid-rows-25 grid-cols-1 row-start-1 col-start-1 row-span-25 p-1">
        {Array.from({ length: 24 }).map((_, index) => (
          <h6
            key={index}
            className={`flex col-span-1 row-span-1 col-start-1 justify-center items-end
              }`}
            style={{
              gridRowStart: index + 2,
            }}
          >
            {index.toString().padStart(2, "0")}:00
          </h6>
        ))}
      </div>

      <h6 className="flex w-full h-full justify-center border-y-[0.025rem] border-l-[0.025rem] items-center col-start-2 col-span-2 row-start-1">
        M
      </h6>
      <h6 className="flex w-full h-full justify-center border-y-[0.025rem] border-l-[0.025rem] items-center col-start-4 col-span-2 row-start-1">
        T
      </h6>
      <h6 className="flex w-full h-full justify-center border-y-[0.025rem] border-l-[0.025rem] items-center col-start-6 col-span-2 row-start-1">
        W
      </h6>
      <h6 className="flex w-full h-full justify-center border-y-[0.025rem] border-l-[0.025rem] items-center col-start-8 col-span-2 row-start-1">
        T
      </h6>
      <h6 className="flex w-full h-full justify-center border-y-[0.025rem] border-l-[0.025rem] items-center col-start-10 col-span-2 row-start-1">
        F
      </h6>
      <h6 className="flex w-full h-full justify-center border-y-[0.025rem] border-l-[0.025rem] items-center col-start-12 col-span-2 row-start-1">
        S
      </h6>
      <h6 className="flex w-full h-full justify-center items-center  col-start-14 col-span-2 row-start-1 border-y-[0.025rem] border-x-[0.025rem]">
        S
      </h6>

      <div className=" grid grid-cols-7 grid-rows-24 row-start-2 col-start-2 col-span-14 row-span-24 divide-x-[0.025rem] border-x-[0.025rem] border-b-[0.025rem]">
        {calendar}
      </div>

      {showModal && (
        <div
          className={`absolute bg-secondary shadow-xl text-secondary-content min-w-64 rounded-2xl h-auto p-6`}
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

      {/* <button
        onClick={openDrawer}
        id="+"
        className="fixed flex items-center hover:cursor-pointer justify-center rounded-full right-10 bottom-8 w-16 h-16 bg-base-100 border-2 border-neutral shadow-lg "
      >
        <h4 className="text-neutral text-3xl">
          <FaPlus />
        </h4>
      </button> */}
    </div>
  );
}
