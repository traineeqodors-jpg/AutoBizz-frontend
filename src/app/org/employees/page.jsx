"use client";

import AnimatedWrapper from "@/components/AnimatedWrapper";
import EmployessHeader from "./components/EmployeesHeader";
import DeleteDialog from "@/components/ui/DeleteDialog";
import { useRef, useState } from "react";
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

function EmployeeManagement() {
  const dialogRef = useRef(null);

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    role: "",
  });
  const [errors, setErrors] = useState({});

  const [searchTerm, setSearchTerm] = useState();

  const deleteModalRef = useRef(null);

  const [createEmp, { isLoading }] = useCreateEmployeeMutation();
  const { data: emp, isLoading: empLoading } = useGetAllEmployeeQuery();
  const [deleteEmployee, { isLoading: deleteLoading }] =
    useDeleteEmployeeMutation();
  const [editEmployee, { isLoading: updateLoading }] =
    useUpdateEmployeeMutation();

  const empData = emp?.data?.employees;

  console.log(empData);

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

    console.log("submitted", input);

    try {
      const response = await createEmp(input).unwrap();
      console.log(response);
      toast.success(response?.message);
      dialogRef?.current?.close();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  // Modal Handlers
  const openDeleteModal = () => {
    deleteModalRef.current?.showModal();
  };

  const closeDeleteModal = () => {
    deleteModalRef.current?.close();
  };

  const confirmDelete = async () => {
    toast.success("Deleted Successfully!!");
  };

  if (empLoading) {
    return null;
  }

  return (
    <AnimatedWrapper>
      <div className="min-h-screen mx-auto space-y-6 w-full py-3 sm:py-6 lg:py-8 relative">
        <EmployessHeader
          dialogRef={dialogRef}
          input={input}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

        <EmployeeFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

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
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-center border-separate border-spacing-0">
                    <thead className="bg-slate-50/80 dark:bg-gray-700 sticky top-0 z-10">
                      <tr className="text-slate-500 text-[11px] dark:text-gray-100 uppercase tracking-widest font-bold">
                        <th className="px-6 py-4 border-b">Employee Name</th>
                        <th className="px-6 py-4 border-b">Contacts</th>
                        <th className="px-6 py-4 border-b">Role</th>
                        <th className="px-6 py-4 border-b">Status</th>
                        <th className="px-6 py-4 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {empData && empData.length > 0 ? (
                        empData.map((emp) => (
                          <EmployeeTable
                            key={emp._id || emp.id}
                            emp={emp}
                            openDeleteModal={openDeleteModal}
                          />
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="py-10 text-slate-500">
                            No employees found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

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
                    <div className="text-center py-10 text-gray-500">
                      No employees found.
                    </div>
                  )}
                </div>
              </>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <DeleteDialog
        closeDeleteModal={closeDeleteModal}
        deleteModalRef={deleteModalRef}
        confirmDelete={confirmDelete}
      />
    </AnimatedWrapper>
  );
}

export default EmployeeManagement;
