import { FaUser } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";

const MobileEmployeeView = ({ emp, openDeleteModal }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-500 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 text-btn-100 rounded-xl">
            <FaUser className="size-5" />
          </div>
          <p className="font-bold text-text dark:text-white text-sm">
            {emp?.firstName} {emp?.lastName}
          </p>
        </div>

        {/* Dynamic Verified Badge */}
        <span
          className={`px-2 py-1 rounded-lg text-[8px] font-bold uppercase ${
            emp?.isVerified
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {emp?.isVerified ? "Verified" : "Not-Verified"}
        </span>
      </div>

      <div className="flex justify-between flex-wrap text-xs text-gray-500 dark:text-gray-400 px-1 font-medium gap-3">
        <span>{emp?.phoneNumber}</span>
        <span>{emp?.email}</span>
      </div>

      <div className="flex justify-between flex-wrap text-xs text-gray-500 dark:text-gray-400 px-1 font-medium gap-3">
        <span className="uppercase tracking-wider text-[10px] bg-slate-100 dark:bg-gray-700 px-2 py-0.5 rounded">
          {emp?.role}
        </span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          openDeleteModal();
        }}
        className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 dark:bg-gray-900/30 text-red-600 font-bold rounded-xl text-xs active:scale-95 transition-all cursor-pointer"
      >
        <IoTrashOutline /> Delete
      </button>
    </div>
  );
};

export default MobileEmployeeView;
