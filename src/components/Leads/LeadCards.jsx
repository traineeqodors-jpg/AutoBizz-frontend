import { FileText, Filter, Users } from "lucide-react";

function LeadCards({ data }) {
 return (
   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
     {[
       {
         label: "Total Leads",
         count: data?.data?.pagination?.totalItems,
         icon: Users,
         color: "text-blue-600",
       },
       {
         label: "Files Processed",
         count: "1",
         icon: FileText,
         color: "text-purple-600",
       },
       {
         label: "Conversion Rate",
         count: "0%",
         icon: Filter,
         color: "text-emerald-600",
       },
     ].map((stat, i) => (
       <div
         key={i}
         className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-slate-100 dark:border-gray-900 shadow-sm dark:shadow-gray-700/30"
       >
         <div className="flex items-center gap-3">
           <div className={`p-2 bg-slate-50 rounded-lg ${stat.color}`}>
             <stat.icon size={20} />
           </div>
           <div>
             <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
               {stat.label}
             </p>
             <p className="text-xl font-bold dark:text-white">{stat.count}</p>
           </div>
         </div>
       </div>
     ))}
   </div>
 );
}

export default LeadCards;