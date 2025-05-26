"use client";
import { useEffect, useState } from "react";
import { themeChange } from "theme-change";

export default function ThemeSwitch({ text, hideText }) {
  const [isDark, setIsDark] = useState(false);

  const getStockholmHour = () => {
    const stockholmTime = new Date().toLocaleString("en-US", {
      timeZone: "Europe/Stockholm",
      hour: "numeric",
      hour12: false,
    });
    return parseInt(stockholmTime, 10);
  };

  // Initialize theme-change when the component is mounted
  useEffect(() => {
    themeChange(false);

    const hour = getStockholmHour();
    const shouldUseDark = hour < 8 || hour >= 18;
    const newTheme = shouldUseDark ? "mera-dark" : "mera";

    document.documentElement.setAttribute("data-theme", newTheme);
    setIsDark(shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "mera" : "mera-dark";
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", newTheme);
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
