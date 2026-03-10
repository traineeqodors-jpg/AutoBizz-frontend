
import { toast } from 'react-toastify';
import AdditionalDetails from '../components/AdditionalDetails';
import ProfileInfo from '../components/ProfileInfo';
import { useGetMeQuery, useUpdateOrgMutation } from '../features/slices/orgSlice';
import { useRef, useState } from "react";

function EditOrgDetails() {

  const [updateImage, { isLoading: imageIsLOading }] = useUpdateOrgMutation();

   const fileInputRef = useRef(null);

   const handleImageChange = async (event) => {
     const file = event.target.files?.[0];
     if (!file) return;

     const formData = new FormData();
     formData.append("file", file);

     try {
       const response = await updateImage(formData).unwrap();
       toast.success("Profile image Updated!")
     } catch (err) {
       toast.error(err?.data.message)
     }
   };

   const triggerFileInput = () => {
     fileInputRef.current.click();
   };

  
  const {
      data,
      isLoading: userLoading,
    } = useGetMeQuery(undefined, {
      skip: !localStorage.getItem("isLoggedIn"),
    });

  const user = data?.data;
   
  const fullname = user?.firstName
    ? `${user.firstName} ${user.lastName}`
    : null;
  
  const [update, { isLoading }] = useUpdateOrgMutation();
  
  const handleProfileSave = async ({firstName, lastName, email, country, businessName, businessSize, phoneNumber}) => {
    
    const updatedDetails = {
      firstName,
      lastName,
      email,
      country,
      businessName,
      businessSize,
      phoneNumber,
    };
    try {
      const response = await update(updatedDetails).unwrap();
      toast.success(response?.message);
    } catch (error) {
      toast.error(error?.data?.message);
      console.log(error);
    }
  }
  
  return (
    <>
      <div className="min-h-screen w-full">
        {/* Grid Container */}
        <div className="grid w-full gap-6 p-5">
          {/* User Info Container*/}
          <div className="w-full bg-white rounded-2xl shadow-md/10 p-5 flex items-center gap-5">
            {/* Profile Image */}
            <div
              onClick={triggerFileInput}
              className="relative group size-30 aspect-square shrink-0 bg-white rounded-full border-2 border-gray-200 overflow-hidden cursor-pointer shadow-sm hover:border-blue-400 transition-colors flex items-center justify-center"

            >
              {/* Actual Image */}
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${user?.profileImage}`}
                alt="Profile"
                className="w-full h-full object-contain "
              />

              {/* Overlay: Hidden by default (opacity-0), shown on hover (group-hover) */}
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg
                  xmlns="http://www.w3.org"
                  className="size-6 text-white mb-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-white text-xs font-semibold">
                  Change Photo
                </span>
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="w-full">
              <h2 className="text-lg sm:text-2xl font-semibold text-text capitalize">
                {fullname}
              </h2>
              <span className="bg-green-400/30 px-2 py-1 uppercase tracking-widest font-medium text-xs text-green-600 rounded-xl">
                {user?.role || "NA"}
              </span>
            </div>
          </div>

          {/* Profile Info */}
          <ProfileInfo user={user} onSave={handleProfileSave} />
          <AdditionalDetails />
        </div>
      </div>
    </>
  );
}

export default EditOrgDetails