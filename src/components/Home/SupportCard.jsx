import React from "react";
import { HiOutlinePhoneIncoming } from "react-icons/hi";

const SupportCard = () => {
  return (
    <div className="h-40 w-full bg-white rounded-2xl shadow-md/10 p-5 flex flex-col justify-between border border-gray-100 group hover:shadow-lg transition-all duration-300">
      {/* Top Section: Matches "Organization Details" header style */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-lg sm:text-xl font-black text-text tracking-tight">
            Voice Support
          </h1>
 
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-text/60 text-sm font-medium">
              AI Agent Active
            </span>
          </div>
        </div>

        {/* Icon container matches your existing dashboard accenting */}
        <div className="p-2.5 bg-gray-50 rounded-xl text-btn-100 group-hover:bg-btn-100/10 transition-colors">
          <HiOutlinePhoneIncoming size={20} />
        </div>
      </div>

      {/* Bottom Section: Matches the list-style data of your Org Details */}
      <div className="space-y-1">
        <p className="text-text/60 text-sm font-medium ml-1">
          Direct Support Line
        </p>
        {/* The Number: Bold and Clear like your Business Name display */}
        <div className="w-full py-2.5 px-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-start group-hover:border-btn-100/20 transition-colors">
          <span className="text-text sm:text-xl text-mb  font-bold tracking-wider">
            {import.meta.env.VITE_AI_SUPPORT_NUMBER}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SupportCard;