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
      query: (params) => ({
        url: "/org/employee",
        method: "GET",
        params: params,
        credentials: "include",
      }),
      providesTags: ["empUser"],
    }),

    updateEmployee: build.mutation({
      query: (data) => ({
        url: "/org/employee",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["empUser"],
    }),

    deleteEmployee: build.mutation({
      query: (data) => ({
        url: "/org/employee",
        method: "DELETE",
        body: { id: data },
        credentials: "include",
      }),
      invalidatesTags: ["empUser"],
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
