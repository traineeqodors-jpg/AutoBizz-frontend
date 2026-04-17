import { IoMdRefresh } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";

const EmployeeTable = ({ emp, openDeleteModal, refetch }) => {
  return (
    <tr
      className={`transition-all group border border-gray-100 cursor-default text-text/90 dark:text-gray-300 font-medium
     `}
    >
      <td className="px-6 py-5 rounded-l-3xl dark:rounded-none border-y border-l border-gray-100 dark:border-none text-sm">
        {emp?.firstName + " " + emp?.lastName}
      </td>

      <td className="px-6 py-5 border-y border-gray-100 dark:border-none text-sm">
        <div>
          <p className="font-semibold text-text dark:text-gray-300">
            {emp?.phoneNumber}
          </p>
          <p className="text-[11px] text-gray-400 font-medium tracking-tight">
            {emp?.email}
          </p>
        </div>
      </td>

      <td className="px-6 py-5 dark:rounded-none border-y border-gray-100 dark:border-none text-sm">
        {emp?.role}
      </td>

      <td className="px-6 py-5 dark:rounded-none border-y border-gray-100 dark:border-none text-sm">
        <div className="flex items-center justify-center-safe gap-3">
          <span
            className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider whitespace-nowrap ${
              emp?.isVerified
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {emp?.isVerified ? "Verified" : "Not-Verified"}
          </span>

          {!emp?.isVerified && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                refetch();
              }}
              className="flex items-center justify-center p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all"
            >
              <IoMdRefresh className="size-3" />
            </button>
          )}
        </div>
      </td>

      <td className="px-6 py-5 rounded-r-3xl dark:rounded-none border-y border-r border-gray-100 dark:border-none">
        {/* DELETE BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openDeleteModal(emp?.id);
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
