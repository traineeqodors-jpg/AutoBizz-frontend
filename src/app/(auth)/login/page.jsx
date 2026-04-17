"use client";

import FormLeftSIde from "../register/components/FormLeftSIde";
import { useState } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import BusinessLoginForm from "./components/BusinessLoginForm";
import EmployeeLoginForm from "./components/EmployeeLoginForm";
import {
  useEmployeeLoginMutation,
  useLoginOrgMutation,
} from "@/features/slices/userSlice";

const LoginPage = () => {
  const [userType, setUserType] = useState("Business");
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [orglogin, { isLoading: orgLoading }] = useLoginOrgMutation();

  const [emplogin, { isLoading: empLoading }] = useEmployeeLoginMutation();

  const router = useRouter();

  //   Handling Input Chnage
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
    // Clear error when user starts typing again
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  //   Handling Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(input.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Password validation
    if (!input.password.trim()) {
      newErrors.password = "Password is required";
    } else if (input.password.length < 7) {
      newErrors.password = "Password must be atleast 7 Character Long";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (userType === "Business") {
      try {
        const response = await orglogin(input).unwrap();
        toast.success(response?.message);
        router.replace("/org/dashboard");
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || "Something went wrong");
      }
    } else {
      //Employee login API CALL
      try {
        const response = await emplogin(input).unwrap();
        toast.success(response?.message);
        router.replace("/org/dashboard");
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || "Something went wrong");
      }
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
          <div className="flex-1 flex flex-col justify-center p-4 sm:p-10">
            <form
              onSubmit={handleSubmit}
              className="w-full space-y-6"
              noValidate
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-text tracking-tight">
                  Sign In
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Please enter your details to sign in
                </p>
              </div>

              <div className="flex justify-center items-center">
                <div className="relative flex bg-back dark:bg-gray-800 p-1 rounded-2xl w-full max-w-xs">
                  <div
                    className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-white dark:bg-gray-700 rounded-xl shadow-sm transition-transform duration-300 ease-in-out"
                    style={{
                      transform:
                        userType === "Employee"
                          ? "translateX(100%)"
                          : "translateX(0%)",
                    }}
                  />

                  {/* Business Tab */}
                  <div
                    className="relative z-10 flex-1 text-center py-2 cursor-pointer transition-colors duration-300 dark:text-white"
                    onClick={() => setUserType("Business")}
                  >
                    <span
                      className={
                        userType === "Business" ? "font-semibold" : "opacity-60"
                      }
                    >
                      Business
                    </span>
                  </div>

                  {/* Employee Tab */}
                  <div
                    className="relative z-10 flex-1 text-center py-2 cursor-pointer transition-colors duration-300 dark:text-white"
                    onClick={() => setUserType("Employee")}
                  >
                    <span
                      className={
                        userType === "Employee" ? "font-semibold" : "opacity-60"
                      }
                    >
                      Employee
                    </span>
                  </div>
                </div>
              </div>

              {/* business login */}
              {userType == "Business" && (
                <BusinessLoginForm
                  input={input}
                  handleChange={handleChange}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  isLoading={orgLoading}
                  errors={errors}
                />
              )}

              {/* employee login */}
              {userType == "Employee" && (
                <EmployeeLoginForm
                  input={input}
                  handleChange={handleChange}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  isLoading={empLoading}
                  errors={errors}
                />
              )}

              {/* Footer */}

              {/* Social Buttons */}
              {/* <SocialLogin /> */}
              {userType == "Business" && (
                <>
                  <div className="flex py-4 items-center">
                    <div className="grow border-t border-gray-200"></div>
                    <span className="shrink mx-4 text-gray-400 text-xs uppercase tracking-widest font-bold">
                      Or continue with
                    </span>
                    <div className="grow border-t border-gray-200"></div>
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-8">
                    Don&apos;t have an account?
                    <Link
                      href="/register"
                      className="ml-1 text-btn-100 font-bold hover:underline"
                    >
                      Sign up now
                    </Link>
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
