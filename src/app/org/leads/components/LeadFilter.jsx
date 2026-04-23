import DatePicker from "@/components/ui/DatePicker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
                className="w-full py-3 px-4 pl-11 rounded-xl bg-gray-50 border border-gray-200 dark:border-0 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 dark:text-white focus:ring-2 focus:ring-btn-200 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FaSearch />
              </span>
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text/90 dark:text-white ml-1">
              Status
            </label>
            <Select
              value={filters?.status || ""}
              onValueChange={(value) =>
                updateFilter("status", value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="w-full p-3 sm:py-3 sm:px-4 text-sm text-text dark:text-white rounded-xl border border-gray-200 dark:border-0 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-100 outline-none transition-all">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Filters</SelectLabel>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Score */}
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
                  e.preventDefault();
                }
              }}
              value={filters?.minScore || ""}
              onChange={(e) => updateFilter("minScore", e.target.value)}
              className="w-full py-3 px-4 text-text dark:text-white text-sm rounded-xl border border-gray-200 dark:border-0 bg-gray-50  dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-100 outline-none transition-all"
            />
          </div>

          {/* From Date */}
          <DatePicker
            label="From Date"
            field="startDate"
            value={filters?.startDate}
            updateFilter={updateFilter}
          />

          {/* TO Date */}
          <DatePicker
            label="To Date"
            field="endDate"
            value={filters?.endDate}
            updateFilter={updateFilter}
            minDate={filters?.startDate}
          />

          {/* Sort By */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text/90 dark:text-white ml-1">
              Sort By
            </label>
            <Select
              value={filters?.sortBy || ""}
              onValueChange={(value) => updateFilter("sortBy", value)}
            >
              <SelectTrigger className="w-full p-3 sm:py-3 sm:px-4 text-sm text-text dark:text-white rounded-xl border border-gray-200 dark:border-0 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-100 outline-none transition-all">
                <SelectValue placeholder="Sorting" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Filters</SelectLabel>
                  <SelectItem value="createdAt">Date</SelectItem>
                  <SelectItem value="confidence_score">Score</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer text-gray-400 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300 transition-all"
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
