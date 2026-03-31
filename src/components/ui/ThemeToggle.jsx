import { useEffect, useState } from "react";
import { CiLight } from "react-icons/ci";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

function ThemeToggle() {
  // Initialize state based on localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className="flex absolute bottom-1 font-bold text-xs left-22.5 ">
      <button
        onClick={() => setIsDark(!isDark)}
        className="p-4 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-lg justify-center "
      >
        {isDark ? (
          <MdDarkMode className="text-white size-5" />
        ) : (
          <MdOutlineLightMode className="text-yellow-500 font-bold size-5" />
        )}
      </button>
    </div>
  );
}

export default ThemeToggle;
