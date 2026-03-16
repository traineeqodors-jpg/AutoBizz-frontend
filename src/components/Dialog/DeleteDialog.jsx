import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const DeleteDialog = ({
  deleteModalRef,
  closeDeleteModal,
  confirmDelete,
  isDeleting,
  targetElement,
}) => {
  // Extracting a cleaner display name from your data
  const displayName =  "this record";

  return (
    <dialog
      ref={deleteModalRef}
      className="w-[90%] max-w-sm rounded-[2.5rem] bg-white m-auto p-6 shadow-2xl backdrop:backdrop-blur-sm backdrop:bg-gray-900/40 animate-in fade-in zoom-in duration-200"
    >
      <div className="flex flex-col items-center text-center">
        {/* Smaller, cleaner icon container */}
        <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-4">
          <FaExclamationTriangle size={24} />
        </div>

        <div className="space-y-1 px-2">
          <h2 className="text-xl font-bold text-text tracking-tight">Confirm Delete</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Are you sure you want to remove <br />
            <span className="font-bold text-text">"{displayName}"</span>?
          </p>
        </div>

        {/* Buttons matching your Sign In / Home style */}
        <div className="flex w-full gap-3 mt-6">
          <button
            onClick={closeDeleteModal}
            className="flex-1 py-3 text-sm bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            disabled={isDeleting}
            className="flex-1 py-3 text-sm bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-md shadow-red-200 transition-all disabled:opacity-50"
          >
            {isDeleting ? "..." : "Delete"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteDialog;
