"use client";

import { useState, useEffect, useContext } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import sv from "date-fns/locale/sv";
import { addMonths, subMonths, addDays, subDays } from "date-fns";
import { HandleWorkspaceContext } from "@/context/WorkspaceContext";

const locales = {
  sv: sv,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const rawShifts = [
  {
    company_id: "abc123",
    date: "2025-05-25",
    start: "10:00",
    end: "12:00",
    user: {
      username: "hampus",
      email: "hampus@example.com",
      role: "worker",
      admin: false,
      hours: 30,
    },
  },
  {
    company_id: "abc123",
    date: "2025-05-26",
    start: "14:00",
    end: "16:00",
    user: {
      username: "irene",
      email: "irene@example.com",
      role: "admin",
      admin: true,
      hours: 40,
    },
  },
  {
    company_id: "abc133",
    date: "2025-05-26",
    start: "13:00",
    end: "14:00",
    user: {
      username: "joel",
      email: "joel@example.com",
      role: "CEO",
      admin: false,
      hours: 40,
    },
  },
];

const toEventObject = (shift) => {
  const [startHour, startMin] = shift.start.split(":").map(Number);
  const [endHour, endMin] = shift.end.split(":").map(Number);
  const date = new Date(shift.date);
  return {
    ...shift,
    title: `${shift.user.username}`,
    start: new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      startHour,
      startMin
    ),
    end: new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      endHour,
      endMin
    ),
  };
};

const generateDays = (startOfMonth, events) => {
  const days = [];
  const startOfWeekDay = startOfWeek(startOfMonth);

  for (let i = 0; i < 42; i++) {
    const currentDay = new Date(startOfWeekDay);
    currentDay.setDate(currentDay.getDate() + i);

    const eventsForDay = events.filter(
      (event) =>
        format(event.start, "yyyy-MM-dd") === format(currentDay, "yyyy-MM-dd")
    );

    days.push({ date: currentDay, events: eventsForDay });
  }

  return days;
};

