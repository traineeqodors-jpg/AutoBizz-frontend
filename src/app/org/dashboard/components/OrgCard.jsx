"use client";

import { useGetOrgDetailsQuery } from "@/features/slices/orgDetailsSlice";
import { IoBusiness } from "react-icons/io5";

function OrgCard({ user, isOwner }) {
  const { data: orgResponse, isLoading } = useGetOrgDetailsQuery(undefined, {
    skip: isOwner,
  });

  const displayData = isOwner ? user : orgResponse?.data;

  return (
    /* h-45 is fixed, added flex flex-col justify-between to anchor content to top and bottom */
    <div className="w-full h-full max-h-45 shadow-sm dark:shadow-gray-700/30 rounded-3xl p-4 sm:p-6 lg:p-8 bg-surface border border-slate-100 dark:border-gray-800 hover:border-btn-100/30 transition-all duration-300 group flex flex-col justify-between gap-5 overflow-hidden">
      {/* Header Section - Top Anchored */}
      <div className="flex items-center gap-3 sm:gap-6">
        <div className="shrink-0 bg-btn-50/30 p-3 sm:p-4 rounded-2xl border-2 border-btn-100/20 flex items-center justify-center group-hover:scale-105 transition-transform">
          <IoBusiness className="size-5 sm:size-6 text-btn-100" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex justify-between items-center mb-0.5 sm:mb-1">
            <h2 className="text-text/50 dark:text-gray-500 text-[9px] sm:text-xs uppercase tracking-widest font-semibold">
              Org Profile
            </h2>
            <span className="hidden xs:block text-[9px] bg-btn-100/10 text-btn-100 px-2 py-0.5 rounded-md font-bold uppercase">
              Active
            </span>
          </div>
          <h1 className="text-text dark:text-white font-semibold text-base sm:text-xl lg:text-2xl truncate tracking-tight">
            {displayData?.businessName || "Company Name"}
          </h1>
        </div>
      </div>

      {/* Content Area - Bottom Anchored */}
      <div className="w-full">
        {isLoading ? (
          <div className="flex gap-2 sm:gap-4">
            <div className="h-8 sm:h-10 flex-1 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />
            <div className="h-8 sm:h-10 flex-1 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />
          </div>
        ) : (
          <div className="flex flex-row gap-2 sm:gap-4">
            <div className="flex flex-1 items-center gap-2 sm:gap-3 py-1.5 sm:py-2.5 px-3 sm:px-4 bg-back/50 dark:bg-gray-800/40 rounded-xl border border-transparent hover:border-btn-100/10 min-w-0">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-btn-100 shrink-0 aspect-square" />
              <span className="text-[10px] sm:text-sm font-semibold text-text/80 dark:text-gray-300 whitespace-nowrap truncate">
                {displayData?.businessSize || "0"}{" "}
                <span className="hidden lg:inline">Size</span>
              </span>
            </div>

            <div className="flex flex-1 items-center gap-2 sm:gap-3 py-1.5 sm:py-2.5 px-3 sm:px-4 bg-back/50 dark:bg-gray-800/40 rounded-xl border border-transparent hover:border-btn-100/10 min-w-0">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-btn-100 shrink-0 aspect-square" />
              <span className="text-[10px] sm:text-sm font-semibold text-text/80 dark:text-gray-300 truncate">
                {displayData?.country || "Global"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrgCard;
