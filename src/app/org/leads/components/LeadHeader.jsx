import { Upload } from "lucide-react";
import { RxCross2 } from "react-icons/rx";

function LeadHeader({ handleFileUpload, fileName, setFileName }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-white dark:border-gray-900 dark:shadow-sm dark:shadow-gray-700/30">
      <div>
        <h1 className="text-2xl font-extrabold text-heading dark:text-white tracking-tight">
          Leads Management
        </h1>
        <p className="text-sm text-text/50 dark:text-gray-500 font-medium">
          Import and manage your sales prospects
        </p>
      </div>

      <div className="flex items-center flex-col justify-center">
        <label className="flex items-center gap-2 px-4 py-2 bg-btn-100 dark:bg-btn-200 hover:bg-btn-200 hover:inset-shadow-sm/40 text-white rounded-xl cursor-pointer transition-all shadow-sm">
          <Upload size={18} />
          <span className="text-sm font-medium">Upload CSV</span>
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
        {fileName && (
          <span className="text-xs font-medium mt-3 p-1 px-4 tracking-wide text-green-100 bg-green-600 dark:bg-green-700 py-0.5 rounded-full flex items-center gap-1">
            {fileName}
            <RxCross2
              onClick={() => setFileName("")}
              className="hover:bg-black rounded-full"
            />
          </span>
        )}
      </div>
    </div>
  );
}

export default LeadHeader;
