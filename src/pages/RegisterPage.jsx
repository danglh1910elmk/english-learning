// src/pages/RegisterPage.jsx

import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { useEffect } from "react";

export default function RegisterPage() {
    // đổi tab title
    useEffect(() => {
        document.title = "Đăng ký | EnglishMaster";
    }, []);

    return <RegisterForm />;
}
