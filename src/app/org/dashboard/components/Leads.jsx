"use client";

import { useGetAllLeadsQuery } from "@/features/slices/leadSlice";
import Image from "next/image";
import Link from "next/link";

function Leads() {
  const { data, isLoading: leadsLoading } = useGetAllLeadsQuery({
    page: 1,
    limit: 5,
    sortBy: "confidence_score",
  });

  const leads = data?.data?.leads || [];

  return (
    <div className="min-h-120 bg-surface flex flex-col gap-5 w-full rounded-2xl p-5 shadow-sm dark:shadow-gray-700/30">
      {/* Header section remains the same */}
      <div className="flex justify-between items-center w-full gap-2">
        <div className="space-y-1">
          <h3 className="font-semibold text-text text-lg">
            High Scoring Leads
          </h3>
          <p className="text-[10px] sm:text-xs text-gray-400">
            Top prospects detected by your model
          </p>
        </div>
        <Link
          href="/org/leads"
          className="text-btn-100 text-sm font-medium hover:underline shrink-0"
        >
          View All
        </Link>
      </div>

      <div className="w-full space-y-3 flex-1">
        {leadsLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-16 w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-xl"
              />
            ))}
          </div>
        ) : leads?.length < 1 ? (
          <div className="w-full h-full text-center font-medium flex flex-col justify-center items-center text-sm text-text dark:text-gray-400 space-y-3 py-10">
            <Image
              src="/ideation.svg"
              width={200}
              height={200}
              alt=""
              className="w-40 opacity-50"
            />
            <p>No High Scoring Leads Found</p>
          </div>
        ) : (
          leads.map((lead) => (
            <div
              key={lead.id}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-3 p-3 bg-surface hover:bg-back dark:hover:bg-gray-700 transition-all border-b border-gray-100 dark:border-gray-800 last:border-none cursor-pointer"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-btn-100/20 flex items-center justify-center text-btn-100 dark:text-btn-100 font-bold shrink-0">
                {lead.name?.split(" ")[0]?.charAt(0) || "L"}
                {lead.name?.split(" ")[1]?.charAt(0) || ""}
              </div>

              {/* Info Section (Name & Email) - min-w-0 is vital for truncation */}
              <div className="min-w-0">
                <p className="text-sm font-bold text-text truncate">
                  {lead.name || "Unknown"}
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                  {lead?.email}
                </p>
              </div>

              {/* Badge & Score */}
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-[9px] px-2 py-0.5 font-black uppercase rounded-md bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  {lead.status || "New"}
                </span>
                <p className="text-[10px] font-bold text-gray-400">
                  Score:{" "}
                  <span className="text-btn-100 dark:text-btn-100">
                    {lead.confidence_score}
                  </span>
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
