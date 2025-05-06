"use client";

import Link from "next/link";
import { useState } from "react";
import { FiCalendar, FiFileText, FiEdit3, FiClock } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function handleMobileMenu() {
    setOpen((prev) => !prev);
  }

  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-45 bg-neutral shadow-sm p-4 z-40">
        <ul className="menu menu-vertical p-4 gap-y-8">
          <a className="btn flex items-center gap-3 hover:text-neutral hover:bg-primary">
            <FiEdit3 />
            Project
          </a>
          <Link
            href="/createprojects"
            className="btn flex items-center gap-3 hover:text-neutral hover:bg-primary"
          >
            <FiCalendar /> Schedule
          </Link>
          <a className="btn flex items-center gap-3 hover:text-neutral hover:bg-primary">
            <FiClock />
            Timer
          </a>

          <a className="btn flex items-center gap-3 hover:text-neutral hover:bg-primary">
            <FiFileText />
            News
          </a>
          <a className="btn flex items-center gap-3 hover:text-neutral hover:bg-primary">
            Item 3
          </a>
          <a className="btn flex items-center gap-3 hover:text-neutral hover:bg-primary">
            Item 5
          </a>
          <a className="btn flex items-center gap-3 hover:text-neutral hover:bg-primary">
            Item 6
          </a>
          <a className="btn flex items-center gap-3 hover:text-neutral hover:bg-primary">
            Item 7
          </a>
        </ul>
      </div>

      <div className="fixed top-0 left-45 right-0 h-20 bg-base-100 flex items-center justify-between px-8 shadow-sm z-50">
        <div className="navbar-start">
          <Link href="/">
            <svg
              className="w-32 h-auto"
              viewBox="0 0 605 99"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <svg
                width="605"
                height="99"
                viewBox="0 0 605 99"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M524.4 8.88794V0.439941H558.96V8.88794H546.8V33.3359H536.432V8.88794H524.4ZM563.568 33.3359V0.439941H574.576L584.176 22.3279L593.648 0.439941H604.912V33.3359H595.568V15.5439L588.528 33.3359H579.952L572.912 16.0559V33.3359H563.568Z"
                  fill="black"
                />
                <path
                  d="M0.42395 98.9999V2.99994H50.856L69.9279 53.9439L88.8719 2.99994H139.432V98.9999H101.032V45.7519L81.8319 98.9999H58.024L38.824 46.0079V98.9999H0.42395Z"
                  fill="black"
                />
                <path
                  d="M154.549 98.9999V2.99994H257.333V27.3199H194.229V39.6079H251.829V60.8559H194.229V73.3999H258.357V98.9999H154.549Z"
                  fill="black"
                />
                <path
                  d="M270.549 98.9999V2.99994H355.797C375.381 2.99994 387.925 15.9279 387.925 36.1519C387.925 55.3519 374.357 64.0559 355.797 65.4639L390.613 98.9999H342.485L312.149 65.7199H310.229V98.9999H270.549ZM334.037 44.7279C342.485 44.7279 346.965 42.6799 346.965 36.4079C346.965 29.8799 342.357 28.0879 333.141 28.0879H310.229V44.7279H334.037Z"
                  fill="black"
                />
                <path
                  d="M434.91 98.9999H391.518L438.11 2.99994H489.182L536.158 98.9999H489.694L482.398 81.3359H442.206L434.91 98.9999ZM450.526 61.4959H474.078L462.302 33.2079L450.526 61.4959Z"
                  fill="black"
                />
              </svg>
            </svg>
          </Link>
        </div>
        <div className="navbar-end">
          <Link href="/user/settings">
            <button className="btn bg-accent">Irene</button>
          </Link>
        </div>
      </div>
    </>
  );
}
