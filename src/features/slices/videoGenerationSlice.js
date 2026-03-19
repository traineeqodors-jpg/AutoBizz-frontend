import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const videoGenerationApi = createApi({
  reducerPath: "videoGenerationApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:3000/api/org",
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/generateSOP`,
  }),

  tagTypes: ["video"],

  endpoints: (build) => ({
    generateVideo: build.mutation({
      query: (scriptContent) => ({
        url: "/",
        method: "POST",
        body: {scriptContent},
        credentials: "include",
      }),
      providesTags: ["video"],
    }),
  }),
});

export const { useGenerateVideoMutation } = videoGenerationApi;