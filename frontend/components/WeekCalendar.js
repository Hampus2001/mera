"use client";

import { HandleCalendarContext } from "@/context/CalendarContext";
import { useContext, useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import { FaArrowLeft, FaArrowRight, FaPlus, FaBars } from "react-icons/fa";

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
  } = useContext(HandleCalendarContext);

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

      const dayStyle =
        dayDate.toDateString() === todaysDate.toDateString()
          ? "bg-primary text-primary-content"
          : "bg-base-100 text-base-content";

      newCalendar.push(
        <div
          key={i}
          className={`flex flex-col w-full justify-start items-start h-full  ${dayStyle} `}
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
                  className="flex w-full rounded-lg p-3 lg-p-1 bg-info text-info-content justify-center hover:cursor-pointer"
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
    <div className="flex flex-col w-full h-screen">
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
            value={+displayedWeek}
            onChange={(e) => {
              setDisplayedWeek(parseInt(e.target.value));
              const mondayOfSelectedWeekDate = getDateOfISOWeek(
                parseInt(e.target.value),
                year
              );
              setYear(parseInt(mondayOfSelectedWeekDate.year));
              setMonth(parseInt(mondayOfSelectedWeekDate.month - 1));
              setTodaysState(parseInt(mondayOfSelectedWeekDate.day));
            }}
            className="select ui-app"
          >
            {Array.from({ length: 52 }).map((_, index) => (
              <option value={index + 1} key={index + 1}>
                W{index + 1}
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

          <button
            className="btn btn-app bg-base-100 border-neutral btn-md"
            onClick={() => {
              if (displayedWeek > 1) {
                const newWeek = displayedWeek - 1;
                setDisplayedWeek(newWeek);
                const mondayOfSelectedWeekDate = getDateOfISOWeek(
                  newWeek,
                  year
                );
                setYear(mondayOfSelectedWeekDate.year);
                setMonth(mondayOfSelectedWeekDate.month - 1);
                setTodaysState(mondayOfSelectedWeekDate.day);
              }
            }}
          >
            <FaArrowLeft />
          </button>

          <button
            className="btn btn-app bg-base-100 border-neutral btn-md"
            onClick={() => {
              if (displayedWeek < 52) {
                const newWeek = displayedWeek + 1;
                setDisplayedWeek(newWeek);
                const mondayOfSelectedWeekDate = getDateOfISOWeek(
                  newWeek,
                  year
                );
                setYear(mondayOfSelectedWeekDate.year);
                setMonth(mondayOfSelectedWeekDate.month - 1);
                setTodaysState(mondayOfSelectedWeekDate.day);
              }
            }}
          >
            <FaArrowRight />
          </button>
        </div>
        <FaBars className="flex lg:hidden text-[32px]" />
      </div>
      <div className="flex flex-col gap-4 lg:p-4 p-0 w-full h-full">
        <div
          id="toggleDate"
          className="lg:hidden flex flex-col w-full justify-between gap-4"
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
              <option value={0}>January</option>
              <option value={1}>February</option>
              <option value={2}>March</option>
              <option value={3}>April</option>
              <option value={4}>May</option>
              <option value={5}>June</option>
              <option value={6}>July</option>
              <option value={7}>August</option>
              <option value={8}>September</option>
              <option value={9}>October</option>
              <option value={10}>November</option>
              <option value={11}>December</option>
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

            <select
              value={+displayedWeek}
              onChange={(e) => {
                setDisplayedWeek(parseInt(e.target.value));
                const mondayOfSelectedWeekDate = getDateOfISOWeek(
                  parseInt(e.target.value),
                  year
                );
                setYear(parseInt(mondayOfSelectedWeekDate.year));
                setMonth(parseInt(mondayOfSelectedWeekDate.month - 1));
                setTodaysState(parseInt(mondayOfSelectedWeekDate.day));
              }}
              className="select ui-app"
            >
              {Array.from({ length: 52 }).map((_, index) => (
                <option value={index + 1} key={index + 1}>
                  W{index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-grow text-xs w-full bg-base-100">
          <div className="flex flex-col w-16 mt-6 justify-between items-center gap-y-4 pt-4">
            {Array.from({ length: 24 }).map((_, index) => (
              <h6
                key={index}
                className={`flex justify-center  items-center
              }`}
              >
                {index.toString().padStart(2, "0")}:00
              </h6>
            ))}
          </div>
          <div className="border-[0.025rem] flex flex-col w-full">
            <div className="flex justify-between w-full h-6 bg-base-100 divide-x-[0.025rem] divide-y-[0.025rem]">
              <h6 className="flex w-full h-full justify-center items-center">
                M
              </h6>
              <h6 className="flex w-full h-full justify-center items-center">
                T
              </h6>
              <h6 className="flex w-full h-full justify-center items-center">
                W
              </h6>
              <h6 className="flex w-full h-full justify-center items-center">
                T
              </h6>
              <h6 className="flex w-full h-full justify-center items-center">
                F
              </h6>
              <h6 className="flex w-full h-full justify-center items-center ">
                S
              </h6>
              <h6 className="flex w-full h-full justify-center items-center border-b-[0.025rem]">
                S
              </h6>
            </div>
            <div className="flex w-full h-full  divide-x divide-y">
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
