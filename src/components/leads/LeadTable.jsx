import { IoTrashOutline } from "react-icons/io5";

const LeadTable = ({ lead, openDeleteModal, isSelected }) => {
  const getStatusBadge = (score) => {
    if (score >= 100) return "Hot";
    if (score >= 50) return "Warm";
    return "Cold";
  };
  const leadStatus = getStatusBadge(lead?.score);

 return (
   <tr
     className={`transition-all group border border-gray-100 cursor-default text-text/90 dark:text-gray-300 font-medium
      ${isSelected ? "bg-sidebar" : "bg-white dark:bg-gray-900 hover:bg-slate-50/50 dark:hover:bg-gray-700/40"}`}
   >
     <td className="px-6 py-5 rounded-l-3xl dark:rounded-none border-y border-l border-gray-100 dark:border-none text-sm">
       {lead?.name}
     </td>

     <td className="px-6 py-5 border-y border-gray-100 dark:border-none text-sm">
       {lead?.company || "N|A"}
     </td>

     <td className="px-6 py-5 border-y border-gray-100 dark:border-none text-sm">
       <div>
         <p className="font-semibold text-text dark:text-gray-300">
           {lead?.phone}
         </p>
         <p className="text-[11px] text-gray-400 font-medium uppercase tracking-tight">
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

     <td className="px-6 py-5 rounded-r-3xl dark:rounded-none border-y border-r border-gray-100 dark:border-none">
       {/* DELETE BUTTON */}
       <button
         onClick={(e) => {
           e.stopPropagation();
           openDeleteModal(lead?.id);
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

export default LeadTable;