"use client";

import { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { FaExclamationCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import CustomToast from "./CustomToast";
import {
  documentApi,
  useUploadDocumentsMutation,
} from "@/features/slices/documentSlice";
import { ensureSocketRoom, getSocket } from "@/lib/socket";
import { useGetMeQuery } from "@/features/slices/userSlice";
import { useDispatch } from "react-redux";

function DocumentUploadDialog({ dialogRef }) {
  const [docFile, setDocFile] = useState(null);
  const [localError, setLocalError] = useState("");

  const router = useRouter();

  const dispatch = useDispatch();

  // store current upload info
  const activeUpload = useRef({
    uuid: null,
    toastId: null,
  });

  const { data } = useGetMeQuery();
  const user = data?.data;

  const [uploadDocument, { isLoading }] = useUploadDocumentsMutation();

  // SINGLE listener for document status updates
  useEffect(() => {
    const socket = getSocket(user);

    if (!socket) return;

    const handler = (data) => {
      console.log("Socket data:", data);

      if (data.uuid !== activeUpload.current.uuid) return;

      if (activeUpload.current.toastId) {
        toast.dismiss(activeUpload.current.toastId);
      }

      if (data.status === "completed") {
        toast.success(data.message);

        dispatch(documentApi.util.invalidateTags(["documents"]));
      } else {
        toast.error(data.message);
      }

      activeUpload.current = { uuid: null, toastId: null };
    };

    socket.on("document-status", handler);

    return () => {
      socket.off("document-status", handler);
    };
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLocalError("");

    if (!docFile) {
      setLocalError("Please select a file.");
      return;
    }

    await ensureSocketRoom(user);

    const formData = new FormData();
    formData.append("file", docFile);

    try {
      const response = await uploadDocument(formData).unwrap();

      const uuid = response.data.pineconeId;

      console.log("Document UUID:", uuid);

      // show loading toast & store id
      const toastId = toast.custom((t) => (
        <CustomToast
          t={t}
          toastTitle={response?.message}
          toastMessage="Processing document..."
          router={router}
          navLink="org/documents"
        />
      ));

      // track current upload
      activeUpload.current = { uuid, toastId };

      setDocFile(null);
      dialogRef.current?.close();
    } catch (err) {
      console.error(err);
      setLocalError(err?.data?.message || "Upload failed.");
    }

    e.target.reset();
  };

  return (
    <dialog
      ref={dialogRef}
      className="w-lg rounded-3xl bg-back dark:bg-gray-900 m-auto p-5 space-y-5 backdrop:bg-black/40"
    >
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Close */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                dialogRef.current?.close();
                setLocalError("");
              }}
              type="button"
              className="hover:bg-gray-200 p-2 rounded-full dark:hover:text-black dark:text-white cursor-pointer text-black transition-all"
            >
              <IoCloseSharp className="size-5" />
            </button>
          </div>

          {/* Heading */}
          <h1 className="text-xl sm:text-2xl font-bold text-text text-center">
            Upload Business Document
          </h1>

          {/* File */}
          <label className="block cursor-pointer border p-3 rounded-xl text-text">
            {docFile ? docFile.name : "Click to upload"}
            <input
              type="file"
              hidden
              onChange={(e) => {
                setDocFile(e.target.files[0]);
                setLocalError("");
              }}
            />
          </label>

          {/* Error */}
          {localError && (
            <div className="text-red-500 flex gap-2">
              <FaExclamationCircle />
              {localError}
            </div>
          )}

          {/* Submit */}
          <button
            disabled={isLoading}
            className="w-full py-3 bg-btn-100 hover:bg-btn-200 text-white font-medium sm:font-bold rounded-xl shadow-md shadow-btn-50/30 hover:shadow-lg hover:shadow-btn-200/40 transform hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            {isLoading ? "Uploading..." : "Upload Document"}
          </button>
        </form>
      </motion.div>
    </dialog>
  );
}

export default DocumentUploadDialog;
