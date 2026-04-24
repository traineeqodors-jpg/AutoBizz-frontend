import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi", // Added quotes
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  }),
  tagTypes: ["User"],
  keepUnusedDataFor: 120,

  endpoints: (build) => ({
    getMe: build.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    registerOrg: build.mutation({
      query: (input) => ({
        url: "/org/register",
        method: "post",
        body: input,
        credentials: "include",
      }),

      invalidatesTags: (result, error) => (error ? [] : ["User"]),
    }),

    loginOrg: build.mutation({
      query: (input) => ({
        url: "/org/login",
        method: "post",
        body: input,
        credentials: "include",
      }),

      invalidatesTags: (result, error) => (error ? [] : ["User"]),
    }),

    googleToken: build.mutation({
      query: (code) => ({
        url: "/org/googleToken",
        method: "post",
        body: { code },
        credentials: "include",
      }),
      invalidatesTags: (result, error) => (error ? [] : ["User"]),
    }),

    updateOrg: build.mutation({
      query: (input) => ({
        url: "/org",
        method: "put",
        body: input,
        credentials: "include",
      }),
      invalidatesTags: (result, error) => (error ? [] : ["User"]),
    }),

    updateOnboarding: build.mutation({
      query: (input) => ({
        url: "/org/updateonboard",
        method: "put",
        body: input,
        credentials: "include",
      }),
      invalidatesTags: (result, error) => (error ? [] : ["User"]),
    }),

    employeeLogin: build.mutation({
      query: (data) => ({
        url: "/employee/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: (result, error) => (error ? [] : ["User"]),
    }),

    logout: build.mutation({
      query: () => ({
        url: "/user/logout",
        method: "post",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useRegisterOrgMutation,
  useLoginOrgMutation,
  useGetMeQuery,
  useLogoutMutation,
  useGoogleTokenMutation,
  useUpdateOrgMutation,
  useEmployeeLoginMutation,
  useUpdateOnboardingMutation
} = userApi;
