"use client";


import { FaIndustry, FaUser } from "react-icons/fa";
import { MdOutlinePlace, MdDescription } from "react-icons/md";

const OrgDetails = ({ orgData, orgDetailsLoading }) => {
  const hiddenFields = [
    "id",
    "orgId",
    "createdAt",
    "updatedAt",
    "role",
    "profileImage",
    "googleRefreshToken",
    "isVerified",
  ];

  const formatDisplayValue = (key, value) => {
    if (value === null || value === undefined || value === "") return "N/A";
    if (
      key === "country" &&
      typeof value === "string" &&
      value.startsWith("{")
    ) {
      try {
        return JSON.parse(value).name;
      } catch {
        return value;
      }
    }
    return value.toString();
  };

  if (!orgData) return null;

  return (
    <div className="w-full bg-surface rounded-2xl shadow-sm overflow-hidden border border-slate-100 dark:border-none dark:shadow-sm dark:shadow-gray-700/30">
      <div className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 items-center">
        <FaUser className="size-5 text-btn-100" />
        <p className="font-bold text-xl dark:text-white">Organization Info</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 p-5 gap-4">
        {orgDetailsLoading
          ? [...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-15 w-full animate-pulse bg-back dark:bg-gray-700 rounded-xl"
              />
            ))
          : Object.entries(orgData)
              .filter(([key]) => !hiddenFields.includes(key))
              .map(([key, value]) => {
                const isDescription = key === "description";

                return (
                  <div
                    key={key}
                    className={`bg-back dark:bg-gray-700 py-3 px-4 rounded-xl flex items-start gap-4 border border-transparent 
                  ${isDescription ? "sm:col-span-2" : ""}`}
                  >
                    <div className="shrink-0 mt-1">
                      {isDescription ? (
                        <MdDescription className="size-5 text-btn-100" />
                      ) : key.toLowerCase().includes("business") ||
                        key.toLowerCase().includes("org") ? (
                        <FaIndustry className="size-4 text-btn-100" />
                      ) : key === "country" ? (
                        <MdOutlinePlace className="size-5 text-btn-100" />
                      ) : (
                        <FaUser className="size-4 text-btn-100" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-text/60 dark:text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <p
                        className={`font-medium dark:text-white text-sm sm:text-base wrap-break-words
                    ${isDescription ? "min-h-18 whitespace-pre-wrap" : ""}`}
                        /* min-h-[4.5rem] roughly forces 3 lines of height */
                      >
                        {formatDisplayValue(key, value)}
                      </p>
                    </div>
                  </div>
                );
              })}
      </div>
    </div>
  );
};

export default OrgDetails;
