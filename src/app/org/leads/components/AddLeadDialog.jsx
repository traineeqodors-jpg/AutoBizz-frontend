import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";


const AddLeadDialog = ({
  open,
  setOpen,
  input,
  setInput,
  handleChange,
  handleSubmit,
  errors,
  createLoading,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-0">
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.2 }}
            className="relative w-[90%] sm:w-full max-w-lg mx-auto bg-back dark:bg-gray-900 rounded-3xl p-6 shadow-xl z-50"
          >
            {/* CLOSE BUTTON */}
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="hover:bg-gray-200 p-2 rounded-full dark:hover:bg-gray-700 transition"
              >
                <IoCloseSharp className="size-5 text-black dark:text-white" />
              </button>
            </div>

            {/* HEADER */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-text dark:text-white">
                Add Leads
              </h1>
              <p className="text-sm text-gray-500">Please enter lead details</p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* FIRST + LAST */}
              <div className="flex flex-col lg:flex-row gap-3">
                {/* First Name */}
                <div className="space-y-2 flex-1">
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-400 ml-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={input.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className={`w-full py-3 px-4 text-text rounded-xl border border-gray-200 m-0 ${
                      errors.name
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-200 dark:border-gray-700"
                    } bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-200 outline-none transition-all`}
                  />
                  {/* Error Message */}
                  {errors.name && (
                    <span className="text-red-500 text-[10px] font-bold ml-1 uppercase">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Company Name */}
                <div className="space-y-2 flex-1">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-400 ml-1"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={input.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className={`w-full py-3 px-4 text-text rounded-xl border border-gray-200 m-0 ${
                      errors.companyName
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-200 dark:border-gray-700"
                    } bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-200 outline-none transition-all`}
                  />
                  {/* Error Message */}
                  {errors.companyName && (
                    <span className="text-red-500 text-[10px] font-bold ml-1 uppercase">
                      {errors.companyName}
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

              {/* ROLE + PHONE */}
              <div className="flex flex-col lg:flex-row gap-3">
                

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
                    placeholder="+(1) 1234567890"
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

              {/* SUBMIT */}
              <button
                disabled={createLoading}
                type="submit"
                className={`${createLoading ? "opacity-50 cursor-not-allowed shadow-none" : ""}bg-btn-100 w-full py-3 text-white font-bold rounded-xl shadow-md shadow-btn-50/30 hover:shadow-lg hover:shadow-btn-100/40 transform hover:-translate-y-0.5 transition-all cursor-pointer`}
              >
                {createLoading ? "Adding Lead..." : "Add Lead"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddLeadDialog;
