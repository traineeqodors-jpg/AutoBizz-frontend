import { FaCalendarAlt, FaGoogle, FaHome } from "react-icons/fa";
import { IoCall, IoLogIn, IoPeopleSharp } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  useGetMeQuery,
  useGoogleTokenMutation,
  useLogoutMutation,
} from "../features/slices/orgSlice";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { IoMdDocument } from "react-icons/io";
import { BiSolidVideos } from "react-icons/bi";
import { toggleTheme } from "../features/slices/themeSlice";
import Switch from "../components/ui/Switch";

const Sidebar = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isDark = useSelector((state) => state.theme.isDark);

  const { data, isLoading: userLoading } = useGetMeQuery(undefined, {
    skip: !localStorage.getItem("isLoggedIn"),
  });

  if (userLoading) {
    return null;
  }

  const user = data?.data;

  // Handle Logout
  const handleLogout = async () => {
    try {
      const response = await logout().unwrap();
      localStorage.removeItem("isLoggedIn");
      dispatch({ type: "auth/logout" });
      toast.success(response?.message);
      navigate("/login", { replace: true });
    } catch (error) {
      console.warn("Server logout failed, cleaning up locally.", error);
    }
  };

  return (
    <>
      <div className="hidden lg:block shrink-0 w-65 dark:bg-gray-900 overflow-auto p-4 inset-shadow-sm/20 relative">
        <div className="flex justify-center-safe items-center-safe">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center justify-center w-full h-25 rounded-2xl mb-2 overflow-hidden"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full object-cover object-center "
            />
          </Link>
          {/* <h1 className="text-2xl font-bold text-text dark:text-white ms-5">
            AutoBizz
          </h1> */}
        </div>

        <hr className="border-gray-300 my-5" />

        <ul className="w-full space-y-4 ">
          <li className="w-full hover:-translate-y-0.5 transition-all rounded-xl hover:shadow-md/10 ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? "bg-btn-100 ring-2 ring-offset-2 ring-btn-100 dark:ring-offset-gray-900 text-white" : "hover:bg-btn-100/30 text-text/80 hover:text-btn-100"} w-full rounded-xl flex items-center-safe gap-3 dark:text-gray-200 px-3 py-2 `
              }
            >
              <FaHome className="size-5" />
              Home
            </NavLink>
          </li>

          <li className="w-full hover:-translate-y-0.5 transition-all  rounded-xl hover:shadow-md/10 ">
            <NavLink
              to="/documents"
              className={({ isActive }) =>
                `${isActive ? "bg-btn-100 ring-2 ring-offset-2 ring-btn-100 dark:ring-offset-gray-900 text-white" : "hover:bg-btn-100/30 text-text/80 hover:text-btn-100"} w-full rounded-xl flex items-center-safe gap-3 dark:text-gray-200 px-3 py-2 `
              }
            >
              <IoMdDocument className="size-5" />
              My Documents
            </NavLink>
          </li>

          <li className="w-full hover:-translate-y-0.5 transition-all  rounded-xl hover:shadow-md/10 ">
            <NavLink
              to="/sop"
              className={({ isActive }) =>
                `${isActive ? "bg-btn-100 ring-2 ring-offset-2 ring-btn-100 dark:ring-offset-gray-900 text-white" : "hover:bg-btn-100/30 text-text/80 hover:text-btn-100"} w-full rounded-xl flex items-center-safe gap-3 dark:text-gray-200 px-3 py-2 `
              }
            >
              <BiSolidVideos className="size-5" />
              SOP Videos
            </NavLink>
          </li>

          <li className="w-full hover:-translate-y-0.5 transition-all rounded-xl hover:shadow-md/10 ">
            <NavLink
              to="/leads"
              className={({ isActive }) =>
                `${isActive ? "bg-btn-100 ring-2 ring-offset-2 ring-btn-100 dark:ring-offset-gray-900 text-white" : "hover:bg-btn-100/30 text-text/80 hover:text-btn-100"} w-full rounded-xl flex items-center-safe gap-3 dark:text-gray-200 px-3 py-2 `
              }
            >
              <IoPeopleSharp className="size-5" />
              Leads
            </NavLink>
          </li>

          <li className="w-full hover:-translate-y-0.5 transition-all rounded-xl hover:shadow-md/10 ">
            <NavLink
              to="/calendar"
              className={({ isActive }) =>
                `${isActive ? "bg-btn-100 ring-2 ring-offset-2 ring-btn-100 dark:ring-offset-gray-900 text-white" : "hover:bg-btn-100/30 text-text/80 hover:text-btn-100"} w-full rounded-xl flex items-center-safe gap-3 dark:text-gray-200 px-3 py-2 `
              }
            >
              <FaCalendarAlt className="size-5" />
              Calendar
            </NavLink>
          </li>

          <li className="w-full hover:-translate-y-0.5 transition-all  rounded-xl hover:shadow-md/10 ">
            <NavLink
              to="/callLogs"
              className={({ isActive }) =>
                `${isActive ? "bg-btn-100 ring-2 ring-offset-2 ring-btn-100 dark:ring-offset-gray-900 text-white" : "hover:bg-btn-100/30 text-text/80 hover:text-btn-100"} w-full rounded-xl flex items-center-safe gap-3 dark:text-gray-200 px-3 py-2 `
              }
            >
              <IoCall className="size-5" />
              Call History
            </NavLink>
          </li>

          <li
            className={`${isLoading && "opacity-60"}w-full hover:-translate-y-0.5 transition-all hover:bg-btn-100/30 text-text/80 dark:text-gray-200  hover:text-btn-100 rounded-xl overflow-hidden hover:shadow-md/10 px-3 py-2 `}
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

          <Switch
            isDark={isDark}
            dispatch={dispatch}
            toggleTheme={toggleTheme}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
