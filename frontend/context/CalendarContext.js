"use client";

import { createContext, useEffect, useState } from "react";

export const HandleCalendarContext = createContext([]);

export default function CalendarContext({ children }) {
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

  const todaysDate = new Date();
  const todaysMonth = todaysDate.getMonth();
  const todaysYear = todaysDate.getFullYear();
  const [month, setMonth] = useState(todaysMonth);
  const [year, setYear] = useState(todaysYear);

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
      }}
    >
      {children}
    </HandleCalendarContext.Provider>
  );
}
