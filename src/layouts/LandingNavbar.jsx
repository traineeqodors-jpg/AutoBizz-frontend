import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { MdDarkMode, MdSunny } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleTheme } from "../features/slices/themeSlice";

const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const isDark = useSelector((state) => state.theme.isDark);
  return (
    <>
      <nav className="sticky top-0 w-full z-100 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto p-2 flex justify-between items-center-safe sm:px-10 px-4 xl:px-0">
          {/* Logo */}
          <div className="size-16 overflow-hidden flex flex-col justify-center-safe items-center-safe rounded-lg">
            <img src="/logo.png" alt="Logo" className="w-full object-cover" />
          </div>

          <div className="flex gap-10">
            {/* Menu Items */}
            <ul className="hidden sm:flex justify-center-safe items-center-safe gap-7 font-medium dark:text-white">
              <li className="hover:translate-y-0.5 transition-all">
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    `${isActive ? "text-heading" : "text-text dark:text-white"} font-semibold`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li className="hover:translate-y-0.5 transition-all">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${isActive ? "text-heading" : "text-text dark:text-white"} font-semibold`
                  }
                >
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `${isActive ? "text-heading" : "text-text dark:text-white"} font-semibold`
                  }
                >
                  Register
                </NavLink>
              </li>
            </ul>

            <button
              className="p-2 bg-gray-300 text-text dark:text-white dark:bg-gray-700 rounded-full flex gap-3 justify-center items-center-safe mx-auto cursor-pointer"
              onClick={() => dispatch(toggleTheme())}
            >
              {isDark ? (
                <MdDarkMode className="size-6 animate-[spin_0.5s_ease-in-out_1]" />
              ) : (
                <MdSunny className="size-6 animate-[spin_0.8s_ease-in-out_1] " />
              )}
            </button>

            {/* Menu Buttons */}
            <div className="sm:hidden flex justify-center-safe items-center-safe gap-7 text-lg">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="sm:hidden dark:text-white decoration-2 underline-offset-2 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                <IoMenu className="size-8" />
              </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
              <ul className="w-[95%] absolute top-18 left-1/2 -translate-x-1/2 flex flex-col sm:hidden bg-btn-100/30 dark:bg-gray-900/90 backdrop-blur-md gap-5 p-5 text-center rounded-2xl text-white z-1000 border border-white/10 shadow-2xl">
                <li className="px-10">
                  <NavLink
                    to="/home"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block py-1 decoration-2 underline-offset-2 w-full border-b font-semibold ${
                        isActive
                          ? "text-btn-100"
                          : "text-gray-800 dark:text-white"
                      }`
                    }
                  >
                    Home
                  </NavLink>
                </li>

                <li className="px-10">
                  <NavLink
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block py-1 decoration-2 underline-offset-2 w-full border-b font-semibold ${
                        isActive
                          ? "text-btn-100"
                          : "text-gray-800 dark:text-white"
                      }`
                    }
                  >
                    Login
                  </NavLink>
                </li>

                <li className="px-10">
                  <NavLink
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block py-1 decoration-2 underline-offset-2 w-full border-b font-semibold ${
                        isActive
                          ? "text-btn-100"
                          : "text-gray-800 dark:text-white"
                      }`
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default LandingNavbar;
