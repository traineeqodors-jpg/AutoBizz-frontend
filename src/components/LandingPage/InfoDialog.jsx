import { motion } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";
 
const InfoDialog = ({ dialogRef, title, features = [] }) => {
  return (
    <dialog
      ref={dialogRef}
      className="w-[90%] max-w-2xl rounded-2xl bg-white dark:bg-gray-900 m-auto shadow-2xl backdrop:bg-black/40 dark:backdrop:bg-gray-700/40 overflow-hidden animate-in fade-in zoom-in duration-200"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
        className="p-3 flex flex-col items-center text-center"
      >
        <div className="w-full p-2 flex justify-end">
          <button
            className="rounded-full p-2 dark:text-white hover:dark:bg-white hover:dark:text-black cursor-pointer"
            onClick={() => dialogRef.current?.close()}
          >
            <IoCloseSharp className="size-5" />
          </button>
        </div>
 
        {/* Content and Title */}
        <div className="w-full p-3 space-y-5 flex flex-col">
          <h2 className="text-center text-xl dark:text-white font-semibold shrink-0">
            {title}
          </h2>
          <div className="w-full max-h-[60vh] overflow-y-auto scheme-dark p-5 text-left dark:text-gray-300">
            <ul className="list-disc space-y-4 marker:text-btn-100">
              {features.map((item, index) => (
                <li key={index} className="pl-2">
                  <span className="font-bold text-btn-100">{item.label}: </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </dialog>
  );
};
 
export default InfoDialog;
 