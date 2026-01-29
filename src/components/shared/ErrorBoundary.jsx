// src/components/shared/ErrorBoundary.jsx

import React from "react";
import { Button } from "@/components/ui/button";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // TODO: send to Sentry / LogRocket
        console.error("Uncaught error:", error, errorInfo);
    }

    resetError = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="h-screen flex flex-col items-center justify-center p-4 text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">
                        Đã có lỗi xảy ra
                    </h2>

                    {import.meta.env.DEV && (
                        <pre className="text-left bg-slate-100 p-3 rounded text-sm max-w-xl overflow-auto">
                            {this.state.error?.message}
                        </pre>
                    )}

                    <div className="flex gap-2 mt-4">
                        <Button onClick={() => window.location.reload()}>
                            Tải lại trang
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => (location.href = "/")}
                        >
                            Về trang chủ
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
