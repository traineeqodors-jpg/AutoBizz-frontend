import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  useDeleteCallLogMutation,
  useGetAllCallLogsQuery,
} from "../features/slices/callLogSlice";

// Components
import CallLogTable from "../components/CallLog/CallLogTable";
import MobileCallLogView from "../components/CallLog/MobileCallLogView";
import SearchFilterCallLog from "../components/CallLog/SearchFilterCallLog";
import EmptyCallLog from "../components/CallLog/EmptyCallLog";
import DeleteDialog from "../components/Dialog/DeleteDialog";
import LoadingElement from "../components/LoadingElement";
import DetailModal from "../components/CallLog/DetailModal";
import { FaRegCalendarAlt } from "react-icons/fa";
import { motion , AnimatePresence} from "framer-motion";

const CallLog = () => {
  // 1. State for Backend Filtering (Updated with Dates)
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    role: "",
    startDate: "", // Added
    endDate: "", // Added
    sortBy: "createdAt",
    order: "DESC",
  });

  // 2. Debounce Search Logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm, page: 1 }));
    }, 700);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // 3. RTK Query Hook
  const { data, isLoading, isFetching } = useGetAllCallLogsQuery(filters, {
    skip: !localStorage.getItem("isLoggedIn"),
  });

  const [deleteCallLog, { isLoading: isDeleting }] = useDeleteCallLogMutation();
  const deleteModalRef = useRef(null);

  const logs = data?.data?.logs || [];
  const pagination = data?.data?.pagination || { totalPages: 1, totalItems: 0 };
  const [selectedLog, setSelectedLog] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // 4. Handlers
  const handleStatusFilter = (status) => {
    const backendStatus = status === "all" ? "" : status;
    setFilters((prev) => ({ ...prev, status: backendStatus, page: 1 }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const clearDateFilters = () => {
    setFilters((prev) => ({ ...prev, startDate: "", endDate: "", page: 1 }));
  };

  const toggleSort = (key) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: key,
      order: prev.sortBy === key && prev.order === "DESC" ? "ASC" : "DESC",
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const openDeleteModal = (log) => {
    setDeleteTarget(log);
    deleteModalRef.current?.showModal();
  };

  const closeDeleteModal = () => {
    deleteModalRef.current?.close();
    setDeleteTarget(null);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteCallLog(deleteTarget.id).unwrap();
      toast.success("Log removed successfully");
      closeDeleteModal();
    } catch (err) {
      toast.error(err?.data?.message || "Deletion failed");
    }
  };

  if (isLoading) return <LoadingElement />;

  return (
     <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-back w-full flex flex-col items-center gap-5"
    >
    <div className="min-h-screen w-full bg-back p-3 sm:p-6 lg:p-8 relative">
      {isFetching && !isLoading && (
        <div className="absolute top-0 left-0 w-full h-1 bg-btn-100/20 overflow-hidden z-50">
          <div className="h-full bg-btn-100 animate-pulse w-1/3"></div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header & Filters Section */}
        <div className="flex flex-col gap-6 bg-white p-6 rounded-3xl shadow-sm border border-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
            <h1 className="text-2xl font-black text-text tracking-tight">
                  Call History
                </h1>
 
              <p className="text-text/40 text-sm italic font-medium">
                Total records: {pagination.totalItems}
              </p>
            </div>

            <SearchFilterCallLog
              setSearchTerm={setSearchTerm}
              setStatusFilter={handleStatusFilter}
              searchTerm={searchTerm}
              statusFilter={filters.status || "all"}
            />
          </div>

          {/* Date Filter Bar */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-50">
            {/* From Date */}
            <div className="flex items-center gap-2">
              <label className="text-[10px] uppercase font-black text-text/40 tracking-wider">
                From:
              </label>
              <div className="relative flex items-center group">
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleDateChange}
                  className="pl-3 pr-10 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-btn-100/20 transition-all cursor-pointer w-35 appearance-none"
                />
                <FaRegCalendarAlt className="absolute right-3 text-slate-400 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
              </div>
            </div>

            {/* To Date */}
            <div className="flex items-center gap-2">
              <label className="text-[10px] uppercase font-black text-text/40 tracking-wider">
                To:
              </label>
              <div className="relative flex items-center group">
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleDateChange}
                  className="pl-3 pr-10 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-btn-100/20 transition-all cursor-pointer w-35 appearance-none"
                />
                <FaRegCalendarAlt className="absolute right-3 text-slate-400 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
              </div>
            </div>

            {/* Clear Button */}
            {(filters.startDate || filters.endDate) && (
              <button
                onClick={clearDateFilters}
                className="text-[10px] font-black uppercase text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
              >
                Clear Dates
              </button>
            )}
          </div>
        </div>

        {logs.length === 0 ? (
          <EmptyCallLog
            setSearchTerm={setSearchTerm}
            setStatusFilter={handleStatusFilter}
          />
        ) : (
          <AnimatePresence mode="wait">
                      <motion.div
                        key={
                          filters.page +
                          filters.search +
                          filters.status +
                          filters.sortBy +
                          filters.startDate +
                          filters.endDate
                        }
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                      >
          <div className="bg-white shadow-xl shadow-text/5 rounded-3xl overflow-hidden border border-white">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-0">
                <thead>
                  <tr className="bg-slate-50/50 text-text/40 text-[11px] uppercase tracking-widest font-black">
                    <th className="px-6 py-5">Call Detail</th>
                    <th
                      className="px-6 py-5 cursor-pointer hover:text-btn-100 transition-colors"
                      onClick={() => toggleSort("createdAt")}
                    >
                      <div className="flex items-center gap-2">
                        Date{" "}
                        {filters.sortBy === "createdAt" &&
                          (filters.order === "ASC" ? "↑" : "↓")}
                      </div>
                    </th>
                    <th className="px-6 py-5">Duration</th>
                    <th className="px-6 py-5">Status</th>
                    <th className="px-6 py-5 text-right text-black">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.map((log) => (
                    <CallLogTable
                      key={log.id}
                      log={log}
                      setSelectedLog={setSelectedLog}
                      openDeleteModal={openDeleteModal}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden">
              <MobileCallLogView
                processedLogs={logs}
                openDeleteModal={openDeleteModal}
                setSelectedLog={setSelectedLog}
              />
            </div>

            {/* Pagination Controls */}
           
              <>
                <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-text/40 uppercase">
                    Page {filters.page} of {pagination.totalPages}
                  </span>
                  <div className="flex gap-2">
                    <button
                      disabled={filters.page === 1}
                      onClick={() => handlePageChange(filters.page - 1)}
                      className="px-4 py-2 text-xs font-bold rounded-xl border border-gray-200 disabled:opacity-30 bg-white"
                    >
                      Prev
                    </button>
                    <button
                      disabled={filters.page >= pagination.totalPages}
                      onClick={() => handlePageChange(filters.page + 1)}
                      className="px-4 py-2 text-xs font-bold rounded-xl bg-black text-white disabled:bg-gray-200"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
          
          </div>
          </motion.div>
          </AnimatePresence>
        )}
      </div>

      {selectedLog && (
        <DetailModal
          setSelectedLog={setSelectedLog}
          selectedLog={selectedLog}
        />
      )}
      <DeleteDialog
        targetElement={deleteTarget}
        confirmDelete={confirmDelete}
        closeDeleteModal={closeDeleteModal}
        deleteModalRef={deleteModalRef}
        isDeleting={isDeleting}
      />
    </div>
    </motion.div>
  );
};

export default CallLog;
