// src/pages/learn/SentencePracticePage.jsx

import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    selectCurrentUser,
    selectIsAuthenticated,
} from "@/features/auth/authSlice";
import {
    useLazyGetNextSentenceQuery,
    useCheckSentenceMutation,
} from "@/features/api/apiSlice";
import { AIFeedback } from "@/features/learn/components/AIFeedback";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
    Loader2,
    ArrowRight,
    SkipForward,
    ArrowLeft,
    Gem,
    Trophy,
} from "lucide-react";

export default function SentencePracticePage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Auth State
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectCurrentUser);

    // Params
    const level = searchParams.get("level");
    const category = searchParams.get("category");
    const excludeLearned = searchParams.get("excludeLearned");

    // Local State
    const [studentInput, setStudentInput] = useState("");
    const [feedback, setFeedback] = useState(null);
    const [currentSentence, setCurrentSentence] = useState(null);

    // API Hooks
    const [fetchNextSentence, { isFetching }] = useLazyGetNextSentenceQuery();
    const [checkSentence, { isLoading: isChecking }] =
        useCheckSentenceMutation();

    // Load Initial
    useEffect(() => {
        handleNext();
    }, []);

    // 1. Fetch Next Sentence
    const handleNext = async () => {
        setFeedback(null);
        setStudentInput("");
        setCurrentSentence(null);

        try {
            const result = await fetchNextSentence({
                level,
                category,
                excludeLearned,
            }).unwrap();
            setCurrentSentence(result.data.sentence);
        } catch (err) {
            if (err.status === 404)
                toast.error("Không còn câu hỏi nào phù hợp!");
            else toast.error("Lỗi tải câu hỏi");
        }
    };

    // 2. Handle Submit
    const handleSubmit = async () => {
        if (!studentInput.trim())
            return toast.warning("Vui lòng nhập bản dịch");

        // Guard: Guest Mode
        if (!isAuthenticated) {
            toast.error("Vui lòng đăng nhập!");
            return;
        }

        try {
            const result = await checkSentence({
                sentenceId: currentSentence.id,
                studentSentence: studentInput,
                targetLanguage: "en",
            }).unwrap();

            setFeedback(result.data.evaluation);

            if (result.data.evaluation.acceptable) {
                toast.success("Bạn đã dịch chính xác!");
            } else {
                toast.error("Chưa chính xác. Hãy thử lại!");
            }
        } catch (err) {
            // Xử lý lỗi đặc thù
            if (err.status === 402) {
                toast.error("Bạn đã hết Credit! Vui lòng nạp thêm để tiếp tục");
                // navigate('/pricing')
            } else {
                toast.error("Có lỗi xảy ra");
            }
        }
    };

    // Logic hiển thị nút: Nếu đúng -> Nút Next. Nếu sai/chưa làm -> Nút Check
    const isPassed = feedback?.acceptable;

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {/* 1. HEADER THỐNG KÊ */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container h-16 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(-1)}
                        className="text-slate-600"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Thoát
                    </Button>

                    {/* Stats chỉ hiện khi Login */}
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

            {/* 2. MAIN CONTENT */}
            <main className="container max-w-2xl py-8 flex-1 flex flex-col justify-center space-y-8">
                {/* Câu hỏi */}
                <div className="space-y-4 text-center">
                    <h2 className="text-sm font-bold text-primary/80 uppercase tracking-widest">
                        Translate this sentence
                    </h2>
                    {isFetching || !currentSentence ? (
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-3/4 mx-auto" />
                            <Skeleton className="h-8 w-1/2 mx-auto" />
                        </div>
                    ) : (
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 leading-relaxed">
                            {currentSentence.text}
                        </h1>
                    )}
                </div>

                {/* Input & Actions */}
                <div className="space-y-4">
                    <Textarea
                        placeholder="Type your translation here..."
                        className="min-h-30 text-lg p-4 resize-none border-2 shadow-sm focus-visible:ring-primary/30"
                        value={studentInput}
                        onChange={(e) => setStudentInput(e.target.value)}
                        disabled={isPassed || isFetching} // disable input khi đã làm đúng
                        onKeyDown={(e) => {
                            if (e.ctrlKey && e.key === "Enter") {
                                isPassed ? handleNext() : handleSubmit();
                            }
                        }}
                    />

                    {/* Action Buttons Logic */}
                    {!isPassed ? (
                        <div className="flex gap-3">
                            <Button
                                variant="secondary"
                                className="flex-1 h-12 text-base"
                                onClick={handleNext}
                                disabled={isFetching || isChecking}
                            >
                                <SkipForward className="w-4 h-4 mr-2" /> Bỏ qua
                            </Button>
                            <Button
                                className="flex-2 h-12 text-base shadow-lg hover:shadow-xl transition-all"
                                onClick={handleSubmit}
                                disabled={isFetching || isChecking}
                            >
                                {isChecking ? (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                    "Kiểm tra"
                                )}
                            </Button>
                        </div>
                    ) : (
                        <Button
                            size="lg"
                            className="w-full h-12 text-base bg-green-600 hover:bg-green-700 shadow-lg animate-in zoom-in duration-300"
                            onClick={handleNext}
                        >
                            Câu tiếp theo{" "}
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    )}
                </div>

                {/* Feedback Area */}
                {feedback && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <AIFeedback feedback={feedback} />
                    </div>
                )}
            </main>
        </div>
    );
}
