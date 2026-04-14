"use client";

import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center">
      {/* Animated SVG Container */}
      <div className="relative w-full max-w-md mb-8 animate-bounce [animation-duration:3s]">
        <img
          src="/404.svg"
          alt="404 Error"
          className="w-full h-auto drop-shadow-2xl"
        />

        {/* Subtitle shadow effect */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-4 bg-black/10 dark:bg-white/5 blur-xl rounded-full" />
      </div>

      {/* Error Text */}
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Oops! Something went wrong.
        </h2>

        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto text-sm md:text-base">
          The page you are looking for doesn't exist or has been moved to a
          different Route.
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={() => router.replace("/")}
        className="mt-10 flex items-center gap-2 px-8 py-3 bg-btn-100 hover:bg-btn-200 text-white rounded-full font-semibold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 active:scale-95 cursor-pointer"
      >
        <HiArrowLeft className="size-5" />
        Back to DashBoard
      </button>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-btn-100/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-blue-900/20 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
