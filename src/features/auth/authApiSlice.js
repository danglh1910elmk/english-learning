// src/features/auth/authApiSlice.js

import { apiSlice } from "@/features/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // gọi API /users/me để lấy profile
        getMe: builder.query({
            query: () => "/users/me",
            providesTags: ["User"],
        }),

        updateProfile: builder.mutation({
            query: (data) => ({
                url: "/users/profile",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useGetMeQuery, useUpdateProfileMutation } = authApiSlice;
