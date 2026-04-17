import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ContactUsApi = createApi({
  reducerPath: "ContactUsApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:3000/api/org",
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/org",
  }),

  endpoints: (build) => ({
    contactUs: build.mutation({
      query: (input) => ({
        url: "/queryForm",
        method: "post",
        body: input,
      }),
    }),
  }),
});

export const { useContactUsMutation } = ContactUsApi;
