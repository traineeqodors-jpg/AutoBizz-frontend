import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const DocumentDeleteDialog = ({
  deleteModalRef,
  closeDeleteModal,
  confirmDelete,
  isDeleting,
  targetDoc,
}) => {
  return (
    <>
      <dialog
        ref={deleteModalRef}
        className="w-full max-w-md rounded-3xl bg-white m-auto p-8 backdrop:backdrop-blur-sm backdrop:bg-text/30 animate-in fade-in zoom-in duration-200"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-red-50 text-red-500 rounded-full">
            <FaExclamationTriangle size={32} />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-text">Are you sure?</h2>
            <p className="text-text/60">
              You are about to delete{" "}
              <span className="font-bold text-text">
                "{targetDoc?.docUrl?.split("-")[0].replace("/public/", "")}"
              </span>
              . This action cannot be undone.
            </p>
          </div>

          <div className="flex w-full gap-3 mt-6">
            <button
              onClick={closeDeleteModal}
              className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-text font-bold rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              disabled={isDeleting}
              className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 transition-all cursor-pointer disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete Now"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DocumentDeleteDialog;
