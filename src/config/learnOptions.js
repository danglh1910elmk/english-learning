// src/config/learnOptions.js

import {
    BookOpen,
    Briefcase,
    Mail,
    Newspaper,
    Feather,
    Notebook,
} from "lucide-react";

export const LEVELS = [
    {
        id: "beginner",
        label: "Beginner",
        desc: "Dành cho người mới bắt đầu",
        color: "bg-green-100 text-green-700 border-green-200",
    },
    {
        id: "intermediate",
        label: "Intermediate",
        desc: "Có nền tảng cơ bản",
        color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    {
        id: "advanced",
        label: "Advanced",
        desc: "Thử thách nâng cao",
        color: "bg-purple-100 text-purple-700 border-purple-200",
    },
];

export const CONTENT_TYPES = [
    { id: "essay", label: "Essay", icon: BookOpen },
    { id: "report", label: "Report", icon: Briefcase },
    { id: "email", label: "Email", icon: Mail },
    { id: "article", label: "Article", icon: Newspaper },
    { id: "story", label: "Story", icon: Feather },
    { id: "diary", label: "Diary", icon: Notebook },
];

export const TOPICS = [
    { value: "all", label: "Tất cả chủ đề" },
    { value: "everyday_life", label: "Đời sống thường ngày" },
    { value: "work_business", label: "Công việc & Kinh doanh" },
    { value: "school_education", label: "Giáo dục" },
    { value: "health_medicine", label: "Sức khỏe" },
    { value: "culture_society", label: "Văn hóa & Xã hội" },
    { value: "personal_communication", label: "Giao tiếp cá nhân" },
    { value: "transportation_travel", label: "Giao thông & Du lịch" },
    { value: "public_services", label: "Dịch Vụ Công" },
    { value: "shopping_money", label: "Mua Sắm & Tiền Bạc" },
    { value: "food_drink", label: "Ẩm thực & Đồ uống" },
    { value: "entertainment_leisure", label: "Giải trí & Thư giãn" },
    { value: "nature_environment", label: "Thiên nhiên & Môi trường" },
    { value: "science_technology", label: "Khoa học & Công nghệ" },
    { value: "government_politics", label: "Chính trị" },
    { value: "history_geography", label: "Lịch sử & Địa lý" },
    { value: "sports_fitness", label: "Thể thao" },
    { value: "arts_literature", label: "Nghệ thuật & Văn học" },
    { value: "religion_spirituality", label: "Tôn giáo & Tâm linh" },
    { value: "law_justice", label: "Luật pháp & Công lý" },
    { value: "philosophy_ethics", label: "Triết học & Đạo đức" },
];

export const STATUSES = [
    { value: "all", label: "Tất cả" },
    { value: "not_started", label: "Mới" },
    { value: "in_progress", label: "Đang học" },
    { value: "completed", label: "Đã Hoàn thành" },
];
