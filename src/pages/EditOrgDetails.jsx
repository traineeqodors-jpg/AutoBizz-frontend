import { toast } from "react-toastify";
import AdditionalDetails from "../components/AdditionalDetails";
import ProfileInfo from "../components/ProfileInfo";
import {
  useGetMeQuery,
  useUpdateOrgMutation,
} from "../features/slices/orgSlice";
import { useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoCloseOutline, IoCameraOutline } from "react-icons/io5";


import { motion, AnimatePresence } from "framer-motion";

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

  const { data } = useGetMeQuery(undefined, {
    skip: !localStorage.getItem("isLoggedIn"),
  });

  const user = data?.data;
  const profileImageUrl = `${import.meta.env.VITE_BACKEND_URL}${user?.profileImage}`;
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

  return (
   
    <div className="min-h-screen bg-back w-full">
      {/* 1. Corrected max-width and centered container */}
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid w-full gap-4 sm:gap-6 p-3 sm:p-5"
        >
          {/* Header Card: Stack on mobile (flex-col), row on tablet+ (sm:flex-row) */}
          <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            
            {/* PROFILE IMAGE SECTION: Smaller on mobile (size-24), larger on tablet (sm:size-32) */}
            <div className="relative group size-24 sm:size-32 shrink-0">
              <div
                onClick={() => setIsPreviewOpen(true)}
                className="w-full h-full bg-white rounded-full border-2 border-slate-100 overflow-hidden cursor-pointer shadow-sm hover:border-blue-400 transition-all flex items-center justify-center"
              >
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="w-full h-full object-contain"
                />
              </div>
 
              {/* Edit Overlay: Added 'hidden sm:flex' if you want it desktop only, or keep as is for touch */}
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
 
            {/* Business Info: Full width and centered on mobile */}
            <div className="w-full min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-text capitalize tracking-tight wrap-break-word">
                {businessName}
              </h2>
              <span className="inline-block mt-1 bg-green-50 border border-green-100 px-3 py-1 uppercase tracking-widest font-bold text-[10px] text-green-600 rounded-lg">
                {user?.role || "Member"}
              </span>
            </div>
          </div>
 
          <ProfileInfo key={user?._id || 'loading'} user={user} onSave={handleProfileSave} />
          <AdditionalDetails />
        </motion.div>
 
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
                className="bg-white rounded-3xl shadow-2xl max-w-sm sm:max-w-md w-full overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Icon */}
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="absolute top-4 right-4 z-10 bg-white/90 p-2 rounded-full text-text shadow-md border border-slate-100"
                >
                  <IoCloseOutline size={20} />
                </button>
 
                <div className="w-full aspect-square bg-slate-50 flex items-center justify-center p-6">
                  <img
                    src={profileImageUrl}
                    alt="Full Preview"
                    className="max-w-full max-h-full object-contain rounded-xl shadow-inner"
                  />
                </div>
 
                <div className="p-6 text-center">
                  <h3 className="font-bold text-text text-lg sm:text-xl mb-4 capitalize">
                    {fullname}
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setIsPreviewOpen(false)}
                      className="order-2 sm:order-1 flex-1 py-3 px-4 bg-slate-100 text-text font-bold rounded-xl hover:bg-slate-200 transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setIsPreviewOpen(false);
                        fileInputRef.current.click();
                      }}
                      className="order-1 sm:order-2 flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
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
    </div>
  
  );
}

export default EditOrgDetails;