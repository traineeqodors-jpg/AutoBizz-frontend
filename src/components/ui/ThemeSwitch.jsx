"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdDarkMode, MdSunny } from "react-icons/md";

const ThemeSwitch = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = resolvedTheme === "dark";

  // Prevent hydration mismatch
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted)
    return (
      <div className="h-10 w-full bg-gray-300 dark:bg-gray-200/20 rounded-xl animate-pulse" />
    );

  return (
    <div className="rounded-xl border-2 border-btn-50/20 dark:border-gray-800 overflow-hidden w-full mx-auto shadow-sm">
      <div className="relative flex items-center bg-back dark:bg-gray-900 rounded-lg p-1 h-10">
        {/* Sliding Highlight Background */}
        <div
          className={`absolute h-8 w-[calc(50%-4px)] bg-white dark:bg-gray-700 rounded-md shadow-sm transition-all duration-300 ease-in-out ${
            isDark ? "translate-x-[calc(100%+1px)]" : "translate-x-0"
          }`}
        />

        {/* Light Mode Button */}
        <button
          onClick={() => setTheme("light")}
          className={`relative z-10 flex-1 flex justify-center items-center gap-2 cursor-pointer ${
            !isDark ? "text-text" : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <MdSunny
            className={`size-5 ${!isDark ? "animate-[spin_0.8s_ease-in-out_1]" : ""}`}
          />
        </button>

        {/* Dark Mode Button */}
        <button
          onClick={() => setTheme("dark")}
          className={`relative z-10 flex-1 flex justify-center items-center gap-2 cursor-pointer ${
            isDark ? "text-white" : "text-gray-400 hover:text-btn-100"
          }`}
        >
          <MdDarkMode
            className={`size-5 ${isDark ? "animate-[spin_0.5s_ease-in-out_1]" : ""}`}
          />
        </button>
      </div>
    </div>
  );
};

export default ThemeSwitch;
