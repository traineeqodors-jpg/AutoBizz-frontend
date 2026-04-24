import { HiOutlinePhoneIncoming } from "react-icons/hi";

const SupportCard = () => {
  return (
    /* Matched max-h-45, padding, and justify-between with OrgCard */
    <div className="w-full h-full max-h-45 bg-surface rounded-3xl shadow-sm dark:shadow-gray-700/30 p-5 sm:px-8 sm:py-6 flex flex-col justify-between border border-slate-100 dark:border-gray-800 hover:border-btn-100/30 transition-all duration-300 group overflow-hidden">
      {/* Top Section */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-0.5">
          <h2 className="text-text/50 dark:text-gray-500 text-[10px] uppercase tracking-widest font-semibold">
            Voice Support
          </h2>
          <h1 className="text-text dark:text-white text-lg sm:text-xl font-bold leading-tight">
            AI Agent Support
          </h1>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shrink-0 z-0"  />
            <span className="text-text/60 text-[10px] sm:text-xs font-medium dark:text-gray-400">
              Agent Online
            </span>
          </div>
        </div>

        {/* Icon matches OrgCard size/style */}
        <div className="shrink-0 p-3 bg-btn-50/30 dark:bg-btn-100/10 rounded-2xl border-2 border-btn-100/20 text-btn-100 group-hover:scale-105 transition-transform">
          <HiOutlinePhoneIncoming className="size-4" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full">
        <p className="text-text/60 dark:text-gray-400 text-[10px] uppercase font-bold tracking-tight mb-1.5 ml-1">
          Direct Support Line
        </p>
        <div className="w-full py-2 px-4 rounded-xl bg-back dark:bg-gray-800/40 border border-transparent group-hover:border-btn-100/10 flex items-center justify-between">
          <span className="text-text dark:text-white text-sm sm:text-lg font-bold tracking-wider">
            {process.env.NEXT_PUBLIC_AI_SUPPORT_NUMBER || "+1 234 567 890"}
          </span>
          {/* Matched blue dot decoration */}
          <div className="w-1.5 h-1.5 rounded-full bg-btn-100 shrink-0 aspect-square" />
        </div>
      </div>
    </div>
  );
};

export default SupportCard;
