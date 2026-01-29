// src/pages/learn/ParagraphListPage.jsx

/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useGetParagraphsQuery } from "@/features/api/apiSlice";
import { TOPICS, STATUSES } from "@/config/learnOptions";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PlayCircle, BarChart } from "lucide-react";

export default function ParagraphListPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // 1. Lấy params từ URL (để giữ trạng thái khi F5)
    const initialLevel = searchParams.get("level") || "beginner";
    const initialType = searchParams.get("contentType") || "essay";

    // 2. State cho Filter Local
    const [topic, setTopic] = useState("all");
    const [status, setStatus] = useState("all");
    const [page, setPage] = useState(1);

    // 3. Gọi API RTK Query
    const { data, isLoading, isFetching } = useGetParagraphsQuery({
        page,
        limit: 6,
        level: initialLevel,
        contentType: initialType,
        topic: topic !== "all" ? topic : undefined,
    });

    // đổi tab title
    useEffect(() => {
        document.title = "Luyện dịch đoạn văn | EnglishMaster";
    }, []);

    // Reset page khi filter đổi
    useEffect(() => {
        setPage(1);
    }, [topic, status]);

    const paragraphs = data?.data?.paragraphs || [];
    const pagination = data?.pagination || {};

    // Helper render Badge status
    const getStatusBadge = (status) => {
        switch (status) {
            case "completed":
                return <Badge className="bg-green-500">Completed</Badge>;
            case "in_progress":
                return <Badge className="bg-yellow-500">In Progress</Badge>;
            default:
                return <Badge variant="secondary">New</Badge>;
        }
    };

    return (
        <div className="container px-4 py-8 max-w-6xl mx-auto">
            {/* HEADER & FILTER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold capitalize">
                        {initialLevel} • {initialType}
                    </h1>
                    <p className="text-muted-foreground">
                        Danh sách bài luyện tập phù hợp
                    </p>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    {/* Topic Filter */}
                    <Select value={topic} onValueChange={setTopic}>
                        <SelectTrigger className="w-45 cursor-pointer">
                            <SelectValue placeholder="Chủ đề" />
                        </SelectTrigger>
                        <SelectContent>
                            {TOPICS.map((t) => (
                                <SelectItem
                                    key={t.value}
                                    value={t.value}
                                    className={"cursor-pointer"}
                                >
                                    {t.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* LIST CONTENT */}
            {isLoading ? (
                <ParagraphListSkeleton />
            ) : paragraphs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paragraphs.map((item) => (
                        <Card
                            key={item.id}
                            className="flex flex-col hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary/10"
                        >
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start gap-2">
                                    <Badge
                                        variant="outline"
                                        className="capitalize"
                                    >
                                        {item.topic.replace("_", " ")}
                                    </Badge>
                                    {getStatusBadge(item.userStatus)}
                                </div>
                                <CardTitle
                                    className="line-clamp-1 text-xl"
                                    title={item.title}
                                >
                                    {item.title}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="flex-1 pb-3">
                                <p className="text-muted-foreground line-clamp-2 text-sm">
                                    {item.content}
                                </p>

                                {/* Meta info */}
                                <div className="flex gap-4 mt-4 text-xs text-muted-foreground font-medium">
                                    <div className="flex items-center gap-1">
                                        <BarChart className="w-3 h-3" />{" "}
                                        {item.segmentCount} câu
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="pt-0">
                                <Button
                                    className="w-full cursor-pointer"
                                    onClick={() =>
                                        navigate(
                                            `/learn/paragraph/${item.id}/practice`,
                                        )
                                    }
                                >
                                    <PlayCircle className="w-4 h-4 mr-2" />
                                    {item.userStatus === "in_progress"
                                        ? "Tiếp tục"
                                        : "Bắt đầu"}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed">
                    <p className="text-muted-foreground">
                        Không tìm thấy bài học nào phù hợp
                    </p>
                    <Button
                        variant="link"
                        className={"cursor-pointer"}
                        onClick={() => {
                            setTopic("all");
                            // setStatus("all");
                        }}
                    >
                        Xóa bộ lọc
                    </Button>
                </div>
            )}

            {/* PAGINATION */}
            {!isLoading && pagination.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    <Button
                        variant="outline"
                        className={"cursor-pointer"}
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        Trước
                    </Button>
                    <span className="flex items-center px-4 text-sm font-medium">
                        Trang {page} / {pagination.totalPages}
                    </span>
                    <Button
                        variant="outline"
                        className={"cursor-pointer"}
                        disabled={page === pagination.totalPages}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        Sau
                    </Button>
                </div>
            )}
        </div>
    );
}

// Skeleton Loading Component
function ParagraphListSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border rounded-xl p-6 space-y-4">
                    <div className="flex justify-between">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-10 w-full mt-4" />
                </div>
            ))}
        </div>
    );
}
