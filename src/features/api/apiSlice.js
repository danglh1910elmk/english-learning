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
    tagTypes: ["User", "Paragraph", "Sentence"],
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

        getParagraphDetail: builder.query({
            query: (id) => `/learn/paragraphs/${id}`, // API trả về { paragraph, progress }
            providesTags: (result, error, id) => [{ type: "Paragraph", id }],
        }),

        checkTranslation: builder.mutation({
            query: (data) => ({
                url: "/learn/paragraphs/check",
                method: "POST",
                body: data, // { paragraphId, segmentIndex, studentSentence }
            }),
            // Sau khi check xong, cần invalidate để fetch lại User info (trừ credit) và Progress mới
            invalidatesTags: (result, error, { paragraphId }) => [
                { type: "Paragraph", id: paragraphId },
                "User",
            ],
        }),

        resetProgress: builder.mutation({
            query: (id) => ({
                url: `/learn/paragraphs/${id}/reset`,
                method: "POST",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Paragraph", id }],
        }),

        // sentence
        getNextSentence: builder.query({
            // excludeLearned: true/false
            query: ({ level, category, excludeLearned }) => ({
                url: "/learn/sentences/next",
                params: {
                    level: level === "all" ? undefined : level,
                    category: category === "all" ? undefined : category,
                    excludeLearned,
                },
            }),
            keepUnusedDataFor: 0,
        }),

        checkSentence: builder.mutation({
            query: (data) => ({
                url: "/learn/sentences/check",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["User"], // update credit/points
        }),
    }),
});

export const {
    useGetParagraphsQuery,
    useGetParagraphDetailQuery,
    useCheckTranslationMutation,
    useResetProgressMutation,
    useGetNextSentenceQuery,
    useLazyGetNextSentenceQuery,
    useCheckSentenceMutation,
} = apiSlice;
