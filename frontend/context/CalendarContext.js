"use client";

import { createContext, useEffect, useState } from "react";

export const HandleCalendarContext = createContext([]);

export default function CalendarContext({ children }) {
  //Give date with format YYYY-MM-DD get week in response
  function getISOWeekNumber(dateString) {
    const date = new Date(dateString);

    // Create a new date in UTC to avoid timezone issues
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );

    // Get the day of the week (Monday = 1, Sunday = 7)
    const dayNum = d.getUTCDay() || 7;

    // Move to Thursday in the current week (ISO weeks are based on Thursday)
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);

    // Get the first day of the ISO year
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

    // Calculate week number
    const weekNumber = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);

    return weekNumber;
  }

  //Give week and year and get the date of the monday same week
  function getDateOfISOWeek(week, year) {
    // Jan 4 is always in the first ISO week
    const simple = new Date(Date.UTC(year, 0, 4));

    // Get the day of the week (Monday = 1, Sunday = 7)
    const dayOfWeek = simple.getUTCDay() || 7;

    // Calculate Monday of week 1
    const isoWeek1Monday = new Date(simple);
    isoWeek1Monday.setUTCDate(simple.getUTCDate() - dayOfWeek + 1);

    // Get Monday of target week
    const targetMonday = new Date(isoWeek1Monday);
    targetMonday.setUTCDate(isoWeek1Monday.getUTCDate() + (week - 1) * 7);

    return {
      year: targetMonday.getUTCFullYear(),
      month: targetMonday.getUTCMonth() + 1, // getUTCMonth() is zero-based
      day: targetMonday.getUTCDate(),
    };
  }

  const [redDays, setRedDays] = useState();
  async function getRedDays() {
    const response = await fetch(
      `https://date.nager.at/api/v3/PublicHolidays/${year}/SE`
    );
    const thisYear = await response.json();

    const response2 = await fetch(
      `https://date.nager.at/api/v3/PublicHolidays/${year - 1}/SE`
    );
    const lastYear = await response2.json();

    const response3 = await fetch(
      `https://date.nager.at/api/v3/PublicHolidays/${year + 1}/SE`
    );
    const nextYear = await response3.json();

    const allHolidays = [thisYear, lastYear, nextYear];
    setRedDays(allHolidays.flat());
  }
  useEffect(() => {
    getRedDays();
  }, []);

  const [shifts, setShifts] = useState([
    {
      company_id: 32,
      user_id: 1,
      date: "2025-06-03",
      start: "06:00",
      end: "15:00",
      description: "Rast 11:00 - 11:45",
      role: "kött och chark",
    },
    {
      company_id: 32,
      user_id: 1,
      date: "2025-06-03",
      start: "03:00",
      end: "11:00",
      description: "Rast 07:00 - 08:00",
      role: "öppning",
    },
    {
      company_id: 32,
      user_id: 1,
      date: "2025-06-03",
      start: "10:00",
      end: "19:00",
      description: "Rast 14:00 - 14:45",
      role: "kassa",
    },
    {
      company_id: 32,
      user_id: 2,
      date: "2025-05-12",
      start: "07:00",
      end: "16:00",
      description: "Rast 11:45 - 12:30",
      role: "Deli och färsk",
    },
    {
      company_id: 32,
      user_id: 3,
      date: "2025-05-12",
      start: "08:00",
      end: "17:00",
      description: "Rast 11:45 - 12:30",
      role: "Deli och färsk",
    },
  ]);

  const todaysDate = new Date();
  const todaysMonth = todaysDate.getMonth();
  const todaysYear = todaysDate.getFullYear();
  const [month, setMonth] = useState(todaysMonth);
  const [year, setYear] = useState(todaysYear);
  const [activeCalendar, setActiveCalendar] = useState("Month");
  const [todaysState, setTodaysState] = useState(todaysDate.getDate());
  const [displayedWeek, setDisplayedWeek] = useState(1);
  const [lastDayOfCurrentMonth, setLastDayOfCurrentMonth] = useState(
    new Date(year, month + 1, 0)
  );
  const [daysInMonth, setDaysInMonth] = useState(
    lastDayOfCurrentMonth.getDate()
  );

  useEffect(() => {
    const lastDayOfMonth = new Date(year, month + 1, 0);
    setDaysInMonth(lastDayOfMonth.getDate());
    console.log("days in month", daysInMonth);
  }, [month, year]);

  // Create a new date object based on `todaysState`
  const baseDate = new Date(year, month, todaysState);

  const currentDay = (baseDate.getDay() + 6) % 7; // Adjust so Monday = 0, ..., Sunday = 6

  const [monthString, setMonthString] = useState("");
  function convertMonthToString() {
    if (month === 0) {
      setMonthString("January");
    } else if (month === 1) {
      setMonthString("February");
    } else if (month === 2) {
      setMonthString("March");
    } else if (month === 3) {
      setMonthString("April");
    } else if (month === 4) {
      setMonthString("May");
    } else if (month === 5) {
      setMonthString("June");
    } else if (month === 6) {
      setMonthString("July");
    } else if (month === 7) {
      setMonthString("August");
    } else if (month === 8) {
      setMonthString("September");
    } else if (month === 9) {
      setMonthString("October");
    } else if (month === 10) {
      setMonthString("November");
    } else if (month === 11) {
      setMonthString("December");
    }
  }

  useEffect(() => {
    convertMonthToString();
  }, [month]);

  return (
    <HandleCalendarContext.Provider
      value={{
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
        daysInMonth,
        setDaysInMonth,
        shifts,
        setShifts,
      }}
    >
      {children}
    </HandleCalendarContext.Provider>
  );
}
