import { PhoneForwardedIcon, Users, PhoneIcon } from "lucide-react";

function LeadCards({ data, onSelectLeadsClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Card 1 */}
      <div
        title="Total Leads"
        className="group bg-surface p-4 rounded-2xl border border-slate-100 dark:border-gray-900 shadow-sm dark:shadow-gray-700/30"
      >
        <div className="flex items-center gap-3 group">
          <div
            className={`p-2 bg-slate-50 rounded-lg text-blue-600 group-hover:ring ring-blue-600/30 group-hover:scale-110 transition-all`}
          >
            <Users size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Total Leads
            </p>
            <p className="text-base sm:text-lg font-semibold dark:text-white">
              {data?.data?.totalUnfilteredCount || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div
        title="Call all leads"
        className="group bg-surface p-4 rounded-2xl border border-slate-100 dark:border-gray-900 shadow-sm dark:shadow-gray-700/30 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-50 rounded-lg text-emerald-600 group-hover:ring ring-emerald-600/30 group-hover:scale-110 transition-all">
            <PhoneForwardedIcon size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Call all leads
            </p>
            <p className="text-base sm:text-lg font-semibold dark:text-white">
              {data?.data?.totalUnfilteredCount || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div
        title="Call selected"
        onClick={onSelectLeadsClick}
        className="group bg-surface p-4 rounded-2xl border border-slate-100 dark:border-gray-900 shadow-sm dark:shadow-gray-700/30 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 rounded-lg text-purple-600 group-hover:ring ring-purple-600/30 group-hover:scale-110 transition-all">
            <PhoneIcon size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Call selected leads
            </p>
            <p className="text-base sm:text-lg font-semibold dark:text-white">
              Select leads to call
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadCards;
