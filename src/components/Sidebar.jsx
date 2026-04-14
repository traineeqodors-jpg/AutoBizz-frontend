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
import { useLogoutMutation, userApi } from "@/features/slices/userSlice";
import { useDispatch } from "react-redux";

const SideBar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();

  const router = useRouter();

  const isActive = (path) => pathname === path;

  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      toast.success(response?.message);
      dispatch(userApi.util.resetApiState());
      router.replace("/");
    } catch (error) {
      console.warn("Server logout failed, cleaning up locally.", error);
    }
  };
  return (
    <>
      <div className="hidden lg:block shrink-0 w-65 bg-surface overflow-auto p-4 inset-shadow-sm/20 relative">
        <div className="flex justify-center-safe items-center-safe">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center justify-center w-full h-25 rounded-2xl mb-2 overflow-hidden"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full object-cover object-center "
            />
          </Link>
        </div>

        <hr className="border-gray-300 my-5" />

        <ul className="w-full space-y-4 ">
          {/* DashBoard */}
          <li className="w-full hover:-translate-y-0.5 transition-all rounded-xl hover:shadow-md/10 ">
            <Link
              href="/org/dashboard"
              className={`${
                isActive("/org/dashboard")
                  ? "bg-btn-100 ring-2 ring-offset-2 ring-btn-100 dark:ring-offset-surface text-white"
                  : "hover:bg-btn-100/30 text-text/80 hover:text-btn-100 dark:text-gray-200"
              } w-full rounded-xl flex items-center gap-3 px-3 py-2`}
            >
              <MdDashboard className="size-5" />
              Dashboard
            </Link>
          </li>

          {/* My Documents */}
          <li className="w-full hover:-translate-y-0.5 transition-all rounded-xl hover:shadow-md/10 ">
            <Link
              href="/org/documents"
              className={`${
                isActive("/org/documents")
                  ? "bg-btn-100 ring-2 ring-offset-2 ring-btn-100 dark:ring-offset-surface text-white"
                  : "hover:bg-btn-100/30 text-text/80 hover:text-btn-100 dark:text-gray-200"
              } w-full rounded-xl flex items-center gap-3 px-3 py-2`}
            >
              <IoMdDocument className="size-5" />
              My Documents
            </Link>
          </li>

          {/* SOP Videos */}
          <li className="w-full hover:-translate-y-0.5 transition-all  rounded-xl hover:shadow-md/10 ">
            <Link
              href="/org/sop"
              className={`${
                isActive("/org/sop")
                  ? "bg-btn-100 ring-2 ring-offset-2 ring-btn-100 dark:ring-offset-surface text-white"
                  : "hover:bg-btn-100/30 text-text/80 hover:text-btn-100 dark:text-gray-200"
              } w-full rounded-xl flex items-center gap-3 px-3 py-2`}
            >
              <BiSolidVideos className="size-5" />
              SOP Videos
            </Link>
          </li>

          {/* Leads */}
          <li className="w-full hover:-translate-y-0.5 transition-all rounded-xl hover:shadow-md/10 ">
            <Link
              href="/org/leads"
              className={`${
                isActive("/org/leads")
                  ? "bg-btn-100 ring-2 ring-offset-2 ring-btn-100 dark:ring-offset-surface text-white"
                  : "hover:bg-btn-100/30 text-text/80 hover:text-btn-100 dark:text-gray-200"
              } w-full rounded-xl flex items-center gap-3 px-3 py-2`}
            >
              <IoPeopleSharp className="size-5" />
              Leads
            </Link>
          </li>

          {/* Calendar */}
          <li className="w-full hover:-translate-y-0.5 transition-all rounded-xl hover:shadow-md/10 ">
            <Link
              href="/org/calendar"
              className={`${
                isActive("/org/calendar")
                  ? "bg-btn-100 ring-2 ring-offset-2 ring-btn-100 dark:ring-offset-surface text-white"
                  : "hover:bg-btn-100/30 text-text/80 hover:text-btn-100 dark:text-gray-200"
              } w-full rounded-xl flex items-center gap-3 px-3 py-2`}
            >
              <FaCalendarAlt className="size-5" />
              Calendar
            </Link>
          </li>

          {/* Call Logs */}
          <li className="w-full hover:-translate-y-0.5 transition-all  rounded-xl hover:shadow-md/10 ">
            <Link
              href="/org/callLogs"
              className={`${
                isActive("/org/callLogs")
                  ? "bg-btn-100 ring-2 ring-offset-2 ring-btn-100 dark:ring-offset-surface text-white"
                  : "hover:bg-btn-100/30 text-text/80 hover:text-btn-100 dark:text-gray-200"
              } w-full rounded-xl flex items-center gap-3 px-3 py-2`}
            >
              <IoCall className="size-5" />
              Call History
            </Link>
          </li>

          {/* Employees */}
          <li className="w-full hover:-translate-y-0.5 transition-all  rounded-xl hover:shadow-md/10 ">
            <Link
              href="/org/employees"
              className={`${
                isActive("/org/employees")
                  ? "bg-btn-100 ring-2 ring-offset-2 ring-btn-100 dark:ring-offset-surface text-white"
                  : "hover:bg-btn-100/30 text-text/80 hover:text-btn-100 dark:text-gray-200"
              } w-full rounded-xl flex items-center gap-3 px-3 py-2`}
            >
              <FaUsers className="size-5" />
              Employees
            </Link>
          </li>

          {/* Logout  */}
          <li
            className={`w-full hover:-translate-y-0.5 transition-all hover:bg-btn-100/30 text-text/80 dark:text-gray-200  hover:text-btn-100 rounded-xl overflow-hidden hover:shadow-md/10 px-3 py-2 `}
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

        <div className="absolute bottom-0 left-0 p-5 w-full">
          <hr className="border-gray-300 my-5" />

          <ThemeSwitch />
        </div>
      </div>
    </>
  );
};

export default SideBar;
