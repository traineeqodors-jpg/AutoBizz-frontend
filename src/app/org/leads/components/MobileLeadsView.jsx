import { FaUser } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";

const MobileLeadsView = ({
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
    <div className="md:hidden flex flex-col gap-4">
      <div
        onClick={() => isSelectionMode && onSelect(lead.id)}
        className={`
      bg-white dark:bg-gray-800 p-6 rounded-2xl border shadow-sm space-y-4 transition-all

      ${isSelectionMode ? "cursor-pointer" : ""}
      ${
        isSelected
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
          : "border-gray-100 dark:border-gray-500"
      }
    `}
      >
        {/* Top Row */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Selection Indicator */}
            {isSelectionMode && (
              <div
                className={`
              w-5 h-5 rounded border flex items-center justify-center
              ${isSelected ? "bg-blue-600 border-blue-600" : "border-gray-300"}
            `}
              >
                {isSelected && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
            )}

            <div className="p-2 bg-gray-50 text-btn-100 rounded-xl">
              <FaUser className="size-5" />
            </div>

            <p className="font-bold text-text dark:text-white text-sm">
              {lead?.name}
            </p>
          </div>

          <span
            className={`px-2 py-1 rounded-lg text-[8px] font-bold uppercase ${
              leadStatus === "Hot" && "bg-red-100 text-red-600"
            } ${leadStatus === "Warm" && "bg-orange-100 text-orange-600"} ${
              leadStatus === "Cold" && "bg-blue-100 text-blue-600"
            }`}
          >
            {leadStatus}
          </span>
        </div>

        {/* Info */}
        <div className="flex justify-between flex-wrap text-xs text-gray-500 dark:text-gray-400 px-1 font-medium gap-3">
          <span>{lead?.company}</span>
          <span className="font-bold">Score : {lead?.confidence_score}</span>
        </div>

        <div className="flex justify-between flex-wrap text-xs text-gray-500 dark:text-gray-400 px-1 font-medium gap-3">
          <span>{lead?.phone}</span>
          <span>{lead?.email}</span>
        </div>

        {/* Delete (hide in selection mode) */}
        {!isSelectionMode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              openDeleteModal(lead?.id);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 dark:bg-gray-700 text-red-600 font-bold rounded-xl text-xs active:scale-95 transition-all"
          >
            <IoTrashOutline /> Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileLeadsView;
