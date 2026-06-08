"use client";
import { useEffect, useState } from "react";

export default function ThemeSwitch({ text, hideText }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "mera-dark") {
      setIsDark(true);
      document.documentElement.setAttribute("data-theme", "mera-dark");
    } else {
      document.documentElement.setAttribute("data-theme", "mera");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "mera" : "mera-dark";
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
      {hideText ? (
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={!isDark}
            className="toggle toggle-xs border-secondary-content bg-secondary checked:border-secondary-content checked:bg-secondary checked:text-secondary-content"
            onChange={toggleTheme}
          />
        </div>
      ) : (
        <div className="flex flex-row gap-2 items-center justify-center w-auto">
          <p
            className={`font-diatype-regular tracking-normal  ${
              isDark ? "opacity-100" : "opacity-50"
            }`}
          >
            NIGHT
          </p>

          <input
            type="checkbox"
            checked={!isDark}
            className="toggle toggle-md bg-primary border-primary-content text-primary-content"
            onChange={toggleTheme}
          />

          <p
            className={`font-diatype-regular tracking-normal  ${
              isDark ? "opacity-50" : "opacity-100"
            }`}
          >
            DAY
          </p>
        </div>
      )}
    </>
  );
}
