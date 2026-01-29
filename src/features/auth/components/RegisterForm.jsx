// src/features/auth/components/RegisterForm.jsx

import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";

// Schema validate
const registerSchema = Joi.object({
    fullName: Joi.string().required().min(2).label("Full Name"),
    email: Joi.string().email({ tlds: false }).required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
});

export function RegisterForm() {
    const navigate = useNavigate();

    const form = useForm({
        resolver: joiResolver(registerSchema),
        defaultValues: { fullName: "", email: "", password: "" },
    });

    async function onSubmit(values) {
        try {
            // gọi Supabase SignUp
            // eslint-disable-next-line no-unused-vars
            const { data, error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                    // Truyền meta data để Trigger Postgres lấy được
                    data: {
                        full_name: values.fullName,
                        avatar_url: "",
                    },
                },
            });

            if (error) throw error;

            toast.success("Đăng ký thành công!");
            navigate("/login");
        } catch (error) {
            toast.error(error.message || "Đăng ký không thành công!");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Full Name */}
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên Đầy Đủ</FormLabel>
                            <FormControl>
                                <Input placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="example@gmail.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? "Đang tạo..." : "Đăng ký"}
                </Button>

                <div className="text-center text-sm">
                    Đã có tài khoản?{" "}
                    <Link to="/login" className="underline text-primary">
                        Đăng nhập
                    </Link>
                </div>
            </form>
        </Form>
    );
}
