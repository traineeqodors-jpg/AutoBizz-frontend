import { useMemo, useState } from "react";
import SopVideoCard from "../components/SopVidoesPage/SopVideoCard";
import { IoSearchOutline } from "react-icons/io5";
import {
  useDeleteVideoMutation,
  useGetAllVideosQuery,
} from "../features/slices/videoGenerationSlice";
import SearchFIlterVideos from "../components/SopVidoesPage/SearchFIlterVideos";
import GenerateSOP from "../components/Home/Sop/GenerateSOP";
import { toast } from "react-hot-toast";

import { motion } from "framer-motion";

const SopVideosPage = () => {
  // Filtering State
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: videos = [], isLoading } = useGetAllVideosQuery();

  const [deleteVideo, { isLoading: deletingVideo }] = useDeleteVideoMutation();

  // Memoized Filter Logic
  const processedVideos = useMemo(() => {
    if (!videos) return [];

    return videos.filter((video) => {
      // Define status
      const isPending = video?.videoUrl === null;
      const isFailed = video?.videoUrl === "failed";
      const isSuccess = !!video?.videoUrl && video?.videoUrl !== "failed";

      // Map the dropdown 'statusFilter' to your logic
      let matchesStatus = true;

      if (statusFilter === "completed") {
        matchesStatus = isSuccess;
      } else if (statusFilter === "in-progress") {
        matchesStatus = isPending;
      } else if (statusFilter === "failed") {
        matchesStatus = isFailed;
      }

      return matchesStatus;
    });
  }, [videos, statusFilter]);

  async function handleDeleteVideo(videoId) {
    try {
      const response = await deleteVideo(videoId).unwrap();
      toast.success(response?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full p-3 sm:p-6 lg:p-8 "
    >
      <div className="mx-auto space-y-6">
        {/* Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-900 dark:border-0 p-6 rounded-3xl shadow-sm border border-white">
          <div>
            <h1 className="text-2xl font-extrabold text-heading dark:text-white tracking-tight">
              My SOP Videos
            </h1>
            <p className="text-sm text-text/50 dark:text-slate-50/40 font-medium">
              Safe storage for your business assets
            </p>
          </div>

          {/* Search and Filter */}
          <SearchFIlterVideos
            setStatusFilter={setStatusFilter}
            statusFilter={statusFilter}
          />
        </div>

        <div className="h-full w-full grid grid-cols-[repeat(auto-fill,minmax(282px,282px))] gap-10 justify-center bg-white dark:bg-gray-900 dark:border-0 py-5 px-3 sm:py-10 rounded-3xl shadow-lg border border-white">
          {/* Video Card */}
          {isLoading ? (
            <div className="loader col-span-full mx-auto"></div>
          ) : processedVideos?.length < 1 ? (
            <div className="py-20 lg:py-21 text-center px-4 col-span-full mx-auto">
              <div className="bg-back w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-text/20">
                <IoSearchOutline className="size-8 sm:size-10" />
              </div>
              <h3 className="text-lg font-bold text-text dark:text-white">
                No Videos found
              </h3>
              <p className="text-text/40 dark:text-gray-50/40 text-sm mt-1">
                Try adjusting your search filters or Generate new video.
              </p>
              <div className="mt-3">
                <GenerateSOP />
              </div>
            </div>
          ) : (
            processedVideos?.map((video) => (
              <SopVideoCard
                key={video.id}
                video={video}
                handleDeleteVideo={handleDeleteVideo}
                deletingVideo={deletingVideo}
              />
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SopVideosPage;
