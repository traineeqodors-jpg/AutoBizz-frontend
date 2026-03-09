import React, { useEffect, useRef, useState } from "react";
import { FaHome } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoLogIn } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const MobileSideBar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dialogRef = useRef(null);

  useEffect(() => {
    if (isDialogOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isDialogOpen]);

  return (
    <>
      <button onClick={() => setIsDialogOpen(!isDialogOpen)}>Open</button>
      <dialog
        ref={dialogRef}
        className="lg:hidden backdrop:backdrop-blur-sm backdrop:bg-black/50 bg-sidebar min-h-screen min-w-full sm:min-w-70 shrink-0 fixed left-0 top-0 p-7 border-none outline-none"
      >
        {/* Logo and Close Button */}
        <div className="flex justify-center-safe items-center-safe">
          <div className="bg-white p-3 rounded-full ">
            <img src="/vite.svg" alt="" className="object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-text ms-5">AutoBizz</h1>
          <button
            onClick={() => setIsDialogOpen(false)}
            className="text-black absolute top-5 right-3"
          >
            <RxCross2 className="size-7 sm:size-5 font-bold text-gray-500" />
          </button>
        </div>

        <hr className="border-gray-300 my-5" />

        {/* Menu Items */}
        <ul className="w-full space-y-4">
          <li
            onClick={() => setIsDialogOpen(false)}
            className="w-full transition-all text-text/80 bg-btn-100/30 rounded-xl overflow-hidden shadow-md/10 px-3 py-2.5"
          >
            <NavLink to="/" className="w-full flex items-center-safe gap-3">
              <FaHome className="size-5" />
              Home
            </NavLink>
          </li>
          <li
            onClick={() => setIsDialogOpen(false)}
            className="w-full transition-all text-text/80 bg-btn-100/30 rounded-xl overflow-hidden shadow-md/10 px-3 py-2.5"
          >
            <NavLink
              to="/register"
              className="w-full flex items-center-safe gap-3"
            >
              <IoLogIn className="size-5" />
              Register
            </NavLink>
          </li>
        </ul>
      </dialog>
    </>
  );
};

export default MobileSideBar;
