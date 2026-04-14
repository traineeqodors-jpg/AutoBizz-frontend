"use client";

import { useEffect, useRef, useState } from "react";
import { FaCalendarAlt, FaHome } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoCall, IoLogIn, IoPeopleSharp } from "react-icons/io5";
import { IoMdDocument } from "react-icons/io";
import { BiSolidVideos } from "react-icons/bi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLogoutMutation } from "@/features/slices/userSlice";

const MobileSideBar = ({ isDialogOpen, setIsDialogOpen }) => {
  const dialogRef = useRef(null);

  const [logout, { isLoading }] = useLogoutMutation();

  useEffect(() => {
    if (isDialogOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isDialogOpen]);

  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      toast.success(response?.message);

      router.replace("/");
    } catch (error) {
      console.warn("Server logout failed, cleaning up locally.", error);
    }
  };
  return (
    <AnimatePresence>
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Fade Out */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDialogOpen(false)}
            className="fixed inset-0 bg-black/20"
          />

          {/* Sidebar Slide Out */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-linear-to-br from-slate-50 to-blue-200 dark:bg-none dark:bg-gray-900 min-h-screen min-w-full sm:min-w-70 shrink-0 fixed left-0 top-0 p-7 border-none outline-none shadow-xl"
          >
            <div className="flex justify-center-safe items-center-safe relative">
              <Link
                href="/"
                className="flex items-center justify-center w-full h-25 rounded-2xl overflow-hidden"
              >
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="size-40 object-cover object-center"
                />
              </Link>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="text-black absolute top-0 -right-3 cursor-pointer"
              >
                <RxCross2 className="size-7 sm:size-5 font-bold text-gray-500" />
              </button>
            </div>

            <hr className="border-gray-300 my-5" />

            {/* Menu Items */}
            <ul className="w-full space-y-4">
              {/* DashBoard */}
              <li
                onClick={() => setIsDialogOpen(false)}
                className="w-full transition-all text-text/80 dark:text-white bg-white/30 border border-white/40 dark:bg-btn-100/40 rounded-xl shadow-md/10"
              >
                <Link
                  href="/org/dashboard"
                  className={`${
                    isActive("/org/dashboard")
                      ? "bg-btn-100 ring-2 ring-offset-2 ring-btn-100 dark:ring-offset-gray-900 text-white"
                      : "hover:bg-btn-100/30 hover:text-btn-100"
                  } rounded-xl  w-full flex items-center-safe gap-3  px-3 py-2.5`}
                >
                  <FaHome className="size-5" />
                  Home
                </Link>
              </li>

              {/* Documents */}
              <li
                onClick={() => setIsDialogOpen(false)}
                className="w-full transition-all text-text/80 dark:text-white bg-white/30 border border-white/40 dark:bg-btn-100/40 rounded-xl shadow-md/10"
              >
                <Link
                  href="/org/documents"
                  className={`${
                    isActive("/org/documents")
                      ? "bg-btn-100 ring-2 ring-offset-2 ring-btn-100 dark:ring-offset-gray-900 text-white"
                      : "hover:bg-btn-100/30 hover:text-btn-100"
                  } rounded-xl  w-full flex items-center-safe gap-3  px-3 py-2.5`}
                >
                  <IoMdDocument className="size-5" />
                  My Documents
                </Link>
              </li>

              {/* SOP */}
              <li
                onClick={() => setIsDialogOpen(false)}
                className="w-full transition-all text-text/80 dark:text-white bg-white/30 border border-white/40 dark:bg-btn-100/40 rounded-xl shadow-md/10"
              >
                <Link
                  href="/org/sop"
                  className={`${
                    isActive("/org/sop")
                      ? "bg-btn-100 ring-2 ring-offset-2 ring-btn-100 dark:ring-offset-gray-900 text-white"
                      : "hover:bg-btn-100/30 hover:text-btn-100"
                  } rounded-xl  w-full flex items-center-safe gap-3  px-3 py-2.5`}
                >
                  <BiSolidVideos className="size-5" />
                  SOP Videos
                </Link>
              </li>

              {/* Leads */}
              <li
                onClick={() => setIsDialogOpen(false)}
                className="w-full transition-all text-text/80 dark:text-white bg-white/30 border border-white/40 dark:bg-btn-100/40 rounded-xl shadow-md/10"
              >
                <Link
                  href="/org/leads"
                  className={`${
                    isActive("/org/leads")
                      ? "bg-btn-100 ring-2 ring-offset-2 ring-btn-100 dark:ring-offset-gray-900 text-white"
                      : "hover:bg-btn-100/30 hover:text-btn-100"
                  } rounded-xl  w-full flex items-center-safe gap-3  px-3 py-2.5`}
                >
                  <IoPeopleSharp className="size-5" />
                  Leads
                </Link>
              </li>

              {/* Calendar */}
              <li
                onClick={() => setIsDialogOpen(false)}
                className="w-full transition-all text-text/80 dark:text-white bg-white/30 border border-white/40 dark:bg-btn-100/40 rounded-xl shadow-md/10"
              >
                <Link
                  href="/org/calendar"
                  className={`${
                    isActive("/org/calendar")
                      ? "bg-btn-100 ring-2 ring-offset-2 ring-btn-100 dark:ring-offset-gray-900 text-white"
                      : "hover:bg-btn-100/30 hover:text-btn-100"
                  } rounded-xl  w-full flex items-center-safe gap-3  px-3 py-2.5`}
                >
                  <FaCalendarAlt className="size-5" />
                  Calendar
                </Link>
              </li>

              {/* Call logs */}
              <li
                onClick={() => setIsDialogOpen(false)}
                className="w-full transition-all text-text/80 dark:text-white bg-white/30 border border-white/40 dark:bg-btn-100/40 rounded-xl shadow-md/10"
              >
                <Link
                  href="/org/callLogs"
                  className={`${
                    isActive("/org/callLogs")
                      ? "bg-btn-100 ring-2 ring-offset-2 ring-btn-100 dark:ring-offset-gray-900 text-white"
                      : "hover:bg-btn-100/30 hover:text-btn-100"
                  } rounded-xl  w-full flex items-center-safe gap-3  px-3 py-2.5`}
                >
                  <IoCall className="size-5" />
                  Call History
                </Link>
              </li>

              {/* Logout */}
              <li
                onClick={() => setIsDialogOpen(false)}
                className="w-full transition-all text-text/80 dark:text-white bg-white/30 border border-white/40 dark:bg-btn-100/40 rounded-xl shadow-md/10 px-3 py-2.5 hover:bg-btn-100/30 hover:text-btn-100"
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
            </ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileSideBar;
