import { FaGoogle, FaHome } from "react-icons/fa";
import { IoCall, IoLogIn, IoPeopleSharp } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import {
  useGetMeQuery,
  useGoogleTokenMutation,
  useLogoutMutation,
} from "../features/slices/orgSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { IoMdDocument } from "react-icons/io";
import { BiSolidVideos } from "react-icons/bi";
import { useGoogleLogin } from "@react-oauth/google";
 
const Sidebar = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const {
    data,
    isLoading: userLoading,
    isFetching,
  } = useGetMeQuery(undefined, {
    skip: !localStorage.getItem("isLoggedIn"),
  });
 
  const [googleToken, { isLoading: gooleLoading, isSuccess }] =
    useGoogleTokenMutation();
 
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
      console.warn("Server logout failed, cleaning up locally.");
    }
  };
 
  const showGoogleOverlay = user && user.googleRefreshToken === null;
 
  // Login with google
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        console.log("Send this to BackEnd : ", response.code);
        const res = await googleToken(response.code).unwrap();
        toast.success(response?.message);
      } catch (error) {
        toast.error(error?.data?.message);
      }
    },
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/calendar.events",
    onError: (error) => {
      console.log(error);
    },
  });
 
  return (
    <>
      <div className="hidden lg:block shrink-0 w-70 bg-btn-100/10 overflow-auto p-4 inset-shadow-sm/20">
        <div className="flex justify-center-safe items-center-safe">
          {/* Logo */}
          <div className="bg-white flex items-center justify-center size-20 rounded-full shadow-inner mb-2 overflow-hidden">
            <img
              src="/autoBizz.png"
              alt="Logo"
              className="size-20 object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-text ms-5">AutoBizz</h1>
        </div>
 
        <hr className="border-gray-300 my-5" />
 
        <ul className="w-full space-y-4 ">
          <li className="w-full hover:-translate-y-0.5 transition-all  rounded-xl overflow-hidden hover:shadow-md/10 ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? "bg-btn-100/30 text-text" : "hover:bg-btn-100/30 hover:text-btn-100"} w-full flex items-center-safe gap-3  text-text/80 px-3 py-2 `
              }
            >
              <FaHome className="size-5" />
              Home
            </NavLink>
          </li>
 
          {!user && (
            <li className="w-full hover:-translate-y-0.5 transition-all hover:bg-btn-100/30 rounded-xl overflow-hidden hover:shadow-md/10 px-3 py-2 ">
              <NavLink
                to="/login"
                className="w-full text-text/80 flex items-center-safe gap-3"
              >
                <IoLogIn className="size-5" />
                Login
              </NavLink>
            </li>
          )}
 
          <li className="w-full hover:-translate-y-0.5 transition-all  rounded-xl overflow-hidden hover:shadow-md/10 ">
            <NavLink
              to="/documents"
              className={({ isActive }) =>
                `${isActive ? "bg-btn-100/30 text-text" : "hover:bg-btn-100/30 hover:text-btn-100"} w-full flex items-center-safe gap-3  text-text/80 px-3 py-2 `
              }
            >
              <IoMdDocument className="size-5" />
              My Documents
            </NavLink>
          </li>
 
          <li className="w-full hover:-translate-y-0.5 transition-all  rounded-xl overflow-hidden hover:shadow-md/10 ">
            <NavLink
              to="/sop"
              className={({ isActive }) =>
                `${isActive ? "bg-btn-100/30 text-text" : "hover:bg-btn-100/30 hover:text-btn-100"} w-full flex items-center-safe gap-3  text-text/80 px-3 py-2 `
              }
            >
              <BiSolidVideos className="size-5" />
              SOP Videos
            </NavLink>
          </li>
 
          {/* Blurr Links */}
          <div className="relative mt-4">
            <div
              className={`${showGoogleOverlay && "blur-[2px] pointer-events-none select-none opacity-50"} space-y-4`}
            >
              <li className="w-full hover:-translate-y-0.5 transition-all rounded-xl overflow-hidden hover:shadow-md/10 ">
                <NavLink
                  to="/leads"
                  className={({ isActive }) =>
                    `${isActive ? "bg-btn-100/30 text-text" : "hover:bg-btn-100/30 hover:text-btn-100"} w-full flex items-center-safe gap-3  text-text/80 px-3 py-2 `
                  }
                >
                  <IoPeopleSharp className="size-5" />
                  Leads
                </NavLink>
              </li>
 
              <li className="w-full hover:-translate-y-0.5 transition-all  rounded-xl overflow-hidden hover:shadow-md/10 ">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `${isActive ? "bg-btn-100/30 text-text" : "hover:bg-btn-100/30 hover:text-btn-100"} w-full flex items-center-safe gap-3  text-text/80 px-3 py-2 `
                  }
                >
                  <IoMdDocument className="size-5" />
                  About Us
                </NavLink>
              </li>
 
              <li className="w-full hover:-translate-y-0.5 transition-all  rounded-xl overflow-hidden hover:shadow-md/10 ">
                <NavLink
                  to="/callLogs"
                  className={({ isActive }) =>
                    `${isActive ? "bg-btn-100/30 text-text" : "hover:bg-btn-100/30 hover:text-btn-100"} w-full flex items-center-safe gap-3  text-text/80 px-3 py-2 `
                  }
                >
                  <IoCall className="size-5" />
                  Call History
                </NavLink>
              </li>
 
              {!user && (
                <li className="w-full hover:-translate-y-0.5 transition-all bg-text rounded-xl overflow-hidden shadow-md/20 px-3 py-2 hover:shadow-lg/10">
                  <NavLink to="/register" className="block w-full text-white">
                    Register
                  </NavLink>
                </li>
              )}
            </div>
 
            {/* The "Login with Google" Overlay */}
            {showGoogleOverlay && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 shadow-sm">
                <p className="text-xs font-semibold text-text mb-3">
                  Login to unlock more features
                </p>
                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors text-sm font-medium border border-gray-200"
                >
                  <FaGoogle />
                  Sign in with Google
                </button>
              </div>
            )}
          </div>
 
          <li
            className={`${isLoading && "opacity-60"}w-full hover:-translate-y-0.5 transition-all hover:bg-btn-100/30 text-text/80  hover:text-btn-100 rounded-xl overflow-hidden hover:shadow-md/10 px-3 py-2 `}
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
      </div>
    </>
  );
};
 
export default Sidebar;