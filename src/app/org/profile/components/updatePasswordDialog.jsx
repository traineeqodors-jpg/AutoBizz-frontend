"use client";

import React, { useState } from "react";
import { IoCloseSharp, IoEyeSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useUpdatePasswordMutation } from "@/features/slices/resetPasswordSlice";

const UpdatePasswordDialog = ({ dialogRef }) => {
  const [input, setInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({});

  const [updatePass, { isLoading }] = useUpdatePasswordMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    // old Password validation
    if (!input.oldPassword.trim()) {
      newErrors.oldPassword = "Old Password is required";
    }

    // New Password validation
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*_\-])[a-zA-Z0-9!@#$%^&*_\-]{7,}$/;
    if (!input.newPassword.trim()) {
      newErrors.newPassword = "New Password is required";
    } else if (input.newPassword.length < 7) {
      newErrors.newPassword = "must be atleast 7 Character Long";
    } else if (!passwordRegex.test(input.newPassword)) {
      newErrors.newPassword =
        "Password must contain at least one number and one special character";
    }

    if (!input.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (input.newPassword !== input.confirmPassword) {
      newErrors.confirmPassword =
        "New Password and Confirm Password doesn't match!!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await updatePass(input).unwrap();
      toast.success(response?.message);
      dialogRef.current?.close();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Error Occured while Updating!!");
    }

    setErrors({});
  };

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
            <div className="w-full flex flex-row-reverse m-0">
              <button
                type="button"
                onClick={() => {
                  dialogRef.current?.close();
                }}
                className=" hover:bg-gray-300 dark:hover:bg-gray-600 p-1 cursor-pointer rounded-full"
              >
                <IoCloseSharp className="text-black dark:text-white size-6 cursor-pointer" />
              </button>
            </div>
            <div className="text-center mb-8">
              <h1 className="text-xl sm:text-3xl font-bold text-text dark:text-white tracking-tight">
                Update Password
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Please enter your details
              </p>
            </div>

            {/* old Password */}
            <div>
              <label
                htmlFor="oldPassword"
                name="oldPassword"
                className="text-sm font-semibold text-gray-700 dark:text-gray-400 ml-1"
              >
                Old Password
              </label>
              <div className="relative">
                <input
                  type={showPassword?.oldPassword ? "text" : "password"}
                  id="oldPassword"
                  name="oldPassword"
                  value={input.oldPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full py-3 px-4 text-text rounded-xl border border-gray-200 m-0 ${
                    errors.oldPassword
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-200 dark:border-gray-700"
                  } bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-200 outline-none transition-all`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-btn-100 transition-colors"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      oldPassword: !showPassword.oldPassword,
                    })
                  }
                >
                  {!showPassword.oldPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <IoEyeSharp size={20} />
                  )}
                </button>
              </div>
              {/* Error Message */}
              {errors.oldPassword && (
                <span className="text-red-500 text-[10px] font-bold ml-1 uppercase">
                  {errors.oldPassword}
                </span>
              )}
            </div>

            {/* new Password */}
            <div>
              <label
                htmlFor="newPassword"
                name="newPassword"
                className="text-sm font-semibold text-gray-700 dark:text-gray-400 ml-1"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword?.newPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={input.newPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full py-3 px-4 text-text rounded-xl border border-gray-200 m-0 ${
                    errors.newPassword
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-200 dark:border-gray-700"
                  } bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-200 outline-none transition-all`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-btn-100 transition-colors"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      newPassword: !showPassword.newPassword,
                    })
                  }
                >
                  {!showPassword.newPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <IoEyeSharp size={20} />
                  )}
                </button>
              </div>
              {/* Error Message */}
              {errors.newPassword && (
                <span className="text-red-500 text-[10px] font-bold ml-1 uppercase">
                  {errors.newPassword}
                </span>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                name="confirmPassword"
                className="text-sm font-semibold text-gray-700 dark:text-gray-400 ml-1"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword?.confirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={input.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full py-3 px-4 text-text rounded-xl border border-gray-200 m-0 ${
                    errors.confirmPassword
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-200 dark:border-gray-700"
                  } bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-200 outline-none transition-all`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-btn-100 transition-colors"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      confirmPassword: !showPassword.confirmPassword,
                    })
                  }
                >
                  {!showPassword.confirmPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <IoEyeSharp size={20} />
                  )}
                </button>
              </div>
              {/* Error Message */}
              {errors.confirmPassword && (
                <span className="text-red-500 text-[10px] font-bold ml-1 uppercase">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  dialogRef.current?.close();
                }}
                className={`bg-surface w-full py-3 text-text font-bold rounded-xl border border-btn-100/50 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all cursor-pointer`}
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                type="submit"
                className={`${isLoading ? "opacity-60 shadow-none cursor-not-allowed" : " hover:shadow-lg hover:shadow-btn-100/40 cursor-pointer"} bg-btn-100 w-full py-3 text-white font-bold rounded-xl shadow-md shadow-btn-50/30 transition-all `}
              >
                Update Password
              </button>
            </div>
          </form>
        </motion.div>
      </dialog>
    </>
  );
};

export default UpdatePasswordDialog;
