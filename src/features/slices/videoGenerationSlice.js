import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { io } from "socket.io-client";

export const videoGenerationApi = createApi({
  reducerPath: "videoGenerationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/sop",
  }),
  tagTypes: ["video"],
  endpoints: (build) => ({
    getAllVideos: build.query({
      query: () => ({
        url: "/getAllSopVideos",
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["video"],

      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);

        try {
          await cacheDataLoaded;

          socket.on("video_updated", (newVideoData) => {
            updateCachedData((draft) => {
              const video = draft.find(
                (v) => v.videoId === newVideoData.videoId,
              );
              if (video) {
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

    deleteVideo: build.mutation({
      query: (videoId) => ({
        url: `/${videoId}`,
        method: "delete",
        credentials: "include",
      }),
      invalidatesTags: ["video"],
    }),

    generateVideo: build.mutation({
      query: (script) => ({
        url: "/generateSOP",
        method: "POST",
        body: script,
        credentials: "include",
      }),
      // Optional: invalidating ensures the "processing" row shows up immediately
      invalidatesTags: ["video"],
    }),
  }),
});

export const {
  useGenerateVideoMutation,
  useGetAllVideosQuery,
  useDeleteVideoMutation,
} = videoGenerationApi;
