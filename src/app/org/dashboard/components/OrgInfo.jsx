"use client";

import DocumentUploadDialog from "@/components/ui/DocumentUploadDialog";
import { useGetOrgDetailsQuery } from "@/features/slices/orgDetailsSlice";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

// import DocuementUploadDialog from "./DocuementUploadDialog";

const OrgInfo = ({ user, isOwner }) => {
  const dialogRef = useRef(null);
  const router = useRouter();

  const { data: orgResponse, isLoading } = useGetOrgDetailsQuery(undefined, {
    skip: isOwner,
  });

  const fullname = user?.firstName
    ? `${user.firstName} ${user.lastName}`
    : null;

  return (
    <div className="w-full shadow-sm dark:shadow-sm dark:shadow-gray-700/30 rounded-2xl bg-surface border border-slate-100 dark:border-gray-800 hover:border-btn-100/30 transition-all duration-300 flex flex-col gap-2 sm:flex-row justify-between">
      <div className="w-full p-4 sm:p-10 dark:border-0 flex sm:flex-row flex-col gap-3 justify-between self-start">
        <h2 className="md:text-2xl lg:text-xl text-lg font-extrabold text-text">
          <p className="flex sm:gap-3 gap-1 items-center flex-wrap">
            <span className="text-heading dark:text-white">
              Welcome, <span className="text-text">{fullname ?? "User"}</span>
            </span>
            <FaEdit
              id="edit-profile"
              className="text-btn-200 hover:scale-105 cursor-pointer"
              onClick={() => router.push("/org/profile")}
            />
          </p>
          <p className="text-sm font-medium text-gray-400 dark:text-gray-200 mt-1">
            Organization:
            <span className="uppercase text-btn-100/90 font-semibold dark:text-slate-50 pl-1">
              {user?.businessName || orgResponse?.data?.businessName}
            </span>
          </p>
        </h2>
        {isOwner && (
          <button
            type="button"
            id="modal-upload"
            onClick={() => dialogRef.current?.showModal()}
            className="flex flex-wrap md:px-4 cursor-pointer md:py-2 p-3 rounded-2xl md:text-lg text-xs bg-btn-100 dark:bg-btn-200 hover:bg-btn-200 text-white gap-1 hover:inset-shadow-sm/40 justify-center items-center"
          >
            Upload Documents <FiPlus />
          </button>
        )}
      </div>
      <DocumentUploadDialog dialogRef={dialogRef} />
    </div>
  );
};

export default OrgInfo;
