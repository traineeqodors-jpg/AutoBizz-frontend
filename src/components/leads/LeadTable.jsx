import {
  IoTrashOutline,
  IoMailOutline,
  IoBusinessOutline,
  IoCallOutline,
} from "react-icons/io5";
import { toast } from "react-toastify";
import { useDeleteLeadMutation } from "../../features/slices/leadSlice";

const LeadTable = ({ lead }) => {
  const [deleteLead, { isLoading: isDeleting }] = useDeleteLeadMutation();

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await deleteLead(lead.id).unwrap();
        toast.success("Lead deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || "Delete failed");
      }
    }
  };

  return (
    <tr className="border-b border-gray-100 last:border-0 text-gray-700 hover:bg-gray-50/30 transition-colors align-middle">
      {/* 1. Lead Name */}
      <td className="px-6 py-4 w-[25%] text-left">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900 truncate max-w-[180px]">
            {lead?.name || "Unknown Lead"}
          </span>
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">
            ID: {lead?.id?.toString().slice(-6)}
          </span>
        </div>
      </td>

      {/* 2. Company Info */}
      <td className="px-6 py-4 w-[20%] text-left">
        <div className="flex items-center gap-2">
          <IoBusinessOutline className="text-gray-400 shrink-0" size={14} />
          <span className="text-sm font-medium text-gray-600 truncate max-w-[150px]">
            {lead?.company || "N/A"}
          </span>
        </div>
      </td>

      {/* 3. Contact Info */}
      <td className="px-6 py-4 w-[25%] text-left">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
            <IoMailOutline className="text-blue-500 shrink-0" size={14} />
            <span className="truncate max-w-[180px]">{lead?.email}</span>
          </div>
          {lead?.phone && (
            <div className="flex items-center gap-2 text-[11px] text-gray-400">
              <IoCallOutline className="text-gray-400 shrink-0" size={12} />
              <span>{lead?.phone}</span>
            </div>
          )}
        </div>
      </td>

      {/* 4. Status */}
      <td className="px-6 py-4 w-[15%] text-left">
        <span
          className={`inline-block px-3 py-1 rounded-xl text-[10px] font-bold uppercase border text-center min-w-[85px] ${
            {
              new: "bg-blue-50 text-blue-600 border-blue-200",
              contacted: "bg-amber-50 text-amber-600 border-amber-200",
              qualified: "bg-emerald-50 text-emerald-600 border-emerald-200",
              cold: "bg-gray-100 text-gray-500 border-gray-300",
            }[lead?.status?.toLowerCase()] ||
            "bg-gray-50 text-gray-400 border-gray-200"
          }`}
        >
          {lead?.status || "New"}
        </span>
      </td>

      {/* 5. Score */}
      <td className="px-6 py-4 w-[10%] text-left">
        <span className="text-sm font-bold text-gray-900">
          {lead?.confidence_score || 0}
        </span>
      </td>

      {/* 6. Actions */}
      <td className="px-6 py-4 w-[5%] text-right">
        <button
          disabled={isDeleting}
          onClick={handleDelete}
          className={`p-2 rounded-xl transition-all border border-transparent inline-flex items-center justify-center ${
            isDeleting
              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
              : "text-gray-400 hover:bg-red-50 hover:border-red-100 hover:text-red-500 active:scale-95"
          }`}
        >
          <IoTrashOutline size={18} />
        </button>
      </td>
    </tr>
  );
};

export default LeadTable;
