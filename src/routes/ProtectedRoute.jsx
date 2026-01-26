// src/routes/ProtectedRoute.jsx

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/features/auth/authSlice";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProtectedRoute() {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const location = useLocation();
    const [isChecking, setIsChecking] = useState(true);

    // Fix lỗi flash: Chờ check session lần đầu tiên xong mới quyết định redirect
    useEffect(() => {
        supabase.auth.getSession().then(() => {
            setIsChecking(false);
        });
    }, []);

    if (isChecking) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect về login, nhưng nhớ lưu lại trang họ đang muốn vào (state={{ from: location }})
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}
