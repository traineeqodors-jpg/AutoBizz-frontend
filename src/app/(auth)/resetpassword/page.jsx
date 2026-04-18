"use client";
import React, { useState } from "react";
import { useForgotPasswordMutation } from "@/features/slices/resetPasswordSlice";
import Link from "next/link";
import toast from "react-hot-toast";

const ResetPassword = ({}) => {
  const [email, setEmail] = useState("");

  const [forgotPassword, { isLoading, isSuccess }] =
    useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations for Empty Fields
    if (!email.trim()) {
      return toast.error("Please enter your email!!");
    }
    // Improved regex for standard email formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address");
    }

    try {
      const response = await forgotPassword(email).unwrap();
      console.log(response);
      toast.success(response?.message);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || "Failed to send reset link. Try again.",
      );
    }
  };
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center p-3">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center w-full sm:w-xl space-y-6 bg-surface p-4 sm:p-14 rounded-3xl shadow-xl"
        >
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-text tracking-tight">
              Reset Your Password
            </h1>

            {/* After Sending EMail */}
            {isSuccess ? (
              <p className="text-sm text-green-400 bg-green-200/10 ring-1 ring-green-300 rounded-lg p-3">
                The Password Reset Link has Been Sent to your email:
                <span className="block">{email}</span>
              </p>
            ) : (
              <p className="text-sm text-gray-400">
                Enter your email associated with your account and we'll email
                you link to reset your password.
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="sm:flex gap-5 items-center-safe space-y-2">
            <label
              htmlFor="email"
              name="email"
              className="text-sm font-semibold text-gray-700 dark:text-gray-400 ml-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@example.com"
              className={`w-full py-3 px-4 text-text rounded-xl border m-0bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-200 outline-none transition-all`}
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className={`${isLoading && "opacity-60"} cursor-pointer w-full bg-btn-100 hover:bg-btn-200 text-white font-bold py-3.5 rounded-xl shadow-sm shadow-btn-50/30 hover:shadow-md hover:shadow-btn-200/40 transform hover:-translate-y-0.5 transition-all mt-2`}
          >
            {isLoading ? "Sending..." : "Send Link"}
          </button>
          <div>
            <p className="float-end text-sm">
              Remember Password?
              <Link href="/login" className="text-blue-400 ml-1">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
