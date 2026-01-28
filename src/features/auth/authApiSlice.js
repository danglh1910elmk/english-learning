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

        uploadAvatar: builder.mutation({
            query: (formData) => ({
                url: "/users/avatar",
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: ["User"],
        }),

        deleteAccount: builder.mutation({
            query: () => ({
                url: "/users/me",
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetMeQuery,
    useUpdateProfileMutation,
    useUploadAvatarMutation,
    useDeleteAccountMutation,
} = authApiSlice;
