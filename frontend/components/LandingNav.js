"use client";

import Link from "next/link";
import { useState } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";

export default function LandingNav({ variant }) {
  const [open, setOpen] = useState(false);
  const isAppMode = variant === "appMode";

  function handleMobileMenu() {
    setOpen((prev) => !prev);
  }

  return (
    <header
      // className={`fixed w-[calc(100vw-2rem)] z-20 m-4 ${
      //   isAppMode ? "bg-neutral lg:bg-content-800" : "bg-neutral"
      // } ${open ? "backdrop-blur-xl h-full" : "rounded-4xl"}`}

      className="fixed w-[calc(100vw-2rem)] z-20 m-4 rounded-4xl bg-neutral"
    >
      <div
        className={`flex items-center justify-between lg:justify-start pl-5 ${
          isAppMode ? " lg:pl-36" : " pr-3 lg:pl-11 lg:pr-9"
        }  h-16 lg:h-20 lg:gap-x-16`}
      >
        <div className="flex items-center justify-between w-full lg:w-auto">
          {!open && (
            <Link href="/">
              <svg
                className={`w-36 lg:w-44 cursor-pointer m-4 ${
                  isAppMode ? "text-primary" : "text-primary"
                }`}
                viewBox="0 0 605 99"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M524.4 8.88794V0.439941H558.96V8.88794H546.8V33.3359H536.432V8.88794H524.4ZM563.568 33.3359V0.439941H574.576L584.176 22.3279L593.648 0.439941H604.912V33.3359H595.568V15.5439L588.528 33.3359H579.952L572.912 16.0559V33.3359H563.568Z" />
                <path d="M0.42395 98.9999V2.99994H50.856L69.9279 53.9439L88.8719 2.99994H139.432V98.9999H101.032V45.7519L81.8319 98.9999H58.024L38.824 46.0079V98.9999H0.42395Z" />
                <path d="M154.549 98.9999V2.99994H257.333V27.3199H194.229V39.6079H251.829V60.8559H194.229V73.3999H258.357V98.9999H154.549Z" />
                <path d="M270.549 98.9999V2.99994H355.797C375.381 2.99994 387.925 15.9279 387.925 36.1519C387.925 55.3519 374.357 64.0559 355.797 65.4639L390.613 98.9999H342.485L312.149 65.7199H310.229V98.9999H270.549ZM334.037 44.7279C342.485 44.7279 346.965 42.6799 346.965 36.4079C346.965 29.8799 342.357 28.0879 333.141 28.0879H310.229V44.7279H334.037Z" />
                <path d="M434.91 98.9999H391.518L438.11 2.99994H489.182L536.158 98.9999H489.694L482.398 81.3359H442.206L434.91 98.9999ZM450.526 61.4959H474.078L462.302 33.2079L450.526 61.4959Z" />
              </svg>
            </Link>
          )}
        </div>

        {!isAppMode && (
          <>
            {/* Desktop nav */}
            <nav className="hidden lg:flex space-x-8 items-center font-diatype-medium text-primary w-full">
              <Link className="cursor-pointer" href="/">
                Examples
              </Link>
              <Link className="cursor-pointer" href="/">
                Solutions
              </Link>
              <Link className="cursor-pointer" href="/">
                Resources
              </Link>
              <Link className="cursor-pointer" href="/">
                Pricing
              </Link>
            </nav>

            {/* Desktop buttons */}
            <div className="hidden lg:flex justify-end items-center space-x-4 w-full  ">
              <Link href="/createWorkspace">
                <button className="btn btn-primary btn-app">Sign up</button>
              </Link>
              <Link href="/logIn">
                <button className="btn btn-secondary btn-app">Log in</button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                className="bg-neutral p-2"
                onClick={handleMobileMenu}
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {!open && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile full-screen menu */}
      {open && !isAppMode && (
        <div className="fixed top-0 left-0 z-30 w-full h-full bg-neutral">
        <div className="flex justify-between items-center w-full px-5 py-4 mb-30">
            <h2 className="text-primary text-5xl m-4">Menu</h2>
            <button onClick={() => setOpen(false)}>
              <Cross1Icon className="w-6 h-6 text-primary m-4" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-col px-4 pt-8 bg-neutral text-primary space-y-4 w-[calc(100vw-2rem)] m-4">
            <Link 
            className="" onClick={handleMobileMenu} href="/">
              <h3 className="pb-2 uppercase border-b">Product</h3>
            </Link>
            <Link className="text-lg" onClick={handleMobileMenu} href="/">
              <h3 className="pb-2 uppercase border-b">Resources</h3>
            </Link>
            <Link className="text-lg" onClick={handleMobileMenu} href="/">
            <h3 className="pb-2 uppercase border-b">Pricing</h3>
            </Link>
            <Link className="text-lg" onClick={handleMobileMenu} href="/">
             <h3 className="pb-2 uppercase text-bold border-b">Contact</h3>
            </Link>

            <div className="my-6 p-4"></div>
            <button className="btn btn-primary btn-xl">
            <Link className="uppercase" onClick={handleMobileMenu} href="/logIn">
             Get Started
            </Link>
            </button>
            <button className="mt-2 btn btn-xl">
            <Link
              className="uppercase"
              onClick={handleMobileMenu}
              href="/createWorkspace"
            >
              Log In
            </Link>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
