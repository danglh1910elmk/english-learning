// src/features/auth/AuthProvider.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "@/lib/supabase";
import { setCredentials, logout, selectCurrentUser } from "./authSlice";
import { useGetMeQuery } from "./authApiSlice";

export function AuthProvider({ children }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    const {
        data: userProfile,
        refetch,
        isSuccess,
    } = useGetMeQuery(undefined, {
        skip: !supabase.auth.getSession().then(({ data }) => !!data.session),
    });

    useEffect(() => {
        // 1. Initial Check
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                dispatch(setCredentials({ session, user: null }));
                refetch();
            }
        });

        // 2. Listener
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                if (event === "SIGNED_OUT") {
                    dispatch(logout());
                } else if (
                    event === "TOKEN_REFRESHED" ||
                    event === "SIGNED_IN"
                ) {
                    refetch();
                }
            } else {
                dispatch(logout());
            }
        });

        return () => subscription.unsubscribe();
    }, [dispatch, refetch]);

    // 3. Update User Data from API
    useEffect(() => {
        if (isSuccess && userProfile?.data?.user) {
            // lấy session mới nhất trực tiếp để đảm bảo đồng bộ
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
    }, [userProfile, isSuccess, dispatch]);

    return children;
}
