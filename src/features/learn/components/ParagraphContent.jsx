// src/features/learn/components/ParagraphContent.jsx

import { cn } from "@/lib/utils";

export function ParagraphContent({ paragraph, currentIndex, history = [] }) {
    if (!paragraph) return null;

    return (
        <div className="bg-white rounded-xl border p-6 shadow-sm min-h-[300px] text-lg leading-relaxed">
            {paragraph?.segments?.map((originalSegment, index) => {
                const isCurrent = index === currentIndex;

                // Logic tìm câu tiếng Anh đã dịch đúng
                // Tìm trong history xem có bản ghi nào của index này mà passed không?
                // Lấy cái mới nhất (cuối mảng)
                const passedRecord = history
                    ?.filter(
                        (h) =>
                            h.segmentIndex === index &&
                            h.aiFeedback?.acceptable,
                    )
                    .pop();

                // Nếu có passedRecord -> Hiển thị Tiếng Anh (Correction)
                // Nếu không -> Hiển thị Tiếng Việt gốc
                const displayText = passedRecord
                    ? passedRecord.aiFeedback.correction ||
                      passedRecord.studentSentence // Ưu tiên correction
                    : originalSegment;

                // Trạng thái hiển thị
                const isEnglish = !!passedRecord; // Đã dịch xong

                return (
                    <span
                        key={index}
                        className={cn(
                            "transition-all duration-300 px-1 rounded inline",

                            // 1. Câu đang làm: Highlight vàng, text gốc
                            isCurrent &&
                                "bg-yellow-100 text-slate-900 font-medium ring-2 ring-yellow-400 scale-105",

                            // 2. Câu đã xong (Tiếng Anh): Màu xanh, in nghiêng nhẹ để phân biệt
                            isEnglish &&
                                "text-green-700 font-medium italic bg-green-50/50",

                            // 3. Câu chưa làm: Mờ đi
                            !isCurrent && !isEnglish && "opacity-50 grayscale",
                        )}
                    >
                        {displayText}
                    </span>
                );
            })}
        </div>
    );
}
