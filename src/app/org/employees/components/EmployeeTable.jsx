import { IoTrashOutline } from "react-icons/io5";

const EmployeeTable = ({ openDeleteModal }) => {
  return (
    <tr
      className={`transition-all group border border-gray-100 cursor-default text-text/90 dark:text-gray-300 font-medium
     `}
    >
      <td className="px-6 py-5 rounded-l-3xl dark:rounded-none border-y border-l border-gray-100 dark:border-none text-sm">
        Name
      </td>

      <td className="px-6 py-5 border-y border-gray-100 dark:border-none text-sm">
        <div>
          <p className="font-semibold text-text dark:text-gray-300">
            1234567890
          </p>
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-tight">
            hello@example.com
          </p>
        </div>
      </td>

      <td className="px-6 py-5 rounded-l-3xl dark:rounded-none border-y border-gray-100 dark:border-none text-sm">
        Sales
      </td>

      <td className="px-6 py-5 border-y border-gray-100 dark:border-none">
        <span
          className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider bg-green-100 text-green-600`}
        >
          Verified
        </span>
      </td>

      <td className="px-6 py-5 rounded-r-3xl dark:rounded-none border-y border-r border-gray-100 dark:border-none">
        {/* DELETE BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openDeleteModal();
          }}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
          title="Delete Log"
        >
          <IoTrashOutline size={20} />
        </button>
      </td>
    </tr>
  );
};

export default EmployeeTable;
