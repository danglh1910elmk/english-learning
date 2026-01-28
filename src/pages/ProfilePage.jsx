// src/pages/ProfilePage.jsx

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { supabase } from "@/lib/supabase";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useUpdateProfileMutation } from "@/features/auth/authApiSlice";
import { useGetUserRankQuery } from "@/features/api/apiSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Trophy, Gem, Calendar, Flame } from "lucide-react";

import {
    useUploadAvatarMutation,
    useDeleteAccountMutation,
} from "@/features/auth/authApiSlice";
import { logout } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Camera, Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { format } from "date-fns";
import { vi } from "date-fns/locale";

// Schema Validate
const profileSchema = Joi.object({
    fullName: Joi.string().empty("").min(2).label("Full Name").optional(),
    bio: Joi.string().allow("").max(200).label("Bio"),
    gender: Joi.string().valid("male", "female").required().label("Gender"),
});

export default function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const [updateProfile, { isLoading: isUpdating }] =
        useUpdateProfileMutation();

    // Fetch Rank
    const { data: rankData, isLoading: isLoadingRank } = useGetUserRankQuery(
        user?.id,
        {
            skip: !user?.id,
        },
    );

    // upload avatar
    const [uploadAvatar, { isLoading: isUploading }] =
        useUploadAvatarMutation();
    // delete account
    const [deleteAccount, { isLoading: isDeleting }] =
        useDeleteAccountMutation();

    const fileInputRef = useRef(null);

    const form = useForm({
        resolver: joiResolver(profileSchema),
        defaultValues: {
            fullName: user?.fullName || "",
            bio: user?.bio || "",
            gender: user?.gender || "male",
        },
    });

    // lấy chữ cái đầu tên để làm fallback Avatar
    const initials = user?.fullName
        ? user.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
        : "U";

    // đổi tab title
    useEffect(() => {
        document.title = "Hồ sơ cá nhân | EnglishMaster";
    }, []);

    // reset form khi user load xong
    useEffect(() => {
        if (user) {
            form.reset({
                fullName: user.fullName || "",
                bio: user.bio || "",
                gender: user.gender || " ",
            });
        }
    }, [user, form]);

    const onSubmit = async (values) => {
        try {
            await updateProfile(values).unwrap();
            toast.success("Thay đổi thông tin cá nhân thành công!");
        } catch (error) {
            toast.error("Có lỗi xảy ra");
            console.log(error);
        }
    };

    // handle avatar upload
    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // validate client-side
        if (file.size > 2 * 1024 * 1024) {
            return toast.error("File quá lớn. Vui lòng chọn ảnh < 2MB");
        }

        const formData = new FormData();
        formData.append("avatar", file);

        try {
            await uploadAvatar(formData).unwrap();
            toast.success("Cập nhật Avatar thành công");
        } catch (err) {
            toast.error("Có lỗi xảy ra khi cập nhật Avatar");
            console.log(err);
        }
    };

    // handle delete account
    const handleDeleteAccount = async () => {
        try {
            await deleteAccount().unwrap();

            await supabase.auth.signOut();
            dispatch(logout());

            toast.success("Tài khoản đã được xóa vĩnh viễn");
            navigate("/");
        } catch (err) {
            toast.error("Không thể xóa tài khoản. Vui lòng thử lại");
            console.log(err);
        }
    };

    if (!user) return null;

    return (
        <div className="container max-w-2xl py-10 space-y-8">
            {/* 1. HEADER & AVATAR */}
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative group">
                    <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                        <AvatarImage
                            src={user.avatar}
                            className="object-cover"
                        />
                        <AvatarFallback className="text-2xl">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    {/* Overlay Button */}
                    <div
                        className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {isUploading ? (
                            <Loader2 className="w-6 h-6 text-white animate-spin" />
                        ) : (
                            <Camera className="w-6 h-6 text-white" />
                        )}
                    </div>

                    {/* hidden input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                {/* fullname + ngày tham gia */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        {user.fullName || user.username}
                    </h1>
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" /> Tham gia{" "}
                        {user.joinedAt
                            ? format(new Date(user.joinedAt), "MMMM yyyy", {
                                  locale: vi,
                              })
                            : "N/A"}
                    </p>
                </div>
            </div>

            {/* 2. STATS  */}
            <div className="grid grid-cols-3 gap-4">
                <StatCard
                    icon={<Trophy className="w-5 h-5 text-yellow-500" />}
                    label="Rank"
                    value={
                        isLoadingRank
                            ? "..."
                            : `#${rankData?.data?.rank || "-"}`
                    }
                />
                <StatCard
                    icon={<Gem className="w-5 h-5 text-blue-500" />}
                    label="Credits"
                    value={user.credits}
                />
                <StatCard
                    icon={<Flame className="w-5 h-5 text-orange-500" />}
                    label="Points"
                    value={user.points}
                />
            </div>

            {/* 3. EDIT FORM */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Thông tin cá nhân</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Họ và tên</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nhập họ và tên"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Giới tính</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Chọn giới tính" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="male">
                                                        Nam
                                                    </SelectItem>
                                                    <SelectItem value="female">
                                                        Nữ
                                                    </SelectItem>
                                                    {/* <SelectItem value="other">
                                                        Khác
                                                    </SelectItem> */}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        value={user.email}
                                        disabled
                                        className="bg-slate-50"
                                    />
                                </FormItem>
                            </div>

                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Giới thiệu (Bio)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Hãy giới thiệu về bản thân"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end pt-2">
                                <Button
                                    type="submit"
                                    disabled={isUpdating}
                                    className={"cursor-pointer"}
                                >
                                    {isUpdating && (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    )}
                                    Lưu thay đổi
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* 4. delete account */}
            <Card className="border-red-100 bg-red-50/30">
                <CardHeader>
                    <CardTitle className="text-red-600 text-lg flex items-center gap-2">
                        <Trash2 className="w-5 h-5" /> Danger Zone
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        <p>
                            Xóa vĩnh viễn tài khoản và toàn bộ dữ liệu học tập
                        </p>
                        <p>Hành động này không thể hoàn tác</p>
                    </div>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                disabled={isDeleting}
                                className={"cursor-pointer"}
                            >
                                {isDeleting ? "Đang xóa..." : "Xóa tài khoản"}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Bạn có chắc chắn không?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Hành động này sẽ xóa vĩnh viễn tài khoản của
                                    bạn khỏi hệ thống. Toàn bộ điểm số, lịch sử
                                    học tập và credit sẽ bị mất và không thể
                                    khôi phục
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className={"cursor-pointer"}>
                                    Hủy bỏ
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDeleteAccount}
                                    className="bg-red-600 hover:bg-red-700 cursor-pointer"
                                >
                                    Xác nhận xóa
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>
        </div>
    );
}

function StatCard({ icon, label, value }) {
    return (
        <div className="bg-white border rounded-xl p-4 flex flex-col items-center justify-center gap-1 shadow-sm">
            <div className="p-2 bg-slate-50 rounded-full mb-1">{icon}</div>
            <span className="text-xl font-bold text-slate-900">{value}</span>
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {label}
            </span>
        </div>
    );
}
