import { NavLink, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useState } from "react";
import FormLeftSIde from "../components/LoginAndSignUp/FormLeftSIde";
import SocialLogin from "../components/LoginAndSignUp/SocialLogin";
import { orgApi, useLoginOrgMutation } from "../features/slices/orgSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import BusinessLoginForm from "../components/LoginAndSignUp/BusinessLoginForm";
import EmployeeLoginForm from "../components/LoginAndSignUp/EmployeeLoginForm";

const LoginPage = () => {

  const [userType, setUserType] = useState("Business");
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    empId: "",
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
    if (userType=="Business" && !emailRegex.test(input.email)) {
      return toast.error("Please enter a valid email address");
    }
    //Validation for Length
    if (input.password.length < 7) {
      return toast.error("Password must be atleast 7 Character Long");
    }

    // Login API call
    if (userType === "Business") {
      try {
        const response = await login(input).unwrap();
        localStorage.setItem("isLoggedIn", "true");
        toast.success(response?.message);
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message);
      }
    }
    else {
      //Employee login API CALL
      toast.error("Employee login coming soon!")
    }
    
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-4">
      {/* Main Card Container */}
      <div className="w-full sm:max-w-lg lg:max-w-5xl flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden min-h-137.5">
        {/* Left Side: Image */}
        <FormLeftSIde />

        {/* Right Side: Form */}
        <div className="flex-1 flex flex-col justify-center p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="w-full space-y-6" noValidate>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-text dark:text-white tracking-tight">
                Sign In
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Please enter your details to sign in
              </p>
            </div>

            <div className="flex gap-2 justify-evenly bg-back dark:bg-gray-800 px-2 py-3 rounded-2xl">
              <div
                className={`dark:text-white text-text cursor-pointer ${userType === "Business" ? "underline" : null}`}
                onClick={() => setUserType("Business")}
              >
                Business
              </div>
              <div
                className={`dark:text-white text-text cursor-pointer ${userType === "Employee" ? "underline" : null}`}
                onClick={() => setUserType("Employee")}
              >
                Employee
              </div>
            </div>

            {/* business login */}
            {userType == "Business" && (
              <BusinessLoginForm
                input={input}
                handleChange={handleChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                isLoading={isLoading}
              />
            )}

            {/* employee login */}
            {userType == "Employee" && (
              <EmployeeLoginForm
                input={input}
                handleChange={handleChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                isLoading={isLoading}
              />
            )}

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