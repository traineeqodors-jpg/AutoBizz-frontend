import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { motion } from "framer-motion";

const AddEmployeeDialog = ({
  dialogRef,
  input,
  handleChange,
  handleSubmit,
  errors,
  createLoading,
}) => {
  return (
    <>
      <dialog
        ref={dialogRef}
        className="w-lg rounded-3xl bg-back dark:bg-gray-900 m-auto p-5 backdrop:bg-black/40 dark:backdrop:bg-gray-700/40 space-y-5"
      >
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          {/* Form  */}
          <form onSubmit={handleSubmit} className="w-full space-y-6 p-2">
            {/* Heading Container */}
            <div className="w-full flex flex-row-reverse">
              <button
                type="button"
                onClick={() => {
                  dialogRef.current?.close();
                }}
              >
                <IoCloseSharp className="text-black dark:text-white size-4 cursor-pointer" />
              </button>
            </div>
            <div className="text-center mb-8">
              <h1 className="text-xl sm:text-3xl font-bold text-text dark:text-white tracking-tight">
                Add Employees
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Please enter Employee Details
              </p>
            </div>

            {/* Name Fields */}
            <div className="flex flex-col lg:flex-row gap-3">
              {/* First Name */}
              <div className="space-y-2 flex-1">
                <label
                  htmlFor="firstName"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-400 ml-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={input.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className={`w-full py-3 px-4 text-text rounded-xl border border-gray-200 m-0 ${
                    errors.firstName
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-200 dark:border-gray-700"
                  } bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-200 outline-none transition-all`}
                />
                {/* Error Message */}
                {errors.firstName && (
                  <span className="text-red-500 text-[10px] font-bold ml-1 uppercase">
                    {errors.firstName}
                  </span>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-2 flex-1">
                <label
                  htmlFor="lastName"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-400 ml-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={input.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className={`w-full py-3 px-4 text-text rounded-xl border border-gray-200 m-0 ${
                    errors.lastName
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-200 dark:border-gray-700"
                  } bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-200 outline-none transition-all`}
                />
                {/* Error Message */}
                {errors.lastName && (
                  <span className="text-red-500 text-[10px] font-bold ml-1 uppercase">
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700 dark:text-gray-400 ml-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                placeholder="hello@example.com"
                className={`w-full py-3 px-4 text-text rounded-xl border border-gray-200 m-0 ${
                  errors.email
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-200 dark:border-gray-700"
                } bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-200 outline-none transition-all`}
              />
              {/* Error Message */}
              {errors.email && (
                <span className="text-red-500 text-[10px] font-bold ml-1 uppercase">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Role & Phone */}
            <div className="flex flex-col lg:flex-row  gap-3">
              {/* Role */}
              <div className="space-y-2 flex-1">
                <label
                  htmlFor="role"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-400 ml-1"
                >
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  value={input.role || ""}
                  onChange={handleChange}
                  className={`w-full py-3 px-4 rounded-xl border m-0 outline-none transition-all focus:ring-2 focus:ring-btn-200 ${!input.role ? "text-gray-400/90" : "text-text"} ${errors.role ? "border-red-500 dark:border-red-500" : "border-gray-200 dark:border-gray-700"} bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700`}
                >
                  <option value="" disabled className="text-gray-400">
                    - Role -
                  </option>
                  <option value="employee">Employee</option>
                  <option value="sales">Sales</option>
                </select>
              </div>

              {/* Phone */}
              <div className="space-y-2 flex-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-400 ml-1"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={input.phone}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className={`w-full py-3 px-4 text-text rounded-xl border border-gray-200 m-0 ${
                    errors.phone
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-200 dark:border-gray-700"
                  } bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-200 outline-none transition-all`}
                />
                {/* Error Message */}
                {errors.phone && (
                  <span className="text-red-500 text-[10px] font-bold ml-1 uppercase">
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>

            <button
              disabled={createLoading}
              type="submit"
              className={`${createLoading ? "bg-gray-400 cursor-not-allowed" : "bg-btn-100 hover:bg-btn-200"} w-full py-3 text-white font-bold rounded-xl shadow-lg shadow-btn-50/30 hover:shadow-lg hover:shadow-btn-100/40 transform hover:-translate-y-0.5 transition-all cursor-pointer`}
            >
              {createLoading ? "Sending..." : "Send Link"}
            </button>
          </form>
        </motion.div>
      </dialog>
    </>
  );
};

export default AddEmployeeDialog;
