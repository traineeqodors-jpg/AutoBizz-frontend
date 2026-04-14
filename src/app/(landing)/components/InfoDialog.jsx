"use client";
import { motion } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";

const InfoDialog = ({ dialogRef, title, features = [] }) => {
  return (
    <dialog
      ref={dialogRef}
      className="w-[95%] max-w-xl rounded-3xl bg-back dark:bg-surface m-auto shadow-2xl backdrop:bg-black/60 overflow-hidden border border-white/20 dark:border-gray-800"
    >
      <div className="relative flex flex-col h-full max-h-[85vh]">
        {/* Header Section with Gradient Blur */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-5 bg-back dark:bg-surface backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold text-text tracking-tight">
            {title}
          </h2>
          <button
            className="rounded-xl p-2 text-gray-500 hover:bg-btn-100/20 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            onClick={() => dialogRef.current?.close()}
          >
            <IoCloseSharp className="size-6" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto p-6 sm:p-8 custom-scrollbar">
          {/* Main container animation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="space-y-6">
              {features.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex gap-4 items-start"
                >
                  {/* Your custom Bullet Indicator */}
                  <span className="mt-1.5 size-2 rounded-full bg-btn-100 ring-4 ring-btn-100/10 shrink-0" />

                  <div className="space-y-1 text-left">
                    <p className="font-bold text-btn-100 text-sm uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="text-text/80 dark:text-gray-300 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Footer / Action Section Restored */}
        <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-back dark:bg-surface">
          <button
            onClick={() => dialogRef.current?.close()}
            className="w-full py-3 bg-btn-100 hover:bg-btn-200 text-white rounded-xl font-bold transition-all shadow-lg shadow-btn-100/20 cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default InfoDialog;
