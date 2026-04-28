"use client";

import {
  useDeleteCallLogMutation,
  useGetAllCallLogsQuery,
} from "@/features/slices/callLogSlice";

import React, { useEffect, useRef, useState } from "react";

import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegCalendarAlt } from "react-icons/fa";

import SearchFilterCallLog from "./components/SearchFilterCallLog";
import EmptyCallLog from "./components/EmptyCallLog";
import CallLogTable from "./components/CallLogTable";
import MobileCallLogView from "./components/MobileCallLogView";
import DetailModal from "./components/DetailModal";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import DeleteDialog from "@/components/ui/DeleteDialog";
import DatePicker from "@/components/ui/DatePicker";

function CallLogsPage() {
  const [selectedLog, setSelectedLog] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // State for Backend Filtering (Updated with Dates)
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    role: "",
    startDate: "",
    endDate: "",
    sortBy: "createdAt",
    order: "DESC",
  });
  const deleteModalRef = useRef(null);

  // RTK Query Hook
  const { data, isLoading, isFetching } = useGetAllCallLogsQuery(filters, {
    skip: filters.page === 0,
  });

  const [deleteCallLog, { isLoading: isDeleting }] = useDeleteCallLogMutation();

  const hasData = data?.data?.hasAnyData !== false;
  const canGoNext = hasData;

  const logs = data?.data?.logs || [];
  const pagination = data?.data?.pagination || {
    totalPages: 1,
    totalItems: 0,
  };
  const hasFilters = data?.data?.hasFilters || false;
  const hasAnyData = data?.data?.hasAnyData ?? true;

  // Debounce Search Logic
  useEffect(() => {
    if (!hasAnyData) return;

    const delayDebounceFn = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm, page: 1 }));
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, hasAnyData]);

  // Handlers
  const handleStatusFilter = (status) => {
    const backendStatus = status === "all" ? "" : status;
    setFilters((prev) => ({ ...prev, status: backendStatus, page: 1 }));
  };

  // const handleDateChange = (e) => {
  //   const { name, value } = e.target;
  //   setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  // };

  const updateFilter = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
      page: 1,
    }));

    console.log(filters);
  };

  const clearDateFilters = () => {
    setFilters((prev) => ({
      ...prev,
      startDate: "",
      endDate: "",
      page: 1,
    }));
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

  return (
    <AnimatedWrapper>
      <div className="min-h-screen w-full py-3 sm:py-6 lg:py-8 relative">
        <div className="mx-auto space-y-6">
          {/* Header & Filters Section */}
          <div className="flex flex-col gap-6 bg-white p-6 rounded-3xl shadow-sm dark:bg-gray-900 dark:border-0 border border-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-heading tracking-tight dark:text-white ">
                  Call History
                </h1>

                <p className="text-text/40 text-sm dark:text-white/70 italic font-medium">
                  Total records: {pagination.totalItems}
                </p>
              </div>

              <SearchFilterCallLog
                setSearchTerm={setSearchTerm}
                setStatusFilter={handleStatusFilter}
                searchTerm={searchTerm}
                statusFilter={filters.status || "all"}
                canGoNext={canGoNext}
              />
            </div>

            {/* Date Filter Bar */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 px-4 py-4 bg-back/20 dark:bg-gray-800/50 rounded-2xl border border-slate-100 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row items-center gap-4 w-fit sm:w-full mx-auto sm:mx-0 lg:w-auto">
                <DatePicker
                  disabled={!canGoNext}
                  label="From Date"
                  field="startDate"
                  value={filters.startDate}
                  updateFilter={updateFilter}
                />

                <DatePicker
                  label="To Date"
                  field="endDate"
                  value={filters.endDate}
                  updateFilter={updateFilter}
                  minDate={filters.startDate}
                />
              </div>

              {(filters.startDate || filters.endDate) && (
                <button
                  onClick={clearDateFilters}
                  className="text-xs font-bold uppercase text-red-400 bg-red-200/10 hover:bg-red-100 ring ring-red-300 px-4 py-2 rounded-xl transition-all active:scale-95"
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
              hasFilters={hasFilters}
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
                <div className="bg-white shadow-sm shadow-text/5 dark:bg-gray-900 dark:border-gray-900/90 rounded-3xl overflow-hidden border border-white">
                  {isLoading || isFetching ? (
                    <div className="h-30 relative flex items-center justify-center">
                      <div className="w-12 h-12 border-6 border-btn-100/20 border-t-btn-100 rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <>
                      <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-center border-separate border-spacing-0">
                          <thead>
                            <tr className="bg-slate-50/50 dark:bg-gray-700 dark:text-white text-text/40 text-[11px] uppercase tracking-widest font-black">
                              <th className="px-6 py-5">Call Detail</th>
                              <th
                                className="px-6 py-5 cursor-pointer hover:text-btn-100 transition-colors"
                                onClick={() => toggleSort("createdAt")}
                              >
                                <div className="flex items-center justify-center-safe gap-2">
                                  Date{" "}
                                  {filters.sortBy === "createdAt" &&
                                    (filters.order === "ASC" ? "↑" : "↓")}
                                </div>
                              </th>
                              <th className="px-6 py-5">Duration</th>
                              <th className="px-6 py-5">Status</th>
                              <th className="px-6 py-5">Actions</th>
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
                      <div className="px-6 py-4 bg-slate-50/30 dark:bg-gray-700 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-text/40 dark:text-white uppercase ">
                          Page {filters.page} of {pagination.totalPages}
                        </span>
                        <div className="flex gap-2">
                          <button
                            disabled={filters.page === 1}
                            onClick={() => handlePageChange(filters.page - 1)}
                            className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 bg-white  dark:bg-gray-950 dark:text-white dark:hover:bg-gray-900 cursor-pointer hover:bg-slate-50 disabled:opacity-50 transition-all active:scale-95"
                          >
                            Prev
                          </button>
                          <button
                            disabled={filters.page >= pagination.totalPages}
                            onClick={() => handlePageChange(filters.page + 1)}
                            className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 bg-white dark:bg-gray-950 dark:text-white dark:hover:bg-gray-900 cursor-pointer hover:bg-slate-50 disabled:opacity-50 transition-all active:scale-95"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </>
                  )}
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
    </AnimatedWrapper>
  );
}

export default CallLogsPage;
