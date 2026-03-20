import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { io } from "socket.io-client";

export const videoGenerationApi = createApi({
  reducerPath: "videoGenerationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/sop`,
  }),
  tagTypes: ["video"],
  endpoints: (build) => ({
    getAllVideos: build.query({
      query: () => ({
        url: "/getAllSopVideos",
        method: "GET",
        credentials: "include",
      }),
      // CRITICAL: Extract the actual array from your ApiResponse wrapper
      transformResponse: (response) => response.data,
      providesTags: ["video"],

      // 1. CHANGE: Use updateCachedData instead of dispatch for cleaner code
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        const socket = io(import.meta.env.VITE_BACKEND_URL);

        try {
          await cacheDataLoaded;

          socket.on("video_updated", (newVideoData) => {
            updateCachedData((draft) => {
              // 2. CHECK: Ensure 'v.videoId' matches your Sequelize column name exactly
              const video = draft.find(
                (v) => v.videoId === newVideoData.videoId,
              );
              if (video) {
                // 3. CHANGE: Ensure status is updated so the UI stops showing "Loading/Processing"
                // video.status = "completed";
                video.videoUrl = newVideoData.videoUrl;
              }
            });
          });
        } catch (err) {
          console.error("Socket error:", err);
        }

        await cacheEntryRemoved;
        socket.close();
      },
    }),

    generateVideo: build.mutation({
      query: (scriptContent) => ({
        url: "/generateSOP",
        method: "POST",
        body: { scriptContent },
        credentials: "include",
      }),
      // Optional: invalidating ensures the "processing" row shows up immediately
      invalidatesTags: ["video"],
    }),
  }),
});

export const { useGenerateVideoMutation, useGetAllVideosQuery } =
  videoGenerationApi;