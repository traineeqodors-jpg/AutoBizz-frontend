import { IoIosWarning } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRef, useState } from "react";
import ViewScript from "./ViewScript";

const SopVideoCard = ({ video, handleDeleteVideo, deletingVideo, isOwner }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const viewScriptRef = useRef(null);

  const isPending = video?.videoUrl === null;
  const isFailed = video?.videoUrl === "failed";

  return (
    <div className="relative max-w-70.5 min-h-70.5 flex flex-col items-center-safe gap-2 overflow-hidden rounded-2xl shadow-md/20 bg-white dark:bg-gray-800 dark:border-0 border border-gray-300 p-2">
      {/* Options btn */}
      <div
        className="absolute right-2 top-5 z-11"
        onClick={() => setOpenMenu(!openMenu)}
      >
        <button
          type="button"
          className="cursor-pointer rounded-full hover:ring ring-gray-400"
        >
          <BsThreeDotsVertical className="size-5 dark:text-white" />
        </button>

        {openMenu && (
          <div className="absolute right-0 top-6 w-32 bg-back/90 border border-gray-300 rounded-lg shadow-lg p-2">
            <ul className="text-sm">
              {isOwner && (
                <li
                  onClick={() => handleDeleteVideo(video.id)}
                  className={`hover:bg-black/20 rounded-md p-1 cursor-pointer text-red-500 ${deletingVideo && "pointer-events-none opacity-60"}`}
                >
                  Delete
                </li>
              )}

              <li
                onClick={() => viewScriptRef.current?.showModal()}
                className={`hover:bg-black/20 rounded-md  p-1 cursor-pointer text-text ${deletingVideo && "pointer-events-none opacity-60"}`}
              >
                View Script
              </li>
            </ul>
          </div>
        )}
      </div>

      <ViewScript viewScriptRef={viewScriptRef} script={video?.videoScript} />

      {/* Display cards based on Video state */}
      {isPending ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-200/40 dark:bg-gray-700 backdrop-blur-md">
          <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-btn-100/20 border-t-btn-100 rounded-full animate-spin"></div>
          </div>
          <p className="mt-3 text-xs font-bold text-btn-100 tracking-wider uppercase animate-pulse">
            Processing high-quality AI video...
          </p>
        </div>
      ) : isFailed ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-200/40 dark:bg-gray-700 backdrop-blur-md">
          <span className="text-red-400 text-xs uppercase font-bold tracking-wider flex justify-center-safe items-center-safe gap-1">
            <IoIosWarning className="size-7" />
            Failed to Generate.
          </span>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <video className="w-full h-67 object-contain rounded-lg" controls>
            <source src={video?.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {video?.videoUrl !== "failed" && video?.videoUrl && (
        <div className="px-2 w-full flex flex-col gap-1 py-2">
          <h3 className="text-sm font-semibold tracking-widest line-clamp-1 text-text/90 dark:text-white/90">
            {video?.videoUrl}
          </h3>
        </div>
      )}
    </div>
  );
};

export default SopVideoCard;
