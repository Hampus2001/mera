"use client";

import { useEffect } from "react";

export default function ToolBarAdmin() {
  useEffect(() => {
    // Only runs on the client
    import("cally")
      .then((mod) => {
        // Optionally you can initialize Cally here if needed
      })
      .catch((err) => {
        console.error("Failed to load Cally:", err);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col lg:p-8 gap-y-8">
        <calendar-date className="cally bg-secondary text-secondary-content w-full">
          <svg
            aria-label="Previous"
            className="fill-current size-4 text-secondary-content hover:text-secondary-content active:text-secondary-content"
            slot="previous"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path>
          </svg>
          <svg
            aria-label="Next"
            className="fill-current size-4 text-secondary-content hover:text-secondary-content active:text-secondary-content"
            slot="next"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
          </svg>
          <calendar-month></calendar-month>
        </calendar-date>

        <button
          type="submit"
          className="btn btn-secondary rounded-full border-secondary-content w-full"
        >
          Add to My Schedule
        </button>
      </div>
    </>
  );
}
