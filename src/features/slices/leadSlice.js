import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const leadsApi = createApi({
  reducerPath: "leadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/lead`,
    // baseUrl: `http://localhost:5000/api/document`,
  }),

  tagTypes: ["leads"],

  endpoints: (build) => ({
    addLeadCsv: build.mutation({
      query: (formData) => ({
        url: "/",
        method: "post",
        body: formData,
        credentials: "include",
      }),
      invalidateTags: ["leads"],
    }),

    getAllLeads: build.query({
      query: (params = {}) => ({
        url: `/`,
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          search: params.search || undefined,
          status: params.status || undefined,
          minScore: params.minScore || undefined,
          startDate: params.startDate || undefined,
          endDate: params.endDate || undefined,
          sortBy: params.sortBy || "createdAt",
          order: params.order || "DESC",
        },
        credentials: "include",
      }),
      providesTags: ["leads"],
    }),

    deleteLead : build.mutation({
        query : (id) => ({
          url : `/${id}`,
          method : "DELETE",
          credentials : "include"
        }),
        invalidatesTags : ["leads"]
        
    }),
  }),
});

export const { useAddLeadCsvMutation, useGetAllLeadsQuery , useDeleteLeadMutation } = leadsApi;