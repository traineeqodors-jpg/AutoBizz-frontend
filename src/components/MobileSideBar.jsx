"use client";

import { use, useEffect, useRef, useState } from "react";
import { FaCalendarAlt, FaHome, FaUsers } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoCall, IoLogIn, IoPeopleSharp } from "react-icons/io5";
import { IoMdDocument } from "react-icons/io";
import { BiSolidVideos } from "react-icons/bi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetMeQuery,
  useLogoutMutation,
  userApi,
} from "@/features/slices/userSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import toast from "react-hot-toast";

// NavLink component
const NavLink = ({ href, icon: Icon, label, setIsDialogOpen }) => {
  const pathname = usePathname();
  const isCurrent = pathname === href;

  const handleClick = (e) => {
    if (isCurrent) e.preventDefault();
    setIsDialogOpen(false);
  };

  return (
    <li className="w-full transition-all text-text/80 dark:text-white bg-white/30 border border-white/40 dark:bg-btn-100/40 rounded-xl shadow-md/10">
      <Link
        href={href}
        onClick={handleClick}
        className={`${
          isCurrent
            ? "bg-btn-100 ring-2 ring-offset-2 dark:ring-offset-surface ring-btn-100 text-white"
            : "hover:bg-btn-100/30 hover:text-btn-100"
        } rounded-xl w-full flex items-center gap-3 px-3 py-2.5`}
      >
        <Icon className="size-5" />
        {label}
      </Link>
    </li>
  );
};

const MobileSideBar = ({ isDialogOpen, setIsDialogOpen }) => {
  const dialogRef = useRef(null);
  const dispatch = useDispatch();

  const [logout, { isLoading }] = useLogoutMutation();

  const { data: user } = useGetMeQuery();
  const userData = user?.data;
  const role = userData?.role;

  const router = useRouter();

  useEffect(() => {
    if (isDialogOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isDialogOpen]);

  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      router.replace("/");
      dispatch(userApi.util.resetApiState());
      toast.success(response?.message);
    } catch (error) {
      console.log(error);
      console.warn("Server logout failed, cleaning up locally.", error);
    }
  };

  return (
    <AnimatePresence>
      {isDialogOpen && (
        <div className="fixed inset-0 z-100 lg:hidden">
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
                className="flex items-center justify-center w-full h-18 rounded-2xl overflow-hidden"
              >
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={200}
                  height={200}
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
              <NavLink
                href="/org/dashboard"
                icon={FaHome}
                label="Dashboard"
                setIsDialogOpen={setIsDialogOpen}
              />

              {/* OWNER ONLY: Documents, Call History, Employees */}
              {role === "owner" && (
                <>
                  <NavLink
                    href="/org/documents"
                    icon={IoMdDocument}
                    label="My Documents"
                    setIsDialogOpen={setIsDialogOpen}
                  />

                  <NavLink
                    href="/org/callLogs"
                    icon={IoCall}
                    label=" Call History"
                    setIsDialogOpen={setIsDialogOpen}
                  />

                  <NavLink
                    href="/org/employees"
                    icon={FaUsers}
                    label="Employees"
                    setIsDialogOpen={setIsDialogOpen}
                  />
                </>
              )}

              {/* OWNER & SALES: Leads and Calendar */}
              {(role === "owner" || role === "sales") && (
                <>
                  <NavLink
                    href="/org/leads"
                    icon={IoPeopleSharp}
                    label=" Leads"
                    setIsDialogOpen={setIsDialogOpen}
                  />

                  <NavLink
                    href="/org/calendar"
                    icon={FaCalendarAlt}
                    label="Calendar"
                    setIsDialogOpen={setIsDialogOpen}
                  />
                </>
              )}

              <NavLink
                href="/org/sop"
                icon={BiSolidVideos}
                label="SOP Videos"
                setIsDialogOpen={setIsDialogOpen}
              />

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
