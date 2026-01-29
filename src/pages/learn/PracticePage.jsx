// src/pages/learn/PracticePage.jsx

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePractice } from "@/features/learn/hooks/usePractice";
import { ParagraphContent } from "@/features/learn/components/ParagraphContent";
import { AIFeedback } from "@/features/learn/components/AIFeedback";
import {
    selectCurrentUser,
    selectIsAuthenticated,
} from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Loader2, ArrowLeft, RotateCcw, Gem, Trophy } from "lucide-react";

export default function PracticePage() {
    // đổi tab title
    useEffect(() => {
        document.title = "Luyện dịch đoạn văn | EnglishMaster";
    }, []);

    const navigate = useNavigate();

    // Auth State
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectCurrentUser);

    const {
        paragraph,
        progress,
        currentIndex,
        isCompleted,
        isLoading,
        isChecking,
        isResetting,
        studentInput,
        setStudentInput,
        feedback,
        handleSubmit,
        handleReset,
    } = usePractice();

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="animate-spin" />
            </div>
        );
    }
    if (!paragraph) return <div>Không có dữ liệu</div>;

    const progressPercent = Math.round(
        (currentIndex / paragraph.segmentCount) * 100,
    );

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col mx-auto">
            {/* HEADER */}
            <header className="bg-white border-b sticky top-0 z-10 px-4">
                <div className="container h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* back button */}
                        <Button
                            variant="ghost"
                            className={"cursor-pointer"}
                            size="icon"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        {/* Title && progress bar */}
                        <div>
                            <h1 className="font-bold text-lg line-clamp-1">
                                {paragraph.title}
                            </h1>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <Progress
                                    value={progressPercent}
                                    className="w-24 h-2"
                                />
                                <span>
                                    {currentIndex}/{paragraph.segmentCount} câu
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* remaining credits & points */}
                    {isAuthenticated && user && (
                        <div className="flex items-center gap-4 text-sm font-medium">
                            <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                <Gem className="w-4 h-4" /> {user.credits}
                            </div>
                            <div className="flex items-center gap-1.5 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                                <Trophy className="w-4 h-4" /> {user.points}
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="container px-4 py-6 flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6 mx-auto">
                {/* LEFT COLUMN (input & content) */}
                <div className="lg:col-span-3 space-y-6">
                    <ParagraphContent
                        paragraph={paragraph}
                        currentIndex={currentIndex}
                        history={progress?.segmentHistory} // truyền history để xử lý hiển thị
                    />

                    {!isCompleted ? (
                        <div className="bg-white p-4 rounded-xl border shadow-sm space-y-4">
                            <label className="text-md font-medium text-slate-700">
                                Bản dịch của bạn:
                            </label>
                            <Textarea
                                placeholder="Nhập bản dịch tiếng Anh cho câu đang được highlight..."
                                className="min-h-30 text-lg! resize-none focus-visible:ring-primary"
                                value={studentInput}
                                onChange={(e) =>
                                    setStudentInput(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.ctrlKey && e.key === "Enter")
                                        handleSubmit();
                                }}
                            />
                            <div className="flex justify-between items-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-muted-foreground hover:text-red-500 cursor-pointer"
                                    onClick={handleReset}
                                    disabled={isResetting}
                                >
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    {isResetting
                                        ? "Đang reset..."
                                        : "Làm lại từ đầu"}
                                </Button>

                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        className={"cursor-pointer"}
                                        onClick={() => setStudentInput("")}
                                    >
                                        Xóa
                                    </Button>
                                    <Button
                                        className={"cursor-pointer"}
                                        onClick={handleSubmit}
                                        disabled={isChecking}
                                    >
                                        {isChecking && (
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        )}
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 bg-green-50 text-center rounded-xl border border-green-200">
                            <h2 className="text-2xl font-bold text-green-700 mb-2">
                                Bạn đã hoàn thành bài học!
                            </h2>
                            <Button
                                onClick={() =>
                                    navigate("/learn/paragraph/select")
                                }
                                className={"cursor-pointer"}
                            >
                                Quay lại danh sách
                            </Button>
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN (Feedback) */}
                <div className="lg:col-span-2">
                    <div className="sticky top-24">
                        <AIFeedback feedback={feedback} />
                    </div>
                </div>
            </main>
        </div>
    );
}
