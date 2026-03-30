import { useState } from "react";
import { IoMenu } from "react-icons/io5";

import { useGetMeQuery } from "../features/slices/orgSlice";

import MobileSideBar from "./MobileSideBar";

const Navbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const token = localStorage.getItem("token");

  const {
    
    isLoading: userLoading,
   
  } = useGetMeQuery(undefined, {
    skip: !token,
  });

  if (userLoading) {
    return null;
  }




  return (
    <>
      <nav className="py-2 w-full flex lg:hidden justify-between px-4 sm:px-10 items-center-safe bg-back/20 border-b border-gray-300 relative">
        <div>
          <img src="/autoBizz.png" alt="Logo" className="size-20" />
        </div>

        {/* Menu Buttons */}
        <div className="flex justify-center-safe items-center-safe gap-7 text-lg">
          {/* <button
            onClick={handleLogout}
            className="decoration-2 underline-offset-2 hover:translate-y-0.5 transition-all cursor-pointer"
          >
            <IoLogOut className="size-8" />
          </button>
 
          {!user && (
            <NavLink className="px-5 py-2 text-sm font-normal tracking-wider bg-btn-100 text-white rounded-3xl cursor-pointer">
              Login
            </NavLink>
          )} */}

          <button
            onClick={() => setIsDialogOpen(!isDialogOpen)}
            className="decoration-2 underline-offset-2 hover:translate-y-0.5 transition-all cursor-pointer"
          >
            <IoMenu className="size-8" />
          </button>
        </div>

        {/* Mobile Menu */}
        {/* {isOpen && (
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
        )} */}

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
