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

    let date = `${year}-${
      month + 1 < 10 && month + 1 != 1 ? "0" + (month + 1) : month + 1
    }-${todaysState < 10 ? "0" + todaysState : todaysState}`;

    const displayShifts = [];
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
    redDays.map((holiday) => {
      if (
        holiday.date ==
        year +
          "-" +
          (month + 1 < 10 ? "0" + (month + 1) : month + 1) +
          "-" +
          (dayDate.getDate() < 10 ? "0" + dayDate.getDate() : dayDate.getDate())
      ) {
        setActiveHoliday(holiday.name);
      } else {
        setActiveHoliday("test");
      }
    });

    newCalendar.push(
      <div
        key={dayDate}
        className={`grid grid-cols-${displayShifts.length} gap-x-1 grid-rows-24 w-full h-[calc(100vh-16rem)] lg:h-[calc(100vh-8rem)]`}
      >
        {displayShifts ? displayShifts : ""}
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
      <div className="flex items-start justify-start w-full h-[calc(100vh-16rem)] lg:h-[calc(100vh-5.5rem)] pr-8  lg:pr-0 bg-base-100 overflow-x-hidden">
        <div className="grid grid-rows-25  w-10 lg:w-8  lg:border-t-[0.025rem] ">
          <div className="h-8 lg:h-6 lg:border-b-[0.025rem]"></div>
          {Array.from({ length: 24 }).map((_, index) => (
            <h6
              key={index}
              className={` lg:border-b-[0.025rem] row-span-1 flex justify-center items-start py-1.25 lg:py-1 `}
              style={{
                gridRowStart: index + 2,
              }}
            >
              {index.toString().padStart(2, "0")}
            </h6>
          ))}
        </div>

        <div className="flex flex-col w-full h-full">
          <div className="flex w-full h-8 lg:h-6 justify-center items-center lg:border-x-[0.025rem] lg:border-t-[0.025rem]  px-1">
            <h6 className="h-8 lg:h-6 flex justify-center items-center  ">
              {currentDayString} - {todaysState}{" "}
              {activeHoliday ? " - " + activeHoliday.name : ""}
            </h6>
          </div>

          <div className="grid grid-cols-7 grid-rows-25 px-1 bg-base-200 lg:bg-base-100  rounded-2xl lg:rounded-none lg:border-[0.025rem] w-full">
            {calendar}
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
