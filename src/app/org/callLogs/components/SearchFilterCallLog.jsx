import { IoSearchOutline } from "react-icons/io5";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

const SearchFilterCallLog = ({
  setSearchTerm,
  setStatusFilter,
  searchTerm,
  statusFilter,
  canGoNext,
}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative w-full">
          <IoSearchOutline
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            value={searchTerm}
            placeholder="Search number..."
            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 dark:border-0 dark:text-white border border-gray-200 rounded-xl text-sm focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-btn-100 dark:focus:ring-btn-200 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select
          disabled={!canGoNext}
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value)}
        >
          <SelectTrigger className="w-full sm:w-auto min-w-40 px-4 py-3 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-0 dark:text-white rounded-xl text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-btn-100 dark:focus:ring-btn-200 outline-none">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filters</SelectLabel>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="no-answer">No Answer</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default SearchFilterCallLog;
