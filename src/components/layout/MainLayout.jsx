// src/components/layout/MainLayout.jsx

import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col font-sans text-slate-900">
            <Header />

            {/* Main Content Area */}
            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
