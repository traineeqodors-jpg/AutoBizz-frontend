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

  const processedLogs = useMemo(() => {
    let filtered = [...logs].filter((log) => {
      // Safely handle null/undefined values for 'from' and 'to'
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
        // Safe access for sorting as well
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
     <LoadingElement />
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

      {/* Detail Modal - */}
      {selectedLog && (
      <DetailModal setSelectedLog={setSelectedLog} selectedLog={selectedLog}/>
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
