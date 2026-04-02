import { useState } from "react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast"
import { useForgotPasswordMutation } from "../features/slices/resetPasswordSlice";

const ForgetPasswordPage = () => {
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
       console.log(response)
      toast.success(response?.message);
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
            <h1 className="text-2xl font-semibold text-text tracking-tight">
              Reset Your Password
            </h1>

            {/* After Sending EMail */}
            {isSuccess ? (
              <p className="text-sm text-green-600 bg-green-200 rounded-2xl p-3">
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
            <label htmlFor="email" className=" font-semibold text-gray-700 m-0">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@example.com"
              className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-btn-100 outline-none transition-all"
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className={`${isLoading && "opacity-60"} cursor-pointer w-full bg-btn-100 hover:bg-btn-200 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-btn-50/30 hover:shadow-xl hover:shadow-btn-200/40 transform hover:-translate-y-0.5 transition-all mt-2`}
          >
            {isLoading ? "Sending..." : "Send Link"}
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

export default ForgetPasswordPage;