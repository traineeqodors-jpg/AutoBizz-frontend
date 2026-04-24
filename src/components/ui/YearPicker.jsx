import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const YearPicker = ({ selectedYear, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 100;
  const [viewYear, setViewYear] = useState(selectedYear || currentYear);

  const updatePosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const dropdownHeight = 260;
      const spaceBelow = window.innerHeight - rect.bottom;

      let newTop;
      // Flip logic
      if (spaceBelow < dropdownHeight) {
        newTop = rect.top + window.scrollY - dropdownHeight - 8;
      } else {
        newTop = rect.bottom + window.scrollY + 4;
      }

      setCoords({
        top: newTop,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
    }
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !containerRef.current?.contains(event.target) &&
        !dropdownRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const years = Array.from({ length: 10 }, (_, i) => viewYear - i).filter(
    (y) => y >= minYear && y <= currentYear,
  );

  return (
    <div className="w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-transparent border px-4 border-gray-300 dark:bg-gray-800 dark:text-white focus:outline-none focus:border-blue-500 font-medium py-2 rounded-lg text-left flex justify-between items-center"
      >
        <span>{selectedYear || "Select Year"}</span>
        <span
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >

        </span>
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className="absolute bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-2xl p-3 z-999 transition-opacity duration-200"
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              width: `${coords.width}px`,
              minHeight: "250px", 
            }}
          >
            <div className="flex justify-between items-center mb-3 pb-2 border-b dark:border-gray-700">
              <button
                type="button"
                onClick={() =>
                  setViewYear((prev) => Math.min(currentYear, prev + 10))
                }
                disabled={viewYear >= currentYear}
                className="p-1 disabled:opacity-20 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <ChevronLeft size={16} className="dark:text-white" />
              </button>
              <span className="text-[10px] font-bold dark:text-gray-300 uppercase tracking-widest">
                {years[years.length - 1]} - {years[0]}
              </span>
              <button
                type="button"
                onClick={() => setViewYear((prev) => prev - 10)}
                disabled={years[years.length - 1] <= minYear}
                className="p-1 disabled:opacity-20 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <ChevronRight size={16} className="dark:text-white" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {years.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => {
                    onChange(y);
                    setIsOpen(false);
                  }}
                  className={`py-2 text-sm font-semibold rounded-md transition-all ${selectedYear === y ? "bg-blue-600 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"}`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default YearPicker;
