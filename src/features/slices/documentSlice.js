import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const documentApi = createApi({
  reducerPath: "documentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/document",
    // baseUrl: `http://localhost:5000/api/document`,
  }),

  tagTypes: ["documents"],
  keepUnusedDataFor: 120,

  endpoints: (build) => ({
    uploadDocuments: build.mutation({
      query: (formData) => ({
        url: "/upload-docs",
        method: "post",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: (result, error) => (error ? [] : ["documents"]),
    }),
    getMyDocuments: build.query({
      query: () => ({
        url: "/my-documents",
        method: "get",
        credentials: "include",
      }),
      providesTags: ["documents"],
    }),
    deleteDocument: build.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "delete",
        credentials: "include",
      }),
      invalidatesTags: ["documents"],
    }),
  }),
});

export const {
  useUploadDocumentsMutation,
  useGetMyDocumentsQuery,
  useDeleteDocumentMutation,
} = documentApi;
