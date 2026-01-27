// src/config/sentenceOptions.js

import {
    Smile,
    Briefcase,
    Plane,
    GraduationCap,
    Building2,
    HeartPulse,
    ShoppingCart,
    Coffee,
    Music,
    Trees,
    FlaskConical,
    Globe,
    Landmark,
    Trophy,
    Palette,
    Book,
    Scale,
    Lightbulb,
    User,
} from "lucide-react";

export const SENTENCE_LEVELS = [
    {
        id: "all",
        label: "Tất cả cấp độ",
        color: "bg-slate-100 text-slate-700 border-slate-200",
    },
    {
        id: "beginner",
        label: "Beginner",
        color: "bg-green-100 text-green-700 border-green-200",
    },
    {
        id: "intermediate",
        label: "Intermediate",
        color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    {
        id: "advanced",
        label: "Advanced",
        color: "bg-purple-100 text-purple-700 border-purple-200",
    },
];

export const SENTENCE_CATEGORIES = [
    { id: "all", label: "Tất cả chủ đề", icon: Globe },
    { id: "everyday_life", label: "Đời sống thường ngày", icon: Smile },
    { id: "work_business", label: "Công việc & Kinh doanh", icon: Briefcase },
    { id: "school_education", label: "Giáo dục", icon: GraduationCap },
    { id: "health_medicine", label: "Sức khỏe", icon: HeartPulse },
    { id: "culture_society", label: "Văn hóa & Xã hội", icon: User },
    { id: "personal_communication", label: "Giao tiếp cá nhân", icon: Smile },
    { id: "transportation_travel", label: "Giao thông & Du lịch", icon: Plane },
    { id: "public_services", label: "Dịch vụ công", icon: Building2 },
    { id: "shopping_money", label: "Mua Sắm & Tiền Bạc", icon: ShoppingCart },
    { id: "food_drink", label: "Ẩm thực", icon: Coffee },
    { id: "entertainment_leisure", label: "Giải trí", icon: Music },
    {
        id: "nature_environment",
        label: "Thiên nhiên & Môi trường",
        icon: Trees,
    },
    {
        id: "science_technology",
        label: "Khoa học & Công nghệ",
        icon: FlaskConical,
    },
    { id: "government_politics", label: "Chính trị", icon: Landmark },
    { id: "history_geography", label: "Lịch sử & Địa lý", icon: Globe },
    { id: "sports_fitness", label: "Thể thao", icon: Trophy },
    { id: "arts_literature", label: "Nghệ thuật & Văn học", icon: Palette },
    { id: "religion_spirituality", label: "Tôn giáo & Tâm linh", icon: Book },
    { id: "law_justice", label: "Pháp luật", icon: Scale },
    { id: "philosophy_ethics", label: "Triết học", icon: Lightbulb },
];
