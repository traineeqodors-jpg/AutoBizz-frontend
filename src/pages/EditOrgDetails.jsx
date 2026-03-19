import { toast } from 'react-toastify';
import AdditionalDetails from '../components/AdditionalDetails';
import ProfileInfo from '../components/ProfileInfo';
import { useGetMeQuery, useUpdateOrgMutation } from '../features/slices/orgSlice';
import { useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoCloseOutline, IoCameraOutline } from 'react-icons/io5';

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
  const fullname = user?.firstName ? `${user.firstName} ${user.lastName}` : "User Name";

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
    <>
      <div className="min-h-screen bg-back w-full">
        <div className="grid w-full gap-6 p-5">
          {/* Header Card */}
          <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center gap-5">
            
            {/* PROFILE IMAGE SECTION */}
            <div className="relative group size-30 shrink-0">
              {/* 1. The Image Layer - Clicking this opens Popup */}
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

              {/* 2. The Edit Overlay - Added opacity-0 to hide by default */}
              <div className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                {/* Only this button captures the click for editing */}
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
                      <svg xmlns="http://www.w3.org" className="size-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-[10px] font-bold uppercase tracking-widest">Edit</span>
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

            <div className="w-full">
              <h2 className="text-xl sm:text-2xl font-bold text-text capitalize tracking-tight">
                {fullname}
              </h2>
              <span className="inline-block mt-1 bg-green-50 border border-green-100 px-3 py-0.5 uppercase tracking-widest font-bold text-[10px] text-green-600 rounded-lg">
                {user?.role || "Member"}
              </span>
            </div>
          </div>

          <ProfileInfo user={user} onSave={handleProfileSave} />
          <AdditionalDetails />
        </div>
      </div>

      {/* POPUP MODAL */}
      {isPreviewOpen && (
        <div 
          className="fixed inset-0 z-999 flex items-center justify-center  bg-black/40 p-4 animate-in fade-in duration-200"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-105 w-full overflow-hidden relative animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Icon */}
            <button 
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/80 p-1 rounded-full text-text hover:bg-white transition-colors border border-slate-100"
            >
              <IoCloseOutline size={24} />
            </button>

            {/* Image Preview Container */}
            <div className="w-full aspect-square bg-slate-50 flex items-center justify-center p-4 border-b border-slate-100">
              <img
                src={profileImageUrl}
                alt="Full Preview"
                className="max-w-full max-h-full object-contain rounded-xl"
              />
            </div>

            {/* Modal Actions */}
            <div className="p-6 text-center">
              <h3 className="font-bold text-text text-xl mb-4 capitalize">{fullname}</h3>
           
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsPreviewOpen(false)}
                  className="flex-1 py-3 px-4 bg-slate-100 text-text font-bold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    setIsPreviewOpen(false);
                    fileInputRef.current.click();
                  }}
                  className="flex-1 py-3 px-4 bg-btn-100 hover:bg-btn-200 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <IoCameraOutline size={18} />
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditOrgDetails;
