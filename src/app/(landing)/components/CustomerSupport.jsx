import {
  IoGlobeOutline,
  IoHeadsetOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

export default function CustomerSupport() {
  return (
    <>
      <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-10">
        <div className="max-w-6xl mx-auto bg-surface rounded-[3rem] p-8 md:p-16 shadow-xl shadow-text/5 border border-white dark:border-gray-400 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="p-3 bg-btn-100/10 text-btn-100 rounded-2xl w-fit">
              <IoHeadsetOutline size={32} />
            </div>
            <h2 className="text-3xl font-bold text-text">
              24/7 Premium Support
            </h2>
            <p className="text-text/60 dark:text-gray-300 leading-relaxed text-lg">
              We don't just provide software; we provide a partnership. Every
              plan includes:
            </p>
            <ul className="space-y-3">
              {[
                "Dedicated Account Manager",
                "Custom AI Prompt Engineering",
                "99.9% Uptime Guarantee",
                "Live Technical Integration",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-text/70 dark:text-gray-400 font-medium"
                >
                  <IoShieldCheckmarkOutline className="text-btn-100" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="bg-back p-6 rounded-3xl text-center space-y-2">
              <p className="text-3xl font-bold text-text">15m</p>
              <p className="text-[10px] uppercase font-bold text-text/40 tracking-widest">
                Avg. Setup Time
              </p>
            </div>
            <div className="bg-btn-100 p-6 rounded-3xl text-center space-y-2 text-white">
              <p className="text-3xl font-bold">2M+</p>
              <p className="text-[10px] uppercase font-bold opacity-70 tracking-widest">
                Calls Processed
              </p>
            </div>
            <div className="col-span-2 bg-gray-900 dark:bg-back p-6 rounded-3xl flex items-center justify-between text-white">
              <div>
                <p className="font-bold">Global Presence</p>
                <p className="text-xs opacity-50">Serving 40+ countries</p>
              </div>
              <IoGlobeOutline size={30} className="opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
