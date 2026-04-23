import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
// import SocialLogin from "./SocialLogin";
import countries from "../../../../Json data/country.json";
import Link from "next/link";

const SignupForm = ({
  input,
  handleChange,
  handleSubmit,
  errors,
  showPassword,
  setShowPassword,
  isLoading,
}) => {
  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5" noValidate>
      {/* Form Headings */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-text tracking-tight">SignUp</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Please enter your details to sign up
        </p>
      </div>

      {/* Name Fields */}
      <div className="flex flex-col lg:flex-row gap-3">
        {/* First Name */}
        <div className="space-y-2 flex-1">
          <label
            htmlFor="firstName"
            className="text-sm font-semibold text-gray-700 dark:text-gray-400 ml-1"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={input.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className={`w-full py-3 px-4 text-text rounded-xl border border-gray-200 m-0 ${
              errors.firstName
                ? "border-red-500 dark:border-red-500"
                : "border-gray-200 dark:border-gray-700"
            } bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-200 outline-none transition-all`}
          />
          {/* Error Message */}
          {errors.firstName && (
            <span className="text-red-500 text-[10px] font-bold ml-1 uppercase">
              {errors.firstName}
            </span>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2 flex-1">
          <label
            htmlFor="lastName"
            className="text-sm font-semibold text-gray-700 dark:text-gray-400 ml-1"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={input.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className={`w-full py-3 px-4 text-text rounded-xl border border-gray-200 m-0 ${
              errors.lastName
                ? "border-red-500 dark:border-red-500"
                : "border-gray-200 dark:border-gray-700"
            } bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-200 outline-none transition-all`}
          />
          {/* Error Message */}
          {errors.lastName && (
            <span className="text-red-500 text-[10px] font-bold ml-1 uppercase">
              {errors.lastName}
            </span>
          )}
        </div>
      </div>

      {/* Organization name & size */}
      <div className="flex flex-col lg:flex-row  gap-3">
        {/*  Organization name */}
        <div className="space-y-2 w-full lg:w-[60%]">
          <label
            htmlFor="orgName"
            className="text-sm font-semibold text-gray-700 dark:text-gray-400 ml-1"
          >
            Organization Name
          </label>
          <input
            type="text"
            id="orgName"
            name="orgName"
            value={input.orgName}
            onChange={handleChange}
            placeholder="Org. Name"
            className={`w-full py-3 px-4 text-text rounded-xl border border-gray-200 m-0 ${
              errors.orgName
                ? "border-red-500 dark:border-red-500"
                : "border-gray-200 dark:border-gray-700"
            } bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-btn-200 outline-none transition-all`}
          />
          {/* Error Message */}
          {errors.orgName && (
            <span className="text-red-500 text-[10px] font-bold ml-1 uppercase">
              {errors.orgName}
            </span>
          )}
        </div>
        {/*  Organization Size */}
        <div className="space-y-2 w-full lg:w-[40%]">
          <label
            htmlFor="orgSize"
            className="text-sm font-semibold text-gray-700 dark:text-gray-400 ml-1"
          >
            Organization Size
          </label>
          <select
            name="orgSize"
            id="orgSize"
            value={input.orgSize || ""}
            onChange={handleChange}
            className={`w-full py-3 px-4 rounded-xl border m-0 outline-none transition-all focus:ring-2 focus:ring-btn-200 ${!input.orgSize ? "text-gray-400/90" : "text-text"} ${errors.orgSize ? "border-red-500 dark:border-red-500" : "border-gray-200 dark:border-gray-700"} bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700`}
          >
            <option value="" disabled className="text-gray-400">
              --
            </option>
            <option value="1-50">1-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="500+">500+</option>
          </select>
          {/* Error Message */}
          {errors.orgSize && (
            <span className="text-red-500 text-[10px] font-bold ml-1 uppercase">
              {errors.orgSize}
            </span>
          )}
        </div>
      </div>

      {/* Country & Phone */}
      <div className="flex flex-col lg:flex-row  gap-3">
        {/* Country */}
        <div className="space-y-2 flex-1">
          <label
            htmlFor="country"
            className="text-sm font-semibold text-gray-700 dark:text-gray-400 ml-1"
          >
            country
          </label>
          <select
            name="country"
            id="country"
            value={input.country || ""}
            onChange={handleChange}
            className={`w-full py-3 px-4 rounded-xl border m-0 outline-none transition-all focus:ring-2 focus:ring-btn-200 ${!input.country ? "text-gray-400/90" : "text-text"} ${errors.country ? "border-red-500 dark:border-red-500" : "border-gray-200 dark:border-gray-700"} bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700`}
          >
            <option value="" disabled className="text-gray-400">
              - Country -
            </option>
            {countries.countries.map((country) => (
              <option
                key={country.id}
                value={JSON.stringify({
                  code: country.phonecode,
                  name: country.name,
                })}
              >
                {country.name} +{country.phonecode}
              </option>
            ))}
          </select>
          {/* Error Message */}
          {errors.country && (
            <span className="text-red-500 text-[10px] font-bold ml-1 uppercase">
              {errors.country}
            </span>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2 flex-1">
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
            placeholder="1234567890"
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

      {/* Password Field */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-semibold text-gray-700 dark:text-gray-400 ml-1"
        >
          Password
        </label>
        <div className="relative m-0">
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

      <button
        type="submit"
        disabled={isLoading}
        className={`${isLoading && "opacity-60"} w-full bg-btn-100 hover:bg-btn-200 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-btn-100/30 hover:shadow-xl hover:shadow-btn-200/40 transform hover:-translate-y-0.5 transition-all mt-2`}
      >
        {isLoading ? "Signing Up..." : "Sign Up"}
      </button>

      {/* Footer */}
      <div className="flex py-4 items-center">
        <div className="grow border-t border-gray-200"></div>
        <span className="shrink mx-4 text-gray-400 text-xs uppercase tracking-widest font-bold">
          Or continue with
        </span>
        <div className="grow border-t border-gray-200"></div>
      </div>

      {/* Social Buttons */}
      {/* <SocialLogin /> */}

      <p className="text-center text-sm text-gray-500 mt-8">
        Already have an account?
        <Link
          href="/login"
          className="ml-1 text-btn-100 font-bold hover:underline"
        >
          Sign In now
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
