"use client";

import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import sv from "date-fns/locale/sv";
import { addMonths, subMonths, addDays, subDays } from "date-fns";

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

const myEventsList = [
  {
    title: "Hampus Jobbpass",
    start: new Date(2025, 4, 25, 10, 0),
    end: new Date(2025, 4, 25, 12, 0),
    color: "hsl(var(--primary))",
  },
  {
    title: "Irenes Jobbpass",
    start: new Date(2025, 4, 26, 14, 0),
    end: new Date(2025, 4, 26, 16, 0),
    color: "hsl(var(--secondary))",
  },
  {
    title: "Justus Jobbpass",
    start: new Date(2025, 4, 27, 9, 0),
    end: new Date(2025, 4, 27, 11, 0),
    color: "hsl(var(--accent))",
  },
  {
    title: "Emma Förmiddagspass",
    start: new Date(2025, 4, 28, 8, 0),
    end: new Date(2025, 4, 28, 12, 0),
    color: "hsl(var(--info))",
  },
  {
    title: "Oscar Eftermiddagspass",
    start: new Date(2025, 4, 28, 13, 0),
    end: new Date(2025, 4, 28, 17, 0),
    color: "hsl(var(--warning))",
  },
  {
    title: "Maja Kvällspass",
    start: new Date(2025, 4, 29, 17, 0),
    end: new Date(2025, 4, 29, 21, 0),
    color: "hsl(var(--success))",
  },
  {
    title: "Anton Heldag",
    start: new Date(2025, 4, 30, 9, 0),
    end: new Date(2025, 4, 30, 17, 0),
    color: "hsl(var(--error))",
  },
  {
    title: "Sofia Möte",
    start: new Date(2025, 4, 30, 11, 0),
    end: new Date(2025, 4, 30, 12, 0),
    color: "hsl(var(--info))",
  },
  {
    title: "Hampus Extrajobb",
    start: new Date(2025, 4, 31, 15, 0),
    end: new Date(2025, 4, 31, 19, 0),
    color: "hsl(var(--primary))",
  },
  {
    title: "Irene Kvällsmöte",
    start: new Date(2025, 4, 31, 18, 0),
    end: new Date(2025, 4, 31, 20, 0),
    color: "hsl(var(--secondary))",
  },
  {
    title: "Justus Morgonmöte",
    start: new Date(2025, 4, 25, 8, 0),
    end: new Date(2025, 4, 25, 9, 30),
    color: "hsl(var(--accent))",
  },
];

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

    days.push({
      date: currentDay,
      events: eventsForDay,
    });
  }

  return days;
};

const MyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)); // Starting with May 2025
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [expandedEventId, setExpandedEventId] = useState(null);

  const [selectedDay, setSelectedDay] = useState(null);

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const daysInMonth = generateDays(startOfMonth, myEventsList);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setSelectedEvent(null);
    setExpandedEventId(null); // Collapse expanded events
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const goToPrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

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
    <div className=" w-full flex flex-col justify-start items-start lg:grid lg:grid-cols-4 px-2  ">
      <div className=" flex flex-col w-full p-4 lg:col-span-2 aspect-square bg-warning rounded-3xl">
        <div className="flex justify-between items-center  h-8 mb-2">
          <button
            className="btn btn-sm btn-app btn-neutral"
            onClick={goToPrevMonth}
          >
            Prev
          </button>
          <h5 className=" text-xl font-diatype-medium leading-auto text-warning-content ">
            {format(currentDate, "MMMM yyyy")}
          </h5>
          <button
            className=" btn btn-sm btn-app btn-neutral"
            onClick={goToNextMonth}
          >
            Next
          </button>
        </div>

        <div className="grid grid-cols-7  w-full font-diatype-bold text-warning-content h-8">
          <div className=" text-center">S</div>
          <div className=" text-center">M</div>
          <div className=" text-center">T</div>
          <div className=" text-center">W</div>
          <div className=" text-center">T</div>
          <div className=" text-center">F</div>
          <div className=" text-center">S</div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {daysInMonth.map((dayObj, index) => (
            <div
              key={index}
              className={` z-0 grid grid-rows-3 items-center justify-center font-diatype-bold  text-center  aspect-square p-1  rounded-xl ${
                dayObj.date.getMonth() !== startOfMonth.getMonth()
                  ? "text-neutral-content bg-base-100"
                  : "hover:bg-primary-content hover:text-primary cursor-pointer text-primary-content bg-primary"
              } `}
              onClick={() => handleDayClick(dayObj)}
            >
              <span className="row-start-2">{format(dayObj.date, "d")}</span>

              {/* VISA EVENTS  */}
              <div className="flex flex-row items-start justify-start row-start-3">
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
                    <div className="bg-base-content w-2 h-2 m-0.5 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DAY INFO SECTION */}
      <div className="w-full h-full lg:col-span-2 bg-warning rounded-3xl p-4 aspect-square">
        {selectedDay && (
          <>
            <div className="flex justify-between items-center h-8 mb-10">
              <button
                className="btn btn-sm btn-app btn-neutral"
                onClick={goToPrevDay}
              >
                Prev
              </button>
              <h5 className="text-xl font-diatype-medium text-warning-content">
                {format(selectedDay.date, "PPPP")}
              </h5>
              <button
                className="btn btn-sm btn-app btn-neutral"
                onClick={goToNextDay}
              >
                Next
              </button>
            </div>

            {selectedDay.events.length > 0 ? (
              selectedDay.events.map((event, idx) => {
                const isExpanded = expandedEventId === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => setExpandedEventId(isExpanded ? null : idx)}
                    className="mb-1 p-4 rounded-xl cursor-pointer bg-primary text-primary-content"
                  >
                    <p className="text-md font-bold">{event.title}</p>
                    <p>
                      <strong>Start:</strong> {format(event.start, "Pp")}
                    </p>
                    <p>
                      <strong>End:</strong> {format(event.end, "Pp")}
                    </p>

                    {isExpanded && (
                      <>
                        <hr className="my-2" />
                        <p>
                          <strong>Extra details here:</strong> For example,
                          location, notes, or who’s attending.
                        </p>
                      </>
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

export default function BigCalendar() {
  return <MyCalendar />;
}
