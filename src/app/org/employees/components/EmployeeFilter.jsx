import { FaRegCalendarAlt, FaSearch } from "react-icons/fa";

const EmployeeFilter = ({ searchTerm, setSearchTerm }) => {
  // Define a shared height and padding class to ensure exact matching
  const inputBase =
    "w-full h-[46px] px-4 text-sm rounded-xl border border-gray-200 dark:border-0 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 dark:text-white focus:ring-2 focus:ring-btn-100 outline-none transition-all";

  return (
    <div className="bg-surface p-6 rounded-3xl border border-gray-100 dark:border-gray-900 dark:shadow-sm dark:shadow-gray-700/30">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-end">
        {/* Search Term */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-text/90 dark:text-white ml-1">
            Search Employees
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Name or email"
              className={`${inputBase} pl-11`} // Added pl-11 for icon space
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
            className={inputBase} // Using exact same base class
          >
            <option value="">All Role</option>
            <option value="new">Employee</option>
            <option value="contacted">Sales</option>
          </select>
        </div>

        {/* Clear Filters */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <button className="w-full h-11.5 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer text-gray-400 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300 transition-all">
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFilter;
