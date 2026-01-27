import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import { supabase } from "@/lib/supabase";
import { setCredentials, logout, selectCurrentUser } from "./authSlice"; // Import selector
import { useGetMeQuery } from "./authApiSlice";

export function AuthProvider({ children }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser); // Lấy user hiện tại trong store

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
                // CHỈ set user null nếu trong store chưa có gì
                // Nếu đã có currentUser rồi (do login từ trước), đừng ghi đè null
                dispatch(
                    setCredentials({
                        session,
                        user: currentUser || null,
                    }),
                );
                refetch();
            }
        });

        // 2. Auth Listener
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                // Tương tự, giữ lại currentUser để UI không bị nháy
                // Chỉ update session token mới nhất
                dispatch(
                    setCredentials({
                        session,
                        user: currentUser || null,
                    }),
                );

                // Chỉ refetch khi cần thiết (ví dụ token thay đổi)
                // Nhưng RTK Query thường tự lo cái này nếu tag invalid
                if (event === "TOKEN_REFRESHED" || event === "SIGNED_IN") {
                    refetch();
                }
            } else {
                dispatch(logout());
            }
        });

        return () => subscription.unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, refetch]); // Bỏ currentUser ra khỏi dependency để tránh loop

    // 3. Update User Data from API
    useEffect(() => {
        if (isSuccess && userProfile?.data?.user) {
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
