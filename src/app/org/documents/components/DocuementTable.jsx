import {
  FaTrash,
  FaExternalLinkAlt,
  FaFilePdf,
  FaFileWord,
  FaFilePowerpoint,
  FaFileAlt,
} from "react-icons/fa";

const DocumentTable = ({ doc, openDeleteModal }) => {
  const getFileIcon = (type) => {
    const iconBase = "transition-transform duration-300 group-hover:scale-110";
    if (type.includes("pdf"))
      return {
        icon: <FaFilePdf className={iconBase} />,
        color: "bg-red-50 text-red-500",
        label: "PDF",
      };
    if (
      type.includes("word") ||
      type.includes("msword") ||
      type.includes("officedocument")
    )
      return {
        icon: <FaFileWord className={iconBase} />,
        color: "bg-blue-50 text-blue-600",
        label: "DOC",
      };
    if (type.includes("presentation") || type.includes("powerpoint"))
      return {
        icon: <FaFilePowerpoint className={iconBase} />,
        color: "bg-orange-50 text-orange-600",
        label: "PPT",
      };
    return {
      icon: <FaFileAlt className={iconBase} />,
      color: "bg-gray-50 text-gray-500",
      label: "FILE",
    };
  };

  const { icon, color, label } = getFileIcon(doc?.docType || "");
  

  // // Clean filename: Remove path and complex timestamps
  // const cleanName =
  //   doc?.docUrl?.split("/").pop()?.split("-").slice(0, -2).join("-") ||
  //   "Untitled Document";

  return (
    <tr className="flex flex-col md:table-row group hover:bg-slate-50/80 dark:hover:bg-gray-700/40 transition-all duration-200 border-b border-gray-100 md:border-gray-50 last:border-0 p-4 md:p-0">
      <td className="px-0 md:px-6 py-2 md:py-4 flex justify-between items-center md:table-cell">
        <div
          className={`p-3 rounded-2xl w-fit text-2xl shadow-sm ${color} md:mx-auto`}
        >
          {icon}
        </div>

        <div className="flex md:hidden gap-3">
          <a
            href={doc?.docUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-white dark:bg-gray-800 border border-gray-100 text-btn-100 rounded-xl shadow-sm active:scale-95"
          >
            <FaExternalLinkAlt size={16} />
          </a>
          <button
            onClick={() => openDeleteModal(doc)}
            className="p-2.5 bg-white dark:bg-gray-800 border border-gray-100 text-red-500 rounded-xl shadow-sm active:scale-95"
          >
            <FaTrash size={16} />
          </button>
        </div>
      </td>

      <td className="px-0 md:px-4 py-2 md:py-4 ">
        <div className="flex flex-col">
          <a
            href={doc?.docUrl}
            target="_blank"
            className="text-[15px] cursor-pointer font-bold text-text dark:text-white/80 group-hover:text-btn-100 transition-colors truncate text-left md:text-center"
          >
            {doc?.originalName}
          </a>
          <div className="flex items-center gap-2 mt-1 md:mx-auto">
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${color} bg-opacity-20`}
            >
              {label}
            </span>
            <span className="text-[11px] text-text/40 dark:text-white/40 font-medium">
              Added {new Date(doc?.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </td>

      <td className="hidden md:table-cell px-6 py-4 text-right">
        <div className="flex justify-end gap-3 transition-opacity duration-300 md:justify-center-safe">
          <a
            href={doc?.docUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-white border border-gray-100 text-btn-100 shadow-sm hover:bg-btn-100 hover:text-white rounded-xl transition-all active:scale-95"
            title="View"
          >
            <FaExternalLinkAlt size={14} />
          </a>
          <button
            onClick={() => openDeleteModal(doc)}
            className="p-2.5 bg-white border border-gray-100 text-red-500 shadow-sm hover:bg-red-500 hover:text-white rounded-xl transition-all active:scale-95"
            title="Delete"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DocumentTable;
