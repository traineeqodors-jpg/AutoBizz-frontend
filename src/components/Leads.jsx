

import { Link } from "react-router-dom";
import { useGetAllLeadsQuery } from "../features/slices/leadSlice";

function Leads() {
  // Note: Ensure 'filters' is defined or passed as a prop
  const { data, isLoading: leadsLoading } = useGetAllLeadsQuery({
    page: 1,
    limit: 5,
  });

  const leads = data?.data?.leads || [];
  

  return (
    <div className="bg-white dark:bg-gray-900 w-full h-full rounded-2xl p-5">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-800 dark:text-white text-lg">
          Recent Leads
        </h3>
        <Link
          to="/leads"
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {leadsLoading ? (
          <div className="text-center py-4 text-gray-500">Loading...</div>
        ) : (
          leads.map((lead) => (
            <div
              key={lead._id || lead.id}
              className="flex sm:flex-row flex-col flex-wrap  gap-4 justify-between items-baseline p-3 hover:bg-gray-50 dark:hover:bg-gray-500 rounded-xl transition-colors border border-transparent hover:border-gray-100"
            >
              <div className="flex items-center gap-3 justify-evenly">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  {lead?.name?.split(" ")[0]?.charAt(0) || "L"}
                  {lead?.name?.split(" ")[1]?.charAt(0) || "L"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {lead.name || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-white font-medium">
                    {lead.email}
                  </p>
                </div>
              </div>
              <div className="text-right sm:flex-col flex flex-row gap-3 justify-around">
                <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-green-100 text-green-700">
                  {lead?.status || "New"}
                </span>
                <p className="text-xs font-bold text-gray-700 mt-1">
                  Score: {lead?.confidence_score || 0}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Leads;
