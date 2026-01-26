// src/components/shared/UserDropdown.jsx

import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { logout } from "@/features/auth/authSlice";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, LayoutDashboard, Settings } from "lucide-react";

export function UserDropdown({ user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        dispatch(logout());
        navigate("/login");
    };

    // Lấy chữ cái đầu tên để làm Fallback Avatar
    const initials = user?.fullName
        ? user.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
        : "U";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                <Avatar className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
                    <AvatarImage src={user?.avatar} alt={user?.fullName} />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {initials}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user?.fullName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground truncate">
                            {user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Info Credits (Optional: hiển thị nhanh số dư) */}
                <div className="px-2 py-1.5 text-sm text-blue-600 font-medium bg-blue-50/50 rounded-sm mb-1">
                    💎 {user?.credits || 0} Credits
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Hồ sơ cá nhân</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
