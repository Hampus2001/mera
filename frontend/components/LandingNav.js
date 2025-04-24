"use client";

import Link from "next/link";
import { useState } from "react";

export default function LandingNav({ variant }) {
  const [open, setOpen] = useState(false);
  const isSignUp = variant === "signUp";

  function handleMobileMenu() {
    setOpen((prev) => !prev);
  }

  return (
    <header className="fixed top-0 left-0 w-screen z-10 backdrop-blur-sm">
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <Link href="/">
            <svg
              className="w-36 lg:w-44 cursor-pointer"
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
        </div>
        {!isSignUp && (
          <>
            <nav className="hidden lg:block space-x-8 font-absans">
              <Link className="cursor-pointer" href="/">
                Examples
              </Link>
              <Link className="cursor-pointer" href="/">
                Solutions
              </Link>
              <details className="dropdown">
                <summary className="cursor-pointer">Resources</summary>
                <ul className="menu dropdown-content p-4 bg-base-200 mt-1">
                  <li>
                    <a>Item</a>
                  </li>
                  <li>
                    <a>Item</a>
                  </li>
                </ul>
              </details>

              <Link className="cursor-pointer" href="/">
                Pricing
              </Link>
            </nav>
            <span className="space-x-4 hidden lg:block">
              <Link href="/signup">
                <button className="btn btn-secondary">Sign up</button>
              </Link>
              <button className="btn">Log in</button>
            </span>
            <nav className="block lg:hidden">
              <button
                onClick={handleMobileMenu}
                className="link-hover font-mattone-bold text-xl underline-offset-8 cursor-pointer"
              >
                MENU
              </button>
              {open && (
                <div className=" absolute top-0 left-0 w-screen h-screen z-20  overflow-hidden">
                  <ul className="flex flex-col items-center justify-center bg-base-300  w-full h-full font-mattone-bold text-4xl uppercase">
                    <span className="flex flex-col items-center justify-center gap-y-2">
                      <li>
                        <Link className=" opacity-25" href="/">
                          Examples
                        </Link>
                      </li>
                      <li>
                        <Link className=" opacity-25" href="/">
                          Solutions
                        </Link>
                      </li>
                      <li>
                        <details className="dropdown dropdown-center">
                          <summary className="cursor-pointer ">
                            Resources
                          </summary>
                          <ul className="menu dropdown-content p-4 bg-base-300 mt-1">
                            <li>
                              <a>Item</a>
                            </li>
                            <li>
                              <a>Item</a>
                            </li>
                          </ul>
                        </details>
                      </li>
                      <li>
                        <Link className="cursor-pointer opacity-25" href="/">
                          Pricing
                        </Link>
                      </li>
                      <div className="divider divider-neutral"></div>

                      <li>
                        <Link className="cursor-pointer" href="/">
                          Log In
                        </Link>
                      </li>
                      <li>
                        <Link className="cursor-pointer" href="/">
                          Sign Up
                        </Link>
                      </li>
                    </span>

                    <button
                      className="absolute top-4 right-8 cursor-pointer link-hover underline-offset-8 text-xl"
                      onClick={handleMobileMenu}
                    >
                      BACK
                    </button>
                  </ul>
                </div>
              )}
            </nav>
          </>
        )}
      </div>
    </header>
  );
}
