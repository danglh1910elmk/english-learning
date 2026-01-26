// src/features/auth/AuthProvider.jsx

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "@/lib/supabase";
import { setCredentials, logout } from "./authSlice";
import { useGetMeQuery } from "./authApiSlice";

export function AuthProvider({ children }) {
    const dispatch = useDispatch();

    // Gọi hook này để fetch user profile từ Backend khi có token
    // skip: true để không gọi khi chưa có session (sẽ handle bên dưới)
    const { data: userProfile, refetch } = useGetMeQuery(undefined, {
        skip: !supabase.auth.getSession().then(({ data }) => !!data.session),
    });

    useEffect(() => {
        // 1. Check session hiện tại khi F5
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                dispatch(setCredentials({ session, user: null })); // Tạm thời null user, đợi API
                refetch(); // Gọi API getMe
            }
        });

        // 2. Lắng nghe thay đổi auth (Login, Logout, Auto Refresh Token)
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                dispatch(setCredentials({ session, user: null }));
                refetch();
            } else {
                dispatch(logout());
            }
        });

        return () => subscription.unsubscribe();
    }, [dispatch, refetch]);

    // Khi có data từ Backend về -> Update vào Redux
    useEffect(() => {
        if (userProfile?.data?.user) {
            // Lấy session hiện tại để update full
            supabase.auth.getSession().then(({ data: { session } }) => {
                if (session) {
                    dispatch(
                        setCredentials({
                            session,
                            user: userProfile.data.user,
                        }),
                    );
                }
            });
        }
    }, [userProfile, dispatch]);

    return children;
}
