import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className="flex items-center  my-5 mx-10 absolute">
      <span className="text-gray-900 dark:text-gray-100 mr-2">
        {isDarkMode ? "🌙" : "🌞"}
      </span>
      <div
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`relative inline-flex items-center cursor-pointer w-14 h-8 rounded-full transition-colors duration-300 ease-in-out ${
          isDarkMode ? "bg-gray-700" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ease-in-out ${
            isDarkMode ? "translate-x-6" : ""
          }`}
        ></span>
      </div>
    </div>
  );
};

export default ThemeToggle;
