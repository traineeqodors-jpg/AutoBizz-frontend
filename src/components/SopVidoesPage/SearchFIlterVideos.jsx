import { IoSearchOutline } from "react-icons/io5";

const SearchFIlterVideos = ({ setStatusFilter, statusFilter }) => {
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
            className="pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 dark:border-0 dark:text-white border border-gray-200  rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-btn-100 dark:focus:bg-gray-800 dark:focus:ring-btn-300 outline-none w-full "
          />
        </div>
        <select
          value={statusFilter}
          className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 dark:border-0 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-btn-100 dark:focus:ring-btn-300 outline-none cursor-pointer"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="failed">Failed</option>
        </select>
      </div>
    </>
  );
};

export default SearchFIlterVideos;
