import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import MobileSideBar from "./MobileSideBar";
import { MdDarkMode, MdSunny } from "react-icons/md";
import { toggleTheme } from "../features/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dispatch = useDispatch();

  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <>
      <nav className="py-2 w-full flex lg:hidden justify-between px-4 sm:px-10 items-center-safe bg-back/20 dark:bg-gray-900 border-b border-gray-300 relative">
        <Link className="size-16 overflow-hidden flex flex-col justify-center-safe items-center-safe rounded-lg">
          <img src="/logo.png" alt="Logo" className="w-full object-cover" />
        </Link>

        {/* Menu Buttons */}
        <div className="flex justify-center-safe items-center-safe gap-7 text-lg">
          <button
            className="p-2 bg-gray-300 text-text dark:text-white dark:bg-gray-700 rounded-full flex gap-3 justify-center items-center-safe mx-auto cursor-pointer"
            onClick={() => dispatch(toggleTheme())}
          >
            {isDark ? (
              <MdDarkMode className="size-6 animate-[spin_0.5s_ease-in-out_1]" />
            ) : (
              <MdSunny className="size-6 animate-[spin_0.8s_ease-in-out_1] " />
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
