import { IoTrashOutline } from "react-icons/io5";

const LeadTable = ({
  lead,
  openDeleteModal,
  isSelected,
  onSelect,
  isSelectionMode,
}) => {
  const getStatusBadge = (score) => {
    if (score >= 100) return "Hot";
    if (score >= 50) return "Warm";
    return "Cold";
  };
  const leadStatus = getStatusBadge(lead?.score);

  return (
    <tr
      onClick={() => isSelectionMode && onSelect(lead.id)}
      className={`
    cursor-pointer group border border-gray-100 dark:border-gray-800
    text-text/90 dark:text-gray-300 font-medium
    transition-all duration-300 ease-out

    ${
      isSelected
        ? `
        bg-linear-to-r from-blue-50 to-blue-100/60 
        dark:from-blue-900/30 dark:to-blue-800/20
        
        shadow-md scale-[1.01]
        ring-1 ring-blue-400/40
      `
        : `
        bg-white dark:bg-gray-900 
        hover:bg-slate-50/60 dark:hover:bg-gray-800/50
      `
    }

    ${isSelectionMode ? "hover:scale-[1.01]" : ""}
  `}
    >
      <td className="px-6 py-5  dark:rounded-none dark:border-none text-sm">
        <span className="flex items-center justify-around gap-3">


          {/* Lead Name */}
          <span className="font-medium">{lead?.name}</span>
        </span>
      </td>

      <td className="px-6 py-5 border-y border-gray-100 dark:border-none text-sm">
        {lead?.company || "N|A"}
      </td>

      <td className="px-6 py-5 border-y border-gray-100 dark:border-none text-sm">
        <div>
          <p className="font-semibold text-text dark:text-gray-300">
            {lead?.phone}
          </p>
          <p className="text-[11px] text-gray-400 font-medium tracking-tight">
            {lead?.email}
          </p>
        </div>
      </td>

      <td className="px-6 py-5 border-y border-gray-100 dark:border-none">
        <span
          className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${leadStatus === "Hot" && "bg-red-100 text-red-600"}
          ${leadStatus === "Warm" && "bg-orange-100 text-orange-600"} ${leadStatus === "Cold" && "bg-blue-100 text-blue-600"}`}
        >
          {leadStatus}
        </span>
      </td>

      <td className="px-6 py-5 border-y border-gray-100 dark:border-none text-sm font-bold">
        {lead?.confidence_score || 0}
      </td>

      <td className="px-6 py-5  dark:rounded-none border-y border-r border-gray-100 dark:border-none">
        {/* DELETE BUTTON */}
        {isSelectionMode ? (
          <span>
            <label className="flex items-center justify-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelect(lead.id)}
                className="peer hidden"
              />

              <div
                className="relative w-5 h-5 flex items-center justify-center rounded-md border 
                  border-gray-300 bg-white shadow-sm
                  transition-all duration-300 ease-out
                  peer-checked:bg-blue-600 peer-checked:border-blue-600
                  hover:border-blue-500
                  
                  peer-active:scale-90 peer-checked:scale-105"
              >
                {/* Ripple effect */}
                <span
                  className="absolute w-full h-full 
                     bg-blue-400 opacity-0 scale-0
                     peer-checked:animate-ping peer-checked:opacity-30"
                ></span>

                {/* Checkmark */}
                <svg
                  className="w-3 h-3 text-white relative z-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    className="stroke-dasharray-[24] stroke-dashoffset-[24] 
                   peer-checked:stroke-dashoffset-0
                   transition-all duration-300 ease-out"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </label>
          </span>
        ) : (
          <button
            disabled={isSelectionMode}
            onClick={(e) => {
              e.stopPropagation();
              openDeleteModal(lead?.id);
            }}
            className={`p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all ${isSelectionMode ? "opacity-60 cursor-not-allowed" : " cursor-pointer"}`}
            title="Delete Log"
          >
            <IoTrashOutline size={20} />
          </button>
        )}
      </td>
    </tr>
  );
};

export default LeadTable;
