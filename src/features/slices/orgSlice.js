import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orgApi = createApi({
  reducerPath: "orgApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:3000/api/org",
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/org",
  }),

  tagTypes: ["orgUser"],

  endpoints: (build) => ({}),
});

export const {} = orgApi;
