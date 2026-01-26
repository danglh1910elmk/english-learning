// src/pages/DashboardPage.jsx

import { useDispatch, useSelector } from "react-redux";
import { supabase } from "@/lib/supabase";
import { logout, selectCurrentUser } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        dispatch(logout());
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p>
                Welcome back,{" "}
                <span className="font-bold text-primary">
                    {user?.fullName || user?.email}
                </span>
                !
            </p>
            <div className="mt-4 border p-4 rounded bg-slate-100">
                <pre className="text-xs">{JSON.stringify(user, null, 2)}</pre>
            </div>
            <Button
                onClick={handleLogout}
                variant="destructive"
                className="mt-4"
            >
                Logout
            </Button>
        </div>
    );
}
