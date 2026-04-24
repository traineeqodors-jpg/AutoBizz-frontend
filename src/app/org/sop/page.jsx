"use client";

import React, { useEffect, useMemo, useState } from "react";

import {
  useDeleteVideoMutation,
  useGetAllVideosQuery,
} from "@/features/slices/videoGenerationSlice";
import { useGetMeQuery } from "@/features/slices/userSlice";

import toast from "react-hot-toast";
import { IoSearchOutline } from "react-icons/io5";

import tourData from "../../../Json data/tourData.json";
import { startTour, setStepIndex } from "@/features/slices/tourSlice";

import GenerateSOP from "@/components/ui/GenerateSOP";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import SopVideoCard from "./components/SopVideoCard";
import SopVideoCardSkeleton from "./components/SopVideoCardSkeleton";
import SearchFilterVideos from "./components/SearchFilterVideos";
import { useDispatch, useSelector } from "react-redux";

function SopPage() {
  const dispatch = useDispatch();
  // Filtering State
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: videos = [], isLoading } = useGetAllVideosQuery();

  const { data } = useGetMeQuery();
  const user = data?.data;
  const role = user?.role;
  const isOwner = role === "owner";

  const userOnboarding = user?.onboarding?.sop;

  const shouldStart = userOnboarding?.status === "pending";

  useEffect(() => {
    if (tourData?.sop && user && shouldStart) {
      dispatch(
        startTour({
          tourKey: "sop",
          steps: tourData.sop,
          stepIndex: userOnboarding?.lastStep ?? 0,
          run: true,
        }),
      );
    }
  }, [dispatch, tourData, user, shouldStart]);

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
    <AnimatedWrapper>
      <div className="min-h-screen w-full py-3 sm:py-6 lg:py-8 mx-auto space-y-6">
        {/* Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface dark:border-0 p-6 rounded-3xl shadow-sm border border-white">
          <div>
            <h1 className="text-2xl font-extrabold text-heading dark:text-white tracking-tight">
              My SOP Videos
            </h1>
            <p className="text-sm text-text/50 dark:text-slate-50/40 font-medium">
              Safe storage for your business assets
            </p>
          </div>

          {/* Search and Filter */}
          <SearchFilterVideos
            setStatusFilter={setStatusFilter}
            statusFilter={statusFilter}
          />
        </div>

        <div
          id="sop-videos"
          className="h-full w-full grid grid-cols-[repeat(auto-fill,minmax(282px,282px))] gap-8 justify-center bg-surface dark:border-0 py-5 px-3 rounded-3xl shadow-sm"
        >
          {" "}
          {/* Video Card */}
          {isLoading ? (
            <>

                {[...Array(4)].map((_, i) => (
                  <SopVideoCardSkeleton key={i} />
                ))}

            </>
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
              {isOwner &&
                processedVideos.length === 0 &&
                videos.length === 0 && (
                  <div className="mt-3">
                    <GenerateSOP />
                  </div>
                )}
            </div>
          ) : (
            processedVideos?.map((video) => (
              <SopVideoCard
                key={video.id}
                video={video}
                handleDeleteVideo={handleDeleteVideo}
                deletingVideo={deletingVideo}
                isOwner={isOwner}
              />
            ))
          )}
        </div>
      </div>
    </AnimatedWrapper>
  );
}

export default SopPage;
