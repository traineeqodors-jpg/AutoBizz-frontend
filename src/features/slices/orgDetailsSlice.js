import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookies from "js-cookie";

export const orgDetailsApi = createApi({
  reducerPath: "orgDetailsApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:3000/api/orgDetails",
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/orgDetails`,
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

  tagTypes: ["orgDetails"],

  endpoints: (build) => ({
    getOrgDetails: build.query({
      query: () => ({
        url: "/",
        method: "get",
        credentials: "include",
      }),
      providesTags: ["orgDetails"],
    }),

    addOrgDetails: build.mutation({
      query: (input) => ({
        url: "/",
        method: "put",
        body: input,
        credentials: "include",
      }),

      invalidatesTags: ["orgDetails"],
    }),
  }),
});

export const {
    useGetOrgDetailsQuery,
    useAddOrgDetailsMutation
} = orgDetailsApi;
