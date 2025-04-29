"use client";

import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import sv from "date-fns/locale/sv";
import { addMonths, subMonths } from "date-fns";

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
    color: "#cd1c18",
  },
  {
    title: "Irenes Jobbpass",
    start: new Date(2025, 4, 26, 14, 0),
    end: new Date(2025, 4, 26, 16, 0),
    color: "#ffc067",
  },
  {
    title: "Justus Jobbpass",
    start: new Date(2025, 4, 27, 9, 0),
    end: new Date(2025, 4, 27, 11, 0),
    color: "#4682B4",
  },

  {
    title: "Emma Förmiddagspass",
    start: new Date(2025, 4, 28, 8, 0),
    end: new Date(2025, 4, 28, 12, 0),
    color: "#6a0dad",
  },
  {
    title: "Oscar Eftermiddagspass",
    start: new Date(2025, 4, 28, 13, 0),
    end: new Date(2025, 4, 28, 17, 0),
    color: "#ffa500",
  },
  {
    title: "Maja Kvällspass",
    start: new Date(2025, 4, 29, 17, 0),
    end: new Date(2025, 4, 29, 21, 0),
    color: "#20b2aa",
  },
  {
    title: "Anton Heldag",
    start: new Date(2025, 4, 30, 9, 0),
    end: new Date(2025, 4, 30, 17, 0),
    color: "#dc143c",
  },
  {
    title: "Sofia Möte",
    start: new Date(2025, 4, 30, 11, 0),
    end: new Date(2025, 4, 30, 12, 0),
    color: "#00ced1",
  },
  {
    title: "Hampus Extrajobb",
    start: new Date(2025, 4, 31, 15, 0),
    end: new Date(2025, 4, 31, 19, 0),
    color: "#6495ed",
  },
  {
    title: "Irene Kvällsmöte",
    start: new Date(2025, 4, 31, 18, 0),
    end: new Date(2025, 4, 31, 20, 0),
    color: "#ff69b4",
  },
  {
    title: "Justus Morgonmöte",
    start: new Date(2025, 4, 25, 8, 0),
    end: new Date(2025, 4, 25, 9, 30),
    color: "#ff69b4",
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
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const goToPrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  return (
    <div className=" w-full flex flex-col justify-start items-start lg:grid lg:grid-cols-4 p-4">
      <div className=" border flex flex-col w-full p-4 lg:col-span-2 aspect-square bg-base-100 ">
        <div className="flex justify-between items-center mb-4">
          <button className="btn btn-sm" onClick={goToPrevMonth}>
            Prev
          </button>
          <h5 className=" text-xl font-mattone-bold ">
            {format(currentDate, "MMMM yyyy")}
          </h5>
          <button className="btn btn-sm" onClick={goToNextMonth}>
            Next
          </button>
        </div>
        <hr className="mb-4" />

        <div className="grid grid-cols-7  w-full font-mattone-bold text-sm mb-4">
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
              className={` z-0 grid grid-rows-3 items-center justify-center text-sm text-center cursor-pointer aspect-square p-1 ${
                dayObj.date.getMonth() !== startOfMonth.getMonth()
                  ? "text-gray-400 bg-base-100"
                  : "hover:bg-primary bg-base-200"
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
                    <div
                      className=" w-2 h-2 m-0.5 rounded-full"
                      style={{ backgroundColor: event.color }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <hr className="" />
      </div>

      {/* DAY INFO SECTION */}
      <div className="w-full lg:col-span-2">
        {selectedEvent && (
          <div className="pt-8 lg:p-4">
            <h6 className="text-xl font-mattone-bold mb-8 lg:mb-12 lg:text-base">
              Event Details
            </h6>
            <div
              className="mt-4 text-sm p-4"
              style={{ backgroundColor: selectedEvent.color }}
            >
              <p>
                <strong>Title:</strong> {selectedEvent.title}
              </p>
              <p>
                <strong>Start:</strong> {format(selectedEvent.start, "Pp")}
              </p>
              <p>
                <strong>End:</strong> {format(selectedEvent.end, "Pp")}
              </p>
              <hr className="my-2" />
            </div>
          </div>
        )}

        {selectedDay && !selectedEvent && (
          <div className="pt-8 lg:p-4">
            <h6 className="text-xl font-mattone-bold mb-4 lg:mb-14 ">
              {format(selectedDay.date, "PPPP")}
            </h6>
            <div className="mt-2 text-sm">
              {selectedDay.events.length > 0 ? (
                selectedDay.events.map((event, idx) => (
                  <div
                    key={idx}
                    className="mb-4 p-4"
                    style={{ backgroundColor: event.color }}
                  >
                    <p>
                      <strong>Title:</strong> {event.title}
                    </p>
                    <p>
                      <strong>Start:</strong> {format(event.start, "Pp")}
                    </p>
                    <p>
                      <strong>End:</strong> {format(event.end, "Pp")}
                    </p>
                    <hr className="my-2" />
                  </div>
                ))
              ) : (
                <p className="p-4">No events for this day.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function BigCalendar() {
  return <MyCalendar />;
}
