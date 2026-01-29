import { Routes, Route } from "react-router-dom";
import AuthLayout from "@/components/layout/AuthLayout";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ProtectedRoute from "@/routes/ProtectedRoute";
import MainLayout from "@/components/layout/MainLayout";
import HomePage from "@/pages/HomePage";
import SelectionPage from "@/pages/learn/SelectionPage";
import ParagraphListPage from "@/pages/learn/ParagraphListPage";
import PracticePage from "@/pages/learn/PracticePage";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import SentenceSelectionPage from "@/pages/learn/SentenceSelectionPage";
import SentencePracticePage from "@/pages/learn/SentencePracticePage";
import LeaderboardPage from "@/pages/LeaderboardPage";
import ProfilePage from "@/pages/ProfilePage";

export default function App() {
    return (
        <Routes>
            {/* --- PUBLIC ROUTES --- */}
            <Route
                element={
                    <ErrorBoundary>
                        <MainLayout />
                    </ErrorBoundary>
                }
            >
                {/* Home */}
                <Route path="/" element={<HomePage />} />

                {/* PARAGRAPH */}
                {/* chọn level + contentType (paragraph) */}
                <Route
                    path="/learn/paragraph/select"
                    element={<SelectionPage />}
                />

                {/* List bài tập paragraph */}
                <Route
                    path="/learn/paragraph/list"
                    element={<ParagraphListPage />}
                />

                {/* Trang Luyện tập dịch Paragraph */}
                <Route
                    path="/learn/paragraph/:id/practice"
                    element={<PracticePage />}
                />

                {/* SENTENCE */}
                {/* trang chọn level + category (sentence) */}
                <Route
                    path="/learn/sentence/select"
                    element={<SentenceSelectionPage />}
                />

                {/* trang luyện dịch Sentence */}
                <Route
                    path="/learn/sentence/practice"
                    element={<SentencePracticePage />}
                />

                <Route path="/leaderboard" element={<LeaderboardPage />} />
                {/* <Route path="/pricing" element={<PricingPage />} /> */}
            </Route>

            {/* --- AUTH ROUTES --- */}
            <Route
                element={
                    <ErrorBoundary>
                        <AuthLayout />
                    </ErrorBoundary>
                }
            >
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* --- PRIVATE ROUTES --- */}
            <Route element={<ProtectedRoute />}>
                <Route
                    element={
                        <ErrorBoundary>
                            <MainLayout />
                        </ErrorBoundary>
                    }
                >
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>
            </Route>
        </Routes>
    );
}
