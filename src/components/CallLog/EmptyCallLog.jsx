
import { IoCallOutline } from "react-icons/io5";

const EmptyCallLog = ({
  setSearchTerm,
  setStatusFilter,
  searchTerm,
  statusFilter,
}) => {
 
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 px-6 bg-white rounded-[3rem] border-2  border-gray-200">
        {/* Icon with Login Side Styling */}
        <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center text-btn-100 mb-6 transform -rotate-6">
          <IoCallOutline size={48} />
        </div>

        {/* Text matching Home Component Typography */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-text tracking-tight">
            No Call Logs Found
          </h2>
          <p className="text-gray-500 max-w-xs mx-auto text-sm">
            {searchTerm || statusFilter !== "all"
              ? "We couldn't find any calls matching your current filters."
              : "Your  AI communication history is empty. Once customers start making calls, they will appear here."}
          </p>
        </div>

        {/* Button matching Sign In styling */}
        {(searchTerm || statusFilter !== "all") && (
          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
            }}
            className="mt-8 px-8 py-3 bg-btn-100 hover:bg-btn-200 text-white font-bold rounded-xl shadow-lg shadow-btn-100/20 transition-all active:scale-95"
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  };


export default EmptyCallLog;
