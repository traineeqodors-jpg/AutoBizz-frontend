import React, { useState } from "react";
import { IoLogOut, IoMenu } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { orgApi, useGetMeQuery, useLogoutMutation } from "../features/slices/orgSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  
  
  const {
    data,
    isLoading: userLoading,
    isFetching,
  } = useGetMeQuery(undefined, {
    skip: !token,
  });
  
    if (userLoading) {
      return null;
    }
  
  const user = data?.data;

  const handleLogout = async () => {
        try {
          await logout().unwrap();
        } catch (error) {
          console.warn("Server logout failed, cleaning up locally.");
        } finally {
          localStorage.removeItem("token");
  
          dispatch(orgApi.util.resetApiState());
  
          toast.success("Logged out successfully");
        }
      };
  
  return (
    <>
      <nav className="py-2 w-full flex lg:hidden justify-between px-4 sm:px-10 items-center-safe bg-back relative">
        <div>
          <img src="/vite.svg" alt="Logo" className="size-10" />
        </div>

        {/* Menu Items */}
        <ul className="hidden sm:flex justify-center-safe items-center-safe gap-7 text-lg">
          <li className="hover:translate-y-0.5 transition-all">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive && "text-blue-500 underline"} decoration-2 underline-offset-2 `
              }
            >
              Home
            </NavLink>
          </li>
          {!user && (
            <li className="hover:translate-y-0.5 transition-all">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${isActive && "text-blue-500 underline"} decoration-2 underline-offset-2`
                }
              >
                Login
              </NavLink>
            </li>
          )}

          {!user && (
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `${isActive && "text-blue-500 underline"} decoration-2 underline-offset-2`
                }
              >
                Register
              </NavLink>
            </li>
          )}
        </ul>

        {/* Menu Buttons */}
        <div className="flex justify-center-safe items-center-safe gap-7 text-lg">
          <button
            onClick={handleLogout}
            className="decoration-2 underline-offset-2 hover:translate-y-0.5 transition-all cursor-pointer"
          >
            <IoLogOut className="size-8" />
          </button>

          {!user && (
            <NavLink className="px-5 py-2 text-sm font-normal tracking-wider bg-btn-100 text-white rounded-3xl cursor-pointer">
              Login
            </NavLink>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden decoration-2 underline-offset-2 hover:translate-y-0.5 transition-all cursor-pointer"
          >
            <IoMenu className="size-8" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="w-full flex flex-col sm:hidden absolute top-full left-0 bg-black/60 backdrop-blur-xs gap-5 p-5 text-center rounded-b-xl text-white">
            <li className="">
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${isActive && "bg-blue-500"} block rounded-2xl py-1 decoration-2 underline-offset-2 w-full border border-gray-200`
                }
              >
                Home
              </NavLink>
            </li>
            {!user && (
              <li className="">
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${isActive && "bg-blue-500"} block rounded-2xl py-1 decoration-2 underline-offset-2 w-full border border-gray-200`
                  }
                >
                  Login
                </NavLink>
              </li>
            )}

            {!user && (
              <li>
                <NavLink
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `${isActive && "bg-blue-500"} block rounded-2xl py-1 decoration-2 underline-offset-2 w-full border border-gray-200`
                  }
                >
                  Register
                </NavLink>
              </li>
            )}
          </ul>
        )}
      </nav>
    </>
  );
};

export default Navbar;
