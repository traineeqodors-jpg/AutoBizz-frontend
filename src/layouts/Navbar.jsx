import React, { useRef, useState } from "react";
import { IoLogOut, IoMenu } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import {
  orgApi,
  useGetMeQuery,
  useLogoutMutation,
} from "../features/slices/orgSlice";

import MobileSideBar from "./MobileSideBar";
import { MdDarkMode, MdSunny } from "react-icons/md";
import { toggleTheme } from "../features/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  const isDark = useSelector((state) => state.theme.isDark);

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

  // const handleLogout = async () => {
  //   try {
  //     await logout().unwrap();
  //   } catch (error) {
  //     console.warn("Server logout failed, cleaning up locally.");
  //   } finally {
  //     localStorage.removeItem("token");

  //     dispatch(orgApi.util.resetApiState());

  //     toast.success("Logged out successfully");
  //   }
  // };

  return (
    <>
      <nav className="py-2 w-full flex lg:hidden justify-between px-4 sm:px-10 items-center-safe bg-back/20 dark:bg-gray-900 border-b border-gray-300 relative">
        <div className="size-15 overflow-hidden flex flex-col justify-center-safe items-center-safe rounded-full dark:bg-white">
          <img src="/autoBizz.png" alt="Logo" className="w-full h-full" />
        </div>

        {/* Menu Buttons */}
        <div className="flex justify-center-safe items-center-safe gap-7 text-lg">
         
          <button
            className="p-2 bg-btn-200 text-white dark:bg-gray-700 rounded-full flex gap-3 justify-center items-center-safe mx-auto cursor-pointer"
            onClick={() => dispatch(toggleTheme())}
          >
            {isDark ? (
              <MdDarkMode className="size-6 animate-[spin_0.5s_ease-in-out_1]" />
            ) : (
              <MdSunny className="size-6 animate-[spin_0.5s_ease-in-out_1] text-yellow-400" />
            )}
          </button>

          <button
            onClick={() => setIsDialogOpen(!isDialogOpen)}
            className="decoration-2 underline-offset-2 hover:translate-y-0.5 transition-all cursor-pointer dark:text-white"
          >
            <IoMenu className="size-8" />
          </button>
        </div>

       

        {/* Mobile SideBar */}
        {isDialogOpen && (
          <MobileSideBar
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        )}
      </nav>
    </>
  );
};

export default Navbar;