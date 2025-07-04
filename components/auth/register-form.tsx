"use client";

import * as z from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/schema";
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
import { signup } from "@/actions/auth";
import { CardWrapper } from "@/components/book-a-viewing/card-wrapper";
import { toast } from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { PhoneInputStyled } from "../ui/phone-input-styled";

// Define the form type explicitly
type SignupFormData = z.infer<typeof signupSchema>;

const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
            role: "USER"
        },
    });

    const onSubmit = (values: SignupFormData) => {
        startTransition(async () => {
            try {
                const result = await signup(values);
                if (result?.error) {
                    console.log(result.error)
                } else {
                    toast.success("Account created successfully!");
                    form.reset();
                }
            } catch (error) {
                
                toast.error("An unexpected error occurred. Please try again.");
            }
        });
    };

    return (
        <CardWrapper headerLabel="Create Account">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
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

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="email@example.com" {...field} />
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

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <PhoneInputStyled defaultCountry="US" placeholder="Enter Phone Number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent defaultValue={"USER"}>
                                        <SelectItem value="USER">User</SelectItem>
                                        <SelectItem value="AGENT">Agent</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="  w-full bg-amber-400  hover:bg-amber-400/70 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out"
                    >
                        {isPending ? "Creating Account..." : "Create Account"}
                    </Button>
                </form>
            </Form>

            <div className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-amber-400 hover:text-amber-500 transition duration-300 ease-in-out">
                    Sign in
                </Link>
            </div>
        </CardWrapper>
    );
};

export default RegisterForm;