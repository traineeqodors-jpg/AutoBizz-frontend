"use client";


import { useRouter, useSearchParams } from "next/navigation";

import { useSetupPasswordMutation } from "@/features/slices/employeeSlice";


import React, { useState } from "react";

import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

import FormLeftSIde from "@/app/(auth)/register/components/FormLeftSIde";


function SetupPasswordPage() {
  const [input, setInput] = useState({
    password: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  console.log(token);
  

  const router = useRouter();

  const [setPassword, { isLoading }] = useSetupPasswordMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    // Password validation
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*_\-])[a-zA-Z0-9!@#$%^&*_\-]{7,}$/;
    if (!input.password.trim()) {
      newErrors.password = "Password is required";
    } else if (input.password.length < 7) {
      newErrors.password = "Must be atleast 7 character Long";
    } else if (!passwordRegex.test(input.password)) {
      newErrors.password =
        "Password must contain at least one number and one special character";
    }

    if (!input.confirmpassword.trim()) {
      newErrors.confirmpassword = "Confirm password is required";
    } else if (input.confirmpassword.length < 7) {
      newErrors.confirmpassword = "Must be atleast 7 character Long";
    } else if (!passwordRegex.test(input.confirmpassword)) {
      newErrors.confirmpassword =
        "Password must contain at least one number and one special character";
    }

    if (input.password !== input.confirmpassword) {
      newErrors.confirmpassword =
        "Pasword and confirm password doesn't match!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const formData = {
      token,
      email,
      password: input.password,
      confirmPassword: input.confirmpassword,
    };

    

    try {
      const response = await setPassword(formData).unwrap();
      setInput({
        password: "",
        confirmpassword: "",
      });
      toast.success(response?.message);
      router.replace("/login");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Error Occured!!");
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        {/* Main Card Container */}
        <div className="w-full sm:max-w-lg lg:max-w-5xl flex flex-col md:flex-row bg-surface rounded-3xl shadow-2xl overflow-hidden min-h-137.5">
          {/* Left Side: Image */}
          <FormLeftSIde />

          {/* Right Side: Form */}
          <div className="flex-1 flex flex-col justify-center p-8 sm:p-10">
            <form
              onSubmit={handleSubmit}
              className="w-full space-y-6"
              noValidate
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-text tracking-tight">
                  Employee First Time Setup
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Please enter & confirm your password
                </p>
              </div>

              <>
                {/* EmpId Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="empEmail"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-400 ml-1"
                  >
                    Employee Email
                  </label>
                  <input
                    disabled
                    type="text"
                    id="empEmail"
                    name="empEmail"
                    value={email}
                    placeholder="abc@gmail.com"
                    className={`w-full py-3 px-4 text-text rounded-xl border border-gray-200 m-0 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-200 outline-none transition-all`}
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    name="password"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-400 ml-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={input.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full py-3 px-4 text-text rounded-xl border border-gray-200 m-0 ${
                        errors.password
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-200 dark:border-gray-700"
                      } bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-200 outline-none transition-all`}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-btn-100 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {!showPassword ? (
                        <FaEyeSlash size={20} />
                      ) : (
                        <IoEyeSharp size={20} />
                      )}
                    </button>
                  </div>
                  {/* Error Message */}
                  {errors.password && (
                    <span className="text-red-500 text-[10px] font-bold ml-1 uppercase">
                      {errors.password}
                    </span>
                  )}
                </div>

                {/*Confirm Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="confirmpassword"
                    name="confirmpassword"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-400 ml-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmpassword"
                      name="confirmpassword"
                      value={input.confirmpassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full py-3 px-4 text-text rounded-xl border border-gray-200 m-0 ${
                        errors.confirmpassword
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-200 dark:border-gray-700"
                      } bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-200 outline-none transition-all`}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-btn-100 transition-colors"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {!showConfirmPassword ? (
                        <FaEyeSlash size={20} />
                      ) : (
                        <IoEyeSharp size={20} />
                      )}
                    </button>
                  </div>
                  {/* Error Message */}
                  {errors.confirmpassword && (
                    <span className="text-red-500 text-[10px] font-bold ml-1 uppercase">
                      {errors.confirmpassword}
                    </span>
                  )}
                </div>

                {/* Confirm and verify */}
                <div>
                  <button
                    disabled={isLoading}
                    type="submit"
                    className={`w-full bg-btn-100 hover:bg-btn-200 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-btn-50/30 hover:shadow-xl hover:shadow-btn-200/40 transform hover:-translate-y-0.5 transition-all mt-4`}
                  >
                    {isLoading
                      ? "Confirming & Verifying..."
                      : "Confirm & Verify"}
                  </button>
                </div>
              </>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SetupPasswordPage;
