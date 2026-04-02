import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const leadsApi = createApi({
  reducerPath: "leadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/lead`,
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

      invalidatesTags: (result, error) => (error ? [] : ["leads"]),
    }),
    
    // In leadSlice.js
    getAllLeads: build.query({
      query: (params) => {
       
        const cleanParams = Object.fromEntries(
          Object.entries(params).filter(
            ([_, v]) => v !== "" && v !== null && v !== undefined,
          ),
        );

    
        if (cleanParams.minScore) {
          cleanParams.minScore = parseInt(cleanParams.minScore, 0);
        }

        return {
          url: `/`,
          params: cleanParams,
          credentials: "include",
        };
      },
      providesTags: ["leads"],
    }),
    deleteLead: build.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (result, error) => (error ? [] : ["leads"]),
    }),
  }),
});

export const {
  useAddLeadCsvMutation,
  useGetAllLeadsQuery,
  useDeleteLeadMutation,
  useAddLeadFormMutation,
} = leadsApi;
