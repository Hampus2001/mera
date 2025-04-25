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
    start: new Date(2025, 4, 25, 10, 0), // Year, Month, Date, Hour, Minute
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
    title: "Justus Jobbpass",
    start: new Date(2025, 4, 27, 9, 0),
    end: new Date(2025, 4, 27, 11, 0),
    color: "#4682B4",
  },
];

// Helper function to get the grid layout for the days
const generateDays = (startOfMonth) => {
  const days = [];
  const startOfWeekDay = startOfWeek(startOfMonth);
  for (let i = 0; i < 42; i++) {
    // 6 rows x 7 days
    const currentDay = new Date(startOfWeekDay);
    currentDay.setDate(currentDay.getDate() + i);
    days.push(currentDay);
  }
  return days;
};

const MyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)); // Starting with May 2025
  const [selectedEvent, setSelectedEvent] = useState(null);

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const daysInMonth = generateDays(startOfMonth);

  const handleEventClick = (event) => {
    setSelectedEvent(event); // Set the selected event when clicked
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1)); // Go to next month
  };

  const goToPrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1)); // Go to previous month
  };

  return (
    <div className="border w-full h-full bg-base-300 flex flex-col justify-start items-start gap-y-4 lg:grid lg:grid-cols-4 ">
      {/* Header */}
      <div className="flex flex-col w-full bg-base-200 p-4 lg:col-span-2 rounded-lg ">
        <div className="flex justify-between items-center mb-4">
          <button className="btn btn-outline btn-sm" onClick={goToPrevMonth}>
            Prev
          </button>
          <h2 className="text-xl font-bold">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <button className="btn btn-outline btn-sm" onClick={goToNextMonth}>
            Next
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 bg-white shadow-xl border p-4 aspect-square ">
          {/* Weekdays Header */}
          <div className="font-bold text-center">S</div>
          <div className="font-bold text-center">M</div>
          <div className="font-bold text-center">T</div>
          <div className="font-bold text-center">W</div>
          <div className="font-bold text-center">T</div>
          <div className="font-bold text-center">F</div>
          <div className="font-bold text-center">S</div>

          {/* Days */}
          {daysInMonth.map((day, index) => (
            <div
              key={index}
              className={`grid grid-rows-3 grid-cols-3 text-sm text-center p-4 cursor-pointer border aspect-square ${
                day.getMonth() !== startOfMonth.getMonth()
                  ? "text-gray-400"
                  : "hover:bg-blue-100"
              } rounded`}
              onClick={() => setSelectedEvent(null)} // Deselect event when clicking on a day
            >
              <span className="row-start-2 col-start-2">
                {format(day, "d")}
              </span>

              {/* Render events if any */}
              <div className="row-start-3 col-start-2">
                {myEventsList
                  .filter(
                    (event) =>
                      format(event.start, "yyyy-MM-dd") ===
                      format(day, "yyyy-MM-dd")
                  )
                  .map((event, idx) => (
                    <div
                      key={idx}
                      className="relative flex justify-center"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the day click handler from triggering
                        handleEventClick(event); // Handle event click
                      }}
                    >
                      {/* Event Badge */}
                      <div
                        className="w-2 h-2 lg:w-3 lg:h-3 rounded-full   hover:opacity-75 col-start-2 row-start-3"
                        style={{ backgroundColor: event.color, color: "#fff" }}
                      ></div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Section */}
      <div className="col-span-3 col-start-3 w-full lg:w-auto bg-base-200 border-l p-4 h-full">
        {selectedEvent && (
          <div className=" p-4 bg-base-100 border shadow-lg">
            <h3 className=" font-bold">Event Details</h3>
            <div className="mt-2 text-sm">
              <p>
                <strong>Title:</strong> {selectedEvent.title}
              </p>
              <p>
                <strong>Start:</strong> {format(selectedEvent.start, "Pp")}
              </p>
              <p>
                <strong>End:</strong> {format(selectedEvent.end, "Pp")}
              </p>
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
