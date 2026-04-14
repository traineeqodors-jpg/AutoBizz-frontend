import { FaArrowRight } from "react-icons/fa";
import { RiNotification3Fill } from "react-icons/ri";

function CustomToast({ t, toastTitle, toastMessage, router, navLink }) {
  return (
    <div
      className={`${
        t.visible ? "animate-custom-enter" : "animate-custom-leave"
      } max-w-md w-full bg-white dark:bg-gray-700 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="shrink-0 pt-0.5">
            <RiNotification3Fill className="dark:text-white" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {toastTitle}
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-200">
              {toastMessage}
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200 dark:border-gray-700">
        <button
          onClick={() => router.push(`/${navLink}`)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 dark:text-white hover:text-indigo-500 hover:dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default CustomToast;
