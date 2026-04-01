
import { HiOutlinePhoneIncoming } from "react-icons/hi";

const SupportCard = () => {
  return (
    <div className="h-40 w-full bg-white dark:bg-gray-900  rounded-2xl shadow-md/10 p-5 flex flex-col justify-between  group hover:shadow-lg ">
      {/* Top Section: Matches "Organization Details" header style */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-text dark:text-slate-50 text-lg font-semibold tracking-tight">
            Voice Support
          </h2>
 
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-text/60 dark:text-gray-200 text-sm font-medium">
              AI Agent Active
            </span>
          </div>
        </div>

        <div className="p-2.5 bg-btn-100/10 rounded-xl text-btn-100 group-hover:bg-btn-100/20 ">
          <HiOutlinePhoneIncoming size={20} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-1">
        <p className="text-text/60 dark:text-gray-200 text-sm font-medium ml-1">
          Direct Support Line
        </p>
        <div className="w-full py-2.5 px-4 rounded-xl bg-gray-50 dark:bg-gray-700 dark:border-0 border border-gray-100 flex items-center justify-start group-hover:border-btn-100/20 ">
          <span className="text-text dark:text-gray-50 sm:text-xl text-mb  font-bold tracking-wider">
            {import.meta.env.VITE_AI_SUPPORT_NUMBER}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SupportCard;