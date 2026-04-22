import Link from "next/link";

import { FaPlay } from "react-icons/fa";
import { GrMagic } from "react-icons/gr";

function EmployeeSOPBanner() {
  return (
    <div className="w-full rounded-2xl relative overflow-hidden group">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-300 via-blue-400 to-blue-500 dark:[background-image:var(--background-footer)]" />

      {/* Animated Glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/30 blur-3xl rounded-full animate-pulse" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full animate-pulse" />

      {/* Optional AI grid overlay */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-size-[20px_20px]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-10 border border-white/10 backdrop-blur-xl rounded-2xl">
        {/* Left Section */}
        <div className="flex items-center gap-5">
          {/* Play Button */}
          <div className="w-14 h-14 shrink-0 flex items-center justify-center rounded-2xl bg-white/10 border border-white/20 group-hover:scale-105 transition">
            <FaPlay className="text-white text-lg" />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-white text-lg md:text-2xl font-bold flex items-center gap-2">
              AI Training SOP Videos <GrMagic className="text-blue-300" />
            </h2>

            <p className="text-white/70 text-xs md:text-sm mt-1 max-w-xl">
              Learn from AI-generated training videos created using your company
              documents. Powered by RAG-based knowledge extraction + automated
              SOP video generation.
            </p>
          </div>
        </div>

        {/* Right CTA */}
        <Link
          href="/org/sop"
          className="px-5 py-3 rounded-xl bg-white text-btn-200 font-semibold hover:bg-white/90 transition shadow-lg cursor-pointer"
        >
          Watch SOP Videos
        </Link>
      </div>
    </div>
  );
}

export default EmployeeSOPBanner;
