import React, { useState, useMemo, useRef } from "react";
import {
  IoEyeSharp,
  IoTrashOutline,
  IoSearchOutline,
  IoClose,
  IoCallOutline,
} from "react-icons/io5";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import {
  useDeleteCallLogMutation,
  useGetAllCallLogsQuery,
} from "../features/slices/callLogSlice";
import { toast } from "react-toastify";
import CallLogTable from "../components/CallLog/CallLogTable";
import MobileCallLogView from "../components/CallLog/MobileCallLogView";
import SearchFilterCallLog from "../components/CallLog/SearchFilterCallLog";
import EmptyCallLog from "../components/CallLog/EmptyCallLog";
import DocumentDeleteDialog from "../components/Dialog/DeleteDialog";
import DeleteDialog from "../components/Dialog/DeleteDialog";

const CallLog = () => {
  const { data, isLoading } = useGetAllCallLogsQuery(undefined, {
    skip: !localStorage.getItem("isLoggedIn"),
  });
  const [deleteCallLog, { isLoading: isDeleting }] = useDeleteCallLogMutation();

  const deleteModalRef = useRef(null); //delete dialog ref

  const logs = data?.data || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [selectedLog, setSelectedLog] = useState(null);

  // Sorting & Filtering Logic
  const processedLogs = useMemo(() => {
    let filtered = [...logs].filter(
      (log) =>
        (log.from.includes(searchTerm) || log.to.includes(searchTerm)) &&
        (statusFilter === "all" || log.status === statusFilter),
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [logs, searchTerm, statusFilter, sortConfig]);

  const toggleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "desc" ? "asc" : "desc",
    }));
  };

  const openDeleteModal = (log) => {
    setSelectedLog(log);
    deleteModalRef.current?.showModal();
  };

  //close delete modal
  const closeDeleteModal = () => {
    deleteModalRef.current?.close();
    setSelectedLog(null);
  };

  //handle delete
  const confirmDelete = async () => {
    if (!selectedLog) return;
    try {
      await deleteCallLog(selectedLog.id).unwrap();
      toast.success("Document permanently removed");
      closeDeleteModal();
    } catch (err) {
      toast.error("Deletion failed. Try again.");
    }
  };

  const isEmpty = processedLogs.length === 0;

  if (isLoading)
    return (
      <div className="p-10 text-center text-gray-500 font-bold">
        Loading logs...
      </div>
    );

  return (
    <div className="w-full p-5">
      {/* Header & Controls - Matching Login Page Styles */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text tracking-tight">
            Call History
          </h1>
          <p className="text-gray-500 text-sm italic">
            Showing {processedLogs.length} recent calls
          </p>
        </div>

        <SearchFilterCallLog
          setSearchTerm={setSearchTerm}
          setStatusFilter={setStatusFilter}
        />
      </div>

      {isEmpty && (
        <EmptyCallLog
          setSearchTerm={setSearchTerm}
          setStatusFilter={setStatusFilter}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
        />
      )}

      {/* Desktop View */}
      {!isEmpty && (
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-gray-400 text-[10px] uppercase tracking-widest font-bold px-6">
                <th className="px-6 py-2">Call Detail</th>
                <th
                  className="px-6 py-2 cursor-pointer hover:text-btn-100"
                  onClick={() => toggleSort("createdAt")}
                >
                  <div className="flex items-center gap-2">
                    Date{" "}
                    {sortConfig.key === "createdAt" ? (
                      sortConfig.direction === "asc" ? (
                        <FaSortAmountUp />
                      ) : (
                        <FaSortAmountDown />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </th>
                <th className="px-6 py-2">Duration</th>
                <th className="px-6 py-2">Status</th>
                <th className="px-6 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {processedLogs.map((log) => (
                <CallLogTable
                  key={log.id}
                  log={log}
                  handleDelete={confirmDelete}
                  setSelectedLog={setSelectedLog}
                  openDeleteModal={openDeleteModal}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile View */}
      <MobileCallLogView
        processedLogs={processedLogs}
        openDeleteModal={openDeleteModal}
        setSelectedLog={setSelectedLog}
      />

      {/* Detail Modal - Matching LoginPage Style */}
      {selectedLog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm transition-all"
          onClick={() => setSelectedLog(null)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-text tracking-tight">
                Call Transcript
              </h2>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-2 text-gray-400 hover:bg-white rounded-full transition-all"
              >
                <IoClose size={24} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-gray-700 leading-relaxed italic text-sm min-h-[100px] flex items-center justify-center text-center">
                {selectedLog.transcript
                  ? `"${selectedLog.transcript}"`
                  : "No transcript available for this call."}
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="w-full bg-btn-100 hover:bg-btn-200 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform active:scale-95"
              >
                Close Detail
              </button>
            </div>
          </div>
        </div>
      )}

      <DeleteDialog
        targetElement={selectedLog}
        confirmDelete={confirmDelete}
        closeDeleteModal={closeDeleteModal}
        deleteModalRef={deleteModalRef}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default CallLog;
