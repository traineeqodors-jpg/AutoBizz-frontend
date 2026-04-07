// import { MdDarkMode, MdSunny } from "react-icons/md";

// const Switch = ({ isDark, dispatch, toggleTheme }) => {
//   return (
//     <button
//       onClick={() => dispatch(toggleTheme())}
//       className={`
//             relative flex items-center h-8 w-15 rounded-full p-1 transition-colors duration-300 mx-auto cursor-pointer
//             ${isDark ? "bg-gray-700" : "bg-btn-100"}
//           `}
//     >
//       {/* Sliding Thumb */}
//       <span
//         className={`
//               flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300
//               ${isDark ? "translate-x-7" : "translate-x-0"}
//             `}
//       >
//         {isDark ? (
//           <MdDarkMode className="size-5 text-blue-400 animate-[spin_0.5s_ease-in-out_1]" />
//         ) : (
//           <MdSunny className="size-5 text-yellow-400 animate-[spin_0.8s_ease-in-out_1]" />
//         )}
//       </span>

//       {/* Optional: Hidden labels for screen readers */}
//       <span className="sr-only">Toggle Theme</span>
//     </button>
//   );
// };

// export default Switch;
import { MdDarkMode, MdSunny } from "react-icons/md";

const Switch = ({ isDark, dispatch, toggleTheme }) => {
  return (
    <div className="rounded-xl border-2 border-btn-50/20 dark:border-gray-800 overflow-hidden w-full mx-auto shadow-sm">
      <div className="relative flex items-center bg-back dark:bg-gray-900 rounded-lg p-1 h-10">
        {/* Sliding Highlight Background */}
        <div
          className={`absolute h-8 w-[calc(50%-4px)] bg-white dark:bg-gray-700 rounded-md shadow-sm transition-all duration-400 ease-in-out ${
            isDark ? "translate-x-[calc(100%+1px)]" : "translate-x-0"
          }`}
        />

        {/* Light Mode Button */}
        <button
          onClick={() => isDark && dispatch(toggleTheme())}
          className={`relative z-10 flex-1 flex justify-center items-center gap-2 cursor-pointer transition-colors duration-300 ${
            !isDark ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <MdSunny
            className={`size-5 ${!isDark ? "text-text animate-[spin_0.8s_ease-in-out_1]" : ""}`}
          />
        </button>

        {/* Dark Mode Button */}
        <button
          onClick={() => !isDark && dispatch(toggleTheme())}
          className={`relative z-10 flex-1 flex justify-center items-center gap-2 cursor-pointer transition-colors duration-300 ${
            isDark ? "text-white" : "text-gray-400 hover:text-gray-500"
          }`}
        >
          <MdDarkMode
            className={`size-5 ${isDark ? "text-white animate-[spin_0.5s_ease-in-out_1]" : ""}`}
          />
        </button>
      </div>
    </div>
  );
};

export default Switch;
