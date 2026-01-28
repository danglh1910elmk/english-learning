// src/pages/LoginPage.jsx

import { LoginForm } from "@/features/auth/components/LoginForm";
import { useEffect } from "react";

export default function LoginPage() {
    // đổi tab title
    useEffect(() => {
        document.title = "Đăng nhập | EnglishMaster";
    }, []);

    return <LoginForm />;
}
