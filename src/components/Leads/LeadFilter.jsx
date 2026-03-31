import { FaRegCalendarAlt, FaSearch } from "react-icons/fa";

const LeadFilter = ({
  searchTerm,
  setSearchTerm,
  filters,
  updateFilter,
  resetFilters,
}) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-900 space-y-6 dark:shadow-sm dark:shadow-gray-700/30">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="col-span-2 md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-text/90 dark:text-white ml-1">
              Search Leads
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Name, email, or company..."
                className="w-full py-3 px-4 pl-11 rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 dark:text-white focus:ring-2 focus:ring-btn-100 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FaSearch />
              </span>
            </div>
          </div>
 
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text/90 dark:text-white ml-1">
              Status
            </label>
            <select
              name="status"
              value={filters?.status}
              onChange={updateFilter}
              className="w-full py-3 px-4 text-sm text-text dark:text-white rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-100 outline-none"
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="warm">Warm</option>
              <option value="contacted">Contacted</option>
            </select>
          </div>
 
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text/90 dark:text-white ml-1">
              Min Score
            </label>
            <input
              type="number"
              name="minScore"
              min="0"
              max="100"
              placeholder="e.g. 50"
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e") {
                  // Blocks minus and scientific notation
                  e.preventDefault();
                }
              }}
              value={filters?.minScore || ""}
              onChange={updateFilter}
              className="w-full py-3 px-4 text-text dark:text-white text-sm rounded-xl border border-gray-200 bg-gray-50  dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-100 outline-none "
            />
          </div>
 
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text/90 dark:text-white ml-1">
              From Date
            </label>
            <div className="relative flex items-center">
              <input
                type="date"
                name="startDate"
                value={filters?.startDate}
                onChange={updateFilter}
                onClick={(e) => e.target.showPicker()}
                className="w-full py-3 px-4 pr-10 text-sm rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-800 text-text dark:text-white focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-100 outline-none  cursor-pointer [&::-webkit-calendar-picker-indicator]:hidden"
              />
              <div className="absolute right-4 pointer-events-none text-gray-500">
                <FaRegCalendarAlt size={16} />
              </div>
            </div>
          </div>
 
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text/90 dark:text-white ml-1">
              To Date
            </label>
            <div className="relative flex items-center">
              <input
                type="date"
                name="endDate"
                value={filters?.endDate}
                onChange={updateFilter}
                onClick={(e) => e.target.showPicker()}
                className="w-full py-3 px-4 pr-10 text-sm text-text dark:text-white rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-100 outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:hidden"
              />
              <div className="absolute right-4 pointer-events-none text-gray-500">
                <FaRegCalendarAlt size={16} />
              </div>
            </div>
          </div>
 
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text/90 dark:text-white ml-1">
              Sort By
            </label>
            <select
              name="sortBy"
              value={filters?.sortBy}
              onChange={updateFilter}
              className="w-full py-3 px-4 text-sm text-text dark:text-white rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-100 outline-none"
            >
              <option value="createdAt">Date Created</option>
              <option value="confidence_score">Score</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
            </select>
          </div>
 
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer text-gray-400 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
 
export default LeadFilter;