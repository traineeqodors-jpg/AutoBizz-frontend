import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const documentApi = createApi({
  reducerPath: "documentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/document`,
    // baseUrl: `http://localhost:5000/api/document`,
    prepareHeaders: (headers, { getState }) => {
      const token = JSON.parse(localStorage.getItem("token"));

      // If a token exists, set the Authorization header
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      // Return the modified headers
      return headers;
    },
  }),

  tagTypes: ["documents"],

  endpoints: (build) => ({
    uploadDocuments: build.mutation({
      query: (formData) => ({
        url: "/upload-docs",
        method: "post",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["documents"],
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
