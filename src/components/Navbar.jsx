"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react"; // Removed useEffect
import { IoMenu } from "react-icons/io5";
import { MdDarkMode, MdSunny } from "react-icons/md";
import MobileSideBar from "./MobileSideBar";
import Image from "next/image";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Still need this for the click handler logic
  const isDark = theme === "dark";

  return (
    <nav className="py-2 w-full flex lg:hidden justify-between px-4 sm:px-10 items-center bg-surface border-b border-gray-300 relative">
      <Link
        href="/org/dashboard"
        className="size-16 overflow-hidden flex flex-col justify-center items-center rounded-lg"
      >
        <Image
          src="/logo.png"
          alt="Your App Logo"
          width={200}
          height={200}
          priority
          loading="eager"
          placeholder="blur"
          blurDataURL="/logo.png"
          className="w-full object-cover object-center"
        />
      </Link>

      <div className="flex items-center gap-7 text-lg">
        {/* Theme Toggle Button */}
        <button
          className="p-2 bg-gray-300 text-text dark:text-white dark:bg-gray-700 rounded-full flex justify-center items-center cursor-pointer min-w-10 min-h-10"
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {/* Dark Icon: Only visible when 'dark' class exists on <html> */}
          <MdDarkMode className="hidden dark:block size-6 animate-[spin_0.5s_ease-in-out_1]" />

          {/* Light Icon: Only visible when 'dark' class is missing */}
          <MdSunny className="block dark:hidden size-6 animate-[spin_0.8s_ease-in-out_1]" />
        </button>

        <button
          onClick={() => setIsDialogOpen(!isDialogOpen)}
          className="hover:translate-y-0.5 transition-all cursor-pointer dark:text-white"
        >
          <IoMenu
            className={`size-8 transition-transform duration-300 ${
              isDialogOpen ? "scale-110" : "scale-100"
            } active:scale-90`}
          />
        </button>
      </div>

      <MobileSideBar
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </nav>
  );
};

export default Navbar;
