// src/features/learn/hooks/usePractice.js

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    useGetParagraphDetailQuery,
    useCheckTranslationMutation,
    useResetProgressMutation,
} from "@/features/api/apiSlice";
import { toast } from "sonner";

export function usePractice() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [studentInput, setStudentInput] = useState("");
    const [feedback, setFeedback] = useState(null);

    // API Calls
    const { data, isLoading } = useGetParagraphDetailQuery(id);
    const [checkTranslation, { isLoading: isChecking }] =
        useCheckTranslationMutation();
    const [resetProgress, { isLoading: isResetting }] =
        useResetProgressMutation(); // Hook reset

    const paragraph = data?.data?.paragraph;
    const progress = data?.data?.progress;

    const currentIndex = progress?.currentIndex || 0;
    const isCompleted = progress?.status === "completed";

    // khi chuyển câu mới -> chỉ reset input, GIỮ NGUYÊN FEEDBACK câu cũ để user đọc
    useEffect(() => {
        setStudentInput("");
        // setFeedback(null) // giữ lại feedback khi chuyển câu
    }, [currentIndex]);

    const handleSubmit = async () => {
        if (!studentInput.trim()) {
            toast.warning("Vui lòng nhập bản dịch");
            return;
        }

        try {
            const result = await checkTranslation({
                paragraphId: id,
                segmentIndex: currentIndex,
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
            if (err.status === 402)
                toast.error("Hết Credit! Vui lòng nạp thêm.");
            else if (err.status === 401) toast.error("Vui lòng đăng nhập.");
            else toast.error("Có lỗi xảy ra");
        }
    };

    // Handle Reset
    const handleReset = async () => {
        if (
            confirm(
                "Bạn có chắc muốn làm lại từ đầu? Mọi lịch sử bài này sẽ bị xóa!",
            )
        ) {
            try {
                await resetProgress(id).unwrap();
                setFeedback(null);
                setStudentInput("");
                toast.success("Đã reset bài học");
            } catch (err) {
                toast.error("Lỗi khi reset");
                console.log(err);
            }
        }
    };

    return {
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
    };
}
