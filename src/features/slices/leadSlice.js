import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 
export const leadApi = createApi({
  reducerPath: "leadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/lead`,
  }),
 
  tagTypes: ["lead"],
 
  endpoints: (build) => ({
    addLead: build.mutation({
      query: (data) => ({
        url: "/",
        method: "post",
        credentials: "include",
        body: data,
      }),
      providesTags: ["lead"],
    }),
  }),
});
 
export const { useAddLeadMutation } = leadApi;
 
 