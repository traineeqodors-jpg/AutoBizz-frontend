"use client";

import AnimatedWrapper from "@/components/AnimatedWrapper";
import EmployessHeader from "./components/EmployeesHeader";
import DeleteDialog from "@/components/ui/DeleteDialog";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmployeeFilter from "./components/EmployeeFilter";
import EmployeeTable from "./components/EmployeeTable";
import MobileEmployeeView from "./components/MobileEmployeeView";
import toast from "react-hot-toast";
import {
  useCreateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetAllEmployeeQuery,
  useUpdateEmployeeMutation,
} from "@/features/slices/employeeSlice";
import ReusableTable from "@/components/ui/ReusableTable";

function EmployeeManagement() {
  const [openModal, setOpenModal] = useState(false);

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [targetEmp, setTargetEmp] = useState(null);

  const deleteModalRef = useRef(null);

  // Pass filters directly to the query
  const {
    data: emp,
    isLoading: empLoading,
    isFetching: empFetching,
    isError,
    refetch,
  } = useGetAllEmployeeQuery(
    {
      search: debouncedSearch || undefined,
      role: roleFilter || undefined,
      page: page,
      limit: 10,
    },
    
  );

  const [createEmp, { isLoading: createLoading }] = useCreateEmployeeMutation();

  const [deleteEmployee, { isLoading: deleteLoading }] =
    useDeleteEmployeeMutation();

  const [editEmployee, { isLoading: updateLoading }] =
    useUpdateEmployeeMutation();
  const hasData = emp?.data?.hasAnyData !== false;
  const canGoNext = hasData;
  const empData = isError ? [] : emp?.data?.employees || [];
  const pagination = emp?.data?.pagination;
  const hasFilters = emp?.data?.hasFilters;
  const hasAnyData = emp?.data?.hasAnyData ?? true;

  // Wait 500ms after the user stops typing to update debouncedSearch
  useEffect(() => {
    if (!hasAnyData) return;

    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, hasAnyData]);

  // Logic to change page
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to page 1 whenever search or role changes
  // useEffect(() => {
  //   setPage(1);
  // }, [debouncedSearch, roleFilter]);

  // Clear filters handler
  const handleClearFilters = () => {
    setSearchTerm("");
    setRoleFilter("");
    setPage(1);
  };

  //   Handling Input Chnage
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      (name === "phone" && isNaN(value)) ||
      (name === "phone" && value.length > 10)
    )
      return;
    setInput({ ...input, [name]: value });
  };

  //   Handling Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    // First Name validation
    const nameRegex = /^[a-zA-Z0-9 ]+$/;
    if (!input.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    } else if (input.firstName.length < 2) {
      newErrors.firstName = "must be atleast 2 Character Long!";
    } else if (!isNaN(input.firstName) || !nameRegex.test(input.firstName)) {
      newErrors.firstName = "Invalid Name!";
    }

    // Last Name validation
    if (!input.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    } else if (input.lastName.length < 2) {
      newErrors.lastName = "must be atleast 2 Character Long!";
    } else if (!isNaN(input.lastName) || !nameRegex.test(input.lastName)) {
      newErrors.lastName = "Invalid Name!";
    }

    // Country Validation
    if (!input.role.trim()) {
      newErrors.role = "Role is required";
    }

    // Phone Number Validation
    if (!input.phone.trim()) {
      newErrors.phone = "Number is required";
    } else if (isNaN(input.phone)) {
      newErrors.phone = "Enter valid phone number!";
    } else if (input.phone.length < 10) {
      newErrors.phone = "Phone Number must be 10 Digits Long";
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
      const response = await createEmp(input).unwrap();
      console.log(response);
      toast.success(response?.message);
      setHasData(true);
      setOpenModal(false);
      setInput({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        role: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Error Occured!!");
    }
  };

  // Modal Handlers
  const openDeleteModal = (id) => {
    setTargetEmp(id);
    deleteModalRef.current?.showModal();
  };

  const closeDeleteModal = () => {
    deleteModalRef.current?.close();
  };

  const confirmDelete = async () => {
    if (!targetEmp) return;
    try {
      const response = await deleteEmployee(targetEmp).unwrap();
      toast.success(response?.message);
      closeDeleteModal();
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message);
    }
  };

  return (
    <AnimatedWrapper>
      <div className="min-h-screen mx-auto space-y-6 w-full py-3 sm:py-6 lg:py-8 relative">
        <EmployessHeader
          openModal={openModal}
          setOpenModal={setOpenModal}
          input={input}
          setInput={setInput}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          createLoading={createLoading}
        />

        <EmployeeFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          handleClearFilters={handleClearFilters}
          canGoNext={canGoNext}
        />

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-surface shadow-sm shadow-text/5 rounded-3xl overflow-hidden border border-slate-100 dark:border-gray-900/90 relative">
              <>
                {/* Show a spinner only over the table area while searching */}
                {empLoading || empFetching ? (
                  <div className="h-30 relative flex items-center justify-center">
                    <div className="w-12 h-12 border-6 border-btn-100/20 border-t-btn-100 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <>
                    <ReusableTable
                      columns={[
                        "Employee Name",
                        "Contacts",
                        "Role",
                        "Status",
                        "Actions",
                      ]}
                      data={empData}
                      renderRow={(emp) => (
                        <EmployeeTable
                          key={emp.id}
                          emp={emp}
                          openDeleteModal={openDeleteModal}
                          refetch={refetch}
                        />
                      )}
                      emptyState={
                        <div className="flex flex-col items-center gap-2 py-10">
                          {!hasAnyData ? (
                            <>
                              <span>No employees yet.</span>
                              <button
                                onClick={() => setOpenModal(true)}
                                className="text-btn-100 underline cursor-pointer"
                              >
                                Add your first employee
                              </button>
                            </>
                          ) : hasFilters ? (
                            <>
                              <span>No results match your filters.</span>
                              <button
                                onClick={handleClearFilters}
                                className="text-btn-100 underline"
                              >
                                Clear filters
                              </button>
                            </>
                          ) : (
                            <span>No employees found.</span>
                          )}
                        </div>
                      }
                    />
                    {/* Mobile View */}
                    <div className="md:hidden space-y-3 p-2">
                      {empData?.length > 0 ? (
                        empData.map((emp) => (
                          <MobileEmployeeView
                            key={emp._id || emp.id}
                            emp={emp}
                            openDeleteModal={openDeleteModal}
                          />
                        ))
                      ) : (
                        <div className="text-center py-10 text-gray-500 flex flex-col items-center justify-center gap-2">
                          No employees found.
                          {hasFilters && (
                            <button
                              onClick={handleClearFilters}
                              className="text-btn-100 text-sm underline cursor-pointer"
                            >
                              Clear filters
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    {/* Pagination Controls */}
                    <div className="px-6 py-4 bg-slate-50/30 dark:bg-gray-700 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-text/40 dark:text-white uppercase ">
                        Page {pagination?.currentPage || 1} of{" "}
                        {pagination?.totalPages || 1}
                      </span>

                      <div className="flex gap-2">
                        <button
                          disabled={page === 1 || empLoading}
                          onClick={() => handlePageChange(page - 1)}
                          className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 bg-white dark:bg-gray-950 dark:text-white disabled:opacity-50 cursor-pointer hover:bg-slate-50 transition-all active:scale-95"
                        >
                          Prev
                        </button>

                        <button
                          disabled={
                            page >= (pagination?.totalPages || 1) || empLoading
                          }
                          onClick={() => handlePageChange(page + 1)}
                          className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 bg-white dark:bg-gray-950 dark:text-white disabled:opacity-50 cursor-pointer hover:bg-slate-50 transition-all active:scale-95"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <DeleteDialog
        closeDeleteModal={closeDeleteModal}
        deleteModalRef={deleteModalRef}
        confirmDelete={confirmDelete}
        isDeleting={deleteLoading}
      />
    </AnimatedWrapper>
  );
}

export default EmployeeManagement;
