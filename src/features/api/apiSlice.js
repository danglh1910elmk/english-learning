// src/features/api/apiSlice.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "@/lib/supabase";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,

        // tự động gắn Token vào mọi request
        prepareHeaders: async (headers) => {
            const { data } = await supabase.auth.getSession();
            const token = data.session?.access_token;

            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["User", "Paragraph", "Sentence"], // Để quản lý cache invalidation
    endpoints: (builder) => ({
        // Endpoint lấy danh sách bài học
        getParagraphs: builder.query({
            query: (params) => ({
                url: "/learn/paragraphs",
                params, // params: { page, limit, level, contentType, topic... }
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.paragraphs.map(({ id }) => ({
                              type: "Paragraph",
                              id,
                          })),
                          { type: "Paragraph", id: "LIST" },
                      ]
                    : [{ type: "Paragraph", id: "LIST" }],
        }),
    }),
});

export const { useGetParagraphsQuery } = apiSlice;
