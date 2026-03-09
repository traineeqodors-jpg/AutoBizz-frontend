

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

  // Clean filename: Remove path and complex timestamps
  const cleanName =
    doc?.docUrl?.split("/").pop()?.split("-").slice(0, -2).join("-") ||
    "Untitled Document";

  return (
    <tr className="group hover:bg-slate-50/80 transition-all duration-200 border-b border-gray-50 last:border-0">
      <td className="px-6 py-4">
        <div className={`p-3.5 rounded-2xl w-fit text-2xl shadow-sm ${color}`}>
          {icon}
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-col">
          <span className="text-[15px] font-bold text-text group-hover:text-btn-100 transition-colors truncate max-w-xs">
            {cleanName}
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${color} bg-opacity-20`}
            >
              {label}
            </span>
            <span className="text-[11px] text-text/40 font-medium">
              Added {new Date(doc?.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-3 opacity-100 transition-opacity duration-300">
          <a
            href={`http://192.168.0.37:5000${doc?.docUrl}`}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 bg-white border border-gray-100 text-btn-100 shadow-sm hover:bg-btn-100 hover:text-white rounded-xl transition-all active:scale-95"
            title="View Document"
          >
            <FaExternalLinkAlt size={14} />
          </a>
          <button
            onClick={() => openDeleteModal(doc)}
            className="p-2.5 bg-white border border-gray-100 text-red-500 shadow-sm hover:bg-red-500 hover:text-white rounded-xl transition-all active:scale-95 cursor-pointer"
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
