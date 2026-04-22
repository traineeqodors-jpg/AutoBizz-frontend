import { FaSearch } from "react-icons/fa";

const EmployeeFilter = ({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
  handleClearFilters,
}) => {
  // Define a shared height and padding class to ensure exact matching
  const inputBase =
    "w-full h-[46px] px-4 text-sm rounded-xl border border-gray-200 dark:border-0 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 dark:text-white focus:ring-2 focus:ring-btn-100 outline-none transition-all";

  return (
    <div className="bg-surface p-6 rounded-3xl border border-gray-100 dark:border-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-end">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">Search Employees</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Name or email"
              className={`${inputBase} pl-11`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FaSearch />
            </span>
          </div>
        </div>

        {/* Role Select */}
        <div className="space-y-2">
          <label className="text-sm font-semibold ml-1">Role</label>
          <select
            className={inputBase}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="employee">Employee</option>
            <option value="sales">Sales</option>
          </select>
        </div>

        {/* Clear Button */}
        <button
          onClick={handleClearFilters}
          className="w-full h-11.5 rounded-xl border-2 border-dashed border-gray-200 cursor-pointer text-gray-400 font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300 transition-all"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default EmployeeFilter;
