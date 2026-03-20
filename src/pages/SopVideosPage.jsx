 
import React from "react";
import SopVideoCard from "../components/SopVidoesPage/SopVideoCard";
import { IoSearchOutline } from "react-icons/io5";
import { useGetAllVideosQuery } from "../features/slices/videoGenerationSlice";
 
const SopVideosPage = () => {

  const { data: videos, isLoading } = useGetAllVideosQuery();
  
  return (
    <div className="min-h-screen  bg-back w-full p-3 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-white">
          <div>
            <h1 className="text-2xl font-black text-text tracking-tight">
              My SOP Videos
            </h1>
            <p className="text-sm text-text/50 font-medium">
              Safe storage for your business assets
            </p>
          </div>

          <div className="relative group w-full md:w-72">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-text/40 group-focus-within:text-btn-100 transition-colors size-5" />
            <input
              type="text"
              placeholder="Search Videos..."
              className="w-full bg-back py-3 pl-12 pr-4 rounded-2xl border-transparent focus:border-btn-100/50 focus:ring-4 focus:ring-btn-100/5 outline-none transition-all text-sm font-medium"
            />
          </div>
        </div>
        <div className="h-full w-full grid grid-cols-[repeat(auto-fill,minmax(282px,282px))] gap-10 justify-center bg-white py-5 px-3 sm:py-10 rounded-3xl shadow-sm border border-white">
          {/* Card */}
          {/* Ready Video */}
          {
            isLoading ? <div>Loading...</div> : videos.map((video)=>(<SopVideoCard key={video.id} video={video} />))
         }
        </div>
      </div>
    </div>
  );
};
 
export default SopVideosPage;
 