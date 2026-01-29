// src/pages/HomePage.jsx

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BrainCircuit, Gamepad2, Zap } from "lucide-react";

export default function HomePage() {
    // đổi tab title
    useEffect(() => {
        document.title = "Học tiếng Anh thông qua dịch thuật | EnglishMaster";
    }, []);

    return (
        <div className="flex flex-col">
            {/* 1. HERO SECTION */}
            <section className="relative py-20 lg:py-32 bg-linear-to-b from-slate-50 to-white overflow-hidden flex justify-center">
                <div className="container px-4 md:px-6 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                            AI-Powered Feedback 🤖
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-slate-900 leading-tight">
                            Master English Writing with{" "}
                            <span className="text-primary">Real-time AI</span>
                        </h1>

                        {/* Subtext */}
                        <p className="text-xl text-muted-foreground max-w-150">
                            Luyện dịch Việt - Anh thông minh. Nhận phản hồi sửa
                            lỗi ngữ pháp, từ vựng tức thì từ AI
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <Button
                                size="lg"
                                className="text-lg px-8 h-12"
                                asChild
                            >
                                <Link to="/learn/paragraph/select">
                                    Bắt đầu luyện tập{" "}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-lg px-8 h-12"
                                asChild
                            >
                                <Link to="/leaderboard">Xem Bảng Xếp Hạng</Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Background Decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-125 bg-primary/5 rounded-full blur-3xl -z-10" />
            </section>

            {/* 2. FEATURES SECTION */}
            <section className="py-20 bg-white flex justify-center">
                <div className="container px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Tại sao chọn EnglishMaster?
                        </h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                            Phương pháp học tập hiện đại giúp bạn tiến bộ mỗi
                            ngày
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={
                                <BrainCircuit className="h-10 w-10 text-blue-500" />
                            }
                            title="Học Thông Minh"
                            desc="AI phân tích lỗi sai của bạn chi tiết từng câu chữ, giải thích ngữ pháp dễ hiểu"
                        />
                        <FeatureCard
                            icon={
                                <Gamepad2 className="h-10 w-10 text-purple-500" />
                            }
                            title="Trải Nghiệm Game Hóa"
                            desc="Tích điểm và leo bảng xếp hạng để duy trì động lực mỗi ngày"
                        />
                        <FeatureCard
                            icon={<Zap className="h-10 w-10 text-yellow-500" />}
                            title="Phản Hồi Tức Thì"
                            desc="Nhận phân tích và sửa lỗi ngay lập tức từ AI"
                        />
                    </div>
                </div>
            </section>

            {/* 3. FINAL CTA */}
            <section className="py-20 bg-slate-50 border-t flex justify-center">
                <div className="container px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        Bạn đã sẵn sàng nâng trình tiếng Anh?
                    </h2>
                    <Button
                        size="lg"
                        className="text-lg px-12 h-14 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                        asChild
                    >
                        <Link to="/learn/paragraph/select">
                            Thử ngay miễn phí
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <div className="flex flex-col items-center text-center p-6 rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 p-3 bg-slate-50 rounded-full">{icon}</div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{desc}</p>
        </div>
    );
}
