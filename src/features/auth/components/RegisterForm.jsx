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
            // Gọi Supabase SignUp
            const { data, error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                    // Quan trọng: Truyền meta data để Trigger Postgres lấy được
                    data: {
                        full_name: values.fullName,
                        avatar_url: "", // Để trống hoặc random avatar
                    },
                },
            });

            if (error) throw error;

            toast.success("Registration successful! You can now log in.");
            // Tùy setting Supabase của bạn có bắt confirm email không
            // Nếu tắt confirm email -> Nó tự login luôn -> Redirect Dashboard
            // Nếu bật confirm -> Báo check mail
            navigate("/login");
        } catch (error) {
            toast.error(error.message || "Registration failed");
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
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
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
                                    placeholder="name@example.com"
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
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting
                        ? "Creating account..."
                        : "Sign Up"}
                </Button>

                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="underline text-primary">
                        Sign in
                    </Link>
                </div>
            </form>
        </Form>
    );
}
