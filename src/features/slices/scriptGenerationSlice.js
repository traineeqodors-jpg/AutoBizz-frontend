import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const scriptGenerationApi = createApi({
  reducerPath: "scriptGenerationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/prepareScript",
  }),

  tagTypes: ["videoScript"],

  endpoints: (build) => ({
    generateScript: build.mutation({
      query: (payload) => ({
        url: "/",
        method: "post",
        body: payload,
        credentials: "include",
      }),
      invalidatesTags: ["videoScript"],
    }),
  }),
});

export const { useGenerateScriptMutation } = scriptGenerationApi;
