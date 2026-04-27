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

const SearchFilterVideos = ({ setStatusFilter, statusFilter }) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <IoSearchOutline
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 "
            size={18}
          />
          <input
            type="text"
            placeholder="Search Videos..."
            className="pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 dark:border-0 dark:text-white border border-gray-200  rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-btn-100 dark:focus:bg-gray-800 dark:focus:ring-btn-200 outline-none w-full "
          />
        </div>

        <Select
          id="filter-videos"
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
              <SelectItem value="failed">Failed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default SearchFilterVideos;
