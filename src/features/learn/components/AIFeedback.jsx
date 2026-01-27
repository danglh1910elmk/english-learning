// src/features/learn/components/AIFeedback.jsx

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Lightbulb } from "lucide-react";

export function AIFeedback({ feedback }) {
    if (!feedback)
        return (
            <div className="h-full py-1 flex items-center justify-center text-muted-foreground bg-slate-50 rounded-xl border border-dashed">
                <p>Kết quả phân tích từ AI</p>
            </div>
        );

    const isPass = feedback.acceptable;

    return (
        <Card
            className={
                isPass
                    ? "border-green-200 bg-green-50/50"
                    : "border-red-200 bg-red-50/50"
            }
        >
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                    {isPass ? (
                        <CheckCircle className="text-green-600" />
                    ) : (
                        <XCircle className="text-red-600" />
                    )}
                    {isPass ? "Chính xác!" : "Chưa chính xác"}
                    <span className="ml-auto text-sm font-normal text-muted-foreground">
                        Score: {feedback.score}/100
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                {/* Correction */}
                <div>
                    <p className="font-semibold mb-1 text-slate-700">
                        Đáp án gợi ý:
                    </p>
                    <p className="text-base font-medium text-slate-900 bg-white p-2 rounded border">
                        {feedback.correction}
                    </p>
                </div>

                {/* Suggestions */}
                {feedback.suggestions?.length > 0 && (
                    <div>
                        <p className="font-semibold mb-1 text-slate-700 flex items-center gap-1">
                            <Lightbulb className="w-4 h-4 text-yellow-500" />{" "}
                            Góp ý:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-slate-700">
                            {feedback.suggestions.map((s, i) => (
                                <li key={i}>{s}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Explanation */}
                {feedback.explanation && (
                    <div className="bg-white/50 p-3 rounded text-slate-600 italic">
                        {feedback.explanation.grammar}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
