import { NavLink, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useState } from "react";
import { toast } from "react-toastify";
import FormLeftSIde from "../components/FormLeftSIde";
import SocialLogin from "../components/SocialLogin";
import { orgApi, useLoginOrgMutation } from "../features/slices/orgSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [login, { isLoading }] = useLoginOrgMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   Handling Input Chnage
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  };

  //   Handling Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations for Empty Fields
    if (!input.email.trim() || !input.password.trim()) {
      return toast.error("Please Fill all the Fields");
    }
    // Improved regex for standard email formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email)) {
      return toast.error("Please enter a valid email address");
    }
    //Validation for Length
    if (input.password.length < 7) {
      return toast.error("Password must be atleast 7 Character Long");
    }

    // Login API call
    try {
      const response = await login(input).unwrap();
      localStorage.setItem("isLoggedIn" , 'true')
      toast.success(response?.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      {/* Main Card Container */}
      <div className="w-full sm:max-w-lg lg:max-w-5xl flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden min-h-137.5">
        {/* Left Side: Image */}
        <FormLeftSIde />

        {/* Right Side: Form */}
        <div className="flex-1 flex flex-col justify-center p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="w-full space-y-6" noValidate>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-text tracking-tight">
                Sign In
              </h1>
              <p className="text-gray-500 mt-2">
                Please enter your details to sign in
              </p>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700 ml-1"
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
                className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-btn-100 outline-none transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                name="password"
                className="text-sm font-semibold text-gray-700 ml-1"
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

            {/* SIgnIn Btn and Forget Password */}
            <div>
              <NavLink
                to="/resetpassword"
                className="float-end text-blue-400 text-sm"
              >
                Forget Password ?{" "}
              </NavLink>
              <button
                type="submit"
                className="w-full bg-btn-100 hover:bg-btn-200 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-btn-50/30 hover:shadow-xl hover:shadow-btn-200/40 transform hover:-translate-y-0.5 transition-all mt-4"
              >
                Sign In
              </button>
            </div>

            {/* Footer */}
            <div className="flex py-4 items-center">
              <div className="grow border-t border-gray-200"></div>
              <span className="shrink mx-4 text-gray-400 text-xs uppercase tracking-widest font-bold">
                Or continue with
              </span>
              <div className="grow border-t border-gray-200"></div>
            </div>

            {/* Social Buttons */}
            <SocialLogin />

            <p className="text-center text-sm text-gray-500 mt-8">
              Don't have an account?
              <NavLink
                to="/register"
                className="ml-1 text-btn-100 font-bold hover:underline"
              >
                Sign up now
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
