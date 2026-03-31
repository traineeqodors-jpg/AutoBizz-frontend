

import { Link } from "react-router-dom";
import { useGetAllLeadsQuery } from "../features/slices/leadSlice";

function Leads() {
  
  const { data, isLoading: leadsLoading } = useGetAllLeadsQuery({
    page: 1,
    limit: 5,
    sortBy: "confidence_score",
  });

  const leads = data?.data?.leads || [];

  return (
    <div className="bg-white dark:bg-gray-900 w-full h-full rounded-2xl p-5 dark:shadow-sm dark:shadow-gray-700/40">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
          High Scoring Leads
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
          <div className="flex animate-pulse bg-gray-300 dark:bg-gray-600 rounded-2xl p-3">
            <div className="flex items-center gap-3 justify-evenly">
              <div className="w-10 h-10 rounded-full bg-blue-100"></div>
            </div>
          </div>
        ) : (
          leads.map((lead) => (
            <div
              key={lead.id}
              className="flex flex-wrap gap-3 justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b last:border-none border-b-gray-200 overflow-hidden hover:border-gray-100"
            >
              <div className="flex items-center gap-3 justify-evenly">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  {lead.name?.split(" ")[0]?.charAt(0) || "L"}
                  {lead.name?.split(" ")[1]?.charAt(0) || "L"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {lead.name || "Unknown"}
                  </p>
                  <div className="group relative">
                    <p className="text-xs text-gray-500 font-medium cursor-pointer transition-opacity duration-200 group-hover:opacity-0">
                      {lead?.email?.length > 16
                        ? lead.email.slice(0, 16) + "..."
                        : lead?.email}
                    </p>
                    {/* Full email shown only on hover */}
                    <p className="absolute top-0 left-0 text-xs text-btn-100 cursor-pointer font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {lead?.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-evenly items-center-safe gap-7">
                <span className="text-[10px] px-2 py-0.5 text-center font-bold uppercase tracking-wider rounded-lg bg-green-100 text-green-700 w-fit">
                  {lead.status || "New"}
                </span>
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Score: {lead.confidence_score}
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
