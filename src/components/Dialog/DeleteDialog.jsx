
import { FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion"; 

const DeleteDialog = ({
  deleteModalRef,
  closeDeleteModal,
  confirmDelete,
  isDeleting,
}) => {
  

  return (
    <dialog
      ref={deleteModalRef}
       className="w-[90%] max-w-sm rounded-2xl bg-white dark:bg-gray-900 m-auto p-6 shadow-2xl backdrop:bg-black/40 dark:backdrop:bg-gray-700/40  animate-in fade-in zoom-in duration-200"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
        className="p-6 flex flex-col items-center text-center"
      >
        <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-4">
          <FaExclamationTriangle size={24} />
        </div>

        <div className="space-y-1 px-2">
          <h2 className="text-xl font-bold text-text dark:text-white tracking-tight">Confirm Delete</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Are you sure you want to remove
          </p>
        </div>

        <div className="flex w-full gap-3 mt-6">
          <button
            onClick={closeDeleteModal}
            className="flex-1 py-3 text-sm bg-gray-50 cursor-pointer hover:bg-gray-100 text-gray-600 font-bold rounded-xl transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            disabled={isDeleting}
             className="flex-1 py-3 text-sm cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-md dark:shadow-none shadow-red-200 transition-all disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </motion.div>
    </dialog>
  );
};

export default DeleteDialog;