"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCalendarAlt, FaUsers } from "react-icons/fa";
import { IoCall, IoLogIn, IoPeopleSharp } from "react-icons/io5";
import { IoMdDocument } from "react-icons/io";
import { BiSolidVideos } from "react-icons/bi";
import ThemeSwitch from "./ui/ThemeSwitch";
import { useRouter } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import toast from "react-hot-toast";
import {
  useGetMeQuery,
  useLogoutMutation,
  userApi,
} from "@/features/slices/userSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { retry } from "@reduxjs/toolkit/query";

const NavLink = ({ href, icon: Icon, label }) => {
  const pathname = usePathname();
  const isCurrent = pathname === href;

  const handleClick = (e) => {
    if (isCurrent) e.preventDefault();
  };

  return (
    <li className="w-full hover:-translate-y-0.5 transition-all rounded-xl hover:shadow-md/10">
      <Link
        href={href}
        onClick={handleClick}
        className={`${
          isCurrent
            ? "bg-btn-100 ring-2 ring-offset-2 ring-btn-100 dark:ring-offset-surface text-white"
            : "hover:bg-btn-100/30 text-text/80 hover:text-btn-100 dark:text-gray-200"
        } w-full rounded-xl flex items-center gap-3 px-3 py-2`}
      >
        <Icon className="size-5" />
        {label}
      </Link>
    </li>
  );
};

const SideBar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();

  const router = useRouter();

  const { data: user } = userApi.endpoints.getMe.useQueryState(undefined);

  const userData = user?.data;
  const role = userData?.role;

  const isActive = (path) => pathname === path;

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
    <>
      <div className="hidden lg:block shrink-0 w-65 bg-surface overflow-auto p-4 inset-shadow-sm/20 relative">
        {/* Logo Section */}
        <div className="flex justify-center-safe items-center-safe">
          <Link
            href="/"
            className="flex items-center justify-center w-full h-25 rounded-2xl mb-2 overflow-hidden"
          >
            <Image
              src="/logo.png"
              alt="Your App Logo"
              width={200}
              height={200}
              priority
              className="w-full object-cover object-center "
              sizes="(max-width: 768px) 100vw, 200px"
            />
          </Link>
        </div>

        <hr className="border-gray-300 my-5" />

        <ul className="w-full space-y-4">
          {/* Everyone sees Dashboard */}
          <NavLink href="/org/dashboard" icon={MdDashboard} label="Dashboard" />

          {/* OWNER ONLY: Documents, Call History, Employees */}
          {role === "owner" && (
            <>
              <NavLink
                href="/org/documents"
                icon={IoMdDocument}
                label="My Documents"
              />
              <NavLink
                href="/org/callLogs"
                icon={IoCall}
                label="Call History"
              />
              <NavLink href="/org/employees" icon={FaUsers} label="Employees" />
            </>
          )}

          <NavLink href="/org/sop" icon={BiSolidVideos} label="SOP Videos" />

          {/* OWNER & SALES: Leads and Calendar */}
          {(role === "owner" || role === "sales") && (
            <>
              <NavLink href="/org/leads" icon={IoPeopleSharp} label="Leads" />
              <NavLink
                href="/org/calendar"
                icon={FaCalendarAlt}
                label="Calendar"
              />
            </>
          )}

          {/* Logout (Visible to all) */}
          <li className="w-full hover:-translate-y-0.5 transition-all hover:bg-btn-100/30 text-text/80 dark:text-gray-200 hover:text-btn-100 rounded-xl overflow-hidden hover:shadow-md/10 px-3 py-2">
            <button
              disabled={isLoading}
              onClick={handleLogout}
              className="w-full flex items-center gap-3 cursor-pointer"
            >
              <IoLogIn className="size-5" />
              {isLoading ? "Logging Out..." : "LogOut"}
            </button>
          </li>
        </ul>

        <div className="absolute bottom-0 left-0 p-5 w-full">
          <hr className="border-gray-300 my-5" />
          <ThemeSwitch />
        </div>
      </div>
    </>
  );
};

export default SideBar;
