import { Upload } from "lucide-react";
import React from "react";

function LeadHeader({ handleFileUpload, fileName }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-white">
      <div>
         <h1 className="text-2xl font-blacl text-text tracking-tight">
           Lead Management
          </h1>
        <p className="text-sm text-text/50 font-medium">
          Import and manage your sales prospects
        </p>
      </div>

      <div className="flex items-center gap-3 flex-col justify-center">
        <label className="flex items-center gap-2 px-4 py-2 bg-btn-100 hover:bg-btn-200 text-white rounded-xl cursor-pointer transition-all shadow-sm">
          <Upload size={18} />
          <span className="text-sm font-medium">Upload CSV</span>
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
        <span className="text-xs font-medium tracking-wide text-green-100 bg-green-400 py-0.5 rounded-full">
          {fileName}
        </span>
      </div>
    </div>
  );
}

export default LeadHeader;
