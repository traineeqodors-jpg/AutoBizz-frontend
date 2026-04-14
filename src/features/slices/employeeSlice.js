import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeApi = createApi({
  reducerPath: "ememployeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/employee`,
  }),
  tagTypes: ["empUser"],
  endpoints: (build) => ({
    createEmployee: build.mutation({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["empUser"],
    }),

    setupPassword: build.mutation({
      query: (data) => ({
        url: "/setup-password",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const { useCreateEmployeeMutation, useSetupPasswordMutation } =
  employeeApi;
