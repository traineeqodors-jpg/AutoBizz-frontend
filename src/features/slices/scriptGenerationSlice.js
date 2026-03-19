import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const scriptGenerationApi = createApi({
  reducerPath: "scriptGenerationApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:3000/api/org",
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/prepareScript`,
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

export const {
    useGenerateScriptMutation
} = scriptGenerationApi;