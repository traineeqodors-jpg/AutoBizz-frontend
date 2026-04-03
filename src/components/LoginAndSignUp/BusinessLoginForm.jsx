import { FaEyeSlash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

function BusinessLoginForm({input, handleChange, showPassword, setShowPassword, isLoading}) {
  return (
    <>
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
          className="w-full py-3 px-4 text-text dark:text-white rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-100 outline-none transition-all"
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
            className="w-full py-3 px-4 text-text dark:text-white rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-100 outline-none transition-all"
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
          disabled={isLoading}
          type="submit"
          className={`${isLoading && "opacity-60"} w-full bg-btn-100 hover:bg-btn-200 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-btn-50/30 hover:shadow-xl hover:shadow-btn-200/40 transform hover:-translate-y-0.5 transition-all mt-4`}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </>
  );
}

export default BusinessLoginForm