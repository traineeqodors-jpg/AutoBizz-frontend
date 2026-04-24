"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { FaRegCalendarAlt } from "react-icons/fa";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

// Convert "YYYY-MM-DD" → local Date (NO timezone shift)
const parseLocalDate = (dateString) => {
  if (!dateString) return undefined;
  const [year, month, day] = dateString.split("-");
  return new Date(year, month - 1, day);
};

//Convert Date → "YYYY-MM-DD" (NO UTC conversion)
const formatLocalDate = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const DatePicker = ({ label, field, value, updateFilter, minDate }) => {
  const [date, setDate] = useState(parseLocalDate(value));

  // Sync with parent (fixes clear button issue)
  useEffect(() => {
    setDate(parseLocalDate(value));
  }, [value]);

  const handleSelect = (selectedDate) => {
    setDate(selectedDate);

    if (selectedDate) {
      updateFilter(field, formatLocalDate(selectedDate));
    } else {
      updateFilter(field, "");
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-text/90 dark:text-white ml-1">
        {label}
      </label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between p-2 sm:py-3 sm:px-4 text-sm rounded-xl border border-gray-200 dark:border-0 bg-gray-50 dark:bg-gray-800 text-text dark:text-white hover:bg-white dark:hover:bg-gray-700"
          >
            {date ? format(date, "dd MMM yyyy") : label}
            <FaRegCalendarAlt className="text-gray-500" size={16} />
          </Button>
        </PopoverTrigger>

        {/* Prevent rendering when disabled */}

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
            disabled={(d) => {
              if (!minDate) return false;
              const min = parseLocalDate(minDate);
              return d < min;
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
