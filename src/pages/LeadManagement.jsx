import { useState, useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast"
import { useGoogleLogin } from "@react-oauth/google";
import { io } from "socket.io-client";

import LeadHeader from "../components/Leads/LeadHeader";
import MobileLeadsView from "../components/Leads/MobileLeadsView";
import LeadTable from "../components/Leads/LeadTable";
import LeadCards from "../components/Leads/LeadCards";
import LeadFilter from "../components/Leads/LeadFilter";
import DeleteDialog from "../components/Dialog/DeleteDialog";

import {
  leadsApi,
  useAddLeadCsvMutation,
  useDeleteLeadMutation,
  useGetAllLeadsQuery,
} from "../features/slices/leadSlice";
import {
  useGetMeQuery,
  useGoogleTokenMutation,
} from "../features/slices/orgSlice";
import {
  updateFilters,
  resetFilters as resetFiltersAction,
} from "../features/extraSlices/leadFilterSlice";

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

  const { data: me } = useGetMeQuery(undefined, {
    skip: !localStorage.getItem("isLoggedIn"),
  });

  const orgId = me?.data?.id;

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
    dispatch(resetFiltersAction());
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
    scope: "https://googleapis.com",
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

    const socket = io(import.meta.env.VITE_BACKEND_URL, {
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
      console.log("📩 Received Batch Data:", data);

      clearAutoHide();

      const progress = data?.total
        ? Math.min(100, Math.round((data.current / data.total) * 100))
        : 0;

      if (data.status === "completed") {
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

      if (data.status === "failed") {
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

      // processing
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      className="min-h-screen w-full p-3 sm:p-6 lg:p-8 relative"
    >
      <div className="max-w-7xl mx-auto space-y-6">
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
        {socketNotice.visible && (
          <div
            className={`rounded-2xl border p-4 shadow-sm transition-all duration-300 ${
              socketNotice.status === "processing"
                ? "bg-blue-50 border-blue-200"
                : socketNotice.status === "success"
                  ? "bg-green-50 border-green-200"
                  : socketNotice.status === "error"
                    ? "bg-red-50 border-red-200"
                    : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      socketNotice.status === "processing"
                        ? "bg-blue-500 animate-pulse"
                        : socketNotice.status === "success"
                          ? "bg-green-500"
                          : "bg-red-500"
                    }`}
                  />
                  <h3 className="font-bold text-gray-900">
                    {socketNotice.title}
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-500 uppercase tracking-wide">
                    Live
                  </span>
                </div>

                <p className="mt-1 text-sm text-gray-600">
                  {socketNotice.message}
                </p>

                {socketNotice.status === "processing" &&
                  socketNotice.total > 0 && (
                    <div className="mt-3">
                      <div className="h-2 w-full bg-white dark:bg-gray-800 dark:text-white rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 dark:bg-gray-800 transition-all duration-300"
                          style={{ width: `${socketNotice.progress}%` }}
                        />
                      </div>

                      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                        <span>
                          {socketNotice.current} / {socketNotice.total}
                        </span>
                        <span>{socketNotice.progress}%</span>
                      </div>
                    </div>
                  )}

                {socketNotice.updatedAt && (
                  <p className="mt-2 text-[11px] text-gray-400">
                    Updated at {socketNotice.updatedAt}
                  </p>
                )}
              </div>

              <button
                onClick={dismissSocketNotice}
                className="text-sm text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={JSON.stringify(memoizedFilters)}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="bg-white shadow-xl dark:bg-gray-900 rounded-2xl overflow-hidden border border-slate-100 relative"
              ref={scrollRef}
            >
              {leadsLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="loader"></div>
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
                          <th className="px-6 py-4 border-b text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {!isGoogleLinked ? (
                          <tr>
                            <td colSpan="7" className="py-20 text-slate-400">
                              Link your account to see leads.
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
                              No leads found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="md:hidden space-y-3 p-2">
                    {leads.map((lead) => (
                      <MobileLeadsView
                        key={lead?.id}
                        lead={lead}
                        openDeleteModal={openDeleteModal}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="px-6 py-4 bg-slate-50/50 dark:bg-gray-700 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-sm text-slate-500 dark:text-white">
                      Showing page{" "}
                      <span className="font-semibold">{filters.page}</span> of{" "}
                      <span className="font-semibold">
                        {pagination.totalPages}
                      </span>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        disabled={filters.page === 1 || isFetching}
                        onClick={() => {
                          handlePageChange(filters.page - 1);
                          scrollToTop();
                        }}
                        className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50  active:scale-95"
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
                        className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50  active:scale-95"
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
    </motion.div>
  );
}

export default LeadManagement;
