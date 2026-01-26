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
    endpoints: (builder) => ({}),
});
