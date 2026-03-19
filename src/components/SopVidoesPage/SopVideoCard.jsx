 
 
import React from "react";
 
const SopVideoCard = ({ status = "ready", title = "Video Name" }) => {
  const isPending = status === "pending";
 
  return (
    <div className="relative max-w-67.5 min-h-62.5 flex flex-col items-center-safe gap-2 overflow-hidden rounded-2xl shadow-md/20 bg-white border border-gray-300 p-2">
      {/* Pending state */}
      {isPending ? (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-200/40 backdrop-blur-md">
          <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-btn-100/20 border-t-btn-100 rounded-full animate-spin"></div>
 
            {/* <div className="absolute w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div> */}
          </div>
          <p className="mt-3 text-xs font-bold text-btn-100 tracking-wider uppercase animate-pulse">
            Processing high-quality AI video...
          </p>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <video className="w-full h-60 object-contain rounded-lg" controls>
            <source src="movie.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
 
      <div className="px-2 w-full flex flex-col gap-1 py-2">
        <h3 className="text-sm font-semibold tracking-widest line-clamp-1 text-text/90">
          video name
        </h3>
        {/* {isPending && (
          <span className="text-[10px] text-gray-400 italic">
            Processing high-quality AI video...
          </span>
        )} */}
      </div>
    </div>
  );
  };
 
export default SopVideoCard;
 