import React, { useState } from "react";
import { GrMagic } from "react-icons/gr";
import { IoCloseSharp } from "react-icons/io5";
import {
  IoMdClose,
  IoMdDocument,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";
import { toast } from "react-toastify";
import { FaExclamationCircle } from "react-icons/fa";
 
function GenerateScript({
  genScriptRef,
  handleScriptGeneration,
  documents,
  genVideoRef,
  script,
  setVideoScript,
}) {
 
 
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
 
  // Logic to add a file
  const addFile = (file) => {
    if (!selectedFiles.find((f) => f.id === file.id)) {
      setSelectedFiles([...selectedFiles, file]);
    }
    setIsDropdownOpen(false);
  };
 
  // Logic to remove a file
  const removeFile = (fileId) => {
    setSelectedFiles(selectedFiles.filter((f) => f.id !== fileId));
  };
 
  //select all
  const handleSelectAll = () => {
    setSelectedFiles(documents);
    setIsDropdownOpen(false);
  };
 
  async function handleScriptGeneration(e) {
    e.preventDefault();
 
    if (selectedFiles.length <= 0) {
      setErrorMsg("Please select atleast one document!");
      return;
    }
 
    if (query.trim() == "") {
      setErrorMsg("Please enter video topic!");
      return;
    }
 
    console.log("Submit");
    
    try {
      setErrorMsg("");
      const payload = {
        query: query,
        fileUuids: selectedFiles.map((f) => f.pineconeId),
      };
      genScriptRef.current?.close();
      genVideoRef.current?.showModal();
 
      const response = await script(payload).unwrap();
 
      setVideoScript(response?.data);
    } catch (error) {
      setErrorMsg("No context found in the selected document!");
      genVideoRef.current?.close();
      genScriptRef.current?.showModal();
    }
 
    // Add your ragRetrieval call here
  }
 
  return (
    <dialog
      ref={genScriptRef}
      className="w-lg rounded-3xl bg-back m-auto p-5 backdrop:bg-text/40 space-y-5"
    >
      <form className="w-full space-y-6 p-2" onSubmit={handleScriptGeneration}>
        {/* Heading Container */}
        <div className="w-full flex flex-row-reverse">
          <button onClick={() => genScriptRef.current?.close()} type="button">
            <IoCloseSharp className="text-black size-4 cursor-pointer" />
          </button>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text tracking-tight">
            Prepare Video Script
          </h1>
        </div>
        {/* Document Selection Section */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center ml-1">
            <label className="text-sm font-bold text-gray-700">
              Select Documents
            </label>
            <span className="text-xs text-btn-50 font-medium bg-btn-50/10 px-2 py-0.5 rounded-md">
              {selectedFiles.length} Selected
            </span>
          </div>
 
          <div className="relative">
            {/* Tag/Input Container */}
            <div className="min-h-13.75 p-2.5 flex flex-wrap gap-2 border-2 border-gray-200 rounded-2xl focus-within:border-btn-50 transition-all bg-gray-50/30">
              {selectedFiles.length > 0 ? (
                selectedFiles.map((file) => (
                  <span
                    key={file.id}
                    className="flex items-center gap-2 bg-btn-200 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm animate-in zoom-in duration-150"
                  >
                    <IoMdDocument />
                    <span className="max-w-37.5 truncate">
                      {file.docUrl
                        ?.split("/")
                        .pop()
                        ?.split("-")
                        .slice(0, -2)
                        .join("-") || "Untitled Document"}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(file.id)}
                      className="hover:bg-btn-200 rounded-full p-0.5 transition-colors cursor-pointer"
                    >
                      <IoMdClose size={14} />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm flex items-center ml-2 pointer-events-none">
                  No files selected...
                </span>
              )}
 
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-text text-xs font-bold px-3 py-1.5 hover:bg-text/10 rounded-xl transition-all cursor-pointer border border-dashed border-text ml-auto"
              >
                + Browse Files
              </button>
            </div>
 
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <>
                <div
                  className="fixed flex flex-col inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                ></div>
                <div className="absolute z-20 mt-2 w-full max-h-64 overflow-y-auto bg-white border border-gray-200 shadow-2xl rounded-2xl p-2">
                  {documents.length <= 0 ? (
                    <span className=" font-medium text-xs text-red-500 text-center">
                      No Documents found! Please Upload
                    </span>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={handleSelectAll}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-btn-100 hover:bg-btn-50/10 rounded-lg mb-1 flex items-center gap-2 border-b border-gray-50 pb-3"
                      >
                        <IoMdCheckmarkCircleOutline size={16} />
                        Select All Documents
                      </button>
                      {documents?.map((doc) => (
                        <button
                          key={doc.id}
                          type="button"
                          disabled={selectedFiles.find((f) => f.id === doc.id)}
                          onClick={() => addFile(doc)}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 rounded-xl transition-colors flex items-center justify-between group disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <div className="flex items-center gap-3">
                            <IoMdDocument
                              className="text-gray-400 group-hover:text-btn-100"
                              size={20}
                            />
                            <span className="text-gray-700 font-medium">
                              {doc?.docUrl
                                ?.split("/")
                                .pop()
                                ?.split("-")
                                .slice(0, -2)
                                .join("-") || "Untitled Document"}
                            </span>
                          </div>
                          {selectedFiles.find((f) => f.id === doc.id) && (
                            <IoMdCheckmarkCircleOutline className="text-green-500" />
                          )}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
 
        {/* Query Input Section */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700 ml-1">
            SOP Topic
          </label>
          <div className="relative group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter topic you want to generate video on..."
              className="w-full p-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-btn-50 focus:bg-white transition-all text-gray-800 font-medium"
            />
          </div>
        </div>
 
        {errorMsg && (
                   <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl animate-in fade-in slide-in-from-top-1">
                     <FaExclamationCircle className="shrink-0" />
                     <p className="text-sm font-medium">{errorMsg}</p>
                   </div>
                 )}
 
        <button
          className={`w-full py-3 bg-btn-100 hover:bg-btn-200 text-white font-bold flex justify-center items-center gap-2  rounded-xl shadow-lg shadow-btn-50/30 hover:shadow-xl hover:shadow-btn-200/40 transform hover:-translate-y-0.5 transition-all cursor-pointer`}
        >
          Generate Script <GrMagic />
        </button>
      </form>
    </dialog>
  );
}
 
export default GenerateScript;
 