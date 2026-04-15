"use client";

import DeleteDialog from "@/components/ui/DeleteDialog";
import { io } from "socket.io-client";
import {
  leadsApi,
  useAddLeadCsvMutation,
  useDeleteLeadMutation,
  useGetAllLeadsQuery,
} from "@/features/slices/leadSlice";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import LeadHeader from "./components/LeadHeader";
import LeadCards from "./components/LeadCards";
import LeadFilter from "./components/LeadFilter";
import MobileLeadsView from "./components/MobileLeadsView";
import LeadTable from "./components/LeadTable";
import { useGoogleLogin } from "@react-oauth/google";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFilters,
  updateFilters,
} from "@/features/extraSlice/leadFIlterSlice";
import {
  useGetMeQuery,
  useGoogleTokenMutation,
} from "@/features/slices/userSlice";

function LeadManagement() {
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.leadFilters);
  const [searchTerm, setSearchTerm] = useState(filters.search);
  const [fileName, setFileName] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const hideNoticeTimerRef = useRef(null);

  const deleteModalRef = useRef(null);
  const scrollRef = useRef(null);

  const [socketNotice, setSocketNotice] = useState({
    visible: false,
    status: "idle",
    title: "",
    message: "",
    current: 0,
    total: 0,
    progress: 0,
    updatedAt: null,
  });

  const { data: user } = useGetMeQuery();
  const isGoogleLinked = !!user?.data?.googleRefreshToken;

  const [uploadCSV] = useAddLeadCsvMutation();
  const [googleToken] = useGoogleTokenMutation();
  const [deleteLead, { isLoading: isDeleting }] = useDeleteLeadMutation();

  const memoizedFilters = useMemo(() => filters, [filters]);

  const {
    data,
    isLoading: leadsLoading,
    isFetching,
  } = useGetAllLeadsQuery(memoizedFilters, {
    skip: !isGoogleLinked,
  });

  const { data: me } = useGetMeQuery();

  const orgId = me?.data?.orgId || me?.data?.id;

  const leads = data?.data?.leads || [];
  const pagination = data?.data?.pagination || { totalPages: 1, totalItems: 0 };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(updateFilters({ search: searchTerm, page: 1 }));
    }, 700);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch]);

  const scrollToTop = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 50);
  };

  const onUpdateFilter = (e) => {
    const { name, value } = e.target;
    if (name === "minScore" && (value < 0 || value > 100)) {
      return;
    }

    if (name === "minScore") {
      const scoreValue = value === "" ? undefined : Number(value);
      dispatch(updateFilters({ [name]: scoreValue, page: 1 }));
      return;
    }

    dispatch(updateFilters({ [name]: value, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    dispatch(updateFilters({ page: newPage }));
  };

  const onResetFilters = () => {
    setSearchTerm("");
    dispatch(resetFilters());
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await uploadCSV(formData).unwrap();
        toast.success(response?.message);
      } catch (error) {
        setFileName("");
        toast.error(error?.data?.message || "Upload failed");
      }
    }
  };

  // Google Login Logic
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await googleToken(response.code).unwrap();
        toast.success(res?.message);
      } catch (error) {
        toast.error(error?.data?.message);
      }
    },
    flow: "auth-code",
    scope: "openid email profile",
    onError: (error) => console.log(error),
  });

  // Modal Handlers
  const openDeleteModal = (leadId) => {
    setDeleteTarget(leadId);
    deleteModalRef.current?.showModal();
  };

  const closeDeleteModal = () => {
    deleteModalRef.current?.close();
    setDeleteTarget(null);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const response = await deleteLead(deleteTarget).unwrap();
      toast.success(response?.message);
      closeDeleteModal();
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  const dismissSocketNotice = () => {
    setSocketNotice((prev) => ({ ...prev, visible: false }));
  };

  useEffect(() => {
    if (!orgId) return;

    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    const orgKey = String(orgId);
    const batchKey = `batch-update-${orgKey}`;
    const scoreKey = `lead-scored-${orgKey}`;

    const clearAutoHide = () => {
      if (hideNoticeTimerRef.current) {
        clearTimeout(hideNoticeTimerRef.current);
        hideNoticeTimerRef.current = null;
      }
    };

    socket.on(batchKey, (data) => {
      clearAutoHide();

      const progress = data?.total
        ? Math.min(100, Math.round((data.current / data.total) * 100))
        : 0;

      if (data.status === "success") {
        setSocketNotice({
          visible: true,
          status: "success",
          title: "Batch completed",
          message:
            data.message || "Your leads have been imported successfully.",
          current: data.total || 0,
          total: data.total || 0,
          progress: 100,
          updatedAt: new Date().toLocaleTimeString(),
        });

        dispatch(leadsApi.util.invalidateTags(["leads"]));

        hideNoticeTimerRef.current = setTimeout(() => {
          setSocketNotice((prev) => ({ ...prev, visible: false }));
        }, 3000);

        return;
      }

      if (data.status === "error") {
        setSocketNotice({
          visible: true,
          status: "error",
          title: "Batch failed",
          message:
            data.message || "Something went wrong while processing the file.",
          current: data.current || 0,
          total: data.total || 0,
          progress,
          updatedAt: new Date().toLocaleTimeString(),
        });

        return;
      }

      if (data.status === "processing") {
        setSocketNotice({
          visible: true,
          status: "processing",
          title: "Processing leads",
          message:
            data.message || "Your file is being processed in the background.",
          current: data.current || 0,
          total: data.total || 0,
          progress,
          updatedAt: new Date().toLocaleTimeString(),
        });

        return;
      }

      if (data.status === "warning") {
        setSocketNotice({
          visible: true,
          status: "warning",
          title: "Warning",
          message: data.message || "Warning of wrong number",
          current: data.current || 0,
          total: data.total || 0,
          progress,
          updatedAt: new Date().toLocaleTimeString(),
        });

        return;
      }
    });

    socket.on(scoreKey, (data) => {
      console.log("Received Score Update:", data);

      clearAutoHide();

      setSocketNotice({
        visible: true,
        status: "success",
        title: "Lead scores updated",
        message: data?.message || "Lead scores were refreshed successfully.",
        current: 0,
        total: 0,
        progress: 100,
        updatedAt: new Date().toLocaleTimeString(),
      });

      dispatch(leadsApi.util.invalidateTags(["leads"]));

      hideNoticeTimerRef.current = setTimeout(() => {
        setSocketNotice((prev) => ({ ...prev, visible: false }));
      }, 2500);
    });

    return () => {
      clearAutoHide();
      socket.off(batchKey);
      socket.off(scoreKey);
      socket.disconnect();
    };
  }, [orgId, dispatch]);

  return (
    <AnimatedWrapper>
      <div className="min-h-screen w-full mx-auto space-y-6 py-3 sm:py-6 lg:py-8 relative">
        {/* Google Overlay */}
        {!isGoogleLinked && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/40 dark:bg-gray-800/40 backdrop-blur-md p-2">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl text-center border border-gray-100">
              <h2 className="text-xl font-bold mb-2 dark:text-white">
                Google Calendar Required
              </h2>
              <p className="text-gray-600 dark:text-gray-500 mb-6">
                Link account to manage leads.
              </p>
              <button
                onClick={handleGoogleLogin}
                className="bg-btn-100 text-white px-6 py-3 rounded-xl flex items-center gap-2 mx-auto font-semibold cursor-pointer"
              >
                <FaGoogle /> Link Google
              </button>
            </div>
          </div>
        )}

        <LeadHeader handleFileUpload={handleFileUpload} fileName={fileName} />
        <LeadCards data={data} />

        <LeadFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          updateFilter={onUpdateFilter}
          resetFilters={onResetFilters}
        />

        {/* Live Socket Status Banner */}
        <AnimatePresence mode="wait">
          {socketNotice.visible && (
            <motion.div
              key={socketNotice.status}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`rounded-2xl border p-5 shadow-xl backdrop-blur-md mb-6 transition-none ${
                socketNotice.status === "success"
                  ? "bg-emerald-50/90 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800"
                  : socketNotice.status === "error"
                    ? "bg-rose-50/90 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800"
                    : socketNotice.status === "warning" ||
                        socketNotice.status === "skipped"
                      ? "bg-amber-50/90 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800"
                      : "bg-blue-50/90 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800" /* Default to Blue */
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        socketNotice.status === "success"
                          ? "bg-emerald-500"
                          : socketNotice.status === "error"
                            ? "bg-rose-500"
                            : socketNotice.status === "warning" ||
                                socketNotice.status === "skipped"
                              ? "bg-amber-500"
                              : "bg-blue-500 animate-pulse"
                      }`}
                    />

                    <h3 className="font-bold text-gray-900 dark:text-white text-sm tracking-tight capitalize">
                      {socketNotice.status}
                    </h3>
                  </div>

                  <p
                    className={`mt-1.5 text-sm font-medium ${
                      socketNotice.status === "success"
                        ? "text-emerald-700 dark:text-emerald-300"
                        : socketNotice.status === "error"
                          ? "text-rose-700 dark:text-rose-300"
                          : socketNotice.status === "warning" ||
                              socketNotice.status === "skipped"
                            ? "text-amber-700 dark:text-amber-300"
                            : "text-blue-700 dark:text-blue-300"
                    }`}
                  >
                    {socketNotice.message}
                  </p>

                  {/* Progress Bar Color Logic */}
                  {socketNotice.total > 0 &&
                    socketNotice.status !== "success" && (
                      <div className="mt-4">
                        <div className="h-1.5 w-full bg-white dark:bg-gray-950 rounded-full overflow-hidden border border-slate-100 dark:border-gray-800">
                          <motion.div
                            initial={false}
                            animate={{
                              width: `${socketNotice.progress}%`,
                              backgroundColor:
                                socketNotice.status === "error"
                                  ? "#f43f5e" // rose-500
                                  : socketNotice.status === "warning"
                                    ? "#f59e0b" // amber-500
                                    : "#3b82f6", // blue-500
                            }}
                            className="h-full"
                          />
                        </div>
                      </div>
                    )}
                </div>

                <button
                  onClick={dismissSocketNotice}
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <svg
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={
              filters.page +
              filters.search +
              filters.status +
              filters.sortBy +
              filters.minScore +
              filters.startDate +
              filters.endDate
            }
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="bg-white shadow-sm dark:bg-gray-900 shadow-text/5 rounded-3xl overflow-hidden border border-slate-100 dark:border-gray-900/90 relative"
              ref={scrollRef}
            >
              {leadsLoading ? (
                <div className="h-30 relative flex items-center justify-center">
                  <div className="w-12 h-12 border-6 border-btn-100/20 border-t-btn-100 rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-center border-separate border-spacing-0">
                      <thead className="bg-slate-50/80 dark:bg-gray-700 sticky top-0 z-10">
                        <tr className="text-slate-500 text-[11px] dark:text-gray-100 uppercase tracking-widest font-bold">
                          <th className="px-6 py-4 border-b">Lead Name</th>
                          <th className="px-6 py-4 border-b">Company</th>
                          <th className="px-6 py-4 border-b">Contacts</th>
                          <th className="px-6 py-4 border-b">Status</th>
                          <th className="px-6 py-4 border-b">Score</th>
                          <th className="px-6 py-4 border-b">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {!isGoogleLinked ? (
                          <tr>
                            <td colSpan="7" className="py-20 text-slate-400">
                              Link your account to manage leads and meetings.
                            </td>
                          </tr>
                        ) : leads.length > 0 ? (
                          leads.map((lead) => (
                            <LeadTable
                              key={lead.id}
                              lead={lead}
                              openDeleteModal={openDeleteModal}
                            />
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="py-20 text-slate-400">
                              No leads found matching your criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="md:hidden space-y-3 p-2">
                    {!isGoogleLinked ? (
                      <div className="py-20 text-slate-400 text-center">
                        Link your account to manage leads and meetings.
                      </div>
                    ) : leads?.length === 0 ? (
                      <div className="py-20 text-slate-400 text-center">
                        No leads found matching your criteria.
                      </div>
                    ) : (
                      leads.map((lead) => (
                        <MobileLeadsView
                          key={lead?.id}
                          lead={lead}
                          openDeleteModal={openDeleteModal}
                        />
                      ))
                    )}
                  </div>

                  {/* Pagination Controls */}
                  <div className="px-6 py-4 bg-slate-50/50 dark:bg-gray-700 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-sm text-slate-500 dark:text-white">
                      Showing page{" "}
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {filters.page}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {pagination.totalPages || 1}
                      </span>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        disabled={filters.page === 1 || isFetching}
                        onClick={() => {
                          handlePageChange(filters.page - 1);
                          scrollToTop();
                        }}
                        className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 bg-white  dark:bg-gray-950 dark:text-white dark:hover:bg-gray-900 cursor-pointer hover:bg-slate-50 disabled:opacity-50 transition-all active:scale-95"
                      >
                        Previous
                      </button>
                      <button
                        disabled={
                          filters.page >= pagination.totalPages || isFetching
                        }
                        onClick={() => {
                          handlePageChange(filters.page + 1);
                          scrollToTop();
                        }}
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
      </div>
      <DeleteDialog
        closeDeleteModal={closeDeleteModal}
        deleteModalRef={deleteModalRef}
        confirmDelete={confirmDelete}
        isDeleting={isDeleting}
      />
    </AnimatedWrapper>
  );
}

export default LeadManagement;
