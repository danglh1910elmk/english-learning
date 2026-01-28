// src/pages/LeaderboardPage.jsx

import { useState, useEffect } from "react";
import { useGetLeaderboardQuery } from "@/features/api/apiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Medal, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

export default function LeaderboardPage() {
    const [page, setPage] = useState(1);
    const currentUser = useSelector(selectCurrentUser);

    // Thay đổi title tab
    useEffect(() => {
        document.title = "Bảng Xếp Hạng | EnglishMaster";
    }, []);

    const { data, isLoading, isFetching } = useGetLeaderboardQuery({
        page,
        limit: 5,
    });

    const leaderboard = data?.data || [];
    const pagination = data?.pagination || {};

    // helper render rank Icon
    const getRankIcon = (rank) => {
        if (rank === 1)
            return (
                <Trophy className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            );
        if (rank === 2)
            return <Medal className="w-6 h-6 text-gray-400 fill-gray-400" />;
        if (rank === 3)
            return <Medal className="w-6 h-6 text-amber-700 fill-amber-700" />;
        return (
            <span className="font-bold text-slate-500 w-6 text-center">
                {rank}
            </span>
        );
    };

    return (
        <div className="container max-w-4xl py-10 min-h-screen">
            {/* Header */}
            <div className="text-center mb-10 space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent leading-loose block">
                    Bảng Xếp Hạng 🏆
                </h1>
                {/* <p className="text-muted-foreground">
                    Top những học viên xuất sắc nhất
                </p> */}
            </div>

            {/* Table Container */}
            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="w-20 text-center">
                                Hạng
                            </TableHead>
                            <TableHead>Người dùng</TableHead>
                            <TableHead className="text-right">
                                Điểm số
                            </TableHead>
                            <TableHead className="text-right hidden sm:table-cell">
                                Hoạt động
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading || isFetching ? (
                            // Skeleton Loading
                            [...Array(5)].map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <Skeleton className="h-6 w-6 mx-auto" />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Skeleton className="h-10 w-10 rounded-full" />
                                            <div className="space-y-1">
                                                <Skeleton className="h-4 w-32" />
                                                <Skeleton className="h-3 w-20" />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-4 w-12 ml-auto" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-4 w-20 ml-auto" />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : leaderboard.length > 0 ? (
                            leaderboard.map((user) => {
                                const isMe = currentUser?.id === user.id;

                                // lấy chữ cái đầu tên để làm fallback Avatar
                                const initials = user?.fullName
                                    ? user.fullName
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")
                                          .toUpperCase()
                                          .slice(0, 2)
                                    : "U";
                                return (
                                    <TableRow
                                        key={user.id}
                                        className={
                                            isMe
                                                ? "bg-primary/5 hover:bg-primary/10"
                                                : ""
                                        }
                                    >
                                        <TableCell className="text-center font-medium text-lg">
                                            <div className="flex justify-center">
                                                {getRankIcon(user.rank)}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    className={
                                                        user.rank <= 3
                                                            ? "ring-2 ring-yellow-400 ring-offset-2"
                                                            : ""
                                                    }
                                                >
                                                    <AvatarImage
                                                        src={user.avatar}
                                                    />
                                                    <AvatarFallback>
                                                        {initials}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-slate-900 flex items-center gap-2">
                                                        {user.fullName ||
                                                            user.username}
                                                        {isMe && (
                                                            <Badge
                                                                variant="secondary"
                                                                className="text-[10px] h-5 px-1"
                                                            >
                                                                Bạn
                                                            </Badge>
                                                        )}
                                                    </span>
                                                    {/* <span className="text-xs text-muted-foreground hidden sm:inline-block">
                                                        {user.points > 1000
                                                            ? "Expert"
                                                            : "Learner"}
                                                    </span> */}
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-right font-bold text-slate-700">
                                            {user.points.toLocaleString()}
                                        </TableCell>

                                        <TableCell className="text-right text-muted-foreground text-sm hidden sm:table-cell">
                                            {formatDistanceToNow(
                                                new Date(user.lastActiveDate),
                                                { addSuffix: true, locale: vi },
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="h-24 text-center"
                                >
                                    Chưa có dữ liệu
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {!isLoading && pagination.totalPages > 1 && (
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => p - 1)}
                        disabled={page === 1}
                    >
                        <ChevronLeft className="h-4 w-4" /> Trước
                    </Button>
                    <div className="text-sm font-medium">
                        Trang {page} / {pagination.totalPages}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page === pagination.totalPages}
                    >
                        Sau <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
