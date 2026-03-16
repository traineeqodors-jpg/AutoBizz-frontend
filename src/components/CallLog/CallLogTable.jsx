import React from "react";
import { IoCallOutline, IoEyeSharp, IoTrashOutline } from "react-icons/io5";

const CallLogTable = ({log , openDeleteModal , setSelectedLog}) => {
  return (
    <>
      <tr
        key={log.id}
        className="bg-white hover:shadow-md transition-all group border border-gray-100"
      >
        <td className="px-6 py-5 rounded-l-3xl border-y border-l border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gray-50 text-btn-100 rounded-xl group-hover:bg-btn-100 group-hover:text-white transition-all">
              <IoCallOutline size={20} />
            </div>
            <div>
              <p className="font-bold text-text">{log.from}</p>
              <p className="text-[11px] text-gray-400 font-medium">
                To: {log.to}
              </p>
            </div>
          </div>
        </td>
        <td className="px-6 py-5 border-y border-gray-100 text-sm text-gray-600 font-medium">
          {new Date(log.createdAt).toLocaleDateString()}
        </td>
        <td className="px-6 py-5 border-y border-gray-100 text-sm text-gray-600 font-bold">
          {log.duration}s
        </td>
        <td className="px-6 py-5 border-y border-gray-100">
          <span
            className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${
              log.status === "completed"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {log.status}
          </span>
        </td>
        <td className="px-6 py-5 rounded-r-3xl border-y border-r border-gray-100 text-right">
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setSelectedLog(log)}
              className="p-2 text-gray-400 hover:text-btn-100 hover:bg-btn-100/10 rounded-lg transition-all"
            >
              <IoEyeSharp size={20} />
            </button>
            <button
              onClick={() => openDeleteModal(log)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <IoTrashOutline size={20} />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default CallLogTable;
