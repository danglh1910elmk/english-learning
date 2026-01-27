// src/features/auth/components/LoginForm.jsx

import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
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

// Schema validate (Copy rule từ Backend sang nếu muốn đồng bộ)
const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: false }).required().label("Email"),
    password: Joi.string().required().label("Password"),
});

export function LoginForm() {
    const navigate = useNavigate();

    const form = useForm({
        resolver: joiResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    async function onSubmit(values) {
        try {
            // 1. Gọi Supabase Auth
            const { data, error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            });

            if (error) throw error;

            // 2. thành công -> redirect
            toast.success("Đăng nhập thành công!");
            navigate("/");
        } catch (error) {
            toast.error(error.message || "Đăng nhập không thành công!");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting
                        ? "Đang đăng nhập..."
                        : "Đăng nhập"}
                </Button>

                <div className="text-center text-sm">
                    Chưa có tài khoản?{" "}
                    <Link to="/register" className="underline text-primary">
                        Đăng ký
                    </Link>
                </div>
            </form>
        </Form>
    );
}
