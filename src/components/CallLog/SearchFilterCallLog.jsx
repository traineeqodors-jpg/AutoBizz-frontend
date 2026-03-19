import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchFilterCallLog = ({setSearchTerm , setStatusFilter , searchTerm , statusFilter}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative">
          <IoSearchOutline
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            value={searchTerm}
            placeholder="Search number..."
            className="pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-btn-100 outline-none transition-all w-full sm:w-64"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
        value={statusFilter}
          className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:bg-white focus:ring-2 focus:ring-btn-100 outline-none cursor-pointer"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="no-answer">No Answer</option>
          <option value="busy">Busy</option>
        </select>
      </div>
    </>
  );
};

export default SearchFilterCallLog;
