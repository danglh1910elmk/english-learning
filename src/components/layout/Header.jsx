// src/components/layout/Header.jsx

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    selectCurrentUser,
    selectIsAuthenticated,
} from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserDropdown } from "@/components/shared/UserDropdown";

export function Header() {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate();

    return (
        <header className="sticky flex justify-center top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container flex h-16 px-6 items-center justify-start">
                {/* LOGO */}
                <div className="flex items-center gap-2 ">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            EnglishMaster
                        </span>
                    </Link>
                </div>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex items-center gap-6 ml-auto">
                    {/* luyện tập */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="font-medium cursor-pointer px-1"
                            >
                                Luyện tập
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem
                                className={"text-center cursor-pointer"}
                                onClick={() =>
                                    navigate("/learn/paragraph/select")
                                }
                            >
                                Đoạn văn
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className={"text-center cursor-pointer"}
                                onClick={() =>
                                    navigate("/learn/sentence/select")
                                }
                            >
                                Câu đơn
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link
                        to="/"
                        className="text-sm font-medium hover:text-primary transition-colors"
                    >
                        Nạp Credit
                    </Link>
                    <Link
                        to="/leaderboard"
                        className="text-sm font-medium hover:text-primary transition-colors"
                    >
                        Bảng xếp hạng
                    </Link>
                </nav>

                {/* AUTH ACTIONS */}
                <div className="flex items-center gap-4 ml-auto md:ml-10">
                    {isAuthenticated ? (
                        <UserDropdown user={user} />
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" asChild>
                                <Link to="/login">Đăng nhập</Link>
                            </Button>
                            <Button asChild>
                                <Link to="/register">Đăng ký</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
