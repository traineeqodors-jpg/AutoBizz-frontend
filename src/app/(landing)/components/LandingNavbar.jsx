"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { MdDarkMode, MdSunny } from "react-icons/md";

const LandingNavbar = () => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const isDark = theme === "dark";

  const isActive = (path) => pathname === path;
  return (
    <>
      <nav className="sticky top-0 w-full z-100 bg-surface">
        <div className="max-w-6xl mx-auto p-2 flex justify-between items-center-safe sm:px-10 px-4 xl:px-0">
          {/* Logo */}
          <div className="size-16 overflow-hidden flex flex-col justify-center-safe items-center-safe rounded-lg">
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
          </div>

          <div className="flex gap-10">
            {/* Menu Items */}
            <ul className="hidden sm:flex justify-center-safe items-center-safe gap-7 font-medium">
              <li className="hover:translate-y-0.5 transition-all">
                <Link
                  href="/"
                  className={`${
                    isActive("/") ? "text-heading" : "text-text"
                  } font-semibold`}
                >
                  Home
                </Link>
              </li>

              <li className="hover:translate-y-0.5 transition-all">
                <Link
                  href="/login"
                  className={`${
                    isActive("/login") ? "text-heading" : "text-text"
                  } font-semibold`}
                >
                  Login
                </Link>
              </li>

              <li className="hover:translate-y-0.5 transition-all">
                <Link
                  href="/register"
                  className={`${
                    isActive("/register") ? "text-heading" : "text-text"
                  } font-semibold`}
                >
                  Register
                </Link>
              </li>
            </ul>

            {/* Theme Toggle Button */}
            <button
              className="p-2 bg-gray-300 text-text dark:bg-gray-700 rounded-full flex justify-center items-center cursor-pointer min-w-10 min-h-10"
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              {!mounted ? (
                <div className="size-6" />
              ) : isDark ? (
                <MdDarkMode className="size-6 animate-[spin_0.5s_ease-in-out_1]" />
              ) : (
                <MdSunny className="size-6 animate-[spin_0.8s_ease-in-out_1]" />
              )}
            </button>

            {/* Menu Buttons */}
            <div className="sm:hidden flex justify-center-safe items-center-safe gap-7 text-lg">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="sm:hidden dark:text-white decoration-2 underline-offset-2 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                <IoMenu className="size-8" />
              </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
              <ul className="w-[95%] absolute top-22 left-1/2 -translate-x-1/2 flex flex-col sm:hidden bg-btn-100/20 dark:bg-gray-900/90 backdrop-blur-sm gap-5 p-5 text-center rounded-2xl text-white z-1000 border border-white/10 shadow-2xl">
                <li className="px-10">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className={`${
                      isActive("/") ? "text-btn-100" : "text-text"
                    } block py-1 decoration-2 underline-offset-2 w-full border-b font-semibold`}
                  >
                    Home
                  </Link>
                </li>

                <li className="px-10">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className={`${
                      isActive("/login") ? "text-btn-100" : "text-text"
                    } block py-1 decoration-2 underline-offset-2 w-full border-b font-semibold`}
                  >
                    Login
                  </Link>
                </li>

                <li className="px-10">
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className={`${
                      isActive("/register") ? "text-btn-100" : "text-text"
                    } block py-1 decoration-2 underline-offset-2 w-full border-b font-semibold`}
                  >
                    Register
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default LandingNavbar;
