import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const meetingsApi = createApi({
  reducerPath: "meetingsApi",
   baseQuery: fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/meeting`,
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
      providesTags : ["Meetings"]
     
    
      
    
      
    }),

    confirmMeeting : builder.mutation({
      query : (body) => ({
        url : "/confirm-meeting",
        method : "post",
        body: body
      }),
      invalidatesTags : ["Meetings"]
    })
  }),
});

export const { useGetAllMeetingsQuery , useConfirmMeetingMutation } = meetingsApi;
