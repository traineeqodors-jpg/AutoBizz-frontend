import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi", // Added quotes
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  }),
  tagTypes: ["User"],
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

      invalidatesTags: ["User"],
    }),

    loginOrg: build.mutation({
      query: (input) => ({
        url: "/org/login",
        method: "post",
        body: input,
        credentials: "include",
      }),

      invalidatesTags: ["User"],
    }),

    googleToken: build.mutation({
      query: (code) => ({
        url: "/org/googleToken",
        method: "post",
        body: { code },
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    updateOrg: build.mutation({
      query: (input) => ({
        url: "/org",
        method: "put",
        body: input,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    employeeLogin: build.mutation({
      query: (data) => ({
        url: "/employee/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    logout: build.mutation({
      query: () => ({
        url: "/user/logout",
        method: "post",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
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
} = userApi;
