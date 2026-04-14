import { Data } from "@/Json data/data";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeApi = createApi({
  reducerPath: "ememployeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  }),
  tagTypes: ["empUser"],
  endpoints: (build) => ({
    createEmployee: build.mutation({
      query: (data) => ({
        url: "/employee/create",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["empUser"],
    }),

    setupPassword: build.mutation({
      query: (data) => ({
        url: "/employee/setup-password",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getAllEmployee: build.query({
      query: () => ({
        url: "/org/employee",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["empUser"],
    }),

    updateEmployee: build.mutation({
      query: (data) => ({
        url: "/org/employee",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["empUser"],
    }),

    deleteEmployee: build.mutation({
      query: (data) => ({
        url: "/org/employee",
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useSetupPasswordMutation,
  useGetAllEmployeeQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
