import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../features/slices/resetPasswordSlice";

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [input, setInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // Getting Token From URL Params
  const { token } = useParams();

  const [resetPass, { isLoading }] = useResetPasswordMutation();

  const navigate = useNavigate();

  //   Handling Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  };

  //   Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations for Empty Fields
    if (!input.newPassword.trim() || !input.confirmPassword.trim()) {
      return toast.error("Please Fill all the Fields");
    }

    //Validation for Length
    if (input.newPassword.length < 7 || input.confirmPassword.length < 7) {
      return toast.error("Password must be atleast 7 Character Long");
    }

    // Password REGEX Validation
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*_\-])[a-zA-Z0-9!@#$%^&*_\-]{7,}$/;

    if (!passwordRegex.test(input.newPassword)) {
      return setPasswordError(
        "Password must contain at least one number and one special character",
      );
    } else {
      setPasswordError("");
    }

    // Match Password
    if (input.newPassword.trim() !== input.confirmPassword.trim()) {
      return setPasswordError("Password and Confirm Password doesn't match!");
    } else {
      setPasswordError("");
    }

    try {
      const response = await resetPass({ input, token }).unwrap();
      toast.success(response?.message);
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-3">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center w-full sm:w-xl space-y-6 bg-back p-4 sm:p-14 rounded-3xl shadow-xl"
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-text tracking-tight">
              Reset Your Password
            </h2>
            <p className="text-sm text-gray-400">
              Enter your new password and Confirm Password!
            </p>
          </div>

          {/* Password */}
          <div className="sm:flex justify-center-safe w-full space-y-2">
            <div className="w-full sm:w-20 flex items-center-safe m-0">
              <label
                htmlFor="newPassword"
                name="newPassword"
                className="text-sm font-semibold text-gray-700 m-0"
              >
                New Password
              </label>
            </div>

            <div className="relative flex-4">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                placeholder="••••••••"
                value={input.newPassword}
                onChange={handleChange}
                className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-btn-100 outline-none transition-all"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-btn-100 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <IoEyeSharp size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Confim Password */}
          <div className="sm:flex justify-center-safe w-full space-y-2">
            <div className="w-full sm:w-20 flex items-center-safe m-0">
              <label
                htmlFor="cpassword"
                name="cpassword"
                className="text-sm font-semibold text-gray-700 m-0"
              >
                Confirm Password
              </label>
            </div>

            <div className="relative flex-4">
              <input
                type={showCPassword ? "text" : "password"}
                id="cpassword"
                name="confirmPassword"
                placeholder="••••••••"
                value={input.confirmPassword}
                onChange={handleChange}
                className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-btn-100 outline-none transition-all"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-btn-100 transition-colors"
                onClick={() => setShowCPassword(!showCPassword)}
              >
                {showCPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <IoEyeSharp size={20} />
                )}
              </button>
            </div>
          </div>
          <div className="bg-red-100 px-2 rounded-lg">
            <span className=" text-red-400 text-sm ">{passwordError}</span>
          </div>

          {/* Submit Button */}
          <button
            disabled={isLoading}
            type="submit"
            className={`${isLoading && "opacity-60"} cursor-pointer w-full bg-btn-100 hover:bg-btn-200 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-btn-50/30 hover:shadow-xl hover:shadow-btn-200/40 transform hover:-translate-y-0.5 transition-all mt-2`}
          >
            {isLoading ? "Resetting Password..." : "Reset Password"}
          </button>
          <div>
            <p className="float-end text-sm">
              Remember Password?
              <NavLink to="/login" className="text-blue-400 ml-1">
                SignIn now
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPasswordPage;