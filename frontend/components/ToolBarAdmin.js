import "cally";

export default function ToolBarAdmin() {
  return (
    <>
      <div>
        <calendar-date className="cally bg-neutral text-neutral-content ml-12 mt-12">s
          <svg
            aria-label="Previous"
            className="fill-current size-4 text-base-100 hover:text-neutral active:text-neutral"
            slot="previous"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path>
          </svg>
          <svg
            aria-label="Next"
            className="fill-current size-4 text-base-100 hover:text-neutral active:text-neutral"
            slot="next"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
          </svg>
          <calendar-month></calendar-month>
        </calendar-date>
      </div>
      <div className="w-70 mx-auto mt-10">
        <button
          type="submit"
          className="btn btn-neutral rounded-full border-neutral-content w-full"
        >
          Add to My Schedule
        </button>
      </div>
    </>
  );
}
