import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookies from "js-cookie";

export const orgDetailsApi = createApi({
  reducerPath: "orgDetailsApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:3000/api/orgDetails",
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/orgDetails`,
  }),

  tagTypes: ["orgDetails"],

  endpoints: (build) => ({
    getOrgDetails: build.query({
      query: () => ({
        url: "/",
        method: "get",
        credentials: "include",
      }),
  
    }),

    addOrgDetails: build.mutation({
      query: (input) => ({
        url: "/",
        method: "put",
        body: input,
        credentials: "include",
      }),

    }),
  }),
});

export const {
    useGetOrgDetailsQuery,
    useAddOrgDetailsMutation
} = orgDetailsApi;
