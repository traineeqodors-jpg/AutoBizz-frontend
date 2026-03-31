import { Upload } from "lucide-react";
import { IoSearchOutline } from "react-icons/io5";
import DocuementUploadDialog from "../Home/DocuementUploadDialog";

const DocumentSearch = ({ setSearchTerm, searchTerm, dialogRef }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-900 dark:border-0 p-6 rounded-3xl shadow-sm border border-white">
        <div>
          <h1 className="text-2xl font-black text-text dark:text-white tracking-tight">
            My Documents
          </h1>
          <p className="text-sm text-text/50 dark:text-gray-100/50 font-medium">
            Safe storage for your business assets
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative min-w-55 flex-1">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-text/40 dark:text-white group-focus-within:text-btn-100 size-5" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 dark:border-0 dark:text-white border border-gray-200  rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-btn-100 dark:focus:bg-gray-800 dark:focus:ring-btn-300 outline-none w-full "
            />
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="flex px-4 cursor-pointer py-3 rounded-xl text-sm font-semibold bg-btn-200 dark:bg-btn-300 text-white gap-1 hover:bg-btn-200 justify-center items-center"
          >
            Upload Docs
            <Upload size={18} />
          </button>
        </div>
      </div>

      <DocuementUploadDialog dialogRef={dialogRef} />
    </>
  );
};

export default DocumentSearch;
