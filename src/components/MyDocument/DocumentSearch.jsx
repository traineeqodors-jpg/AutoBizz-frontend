
import { IoSearchOutline } from "react-icons/io5";

const DocumentSearch = ({ setSearchTerm, searchTerm }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-white">
        <div>
          <h1 className="text-2xl font-black text-text tracking-tight">
            My Documents
          </h1>
          <p className="text-sm text-text/50 font-medium">
            Safe storage for your business assets
          </p>
        </div>

        <div className="relative group w-full md:w-72">
          <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-text/40 group-focus-within:text-btn-100 transition-colors size-5" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-back py-3 pl-12 pr-4 rounded-2xl border-transparent focus:border-btn-100/50 focus:ring-4 focus:ring-btn-100/5 outline-none transition-all text-sm font-medium"
          />
        </div>
      </div>
    </>
  );
};

export default DocumentSearch;