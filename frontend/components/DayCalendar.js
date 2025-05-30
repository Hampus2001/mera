"use client";

import { HandleCalendarContext } from "@/context/CalendarContext";
import { HandleWorkspaceContext } from "@/context/WorkspaceContext";
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
    todaysState,
    shifts,
  } = useContext(HandleCalendarContext);

  const { activeUserId, activeUser } = useContext(HandleWorkspaceContext);
  const [activeHoliday, setActiveHoliday] = useState("");
  const [amountOfShift, setAmountOfShift] = useState(2);
  const [currentDayString, setCurrentDayString] = useState("");
  const [lastDayOfCurrentMonth, setLastDayOfCurrentMonth] = useState(
    new Date(year, month + 1, 0)
  );
  const [daysInMonth, setDaysInMonth] = useState(
    lastDayOfCurrentMonth.getDate()
  );

  useEffect(() => {
    getDaysInCurrentWeek();
  }, [activeUserId]);
  function getDaysInCurrentWeek() {
    const newCalendar = [];

    const lastDayOfMonth = new Date(year, month + 1, 0);
    setDaysInMonth(lastDayOfMonth.getDate());

    // Create a new date object based on `todaysState`
    const baseDate = new Date(year, month, todaysState);

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
    let date = `${year}-${
      month + 1 < 10 && month + 1 != 1 ? "0" + (month + 1) : month + 1
    }-${todaysState < 10 ? "0" + todaysState : todaysState}`;
    console.log("date", date);
    newCalendar.push(
      <div
        key={dayDate}
        className={`grid grid-cols-20 gap-1 grid-rows-24 w-full justify-start items-start border-b-[0.025rem] h-[calc(100vh-16rem)] lg:h-[calc(100vh-8rem)] ${dayStyle}`}
      >
        {Array.from({ length: 24 }).map((_, index) => (
          <h6
            key={index}
            className={`flex h-full items-end justify-center row-span-1 col-span-1 col-start-1 row-start-${
              index + 1
            } 
              }`}
          >
            {index.toString().padStart(2, "0")}:00
          </h6>
        ))}

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
            setActiveHoliday(holiday.name);
          } else {
            setActiveHoliday("test");
          }
        })}
        {shifts?.map((shift, index) => {
          if (shift.date == date && shift.user_id == activeUserId) {
            const startHour = parseInt(shift.start.split(":")[0], 10);
            const endHour = parseInt(shift.end.split(":")[0], 10);
            const rowSpan = Math.max(1, endHour - startHour);
            const colStart = 2 + index * 4;
            return (
              <p
                className={`flex w-full h-full rounded-lg items-center p-5 lg:p-2 row-start-${
                  startHour + 2
                } row-span-${rowSpan} col-span-4 bg-secondary-content text-success-content justify-center hover:cursor-pointer`}
                style={{
                  gridRowStart: startHour + 2,
                  gridColumnStart: colStart,
                }}
                key={index}
              >
                {shift.start} - {shift.end}
              </p>
            );
          }
        })}
      </div>
    );

    setCalendar(newCalendar);
  }

  useEffect(() => {
    getDaysInCurrentWeek();
    const holiday = redDays.find(
      (holiday) =>
        holiday.date ==
        year +
          "-" +
          (month + 1 < 10 ? "0" + (month + 1) : month + 1) +
          "-" +
          (todaysState < 10 ? "0" + todaysState : todaysState)
    );
    if (holiday) {
      setActiveHoliday(holiday);
    } else {
      setActiveHoliday("");
    }
  }, [todaysState, month, year, activeUserId]);

  return (
    <>
      <div className="flex flex-col gap-4 w-full h-[calc(100vh-16rem)] lg:h-[calc(100vh-5.5rem)] pr-8 lg:pr-0 bg-base-100 overflow-x-hidden">
        <div className="flex flex-grow text-xs w-full gap-1 text-start ">
          <div className="flex flex-col w-full border-t-[0.025rem] border-l-[0.025rem] divide-x-[0.025rem] ">
            <div className="flex justify-center items-center border-b-[0.025rem] h-8">
              <h6>
                {currentDayString} - {todaysState}{" "}
                {activeHoliday ? " - " + activeHoliday.name : ""}
              </h6>
            </div>
            <div className=" w-full h-full border-r-[0.025rem]">{calendar}</div>
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
      {/* <button
        onClick={openDrawer}
        id="+"
        className="fixed flex items-center hover:cursor-pointer justify-center rounded-full right-10 bottom-8 w-16 h-16 bg-base-100 border-2 border-neutral shadow-lg "
      >
        <h4 className="text-neutral text-3xl">
          <FaPlus />
        </h4>
      </button> */}
    </>
  );
}
