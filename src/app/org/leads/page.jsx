"use client";

import DeleteDialog from "@/components/ui/DeleteDialog";
import {
  leadsApi,
  useAddLeadCsvMutation,
  useCallSelectedLeadsMutation,
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
import ReusableTable from "@/components/ui/ReusableTable";
import { getSocket } from "@/lib/socket";

import tourData from "../../../Json data/tourData.json";
import { startTour } from "@/features/slices/tourSlice";

function LeadManagement() {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState(new Set());

  const [input, setInput] = useState({
    name: "",
    companyName: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

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

  const [addLead, { isLoading: addingLeads }] = useAddLeadCsvMutation();
  const [callSelectedLeads, { isLoading: callingSelectedLeads }] =
    useCallSelectedLeadsMutation();
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

  const hasData = data?.data?.hasAnyData !== false;
  const canGoNext = hasData;

  const { data: me } = useGetMeQuery();

  const orgId = me?.data?.orgId || me?.data?.id;

  const leads = data?.data?.leads || [];
  const hasFilters = data?.data?.hasFilters;
  const hasAnyData = data?.data?.hasAnyData;

  const pagination = data?.data?.pagination || { totalPages: 1, totalItems: 0 };

  const toggleSelectLead = (id) => {
    setSelectedLeads((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const clearSelection = () => setSelectedLeads(new Set());

  const isAllSelected =
    leads?.length > 0 && leads.every((l) => selectedLeads.has(l.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      clearSelection();
    } else {
      setSelectedLeads(new Set(leads.map((l) => l.id)));
    }
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const phonePattern = /^\+?\d*$/;
      const digitsOnly = value.replace(/\D/g, "");
      if (!phonePattern.test(value) || digitsOnly.length > 15) return;
    }
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    // Name validation
    const nameRegex = /^[a-zA-Z0-9 ]+$/;
    if (!input.name.trim()) {
      newErrors.name = "Name is required";
    } else if (input.name.length < 2) {
      newErrors.name = "must be atleast 2 Character Long!";
    } else if (!isNaN(input.name) || !nameRegex.test(input.name)) {
      newErrors.name = "Invalid Name!";
    }

    // Comapnay Name validation
    if (!input.companyName.trim()) {
      newErrors.companyName = "Company Name is required";
    } else if (input.companyName.length < 2) {
      newErrors.companyName = "must be atleast 2 Character Long!";
    } else if (
      !isNaN(input.companyName) ||
      !nameRegex.test(input.companyName)
    ) {
      newErrors.companyName = "Invalid Name!";
    }

    // Phone Number Validation
    if (!input.phone.trim()) {
      newErrors.phone = "Number is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(input.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const response = await addLead(input).unwrap();
      console.log(response);
      toast.success(response?.message);
      setOpenModal(false);
      setInput({
        name: "",
        companyName: "",
        phone: "",
        email: "",
      });
    } catch (error) {
      toast.error(error?.data?.message || "Error Occured!!");
    }
  };

  const handleCallSelectedLeads = async (e) => {
    const selected = Array.from(selectedLeads);

    if (selected.length > 3) {
      toast.error("You can only call 3 leads at a time.");
      return;
    }

    try {
      const response = await callSelectedLeads(selected).unwrap();
      toast.success(`Successfully initialized calling leads!`);
      setSelectedLeads(new Set());
      setIsSelectionMode(false);
    } catch (error) {
      toast.error("Failed to call.");
    }
  };

  const onUpdateFilter = (name, value) => {
    if (name === "minScore") {
      if (value < 0 || value > 100) return;
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
        const response = await addLead(formData).unwrap();
        toast.success(response?.message);
        setHasData(true);
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

  const userOnboarding = me?.data?.onboarding?.leads;

  const shouldStart = userOnboarding?.status === "pending";

  useEffect(() => {
    if (tourData?.myDocuments && me && shouldStart) {
      dispatch(
        startTour({
          tourKey: "leads",
          steps: tourData.leads,
          stepIndex: userOnboarding?.lastStep ?? 0,
          run: true,
        }),
      );
    }
  }, [dispatch, me, shouldStart, userOnboarding?.lastStep]);

  useEffect(() => {
    if (!orgId) return;

    const socket = getSocket(me?.data);

    const orgKey = String(orgId);
    const batchKey = `batch-update-${orgKey}`;
    const scoreKey = `lead-scored-${orgKey}`;

    const clearAutoHide = () => {
      if (hideNoticeTimerRef.current) {
        clearTimeout(hideNoticeTimerRef.current);
        hideNoticeTimerRef.current = null;
      }
    };

    const batchHandler = (data) => {
      clearAutoHide();

      const progress = data?.total
        ? Math.min(100, Math.round((data.current / data.total) * 100))
        : 0;

      const baseState = {
        visible: true,
        current: data.current || 0,
        total: data.total || 0,
        progress,
        updatedAt: new Date().toLocaleTimeString(),
      };

      if (data.status === "success") {
        setSocketNotice({
          ...baseState,
          status: "success",
          title: "Batch completed",
          message: data.message,
          progress: 100,
        });

        dispatch(leadsApi.util.invalidateTags(["Leads"]));

        hideNoticeTimerRef.current = setTimeout(() => {
          setSocketNotice((prev) => ({ ...prev, visible: false }));
        }, 3000);

        return;
      }

      if (data.status === "processing") {
        setSocketNotice({
          ...baseState,
          status: "processing",
          title: "Processing leads",
          message: data.message,
        });
        return;
      }

      if (data.status === "warning") {
        setSocketNotice({
          ...baseState,
          status: "warning",
          title: "Warning",
          message: data.message,
        });
        return;
      }

      if (data.status === "error") {
        setSocketNotice({
          ...baseState,
          status: "error",
          title: "Batch failed",
          message: data.message,
        });
        return;
      }
    };

    const scoreHandler = (data) => {
      clearAutoHide();

      setSocketNotice({
        visible: true,
        status: "success",
        title: "Lead scores updated",
        message: data?.message,
        progress: 100,
        updatedAt: new Date().toLocaleTimeString(),
      });

      dispatch(leadsApi.util.invalidateTags(["Leads"]));

      hideNoticeTimerRef.current = setTimeout(() => {
        setSocketNotice((prev) => ({ ...prev, visible: false }));
      }, 2500);
    };

    socket.on(batchKey, batchHandler);
    socket.on(scoreKey, scoreHandler);

    return () => {
      clearAutoHide();
      socket.off(batchKey, batchHandler);
      socket.off(scoreKey, scoreHandler);
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

        <LeadHeader
          openModal={openModal}
          setOpenModal={setOpenModal}
          input={input}
          setInput={setInput}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleFileUpload={handleFileUpload}
          fileName={fileName}
          setFileName={setFileName}
        />

        <LeadFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          updateFilter={onUpdateFilter}
          resetFilters={onResetFilters}
          disabled={!hasAnyData}
          canGoNext={canGoNext}
        />
        <LeadCards
          data={data}
          handleCallSelectedLeads={handleCallSelectedLeads}
          onSelectLeadsClick={() => {
            setIsSelectionMode(true);
            setTimeout(() => {
              scrollRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
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
              id="lead-data"
              className="bg-white shadow-sm dark:bg-gray-900 shadow-text/5 rounded-3xl overflow-hidden border border-slate-100 dark:border-gray-900/90 relative"
              ref={scrollRef}
            >
              {leadsLoading ? (
                <div className="h-30 relative flex items-center justify-center">
                  <div className="w-12 h-12 border-6 border-btn-100/20 border-t-btn-100 rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  <ReusableTable
                    columns={[
                      "Lead Name",
                      "Company",
                      "Contacts",
                      "Status",
                      "Score",
                      "Actions"

                    ]}
                    data={isGoogleLinked ? leads : []}
                    renderRow={(lead) => (
                      <LeadTable
                        key={lead.id}
                        lead={lead}
                        openDeleteModal={openDeleteModal}
                        isSelectionMode={isSelectionMode}
                        isSelected={selectedLeads.has(lead.id)}
                        onSelect={toggleSelectLead}
                      />
                    )}
                    emptyState={
                      !isGoogleLinked
                        ? "Link your account to manage leads and meetings."
                        : "No leads found matching your criteria."
                    }
                  />

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
                          isSelectionMode={isSelectionMode}
                          isSelected={selectedLeads.has(lead.id)}
                          onSelect={toggleSelectLead}
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
                  {isSelectionMode && (
                    <div className="fixed z-50 bg-white dark:bg-gray-900 border shadow-2xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between bottom-0 left-0 w-full rounded-none sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-175 sm:max-w-[90%] sm:rounded-2xl">
                      <div className="text-sm font-medium dark:text-white">
                        {selectedLeads.size} leads selected
                      </div>
                      <div className="flex sm:flex-row flex-col items-center gap-3">
                        <button
                          onClick={handleCallSelectedLeads}
                          disabled={selectedLeads.size === 0}
                          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 cursor-pointer rounded-xl font-semibold disabled:opacity-50"
                        >
                          Call Now
                        </button>

                        <button
                          onClick={() => {
                            setIsSelectionMode(false);
                            setSelectedLeads(new Set());
                          }}
                          className="text-text hover:text-black cursor-pointer dark:hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
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
