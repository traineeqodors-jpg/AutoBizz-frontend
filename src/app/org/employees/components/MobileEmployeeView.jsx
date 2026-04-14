import { FaUser } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";

const MobileEmployeeView = ({ openDeleteModal }) => {
  return (
    <>
      <div className="md:hidden flex flex-col gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-500 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 text-btn-100 rounded-xl">
                <FaUser className="size-5" />
              </div>
              <p className="font-bold text-text dark:text-white text-sm">
                Name
              </p>
            </div>
            <span
              className={`px-2 py-1 rounded-lg text-[8px] font-bold uppercase bg-blue-100 text-blue-600`}
            >
              isVerified
            </span>
          </div>
          <div className="flex justify-between flex-wrap text-xs text-gray-500 dark:text-gray-400 px-1 font-medium gap-3">
            <span>1234567890</span>
            <span>hello@example.com</span>
          </div>
          <div className="flex justify-between flex-wrap text-xs text-gray-500 dark:text-gray-400 px-1 font-medium gap-3">
            <span>Role</span>
          </div>

          <button
            onClick={() => openDeleteModal()}
            className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 dark:bg-gray-700 text-red-600 font-bold rounded-xl text-xs active:scale-95 transition-all cursor-pointer"
          >
            <IoTrashOutline /> Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileEmployeeView;
