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
     query: (params = {}) => ({
        url: "/",
        method: "get",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          search: params.search || undefined,
          role: params.role || undefined,
          status: params.status || undefined,
          startDate: params.startDate || undefined,
          endDate: params.endDate || undefined,
          sortBy: params.sortBy || "createdAt",
          order: params.order || "DESC",
        },
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
