import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const meetingsApi = createApi({
  reducerPath: "meetingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/meeting`,
    // baseUrl: `http://localhost:5000/api/document`,
  }),
  tagTypes: ["Meetings"],
  endpoints: (builder) => ({
    // Fetch all meetings for an organization
    getAllMeetings: builder.query({
      query: () => ({
        url: "/",
        method: "GET",

        credentials: "include",
      }),
      providesTags: ["Meetings"],
    }),
  }),
});

export const { useGetAllMeetingsQuery } = meetingsApi;
