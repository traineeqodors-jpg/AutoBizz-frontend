import React, { useEffect, useRef, useState } from "react";
import { FaHome } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoLogIn } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetMeQuery, useLogoutMutation } from "../features/slices/orgSlice";
import { useDispatch } from "react-redux";
import { IoMdDocument } from "react-icons/io";
import { BiSolidVideos } from "react-icons/bi";
 
const MobileSideBar = ({ isDialogOpen, setIsDialogOpen }) => {
  const dialogRef = useRef(null);
 
  useEffect(() => {
    if (isDialogOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isDialogOpen]);
 
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const { data, isLoading: userLoading } = useGetMeQuery(undefined, {
    skip: !localStorage.getItem("isLoggedIn"),
  });
 
  if (userLoading) {
    return null;
  }
 
  const user = data?.data;
 
  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      localStorage.removeItem("isLoggedIn");
      dispatch({ type: "auth/logout" });
      toast.success(response?.message);
      navigate("/login", { replace: true });
    } catch (error) {
      console.warn("Server logout failed, cleaning up locally.");
    }
  };
 
  return (
    <>
      {/* <button
        className="lg:hidden"
        onClick={() => setIsDialogOpen(!isDialogOpen)}
      >
        Open
      </button> */}
      <dialog
        ref={dialogRef}
        className="lg:hidden backdrop:backdrop-blur-sm backdrop:bg-black/50 bg-sidebar min-h-screen min-w-full sm:min-w-70 shrink-0 fixed left-0 top-0 p-7 border-none outline-none"
      >
        {/* Logo and Close Button */}
        <div className="flex justify-center-safe items-center-safe">
          <div className="bg-white p-3 rounded-full ">
            <img src="/vite.svg" alt="" className="object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-text ms-5">AutoBizz</h1>
          <button
            onClick={() => setIsDialogOpen(false)}
            className="text-black absolute top-5 right-3 cursor-pointer"
          >
            <RxCross2 className="size-7 sm:size-5 font-bold text-gray-500" />
          </button>
        </div>
 
        <hr className="border-gray-300 my-5" />
 
        {/* Menu Items */}
        <ul className="w-full space-y-4">
          <li
            onClick={() => setIsDialogOpen(false)}
            className="w-full transition-all text-text/80 bg-btn-100/10 rounded-xl overflow-hidden shadow-md/10"
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? "bg-btn-100/30 text-text" : "hover:bg-btn-100/30 hover:text-btn-100"} w-full flex items-center-safe gap-3  px-3 py-2.5`
              }
            >
              <FaHome className="size-5" />
              Home
            </NavLink>
          </li>
 
          <li
            onClick={() => setIsDialogOpen(false)}
            className="w-full transition-all text-text/80 bg-btn-100/10 rounded-xl overflow-hidden shadow-md/10"
          >
            <NavLink
              to="/documents"
              className={({ isActive }) =>
                `${isActive ? "bg-btn-100/30 text-text" : "hover:bg-btn-100/30 hover:text-btn-100"} w-full flex items-center-safe gap-3  px-3 py-2.5`
              }
            >
              <IoMdDocument className="size-5" />
              My Documents
            </NavLink>
          </li>

             <li
            onClick={() => setIsDialogOpen(false)}
            className="w-full transition-all text-text/80 bg-btn-100/10 rounded-xl overflow-hidden shadow-md/10"
          >
            <NavLink
              to="/sop"
              className={({ isActive }) =>
                `${isActive ? "bg-btn-100/30 text-text" : "hover:bg-btn-100/30 hover:text-btn-100"} w-full flex items-center-safe gap-3  px-3 py-2.5`
              }
            >
              <BiSolidVideos className="size-5" />
              SOP Videos
            </NavLink>
          </li>

              <li
            onClick={() => setIsDialogOpen(false)}
            className="w-full transition-all text-text/80 bg-btn-100/10 rounded-xl overflow-hidden shadow-md/10"
          >
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${isActive ? "bg-btn-100/30 text-text" : "hover:bg-btn-100/30 hover:text-btn-100"} w-full flex items-center-safe gap-3  px-3 py-2.5`
              }
            >
              <IoMdDocument className="size-5" />
              About Us
            </NavLink>
          </li>

            <li
            onClick={() => setIsDialogOpen(false)}
            className="w-full transition-all text-text/80 bg-btn-100/10 rounded-xl overflow-hidden shadow-md/10"
          >
            <NavLink
              to="/callLogs"
              className={({ isActive }) =>
                `${isActive ? "bg-btn-100/30 text-text" : "hover:bg-btn-100/30 hover:text-btn-100"} w-full flex items-center-safe gap-3  px-3 py-2.5`
              }
            >
              <IoMdDocument className="size-5" />
              Call History
            </NavLink>
          </li>
 
          <li
            onClick={() => setIsDialogOpen(false)}
            className="w-full transition-all text-text/80 bg-btn-100/10 rounded-xl overflow-hidden shadow-md/10 px-3 py-2.5 hover:bg-btn-100/30 hover:text-btn-100"
          >
            <button
              disabled={isLoading}
              onClick={handleLogout}
              className="w-full flex items-center-safe gap-3 cursor-pointer"
            >
              <IoLogIn className="size-5" />
              {isLoading ? "Logging Out..." : "LogOut"}
            </button>
          </li>
 
          {!user && (
            <li
              onClick={() => setIsDialogOpen(false)}
              className="w-full transition-all text-text/80 bg-btn-100/10 rounded-xl overflow-hidden shadow-md/10"
            >
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${isActive ? "bg-btn-100/30 text-text" : "hover:bg-btn-100/30 hover:text-btn-100"} w-full flex items-center-safe gap-3  px-3 py-2.5`
                }
              >
                <IoLogIn className="size-5" />
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </dialog>
    </>
  );
};
 
export default MobileSideBar;