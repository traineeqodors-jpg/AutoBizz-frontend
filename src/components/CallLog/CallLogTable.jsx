
import { IoCallOutline, IoEyeSharp, IoTrashOutline } from "react-icons/io5";

const CallLogTable = ({ log, openDeleteModal, setSelectedLog }) => {
  return (
    <tr
      key={log.id}
      className="bg-white dark:bg-gray-900 dark:border-0  group border border-gray-100 cursor-default dark:hover:bg-gray-700/40"
    >
      <td className="px-6 py-5 dark:rounded-none dark:border-0 rounded-l-3xl border-y border-l border-gray-100">
        <div className="flex items-center justify-center gap-3">
          <div className="p-2.5 bg-gray-50 dark:bg-btn-100 text-btn-100 dark:text-white rounded-xl group-hover:bg-btn-100 group-hover:dark:bg-btn-300 group-hover:text-white">
            <IoCallOutline size={20} />
          </div>
          <div>
            <p className="font-bold text-text dark:text-gray-300">{log.from}</p>
            <p className="text-[11px] text-gray-400  font-medium uppercase tracking-tight">
              To: {log.to}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-5 border-y dark:text-gray-300 dark:rounded-none dark:border-0 border-gray-100 text-sm text-gray-600 font-medium">
        {new Date(log.createdAt).toLocaleDateString()}
      </td>

      <td className="px-6 py-5 border-y dark:text-gray-300 dark:rounded-none dark:border-0 border-gray-100 text-sm text-gray-600 font-bold">
        {log.duration}s
      </td>

      <td className="px-6 py-5 border-y  dark:rounded-none dark:border-0 border-gray-100">
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

      <td className="px-6 py-5 rounded-r-3xl border-y border-r dark:rounded-none dark:border-0 border-gray-100 text-right">
        <div className="flex justify-center gap-2">
          {/* VIEW BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevents click from bubbling
              setSelectedLog(log);
            }}
            className="p-2 text-gray-400 hover:text-btn-100 hover:bg-btn-100/10 rounded-lg "
            title="View Details"
          >
            <IoEyeSharp size={20} />
          </button>

          {/* DELETE BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Stops the view modal from triggering
              openDeleteModal(log);
            }}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg "
            title="Delete Log"
          >
            <IoTrashOutline size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CallLogTable;
