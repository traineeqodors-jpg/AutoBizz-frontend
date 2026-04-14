import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

export default function HeroSection() {
  return (
    <>
      <div className="max-w-6xl mx-auto p-4 sm:p-8 text-center space-y-4 flex items-center gap-5">
        {/* Text Content */}
        <div className="text-center md:text-left flex-[1.5] space-y-6">
          <span className="inline-block bg-btn-100/10 text-btn-100 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-btn-100/20">
            The Future of Support
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-text leading-[1.1] tracking-tight">
            Powerful <span className="text-btn-100">AI Solutions</span> <br />
            for Business Automation
          </h1>
          <p className="text-text/60 max-w-xl text-lg md:text-xl leading-relaxed">
            Deploy AI customer support and AI-based SOP training videos created
            on your business data in minutes.
          </p>

          {/* Added a CTA button to balance the text side */}
          <div className="pt-4">
            <button className="bg-btn-100 mx-auto md:mx-0 flex items-center-safe gap-3 text-white px-8 py-4 shadow-md shadow-btn-100/30 rounded-2xl font-bold hover:shadow-lg hover:shadow-btn-100/30 transition-all cursor-pointer">
              Get Started
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Image Content */}
        <div className="hidden md:block flex-1  w-full relative">
          {/* Decorative background glow behind image */}
          <div className="absolute -inset-4 bg-btn-100/20 blur-3xl rounded-full opacity-30 animate-pulse"></div>

          <div className="shrink-0 relative overflow-hidden h-100 lg:h-125 rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl border-4 border-white dark:border-gray-700 shadow-2xl">
            <Image
              src="/head.webp"
              alt="AI Solutions Visualization"
              fill
              priority
              // Add this prop
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