const MyCalendar = ({ variant }) => {
  //context
  const { activeUser, setActiveUser, contextId } = useContext(
    HandleWorkspaceContext
  );
  // State
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)); // May 2025
  const [selectedUser, setSelectedUser] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [firstClick, setFirstClick] = useState(false);
  const [gridLayout, setGridLayout] = useState(true);
  const [rawShifts, setRawShifts] = useState([]);

  //fetch all shifts using company id
  async function fetchShifts() {
    const response = await fetch("http://localhost:3001/getShifts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contextId }),
    });

    let filteredShifts = await response.json();
    filteredShifts = filteredShifts.companyShifts;
    console.log("shifts", filteredShifts);
  }
  // useEffect(() => {
  //   fetchShifts();
  // }, []);

  useEffect(() => {
    if (variant === "flex") {
      setGridLayout(false);
    } else if (variant === "grid") {
      setGridLayout(true);
    }

    if (variant === "admin") {
      setIsAdmin(true);
    } else if (variant === "user") {
      setIsAdmin(false);
    }
  }, [variant]);

  // Derived data
  const filteredShifts =
    selectedUser === "all"
      ? rawShifts
      : rawShifts.filter((shift) => shift.user.username === selectedUser);

  const myEventsList = filteredShifts.map(toEventObject);

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const daysInMonth = generateDays(startOfMonth, myEventsList);
  const eventfulDays = daysInMonth.filter((day) => day.events.length > 0);
  const uniqueUsernames = [...new Set(rawShifts.map((s) => s.user.username))];

  // Actions
  const hasClicked = () => setFirstClick(true);
  const handleAdminMode = () => setIsAdmin((prev) => !prev);
  const handleLayoutMode = () => setGridLayout((prev) => !prev);
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    hasClicked();
  };
  const handleDayClick = (day) => {
    setSelectedDay(day);
    setSelectedEvent(null);
    setExpandedEventId(null);
    hasClicked();
  };

  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToPrevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const goToPrevDay = () => {
    if (!selectedDay) return;
    const newDate = subDays(selectedDay.date, 1);
    const day = daysInMonth.find(
      (d) => format(d.date, "yyyy-MM-dd") === format(newDate, "yyyy-MM-dd")
    );
    if (day) setSelectedDay(day);
  };

  const goToNextDay = () => {
    if (!selectedDay) return;
    const newDate = addDays(selectedDay.date, 1);
    const day = daysInMonth.find(
      (d) => format(d.date, "yyyy-MM-dd") === format(newDate, "yyyy-MM-dd")
    );
    if (day) setSelectedDay(day);
  };

  return (
    <div className=" w-full flex flex-col justify-start items-start lg:grid lg:grid-cols-4 p-2  ">
      <div className=" flex flex-col w-full p-4 lg:col-span-2 aspect-square   rounded-3xl">
        <div className="flex justify-between items-center  h-8 mb-2">
          <button
            className="btn btn-sm lg:btn-md ui-app "
            onClick={goToPrevMonth}
          >
            Prev
          </button>

          <h5 className=" text-lg lg:text-xl font-diatype-medium leading-auto  ">
            {format(currentDate, "MMMM yyyy")}
          </h5>

          <button
            className=" btn btn-sm lg:btn-md  ui-app"
            onClick={goToNextMonth}
          >
            Next
          </button>
        </div>

        <div
          className={`${
            gridLayout
              ? "grid grid-cols-7  w-full font-diatype-bold  h-8"
              : "hidden"
          }`}
        >
          <div className=" text-center">S</div>
          <div className=" text-center">M</div>
          <div className=" text-center">T</div>
          <div className=" text-center">W</div>
          <div className=" text-center">T</div>
          <div className=" text-center">F</div>
          <div className=" text-center">S</div>
        </div>
        <div
          className={`${
            gridLayout
              ? "grid grid-cols-7 gap-1"
              : "grid grid-cols-1 gap-1 h-full"
          }`}
        >
          {(gridLayout ? daysInMonth : eventfulDays).map((dayObj, index) => (
            <div
              key={index}
              className={`  z-0 font-diatype-bold  text-center    rounded-2xl ${
                dayObj.date.getMonth() !== startOfMonth.getMonth()
                  ? "text-neutral-content bg-base-100"
                  : "hover:bg-primary-content hover:text-primary cursor-pointer text-primary-content bg-primary"
              } ${
                gridLayout
                  ? "aspect-square grid grid-rows-3 items-center justify-center  p-1"
                  : "min-h-16 col-span-1 grid grid-cols-3 items-center justify-center  p-1 gap-1 rounded-3xl"
              } `}
              onClick={() => handleDayClick(dayObj)}
            >
              <span
                className={` ${gridLayout ? "row-start-2" : "col-start-2"}`}
              >
                {format(dayObj.date, "d")}
              </span>

              {/* VISA EVENTS  */}
              <div
                className={`flex flex-row ${
                  gridLayout
                    ? " items-start justify-start row-start-3"
                    : "col-start-1 col-span-1 row-start-1 px-4 flex flex-row items-center"
                }`}
              >
                {dayObj.events.map((event, idx) => (
                  <div
                    key={idx}
                    className="  "
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEventClick(event);
                    }}
                  >
                    {/* Event Badge */}
                    <div
                      className={`${
                        gridLayout ? "w-2 h-2" : "w-8 h-8"
                      } bg-base-content  m-0.5 rounded-full`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <span className="flex flex-row items-center gap-x-2 mt-2"></span>
      </div>

      {/* DAY INFO SECTION */}

      <div
        className={`w-full h-full lg:col-span-2 bg-secondary text-secondary-content rounded-3xl p-4 aspect-square ${
          firstClick ? "block" : "hidden"
        }`}
      >
        {selectedDay && (
          <>
            <div
              className={` flex justify-between items-center h-8 ${
                gridLayout ? "mb-10" : "mb-2"
              }`}
            >
              <button
                className="btn btn-sm lg:btn-md btn-app btn-neutral"
                onClick={goToPrevDay}
              >
                Prev
              </button>
              <h5 className=" text-lg lg:text-xl font-diatype-medium ">
                {format(selectedDay.date, "PPPP")}
              </h5>
              <span className="flex justify-between items-center gap-x-2">
                <button
                  className="btn btn-sm lg:btn-md btn-app btn-neutral"
                  onClick={goToNextDay}
                >
                  Next
                </button>

                <button
                  className={`btn btn-sm lg:btn-md btn-app btn-primary ${
                    isAdmin ? "" : "hidden"
                  }`}
                >
                  Add New
                </button>
              </span>
            </div>

            {selectedDay.events.length > 0 ? (
              selectedDay.events.map((event, idx) => {
                const isExpanded = expandedEventId === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => setExpandedEventId(isExpanded ? null : idx)}
                    className="mb-1 p-4 rounded-3xl bg-primary  "
                  >
                    <div
                      className={`flex items-center justify-between gap-2 mb-2 ${
                        gridLayout
                          ? "flex-row"
                          : "flex-col items-start w-1/2 bg-primary"
                      }`}
                    >
                      <p className=" font-diatype-bold">{event.title}</p>
                      <span className="flex items-center justify-center gap-x-2">
                        <button
                          className={`${
                            isAdmin ? "" : "hidden"
                          } btn btn-sm lg:btn-md  btn-app btn-neutral`}
                        >
                          Edit Event
                        </button>
                        <button
                          onClick={() =>
                            setExpandedEventId(isExpanded ? null : idx)
                          }
                          className="btn btn-sm lg:btn-md  btn-app btn-info"
                        >
                          User Details
                        </button>
                      </span>
                    </div>
                    <p>
                      <strong className="font-diatype-bold">Start:</strong>{" "}
                      {format(event.start, "Pp")}
                    </p>
                    <p>
                      <strong className="font-diatype-bold">End:</strong>{" "}
                      {format(event.end, "Pp")}
                    </p>
                    {isExpanded && event.user && (
                      <div className="mt-2 bg-info text-info-content rounded-3xl p-4 font-diatype-medium ">
                        <p className={`${isAdmin ? "" : "hidden"}`}>
                          <strong>Email: </strong>

                          {event.user.email}
                        </p>
                        <p>
                          <strong className="font-diatype-bold">Role:</strong>{" "}
                          {event.user.role}
                        </p>
                        <p className={`${isAdmin ? "" : "hidden"}`}>
                          <strong className="font-diatype-bold">Admin:</strong>{" "}
                          {event.user.admin ? "Yes" : "No"}
                        </p>
                        <p>
                          <strong className="font-diatype-bold">Hours:</strong>{" "}
                          {event.user.hours}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="p-4">No events for this day.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyCalendar;
