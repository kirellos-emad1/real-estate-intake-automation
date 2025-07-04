"use client";

import * as z from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/actions/auth";
import { CardWrapper } from "@/components/book-a-viewing/card-wrapper";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

const LoginForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        setError(null);
        startTransition(async () => {
            try {
                const result = await login(values);
                if (result?.error) {
                    setError(result.error);
                } else {
                    toast.success("Logged in successfully!");
                }
            } catch {
                setError("An unexpected error occurred. Please try again.");
            }
        });
    };

    return (
        <CardWrapper headerLabel="Sign In">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full max-w-md space-y-6"
                >
                    {error && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                            {error}
                        </div>
                    )}

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="your@email.com"
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
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="bg-amber-400 w-full hover:bg-amber-400/70 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out"
                    >
                        {isPending ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            </Form>

            <div className="mt-4 text-center text-sm text-gray-600">
                Don&apos;t have an account? 
                <Link href="/register" className=" text-amber-400 hover:text-amber-500 transition duration-300 ease-in-out">
                    Create one
                </Link>
            </div>
        </CardWrapper>
    );
};

export default LoginForm;
