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
                // Initial load: Set session trước
                dispatch(setCredentials({ session, user: null }));
                refetch();
            }
        });

        // 2. Listener
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            console.log("🔔 Auth Event:", event);

            if (session) {
                if (event === "SIGNED_OUT") {
                    dispatch(logout());
                } else if (
                    event === "TOKEN_REFRESHED" ||
                    event === "SIGNED_IN"
                ) {
                    // FIX: Khi token refresh hoặc focus lại, CHỈ cập nhật session token mới
                    // KHÔNG dispatch setCredentials({ user: ... }) ở đây để tránh ghi đè user hiện tại bằng null/stale data.
                    // Chúng ta dispatch một action riêng chỉ update token (nếu bạn có reducer đó),
                    // HOẶC: Chỉ gọi refetch() để API tự lấy data mới về update.

                    // Cách đơn giản nhất với setCredentials hiện tại:
                    // Chúng ta không làm gì cả, chỉ refetch().
                    // RTK Query sẽ tự fetch lại profile và update user ở useEffect dưới.
                    refetch();
                }
            } else {
                dispatch(logout());
            }
        });

        return () => subscription.unsubscribe();
    }, [dispatch, refetch]);

    // 3. Update User Data from API (Chỗ này mới là chỗ chính để set User)
    useEffect(() => {
        if (isSuccess && userProfile?.data?.user) {
            // Lấy session mới nhất trực tiếp để đảm bảo đồng bộ
            supabase.auth.getSession().then(({ data: { session } }) => {
                if (session) {
                    console.log("✅ Syncing User to Redux");
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

// export function AuthProvider({ children }) {
//     const dispatch = useDispatch();
//     const currentUser = useSelector(selectCurrentUser);

//     // Thêm Log để theo dõi store thay đổi
//     useEffect(() => {
//         console.log("🛠️ Current User in Redux:", currentUser);
//     }, [currentUser]);

//     const {
//         data: userProfile,
//         refetch,
//         isSuccess,
//         isFetching,
//     } = useGetMeQuery(undefined, {
//         skip: !supabase.auth.getSession().then(({ data }) => !!data.session),
//     });

//     // Log trạng thái API Fetching
//     useEffect(() => {
//         console.log("📡 API Status:", {
//             isSuccess,
//             isFetching,
//             hasData: !!userProfile,
//         });
//     }, [isSuccess, isFetching, userProfile]);

//     useEffect(() => {
//         // 1. Initial Check
//         supabase.auth.getSession().then(({ data: { session } }) => {
//             if (session) {
//                 dispatch(
//                     setCredentials({
//                         session,
//                         user: currentUser || null,
//                     }),
//                 );
//                 refetch();
//             }
//         });

//         // 2. Auth Listener
//         const {
//             data: { subscription },
//         } = supabase.auth.onAuthStateChange((event, session) => {
//             console.log("🔔 Supabase Auth Event:", event); // QUAN TRỌNG: Xem sự kiện gì

//             if (session) {
//                 dispatch(
//                     setCredentials({
//                         session,
//                         user: currentUser || null,
//                     }),
//                 );

//                 if (event === "TOKEN_REFRESHED" || event === "SIGNED_IN") {
//                     refetch();
//                 }
//             } else {
//                 // Kiểm tra xem có phải logout thật không
//                 console.log("⚠️ No session found in event -> Logout");

//                 dispatch(logout());
//             }
//         });

//         return () => subscription.unsubscribe();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [dispatch, refetch]);

//     // 3. Update User Data from API
//     useEffect(() => {
//         if (isSuccess && userProfile?.data?.user) {
//             console.log(
//                 "✅ Updating User from API:",
//                 userProfile.data.user.email,
//             );

//             supabase.auth.getSession().then(({ data: { session } }) => {
//                 if (session) {
//                     dispatch(
//                         setCredentials({
//                             session,
//                             user: userProfile.data.user,
//                         }),
//                     );
//                 }
//             });
//         }
//     }, [userProfile, isSuccess, dispatch]);

//     return children;
// }
