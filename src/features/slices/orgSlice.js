import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookies from "js-cookie";

export const orgApi = createApi({
  reducerPath: "orgApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:3000/api/org",
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/org`,
  }),

  tagTypes: ["orgUser", "register"],

  endpoints: (build) => ({
    registerOrg: build.mutation({
      query: (input) => ({
        url: "/register",
        method: "post",
        body: input,
        credentials: "include",
      })
    }),

    loginOrg: build.mutation({
      query: (input) => ({
        url: "/login",
        method: "post",
        body: input,
        credentials: "include",
      }),
      
      
      invalidatesTags : ["orgUser"]
    }),

    updateOrg: build.mutation({
      query: (input) => ({
        url: "/",
        method: "put",
        body: input,
        credentials: "include",
      }),
      invalidatesTags: ["orgUser"],
    }),

    getMe: build.query({
      query: () => ({
        url: "/me",
        method: "get",
        credentials: "include",
      }),
      providesTags: ["orgUser"],
    }),

    logout: build.mutation({
      query: () => ({
        url: "/logout",
        method: "post",
        credentials: "include",
      }),
      // invalidatesTags: ["orgUser"],
    }),
  }),
});

export const {
  useRegisterOrgMutation,
  useLoginOrgMutation,
  useGetMeQuery,
  useLogoutMutation,
  useUpdateOrgMutation
} = orgApi;
