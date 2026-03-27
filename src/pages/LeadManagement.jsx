import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import LeadHeader from "../components/leads/LeadHeader";
import MobileLeadsView from "../components/leads/MobileLeadsView";
import LeadTable from "../components/leads/LeadTable";
import LeadCards from "../components/leads/LeadCards";
import {
  leadsApi,
  useAddLeadCsvMutation,
  useGetAllLeadsQuery,
} from "../features/slices/leadSlice";
import LeadFilter from "../components/leads/LeadFilter";
import { useGetMeQuery } from "../features/slices/orgSlice";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";

function LeadManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const hideNoticeTimerRef = useRef(null);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    minScore: "",
    startDate: "",
    endDate: "",
    sortBy: "createdAt",
    order: "DESC",
  });

  const [socketNotice, setSocketNotice] = useState({
    visible: false,
    status: "idle", // idle | processing | success | error
    title: "",
    message: "",
    current: 0,
    total: 0,
    progress: 0,
    updatedAt: null,
  });

  // Debounce Search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm, page: 1 }));
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const {
    data,
    isLoading: leadsLoading,
    isFetching,
  } = useGetAllLeadsQuery(filters, {
    skip: !localStorage.getItem("isLoggedIn"),
  });

  const { data: me } = useGetMeQuery(undefined, {
    skip: !localStorage.getItem("isLoggedIn"),
  });

  const orgId = me?.data?.id;

  const [uploadCSV, { isLoading: isUploading }] = useAddLeadCsvMutation();
  const [fileName, setFileName] = useState("");

  const leads = data?.data?.leads || [];
  const pagination = data?.data?.pagination || { totalPages: 1, totalItems: 0 };
  const shouldShowPagination = pagination?.totalPages > 1;

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await uploadCSV(formData).unwrap();
        toast.success(response?.message || "Import successful");
      } catch (error) {
        toast.error(error?.data?.message || "Upload failed");
      }
    }
  };

  const updateFilter = (e) => {
    const { name, value } = e.target;

    if (name === "minScore" && value !== "" && (Number(value) < 0 || Number(value) > 100)) {
      return;
    }

    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      page: 1,
      limit: 10,
      search: "",
      status: "",
      minScore: "",
      startDate: "",
      endDate: "",
      sortBy: "createdAt",
      order: "DESC",
    });
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
          message: data.message || "Your leads have been imported successfully.",
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
        message: data.message || "Your file is being processed in the background.",
        current: data.current || 0,
        total: data.total || 0,
        progress,
        updatedAt: new Date().toLocaleTimeString(),
      });
    });

    socket.on(scoreKey, (data) => {
      console.log("📩 Received Score Update:", data);

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
    <div className="min-h-screen bg-gray-50 w-full p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <LeadHeader
          handleFileUpload={handleFileUpload}
          fileName={fileName}
          isUploading={isUploading}
        />

        <LeadCards data={data} />

        <LeadFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          resetFilters={resetFilters}
          updateFilter={updateFilter}
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
                      <div className="h-2 w-full bg-white rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-300"
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

        {/* Table Area */}
        <div className="bg-white shadow-2xl shadow-gray-200/50 rounded-3xl overflow-hidden border border-gray-100 relative">
          {isFetching && !leadsLoading && (
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 overflow-hidden z-10">
              <div className="h-full bg-btn-100 w-1/3 animate-[loading_1.5s_infinite_linear]"></div>
            </div>
          )}

          {leadsLoading ? (
            <div className="flex flex-col justify-center items-center h-80 space-y-4">
              <div className="w-10 h-10 border-4 border-gray-100 border-t-btn-100 rounded-full animate-spin"></div>
              <p className="text-gray-400 text-sm font-medium">
                Loading leads...
              </p>
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-center border-separate border-spacing-0">
                  <thead className="bg-gray-50">
                    <tr className="text-gray-400 text-[11px] uppercase tracking-widest font-black">
                      <th className="px-6 py-5 border-b border-gray-100">
                        Lead Details
                      </th>
                      <th className="px-6 py-5 border-b border-gray-100">
                        Company
                      </th>
                      <th className="px-6 py-5 border-b border-gray-100">
                        Contact
                      </th>
                      <th className="px-6 py-5 border-b border-gray-100">
                        Status
                      </th>
                      <th className="px-6 py-5 border-b border-gray-100">
                        Score
                      </th>
                      <th className="px-6 py-5 border-b border-gray-100 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.length > 0 ? (
                      leads.map((lead) => (
                        <LeadTable key={lead.id} lead={lead} />
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="py-20 text-gray-400 font-medium"
                        >
                          No results found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden">
                <MobileLeadsView leads={leads} />
              </div>

              {shouldShowPagination && (
                <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm font-bold text-gray-900">
                    Page {filters.page}{" "}
                    <span className="text-gray-400 font-medium">
                      of {pagination.totalPages || 1}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      disabled={filters.page === 1 || isFetching}
                      onClick={() => handlePageChange(filters.page - 1)}
                      className="px-6 py-2.5 text-sm font-bold rounded-xl border border-gray-200 bg-white text-gray-600 disabled:opacity-50 transition-all hover:bg-gray-50 active:scale-95"
                    >
                      Previous
                    </button>
                    <button
                      disabled={
                        filters.page >= pagination.totalPages || isFetching
                      }
                      onClick={() => handlePageChange(filters.page + 1)}
                      className="px-6 py-2.5 text-sm font-bold rounded-xl bg-gray-900 text-white disabled:bg-gray-200 transition-all active:scale-95 shadow-lg shadow-gray-200"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}

export default LeadManagement;