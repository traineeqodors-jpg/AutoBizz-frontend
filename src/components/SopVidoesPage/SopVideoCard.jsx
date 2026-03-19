import React from "react";

const SopVideoCard = ({ status = "ready", title = "Video Name", src = "movie.mp4" }) => {
  const isPending = status === "pending";

  return (
    <div className="relative w-full flex flex-col gap-3 overflow-hidden rounded-2xl shadow-md bg-white border border-gray-200 p-3 transition-transform hover:scale-[1.01]">
      
      {/* Pending state overlay */}
      {isPending && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-50/80 backdrop-blur-md">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-xs font-bold text-blue-700 tracking-widest uppercase">
            Processing...
          </p>
        </div>
      )}

      {/* Video Container - Forced to 16:9 ratio */}
      <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-inner">
        {!isPending && (
          <video 
            className="w-full h-full object-cover" // Changed to cover to fill width
            autoPlay 
            muted 
            playsInline 
            controls 
            loop
          >
            <source src={src} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Footer Content */}
      <div className="px-1 py-1">
        <h3 className="text-sm md:text-base font-bold text-gray-900 line-clamp-1">
          {title}
        </h3>
        <p className="text-[11px] text-gray-500 uppercase tracking-tighter">
          {isPending ? "System Working" : "High Quality AI"}
        </p>
      </div>
    </div>
  );
};

export default SopVideoCard;
