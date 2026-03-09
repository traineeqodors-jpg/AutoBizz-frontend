import React, { useRef, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useUploadDocumentsMutation } from "../features/slices/documentSlice";
import { toast } from "react-toastify";

const OrgInfo = ({ user }) => {
  const dialogRef = useRef(null);
  const [docFile, setDocFile] = useState("");
  const navigate = useNavigate();
  const [uploadDocument, { isLoading: docuementLoading }] =
    useUploadDocumentsMutation();
  
  const fullname = user?.firstName
    ? `${user.firstName} ${user.lastName}`
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!docFile || docFile.length === 0) return;

    const formData = new FormData();

    Array.from(docFile).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await uploadDocument(formData).unwrap();
      console.log("Files ready for upload:", formData.getAll("files"));
      toast.success(response?.message);
      setDocFile(null);
      e.target.reset();
      dialogRef.current?.close();
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error(response?.data?.message);
    }
  };

  return (
    <div className="w-full shadow-md/10 rounded-2xl bg-white flex flex-col gap-2 sm:flex-row justify-between">
      <div className="w-full shadow-md/10 rounded-2xl p-5 bg-back flex sm:flex-row flex-col gap-3 justify-between self-start">
        <h2 className="md:text-2xl lg:text-xl text-lg font-semibold text-text">
          <p className="flex sm:gap-3 gap-1 items-center flex-wrap">
            <span>Welcome {fullname ?? "User"}</span>
            <FaEdit
              className="text-btn-200 hover:scale-105 cursor-pointer"
              onClick={() => navigate("/orgprofile")}
            />
          </p>
          <p className="text-sm font-medium text-gray-400">
            Organization:
            <span className="uppercase text-slate-500 pl-1">
              {user?.businessName}
            </span>
          </p>
        </h2>
        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          className="flex flex-wrap md:px-4 md:py-2 p-3 rounded-2xl md:text-lg sm:text-sm text-xs bg-btn-200 text-white gap-1 hover:inset-shadow-sm/40 justify-center items-center"
        >
          Upload Documents <FiPlus />
        </button>
      </div>

      <dialog
        ref={dialogRef}
        className="w-lg rounded-3xl bg-back m-auto p-5 backdrop:backdrop-blur-sm backdrop:bg-text/30 space-y-5"
      >
        {/* Form  */}
        <form onSubmit={handleSubmit} className="w-full space-y-6 p-2">
          {/* Heading Container */}
          <div className="w-full flex flex-row-reverse">
            <button onClick={() => dialogRef.current?.close()}>
              <IoCloseSharp className="text-black size-4" />
            </button>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text tracking-tight">
              Business Document
            </h1>
            <p className="text-gray-500 mt-2">
              Please enter Business Documents
            </p>
          </div>

          {/* Text Area */}
          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="files"
              className="block w-full py-3 px-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-pointer hover:bg-gray-100 transition-all"
            >
              {/* This text will always be visible */}
              {docFile ? docFile[0].name : "Click to upload a file"}
            </label>

            <input
              type="file"
              id="files"
              className="hidden" // Hides the ugly default input
              multiple
              accept=".pdf, .doc, .docx"
              onChange={(e) => setDocFile(e.target.files)}
            />
          </div>
          <button className="w-full py-3 bg-btn-100 hover:bg-btn-200 text-white font-bold  rounded-xl shadow-lg shadow-btn-50/30 hover:shadow-xl hover:shadow-btn-200/40 transform hover:-translate-y-0.5 transition-all cursor-pointer">
            Upload
          </button>
        </form>

        
      </dialog>
    </div>
  );
};

export default OrgInfo;
