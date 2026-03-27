import React from "react";
import { FaUser } from "react-icons/fa";
import { IoCallOutline, IoEyeSharp, IoTrashOutline } from "react-icons/io5";

const MobileLeadsView = ({ leads }) => {
  return (
    <>
      <div className="md:hidden flex flex-col gap-4">
        {leads?.length !== 0 && (
          <>
            {leads?.map((lead) => (
              
                <div  key={lead?.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 text-btn-100 rounded-xl">
                        <FaUser className="size-5" />
                      </div>
                      <p className="font-bold text-text text-sm">{lead?.name}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-lg text-[8px] font-bold uppercase bg-green-100 text-green-600`}
                    >
                      {lead?.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 px-1 font-medium gap-3">
                    <span>{lead?.company}</span>
                    <span className="font-bold">{lead?.confidence_score}</span>
                  </div>
                  <div className="flex justify-between flex-wrap text-xs text-gray-500 px-1 font-medium gap-3">
                    <span>{lead?.phone}</span>
                    <span>{lead?.email}</span>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 font-bold rounded-xl text-xs active:scale-95 transition-all cursor-pointer">
                    <IoTrashOutline /> Delete
                  </button>
                </div>
              
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default MobileLeadsView;
