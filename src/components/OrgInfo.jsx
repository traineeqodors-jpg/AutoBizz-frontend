import React, { useRef, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useUploadDocumentsMutation } from "../features/slices/documentSlice";
import { toast } from "react-toastify";
import DocuementUploadDialog from "./DocuementUploadDialog";

const OrgInfo = ({ user }) => {
  const dialogRef = useRef(null);
  const navigate = useNavigate();
  
  
  const fullname = user?.firstName
    ? `${user.firstName} ${user.lastName}`
    : null;

  

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
      <DocuementUploadDialog dialogRef={dialogRef} />
      
    </div>
  );
};

export default OrgInfo;
