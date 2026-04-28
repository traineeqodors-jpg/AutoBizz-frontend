import { Upload } from "lucide-react";
import { RxCross2 } from "react-icons/rx";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { useState } from "react";
import AddLeadDialog from "./AddLeadDialog";

function LeadHeader({
  handleFileUpload,
  fileName,
  setFileName,
  input,
  handleChange,
  handleSubmit,
  errors,
  openModal,
  setOpenModal,
  setInput,
}) {
  const [addLeadsType, setAddLeadsType] = useState("");

  const handleSelectChange = (value) => {
    setAddLeadsType(value);

    if (value === "manual") {
      setOpenModal(true);
      setAddLeadsType(""); // reset to show placeholder again
    }

    if (value === "csv") {
      document.getElementById("csvInput").click();
      setAddLeadsType(""); // reset
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-white dark:border-gray-900 dark:shadow-gray-700/30">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-extrabold text-heading dark:text-white tracking-tight">
          Leads Management
        </h1>
        <p className="text-sm text-text/50 dark:text-gray-500 font-medium">
          Import and manage your sales prospects
        </p>
      </div>

      {/* Right */}
      <div id="upload-csv" className="flex flex-col items-center">
        <Select value={addLeadsType} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-50 flex items-center justify-center px-4 py-2 bg-btn-100 dark:bg-btn-200 text-white rounded-xl shadow-sm hover:bg-btn-200 transition-all">
            <SelectValue placeholder="Add Leads" />
          </SelectTrigger>

          <SelectContent className="rounded-xl">
            <SelectGroup>
              <SelectLabel>Add Leads</SelectLabel>

              <SelectItem
                value="manual"
                className="cursor-pointer focus:bg-btn-200 focus:text-white"
              >
                Add Manually
              </SelectItem>

              <SelectItem
                value="csv"
                className="cursor-pointer flex items-center gap-2 focus:bg-btn-200 focus:text-white"
              >
                <Upload size={16} />
                Upload CSV
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Hidden File Input */}
        <input
          id="csvInput"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* File Badge */}
        {fileName && (
          <span className="text-xs font-medium mt-3 px-3 py-1 tracking-wide text-green-100 bg-green-600 dark:bg-green-700 rounded-full flex items-center gap-2">
            {fileName}
            <RxCross2
              onClick={() => setFileName("")}
              className="cursor-pointer hover:bg-black/20 rounded-full p-0.5"
            />
          </span>
        )}
      </div>

      {/* Modal */}
      <AddLeadDialog
        open={openModal}
        setOpen={setOpenModal}
        input={input}
        setInput={setInput}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </div>
  );
}

export default LeadHeader;
