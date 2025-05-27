"use client";

import { HandleCalendarContext } from "@/context/CalendarContext";

import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

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
  const [selectedShifts, setSelectedShifts] = useState([]);

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
    setTodaysState,
    shifts,
    setShifts,
  } = useContext(HandleCalendarContext);

  const router = useRouter();

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

  function findShiftsOnDate(date) {
    const shiftsAtDate = shifts.filter((shift) => shift.date == date);
    setSelectedShifts(shiftsAtDate);
  }

  useEffect(() => {
    findShiftsOnDate(selectedDate);
  }, [selectedDate]);

  function handleDayClick(year, month, day, e) {
    setYear(year);
    setMonth(month);
    setTodaysState(day);
    setSelectedDate(
      `${year}-${(month + 1).toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`
    );
    setSelectedEvents([]);
    setShowModal(true);
    getCoordinates(e);

    if (width < 1024) {
      setActiveCalendar("Day");
      console.log("width success", width);
    } else {
      console.log("width fail", width);
    }
  }

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
      i <= daysInPreviousMonth;
      i++
    ) {
      newCalendar.push(
        <div
          onClick={(e) => {
            if (currentMonth == 0) {
              setSelectedDate(`${currentYear - 1}-12-${i < 10 ? "0" + i : i}`);
              setSelectedEvents([]);
              setShowModal(true);
              getCoordinates(e);
              handleDayClick(currentYear - 1, currentMonth - 1, i, e);
            } else {
              setSelectedDate(
                `${currentYear}-${
                  currentMonth < 10 ? "0" + currentMonth : currentMonth
                }-${i < 10 ? "0" + i : i}`
              );
              setSelectedEvents([]);
              setShowModal(true);
              getCoordinates(e);
              handleDayClick(currentYear, currentMonth - 1, i, e);
            }
          }}
          key={`prev-${i}`}
          className=" col-span-1 bg-base-100 row-span-1 flex hover:cursor-pointer hover:bg-base-200 items-center flex-col p-2"
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
                <h6
                  key={i}
                  className="flex p-2 bg-base-300 text-base-content justify-center animate-pulse rounded-3xl "
                ></h6>
              );
            }
          })}
        </div>
      );
    }

    // Fill in days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      let currentDayStyle = "  bg-base-100 hover:bg-base-200 text-base-content";
      if (i == currentDay && month == todaysMonth && year == todaysYear) {
        currentDayStyle =
          "bg-primary text-primary-content hover:bg-secondary hover:text-secondary-content ";
      }
      let date = `${year}-${month + 1 < 10 ? "0" + (month + 1) : month + 1}-${
        i < 10 ? "0" + i : i
      }`;
      newCalendar.push(
        <button
          onClick={(e) => {
            handleDayClick(currentYear, currentMonth, i, e);
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
          className={`bg-base-100 col-span-1 row-span-1 flex hover:cursor-pointer items-center flex-col p-2 lg:p-4 font-diatype-medium text-xs lg:text-base gap-1    ${currentDayStyle} `}
        >
          <h6>{i}</h6>

          {redDays?.map((holiday) => {
            let thisDayDate = `${currentYear}-${(currentMonth + 1)
              .toString()
              .padStart(2, "0")}-${i.toString().padStart(2, "0")}`;

            if (holiday.date == thisDayDate) {
              return (
                <h6
                  key={i}
                  className="flex p-2 bg-base-300 text-base-content justify-center animate-pulse rounded-3xl"
                ></h6>
              );
            }
          })}
          {shifts?.map((shift, index) => {
            if (shift.date == date) {
              return (
                <h6
                  className="flex justify-center text-center items-center py-1 px-2 bg-success text-success-content rounded-full"
                  key={index}
                >
                  {shift.start} - {shift.end}
                </h6>
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
              handleDayClick(currentYear + 1, currentMonth + 1, i, e);
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
              handleDayClick(currentYear, currentMonth + 1, i, e);
            }
          }}
          key={`next-${i}`}
          className="col-span-1 row-span-1 bg-base-100 flex hover:cursor-pointer hover:bg-base-300 items-center flex-col p-2 font-diatype-medium text-xs lg:text-base"
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
                  className="flex rounded-3xl p-2 bg-base-300 text-base-content justify-center animate-pulse "
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
      <div className="overflow-hidden bg-base-100 ">
        <div className="flex w-full h-8 lg:h-6 divide-y-[0.025rem] border-t-[0.025rem] border-b-[0.025rem]   ">
          <div className="w-8 h-8 lg:w-6 lg:h-6 border-r-[0.025rem] border-b-[0.025rem] "></div>
          <div className=" grid grid-cols-7 w-full items-center justify-start h-full divide-x-[0.025rem] ">
            <h6 className=" flex justify-center items-center h-full">M</h6>
            <h6 className=" flex justify-center items-center h-full">T</h6>
            <h6 className=" flex  justify-center items-center h-full">W</h6>
            <h6 className=" flex  justify-center items-center h-full">T</h6>
            <h6 className="flex  justify-center items-center h-full">F</h6>
            <h6 className=" flex justify-center items-center h-full">S</h6>
            <h6 className=" flex  justify-center items-center h-full">S</h6>
          </div>
        </div>

        <div className="flex w-full bg-base-content divide-x-[0.025rem] ">
          <div className=" grid grid-cols-1 grid-rows-6 w-8 lg:w-6  divide-y-[0.025rem] bg-base-100 ">
            <h6 className="tracking-tight flex p-2 lg:p-0 items-start lg:items-center justify-center">
              {firstWeekOfMonth}
            </h6>
            <h6 className="tracking-tight flex p-2 lg:p-0 items-start lg:items-center justify-center">
              {firstWeekOfMonth + 1}
            </h6>
            <h6 className="tracking-tight flex p-2 lg:p-0 items-start lg:items-center justify-center">
              {firstWeekOfMonth + 2}
            </h6>
            <h6 className="tracking-tight flex p-2 lg:p-0 items-start lg:items-center justify-center">
              {firstWeekOfMonth + 3}
            </h6>
            <h6 className="tracking-tight flex p-2 lg:p-0 items-start lg:items-center justify-center">
              {firstWeekOfMonth + 4}
            </h6>
            <h6 className="tracking-tight flex p-2 lg:p-0 items-start lg:items-center justify-center">
              {firstWeekOfMonth + 5}
            </h6>
          </div>

          <div className="h-[calc(100vh-16rem)] lg:h-[calc(100vh-5.5rem)] grid grid-cols-7 grid-rows-6 w-full bg-base-100 divide-x-[0.025rem] divide-y-[0.025rem] text-xs lg:text-base">
            {calendar}
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className={`absolute bg-secondary shadow-xl text-secondary-content min-w-64 rounded-2xl h-auto p-6`}
          style={{
            top: position.y > height - 50 ? position.y : position.y - 20,
            left:
              position.x > width - 256
                ? width - 256
                : position.x < 0
                ? 0
                : position.x,
          }}
        >
          <div className="flex flex-col items-start justify-center gap-4 min-w-md">
            <div className="flex justify-between items-center  w-full">
              <p>{selectedDate}</p>

              <button
                className="btn btn-sm btn-ghost ui-app btn-circle "
                onClick={() => setShowModal(false)}
              >
                <Cross1Icon width={16} height={16} />
              </button>
            </div>

            <p className="">{selectedEvents ? selectedEvents : ""}</p>

            {selectedShifts
              ? selectedShifts.map((shift, index) => {
                  return (
                    <div className="flex flex-col w-full justify-center py-1 px-2 bg-secondary-content text-secondary rounded-lg">
                      <p key={index}>{` ${shift.role}`}</p>
                      <p>{` start: ${shift.start} - end: ${shift.end}`}</p>
                      <p>{shift.description}</p>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      )}

      <button
        onClick={openDrawer}
        id="+"
        className="fixed lg:hidden flex items-center hover:cursor-pointer justify-center rounded-full right-10 bottom-12 w-16 h-16 bg-base-200 shadow-lg "
      >
        <h4 className="text-neutral  text-3xl">
          <PlusIcon width={24} height={24} />
        </h4>
      </button>
    </>
  );
}
