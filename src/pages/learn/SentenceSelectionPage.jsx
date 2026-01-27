// src/pages/learn/SentenceSelectionPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SENTENCE_LEVELS, SENTENCE_CATEGORIES } from "@/config/sentenceOptions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ChevronRight, CheckCircle2 } from "lucide-react";

export default function SentenceSelectionPage() {
    const navigate = useNavigate();
    const [level, setLevel] = useState("all");
    const [category, setCategory] = useState("all");
    const [excludeLearned, setExcludeLearned] = useState(true); // default: không học lại câu cũ

    const handleContinue = () => {
        // URL: /learn/sentence/practice?level=...&category=...&excludeLearned=true
        const params = new URLSearchParams({
            level,
            category,
            excludeLearned: excludeLearned.toString(),
        }).toString();

        navigate(`/learn/sentence/practice?${params}`);
    };

    return (
        <div className="container max-w-5xl py-12 px-4">
            <div className="text-center mb-10 space-y-2">
                <h1 className="text-3xl font-bold">Luyện Dịch Câu Đơn</h1>
                <p className="text-muted-foreground">
                    Chọn chủ đề bạn quan tâm để bắt đầu
                </p>
            </div>

            <div className="space-y-10">
                {/* SECTION 1: LEVEL */}
                <section>
                    <h2 className="text-xl font-semibold mb-4">
                        1. Chọn cấp độ
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {SENTENCE_LEVELS.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setLevel(item.id)}
                                className={cn(
                                    "cursor-pointer rounded-xl border-2 p-4 text-center transition-all hover:shadow-sm",
                                    level === item.id
                                        ? `ring-2 ring-primary/20 ${item.color} border-transparent`
                                        : "border-slate-200 bg-white hover:border-primary/30",
                                )}
                            >
                                <span className="font-medium">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SECTION 2: SETTINGS (Học lại câu cũ) */}
                <section className="bg-slate-50 p-4 rounded-xl border flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="font-medium text-slate-900">
                            Chế độ ôn tập thông minh
                        </span>
                        <span className="text-sm text-muted-foreground">
                            Tự động bỏ qua các câu bạn đã làm đúng trước đây
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="exclude-mode"
                            checked={excludeLearned}
                            onCheckedChange={setExcludeLearned}
                        />
                        <Label
                            htmlFor="exclude-mode"
                            className="cursor-pointer"
                        >
                            {excludeLearned ? "Bật" : "Tắt"}
                        </Label>
                    </div>
                </section>

                {/* SECTION 3: CATEGORY */}
                <section>
                    <h2 className="text-xl font-semibold mb-4">
                        2. Chọn chủ đề ({SENTENCE_CATEGORIES.length})
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {SENTENCE_CATEGORIES.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.id}
                                    onClick={() => setCategory(item.id)}
                                    className={cn(
                                        "cursor-pointer rounded-lg border p-3 flex flex-col items-center gap-2 transition-all hover:bg-slate-50",
                                        category === item.id
                                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                                            : "border-slate-200",
                                    )}
                                >
                                    <Icon
                                        className={cn(
                                            "w-6 h-6",
                                            category === item.id
                                                ? "text-primary"
                                                : "text-slate-500",
                                        )}
                                    />
                                    <span className="text-sm font-medium text-center">
                                        {item.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* FOOTER */}
                <div className="flex justify-end pt-6 border-t">
                    <Button
                        size="lg"
                        className="px-10"
                        onClick={handleContinue}
                    >
                        Tiếp tục <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
