// src/pages/learn/SelectionPage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LEVELS, CONTENT_TYPES } from "@/config/learnOptions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Hàm classnames của shadcn

export default function SelectionPage() {
    const navigate = useNavigate();
    const [level, setLevel] = useState(null);
    const [type, setType] = useState(null);

    const handleContinue = () => {
        if (level && type) {
            // Chuyển hướng kèm Query Params
            navigate(
                `/learn/paragraph/list?level=${level}&contentType=${type}`,
            );
        }
    };

    return (
        <div className="container max-w-4xl py-12 px-4 md:py-20">
            <div className="text-center mb-12 space-y-2">
                <h1 className="text-2xl font-bold tracking-tight md:text-4xl">
                    Chọn cấp độ và loại nội dung muốn luyện tập
                </h1>
                {/* <p className="text-muted-foreground text-lg">
                    Chọn cấp độ và chủ đề bạn muốn rèn luyện hôm nay
                </p> */}
            </div>

            <div className="space-y-12">
                {/* SECTION 1: LEVEL */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">
                            1
                        </span>
                        Chọn cấp độ
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {LEVELS.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setLevel(item.id)}
                                className={cn(
                                    "relative cursor-pointer rounded-xl border-2 p-6 transition-all hover:shadow-md",
                                    level === item.id
                                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                        : "border-border bg-card hover:border-primary/50",
                                )}
                            >
                                {level === item.id && (
                                    <div className="absolute top-3 right-3 text-primary">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                )}
                                <div
                                    className={cn(
                                        "inline-flex px-3 py-1 rounded-full text-xs font-medium mb-3",
                                        item.color,
                                    )}
                                >
                                    {item.label}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SECTION 2: CONTENT TYPE */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">
                            2
                        </span>
                        Chọn loại nội dung
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {CONTENT_TYPES.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Card
                                    key={item.id}
                                    onClick={() => setType(item.id)}
                                    className={cn(
                                        "cursor-pointer transition-all hover:shadow-md border-2",
                                        type === item.id
                                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                            : "border-border hover:border-primary/50",
                                    )}
                                >
                                    <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                                        <div
                                            className={cn(
                                                "p-3 rounded-full transition-colors",
                                                type === item.id
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-slate-100 text-slate-600",
                                            )}
                                        >
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <span className="font-medium">
                                            {item.label}
                                        </span>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </section>

                {/* FOOTER ACTION */}
                <div className="flex justify-end pt-8 border-t">
                    <Button
                        size="lg"
                        onClick={handleContinue}
                        disabled={!level || !type}
                        className="px-8 text-lg"
                    >
                        Tiếp tục <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
