"use client";

import { toast } from "react-hot-toast";
import { useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoCloseOutline, IoCameraOutline } from "react-icons/io5";

import { motion, AnimatePresence } from "framer-motion";
import ProfileInfo from "./components/ProfileInfo";
import AdditionalDetails from "./components/AdditionalDetails";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import {
  useGetMeQuery,
  useUpdateOrgMutation,
} from "@/features/slices/userSlice";
import { useGetOrgDetailsQuery } from "@/features/slices/orgDetailsSlice";
import OrgDetails from "./components/OrgInfo";

function EditOrgDetails() {
  const [updateImage, { isLoading: imageIsLoading }] = useUpdateOrgMutation();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      await updateImage(formData).unwrap();
      toast.success("Profile image updated!");
    } catch (err) {
      toast.error(err?.data?.message || "Upload failed");
    }
  };

  const { data } = useGetMeQuery();
  const { data: orgData, isLoading: orgDetailsLoading } =
    useGetOrgDetailsQuery();

  const user = data?.data;

  const profileImageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${user?.profileImage}`;
  const businessName = user?.businessName;
  const fullname = user?.firstName
    ? `${user.firstName} ${user.lastName}`
    : "User Name";

  const [update] = useUpdateOrgMutation();

  const handleProfileSave = async (updatedDetails) => {
    try {
      const response = await update(updatedDetails).unwrap();
      toast.success(response?.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  if (orgDetailsLoading) {
    return null;
  }
  console.log(orgData);

  return (
    <AnimatedWrapper>
      <div className="min-h-screen mx-auto w-full">
        <div className="grid w-full gap-4 sm:gap-10 py-3 sm:py-5">
          {/* Header Card */}
          <div className="w-full bg-white dark:bg-gray-900 dark:shadow-md dark:shadow-gray-700/30 rounded-2xl shadow-sm border dark:border-none border-slate-100 p-5 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            {/* 1. PROFILE IMAGE SECTION */}
            <div className="relative group size-24 sm:size-32 shrink-0">
              <div
                onClick={() => setIsPreviewOpen(true)}
                className="relative w-full h-full bg-white rounded-full border-2 border-slate-100 overflow-hidden cursor-pointer shadow-sm hover:border-blue-400 transition-all flex items-center justify-center"
              >
                {/* If image is uploading, show a spinner inside the circle */}
                {imageIsLoading ? (
                  <AiOutlineLoading3Quarters className="size-8 animate-spin text-blue-500" />
                ) : (
                  <img
                    src={profileImageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover" // Changed to cover for better profile feel
                    loading="lazy" // Native Lazy Loading
                    width="128"
                    height="128"
                  />
                )}
                {!imageIsLoading && (
                  <div className="absolute bottom-0 w-full bg-gray-800/40 py-1 text-center text-[10px] font-medium text-white backdrop-blur-sm">
                    View
                  </div>
                )}
              </div>

              {/* Edit Overlay */}
              <div className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current.click();
                  }}
                  className="pointer-events-auto cursor-pointer flex flex-col items-center justify-center text-white"
                >
                  {imageIsLoading ? (
                    <AiOutlineLoading3Quarters className="size-6 animate-spin" />
                  ) : (
                    <>
                      <IoCameraOutline className="size-6 mb-1" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        Edit
                      </span>
                    </>
                  )}
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Business Info */}
            <div className="w-full min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-heading dark:text-white capitalize tracking-tight wrap-break-word">
                {businessName || fullname}
              </h2>
              <span className="inline-block mt-1 bg-green-50 border border-green-100 px-3 py-1 uppercase tracking-widest font-bold text-[10px] text-green-600 rounded-lg">
                {user?.role || "Member"}
              </span>
            </div>
          </div>

          {/* 3. Profile Info */}
          <ProfileInfo
            key={user?._id || "loading"}
            user={user}
            onSave={handleProfileSave}
          />

          {user?.type === "organization" ? (
            <AdditionalDetails />
          ) : (
            <OrgDetails orgData={orgData?.data} />
          )}
        </div>

        {/* POPUP MODAL */}
        <AnimatePresence>
          {isPreviewOpen && (
            <div
              className="fixed inset-0 z-999 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
              onClick={() => setIsPreviewOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-sm sm:max-w-md w-full overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-gray-600 p-2 rounded-full text-text shadow-md border border-slate-100 cursor-pointer"
                >
                  <IoCloseOutline size={20} />
                </button>

                <div className="w-full aspect-square bg-slate-50 dark:bg-gray-800 flex items-center justify-center p-6">
                  <img
                    src={profileImageUrl}
                    alt="Full Preview"
                    className="max-w-full max-h-full object-contain rounded-xl"
                  />
                </div>

                <div className="p-6 text-center">
                  <h3 className="font-bold text-text text-lg sm:text-xl mb-4 capitalize">
                    {fullname}
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setIsPreviewOpen(false)}
                      className="order-2 sm:order-1 flex-1 py-3 px-4 bg-slate-100 text-text font-bold rounded-xl hover:bg-slate-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setIsPreviewOpen(false);
                        fileInputRef.current.click();
                      }}
                      className="order-1 sm:order-2 flex-1 py-3 px-4 bg-btn-100 dark:bg-btn-200 hover:bg-btn-200 dark:hover:bg-btn-300 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <IoCameraOutline size={18} /> Change
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedWrapper>
  );
}

export default EditOrgDetails;
