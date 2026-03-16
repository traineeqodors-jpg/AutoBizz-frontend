import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const callLogApi = createApi({
  reducerPath: "callLogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/callLog`,
    // baseUrl: `http://localhost:5000/api/document`,
  }),

  tagTypes: ["callLog"],

  endpoints: (build) => ({
    getAllCallLogs: build.query({
      query: () => ({
        url: "/",
        method: "get",
        credentials: "include",
      }),
      providesTags: ["callLog"],
    }),
    deleteCallLog: build.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "delete",
        credentials: "include",
      }),
      invalidatesTags: ["callLog"],
    }),
  }),
});

export const {
  useGetAllCallLogsQuery , useDeleteCallLogMutation
} = callLogApi;
