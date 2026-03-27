import { useState, useEffect, useRef } from "react";
import LeadHeader from "../components/leads/LeadHeader";
import MobileLeadsView from "../components/leads/MobileLeadsView";
import LeadTable from "../components/leads/LeadTable";
import {
  useAddLeadCsvMutation,
  useDeleteLeadMutation,
  useGetAllLeadsQuery,
} from "../features/slices/leadSlice";
import LeadCards from "../components/leads/LeadCards";
import { toast } from "react-toastify";
import DeleteDialog from "../components/Dialog/DeleteDialog";
import LeadFilter from "../components/leads/LeadFilter";
import { useGetMeQuery } from "../features/slices/orgSlice";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";
import { motion} from "framer-motion"
 
function LeadManagement() {
  // 1. Local states for UI and API params
  const [uploadCSV, { isLoading }] = useAddLeadCsvMutation();
 
  const { data: user } = useGetMeQuery();
 
  const isGoogleLinked = !!user?.data?.googleRefreshToken;
 
  const [deleteLead, { isLoading: isDeleting }] = useDeleteLeadMutation();
 
  const [fileName, setFileName] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // For immediate input typing
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
 
  const [deleteTarget, setDeleteTarget] = useState(null);
  const deleteModalRef = useRef(null);
  const scrollRef = useRef(null);
 
  // Debounce Search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchTerm, page: 1 }));
    }, 700);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
 
  // Get Data RTK Query Hook
  const {
    data,
    isLoading: leadsLoading,
    isFetching,
  } = useGetAllLeadsQuery(filters, {
    skip: !isGoogleLinked,
  });
 
  const leads = data?.data?.leads || [];
 
  const pagination = data?.data?.pagination || { totalPages: 1, totalItems: 0 };
 
  // scroll function
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
 
  // On change Filter
  const updateFilter = (e) => {
    const { name, value } = e.target;
 
    if ((name === "minScore" && value < 0) || value > 100) {
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
 
  // File Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
 
    if (file) {
      setFileName(file.name);
      console.log("File selected:", file.name);
      const formData = new FormData();
      formData.append("file", file);
 
      console.log(formData.get("file"));
 
      try {
        const response = await uploadCSV(formData).unwrap();
        toast.success(response?.message);
      } catch (error) {
        console.log(error);
 
        toast.error(error?.data?.message);
      }
    }
  };
 
  // Open Delete Modal
  const openDeleteModal = (leadId) => {
    setDeleteTarget(leadId);
    deleteModalRef.current?.showModal();
  };
 
  //close delete modal
  const closeDeleteModal = () => {
    deleteModalRef.current?.close();
    setDeleteTarget(null);
  };
 
  //handle delete
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
 
  // Login with google
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        console.log("Send this to BackEnd : ", response.code);
        const res = await googleToken(response.code).unwrap();
        toast.success(res?.message);
      } catch (error) {
        toast.error(error?.data?.message);
      }
    },
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/calendar.events",
    onError: (error) => {
      console.log(error);
    },
  });
 
  return (
     <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-back w-full p-3 sm:p-6 lg:p-8"
        >
    <div
      className={`min-h-screen bg-back w-full p-3 sm:p-6 lg:p-8 font-sans relative`}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* If Not Connceted to Google */}
        {!isGoogleLinked && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-md p-2">
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center border border-gray-100">
              <h2 className="text-xl font-bold mb-2">
                Google Calendar Required
              </h2>
              <p className="text-gray-600 mb-6">
                Link your account to manage leads and meetings.
              </p>
              <button
                onClick={handleGoogleLogin}
                className="bg-btn-100 text-white px-6 py-3 rounded-xl flex items-center gap-2 mx-auto font-semibold tracking-wide cursor-pointer"
              >
                <FaGoogle /> Link Google
              </button>
            </div>
          </div>
        )}
 
        <LeadHeader handleFileUpload={handleFileUpload} fileName={fileName} />
        <LeadCards data={data} />
 
        {/* Filters & Search Section */}
        <LeadFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          updateFilter={updateFilter}
          resetFilters={resetFilters}
        />
 
        {/* Main Content Area */}
        <div
          className="bg-white shadow-xl shadow-text/5 rounded-2xl overflow-hidden border border-slate-100 relative"
          ref={scrollRef}
        >
          {/* show loading when refetching */}
          {isFetching && !leadsLoading && (
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/20 overflow-hidden">
              <div className="h-full bg-blue-500"></div>
            </div>
          )}
 
          {leadsLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="loader"></div>
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-center border-separate border-spacing-0">
                  <thead className="bg-slate-50/80 sticky top-0 z-10">
                    <tr className="text-slate-500 text-[11px] uppercase tracking-widest font-bold">
                      <th className="px-6 py-4 border-b">Lead Name</th>
                      <th className="px-6 py-4 border-b">Company</th>
                      <th className="px-6 py-4 border-b">Contacts</th>
                      <th className="px-6 py-4 border-b">Status</th>
                      <th className="px-6 py-4 border-b">Score</th>
                      <th className="px-6 py-4 border-b text-right">Actions</th>
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
                    <MobileLeadsView key={lead?.id} lead={lead} />
                  ))
                )}
              </div>
 
              {/* Pagination Controls */}
              <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-sm text-slate-500">
                  Showing page{" "}
                  <span className="font-semibold text-slate-900">
                    {filters.page}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-900">
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
                    className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 transition-all active:scale-95"
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
                    className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 transition-all active:scale-95"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <DeleteDialog
        closeDeleteModal={closeDeleteModal}
        deleteModalRef={deleteModalRef}
        confirmDelete={confirmDelete}
        isDeleting={isDeleting}
      />
    </div>
    </motion.div>
  );
}
 
export default LeadManagement;
 
 