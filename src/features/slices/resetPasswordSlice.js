import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const resetPasswordApi = createApi({
  reducerPath: "resetPasswordApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/password`,
    // baseUrl: "http://localhost:5000/api/password",
  }),
  endpoints: (build) => ({
    forgotPassword: build.mutation({
      query: (email) => ({
        url: "/resetPassword",
        method: "POST",
        body: { email },
      }),
    }),

    resetPassword: build.mutation({
      query: ({ input, token }) => ({
        url: `/resetPassword/${token}`,
        method: "POST",
        body: input,
      }),
    }),

    updatePassword: build.mutation({
      query: (input) => ({
        url: "/updatePassword",
        method: "POST",
        body: input,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
} = resetPasswordApi;
