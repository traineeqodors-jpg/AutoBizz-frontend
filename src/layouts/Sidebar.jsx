import { FaHome } from "react-icons/fa";
import { IoCall, IoLogIn } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetMeQuery, useLogoutMutation } from "../features/slices/orgSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { IoMdDocument } from "react-icons/io";
import { BiSolidVideos } from "react-icons/bi";
 
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
      <div className="hidden lg:block max-h-screen h-screen shrink-0 w-70 bg-btn-100/10 overflow-auto p-4 inset-shadow-sm/20">
        <div className="flex justify-center-safe items-center-safe">
          {/* Logo */}
          <div className="bg-white p-3 rounded-full">
            <img src="/vite.svg" alt="" className="object-contain" />
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
 
          {!user && (
            <li className="w-full hover:-translate-y-0.5 transition-all bg-text rounded-xl overflow-hidden shadow-md/20 px-3 py-2 hover:shadow-lg/10">
              <NavLink to="/register" className="block w-full text-white">
                Register
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
 
export default Sidebar;