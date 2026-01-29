// src/components/layout/AuthLayout.jsx

import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/features/auth/authSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthLayout() {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    // nếu đã login rồi thì không cho vào trang login/register nữa -> đá về Home
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center space-y-1">
                    <CardTitle className="text-2xl font-bold">
                        English Master
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Đăng nhập để bắt đầu
                    </p>
                </CardHeader>
                <CardContent>
                    <Outlet />
                </CardContent>
            </Card>
        </div>
    );
}
