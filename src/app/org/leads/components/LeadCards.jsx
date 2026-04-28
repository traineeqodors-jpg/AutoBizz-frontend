import { PhoneForwardedIcon, Users, PhoneIcon } from "lucide-react";

function LeadCards({ data, onSelectLeadsClick }) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="group bg-white dark:bg-gray-900 p-4 rounded-2xl border border-slate-100 dark:border-gray-900 shadow-sm dark:shadow-gray-700/30 hover:bg-blue-50 transition-colors">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 bg-slate-50 rounded-lg text-blue-600 transform transition-transform duration-200 ease-out group-hover:scale-110`}
          >
            <Users size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Total Leads
            </p>
            <p className="text-lg sm:text-xl font-medium sm:font-semibold dark:text-white">
              {data?.data?.totalUnfilteredCount || 0}
            </p>
          </div>
        </div>
      </div>
      <div className="group bg-white dark:bg-gray-900 p-4 rounded-2xl border border-slate-100 dark:border-gray-900 shadow-sm dark:shadow-gray-700/30 cursor-pointer hover:bg-emerald-50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-50 rounded-lg text-emerald-600 transform transition-transform duration-200 ease-out group-hover:scale-110">
            <PhoneForwardedIcon size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Call all leads
            </p>
            <p className="text-lg sm:text-xl font-medium sm:font-semibold dark:text-white">
              {data?.data?.totalUnfilteredCount || 0}
            </p>
          </div>
        </div>
      </div>
      <div
        onClick={onSelectLeadsClick}
        className="group bg-white cursor-pointer dark:bg-gray-900 p-4 rounded-2xl hover:bg-purple-50 transition-colors border border-slate-100 dark:border-gray-900 shadow-sm dark:shadow-gray-700/30"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-50 rounded-lg text-purple-600 transform transition-transform duration-200 group-hover:scale-110">
            <PhoneIcon size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Call selected leads
            </p>
            <p className="text-lg sm:text-xl font-medium sm:font-semibold dark:text-white">
              Select leads to call
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadCards;
