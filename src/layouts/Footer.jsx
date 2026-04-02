import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-text dark:bg-gray-950/70 flex flex-col font-normal p-5 text-white">
        {/* Footer Head */}
        {/* <div className="flex sm:px-10 justify-between items-center-safe">
          <div className="flex flex-col justify-center-safe items-center-safe">
            <img src="/vite.svg" alt="" />
            <h1 className="font-semibold text-lg">AutoBizz</h1>
          </div>

          <div>
            <address>+1234 1234 123</address>
            <address>Qodors@gamil.com</address>
          </div>
        </div> */}

        {/* Content Container */}
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-around tracking-wider p-5">
          {/* Logo */}
          <div className="flex-1 flex flex-col justify-center-safe items-center-safe">
            <div className="bg-white flex items-center justify-center size-25 rounded-full shadow-inner mb-2 overflow-hidden">
              <img
                src="/autoBizz.webp"
                alt="Logo"
                className="size-25 object-cover"
              />
            </div>
            <h1 className="font-bold text-xl ">AutoBizz</h1>
          </div>

          {/* Grid Container for Options */}
          <div className="flex-3 grid grid-cols-2 sm:grid-cols-3 gap-5">
            {/* Options 1 */}
            <div className="flex-1 flex flex-col justify-center-safe items-center-safe">
              <h1 className="font-semibold mb-1">About Us</h1>
              <NavLink className="text-gray-400 font-medium text-sm">
                Hello
              </NavLink>
              <NavLink className="text-gray-400 font-medium text-sm">
                Hello
              </NavLink>
              <NavLink className="text-gray-400 font-medium text-sm">
                Hello
              </NavLink>
            </div>

            {/* Options 2 */}
            <div className="flex-1 flex flex-col justify-center-safe items-center-safe">
              <h1 className="font-semibold  mb-1">Address</h1>
              <NavLink className="text-gray-400 font-medium text-sm">
                Hello
              </NavLink>
              <NavLink className="text-gray-400 font-medium text-sm">
                Hello
              </NavLink>
              <NavLink className="text-gray-400 font-medium text-sm">
                Hello
              </NavLink>
            </div>

            {/* Options 3 */}
            <div className="flex-1 flex flex-col justify-center-safe items-center-safe">
              <h1 className="font-semibold mb-1">Follow Us</h1>
              <NavLink className="text-gray-400 font-medium text-sm">
                Hello
              </NavLink>
              <NavLink className="text-gray-400 font-medium text-sm">
                Hello
              </NavLink>
              <NavLink className="text-gray-400 font-medium text-sm">
                Hello
              </NavLink>
            </div>
          </div>
        </div>

        <hr className="w-full my-4 border border-gray-300" />

        <div className="flex justify-center items-center-safe gap-10 mx-auto w-full">
          <button className=" bg-btn-100 py-2 px-2 rounded-full hover:bg-btn-200 hover:text-white shadow-md/50 hover:translate-y-0.5 hover:shadow-lg/40 shadow-cyan-400/70 transition-all cursor-pointer">
            <FaGoogle className="size-4 sm:size-6" />
          </button>
          <button className=" bg-btn-100  py-2 px-2 rounded-full hover:bg-btn-200 hover:text-white shadow-md/50 hover:translate-y-0.5 hover:shadow-lg/40 shadow-cyan-400/70 transition-all cursor-pointer">
            <FaFacebookF className="size-4 sm:size-6" />
          </button>
          <button className=" bg-btn-100  py-2 px-2 rounded-full hover:bg-btn-200 hover:text-white shadow-md/50 hover:translate-y-0.5 hover:shadow-lg/40 shadow-cyan-400/70 transition-all cursor-pointer">
            <FaTwitter className="size-4 sm:size-6" />
          </button>
          <button className=" bg-btn-100  py-2 px-2 rounded-full hover:bg-btn-200 hover:text-white shadow-md/50 hover:translate-y-0.5 hover:shadow-lg/40 shadow-cyan-400/70 transition-all cursor-pointer">
            <RiInstagramFill className="size-4 sm:size-6" />
          </button>
        </div>

        <p className="inline-block my-5 text-center text-sm">
          @Copyright all right reserved
        </p>
      </footer>
    </>
  );
};

export default Footer;