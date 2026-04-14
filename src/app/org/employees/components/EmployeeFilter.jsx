import { FaRegCalendarAlt, FaSearch } from "react-icons/fa";

const EmployeeFilter = ({ searchTerm, setSearchTerm }) => {
  return (
    <>
      <div className="bg-surface p-6 rounded-3xl border border-gray-100 dark:border-gray-900 space-y-6 dark:shadow-sm dark:shadow-gray-700/30">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Search Term */}
          <div className="pace-y-2">
            <label className="text-sm font-semibold text-text/90 dark:text-white ml-1">
              Search Employees
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Name or email"
                className="w-full py-3 px-4 pl-11 rounded-xl bg-gray-50 border border-gray-200 dark:border-0 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 dark:text-white focus:ring-2 focus:ring-btn-200 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FaSearch />
              </span>
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text/90 dark:text-white ml-1">
              Role
            </label>
            <select
              name="status"
              className="w-full py-3 px-4 text-sm text-text dark:text-white rounded-xl border border-gray-200 dark:border-0 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-100 outline-none transition-all"
            >
              <option value="">All Role</option>
              <option value="new">EMployee</option>
              <option value="contacted">Sales</option>
            </select>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <button className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer text-gray-400 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300 transition-all">
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeFilter;
