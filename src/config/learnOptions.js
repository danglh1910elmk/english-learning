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
