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
import LoadingElement from "../components/LoadingElement";
import DetailModal from "../components/CallLog/DetailModal";

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
  const [deleteTarget, setDeleteTarget] = useState(null)

  const processedLogs = useMemo(() => {
    let filtered = [...logs].filter((log) => {

      const fromNumber = log.from || "";
      const toNumber = log.to || "";

      const matchesSearch =
        fromNumber.includes(searchTerm) || toNumber.includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" || log.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
      
        const valA = a[sortConfig.key] ?? "";
        const valB = b[sortConfig.key] ?? "";

        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
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
    setDeleteTarget(log);
    deleteModalRef.current?.showModal();
  };

  //close delete modal
  const closeDeleteModal = () => {
    deleteModalRef.current?.close();
    selectedLog(null);
  };

  //handle delete
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteCallLog(deleteTarget.id).unwrap();
      toast.success("Document permanently removed");
      closeDeleteModal();
    } catch (err) {
      toast.error("Deletion failed. Try again.");
    }
  };

  const isEmpty = processedLogs.length === 0;

  if (isLoading)
    return (
     <LoadingElement />
    );

  return (
   <div className="min-h-screen w-full bg-back p-3 sm:p-6 lg:p-8">
  <div className="max-w-6xl mx-auto space-y-6">
    
    {/* Header & Controls - Updated to match Document Search layout */}
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-white">
      <div>
        <h1 className="text-2xl font-bold text-text tracking-tight">
          Call History
        </h1>
        <p className="text-text/40 text-sm italic">
          Showing {processedLogs.length} recent calls
        </p>
      </div>

      <SearchFilterCallLog
        setSearchTerm={setSearchTerm}
        setStatusFilter={setStatusFilter}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      />
    </div>

    {isEmpty ? (
      <EmptyCallLog
        setSearchTerm={setSearchTerm}
        setStatusFilter={setStatusFilter}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      />
    ) : (
      <div className="bg-white shadow-xl shadow-text/5 rounded-2xl sm:rounded-3xl overflow-hidden border border-white">
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50 text-text/40 text-[11px] uppercase tracking-widest font-bold">
                <th className="px-6 py-5">Call Detail</th>
                <th
                  className="px-6 py-5 cursor-pointer hover:text-btn-100 transition-colors"
                  onClick={() => toggleSort("createdAt")}
                >
                  <div className="flex items-center gap-2">
                    Date{" "}
                    {sortConfig.key === "createdAt" ? (
                      sortConfig.direction === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />
                    ) : null}
                  </div>
                </th>
                <th className="px-6 py-5">Duration</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
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

        {/* Mobile View - Kept consistent but wrapped in same container */}
        <div className="md:hidden">
            <MobileCallLogView
                processedLogs={processedLogs}
                openDeleteModal={openDeleteModal}
                setSelectedLog={setSelectedLog}
            />
        </div>
      </div>
    )}
  </div>

  {/* Modals */}
  {selectedLog && (
    <DetailModal setSelectedLog={setSelectedLog} selectedLog={selectedLog}/>
  )}
  <DeleteDialog
    targetElement={deleteTarget}
    confirmDelete={confirmDelete}
    closeDeleteModal={closeDeleteModal}
    deleteModalRef={deleteModalRef}
    isDeleting={isDeleting}
  />
</div>
  );
};

export default CallLog;
