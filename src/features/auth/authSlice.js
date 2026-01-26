// src/features/auth/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    session: null, // session từ Supabase
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, session } = action.payload;
            state.user = user;
            state.session = session;
            state.isAuthenticated = !!session;
        },
        logout: (state) => {
            state.user = null;
            state.session = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
