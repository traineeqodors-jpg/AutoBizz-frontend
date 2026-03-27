import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useUploadDocumentsMutation } from "../features/slices/documentSlice";
import { toast } from "react-toastify";
import { FaExclamationCircle } from "react-icons/fa";

function DocuementUploadDialog({ dialogRef }) {
  const [docFile, setDocFile] = useState("");
   const [localError, setLocalError] = useState(""); // Local error state

  const [uploadDocument, { isLoading: docuementLoading }] =
    useUploadDocumentsMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

     setLocalError(""); 

    if (!docFile ) {
      setLocalError("Please select at least one file to upload.");
      return;
    }

    const formData = new FormData();

   
      formData.append("file", docFile);
   

      try {
      const response = await uploadDocument(formData).unwrap();
      toast.success(response?.message); 
      setDocFile(null);
      setLocalError("");
   
      dialogRef.current?.close();
    } catch (err) {
      console.error("Upload failed:", err);
      // Set the error message locally instead of using toast.error
      setLocalError(err?.data?.message || "An unexpected error occurred during upload.");
         
      
    }

        e.target.reset();
     
     
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        className="w-lg rounded-3xl bg-back m-auto p-5 backdrop:bg-black/40 space-y-5"
      >
        {/* Form  */}
        <form onSubmit={handleSubmit} className="w-full space-y-6 p-2">
          {/* Heading Container */}
          <div className="w-full flex flex-row-reverse">
            <button type="button" onClick={() => {dialogRef.current?.close() , setLocalError("")}}>
              <IoCloseSharp className="text-black size-4 cursor-pointer" />
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
              {docFile ? docFile?.name : "Click to upload a file"}
            </label>

            <input
              type="file"
              id="files"
              className="hidden" // Hides the ugly default input
             
              accept=".pdf, .doc, .docx"
              onChange={(e) => {setDocFile(e.target.files[0]);
                  setLocalError("");}
              }
            />
          </div>

          {localError && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl animate-in fade-in slide-in-from-top-1">
              <FaExclamationCircle className="shrink-0" />
              <p className="text-sm font-medium">{localError}</p>
            </div>
          )}
          <button 
          disabled={docuementLoading}
          className={`${docuementLoading ? "opacity-80" : "opacity-100"} w-full py-3 bg-btn-100 hover:bg-btn-200 text-white font-bold  rounded-xl shadow-lg shadow-btn-50/30 hover:shadow-xl hover:shadow-btn-200/40 transform hover:-translate-y-0.5 transition-all cursor-pointer`}>
           
           {docuementLoading ? "Uploading .." : "Upload" } 
          </button>
        </form>
      </dialog>
    </>
  );
}

export default DocuementUploadDialog;