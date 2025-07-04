"use client";

import * as z from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { resendVerifyingCode, verifyOTP } from "@/actions/auth";
import { CardWrapper } from "@/components/book-a-viewing/card-wrapper";
import { useState } from "react";
import toast from "react-hot-toast";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { otpSchema } from "@/schema";
import { createClient } from "@/utils/supabase/client";



const ConfirmEmailForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const form = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: "",
        },
    });

    const onSubmit = (values: z.infer<typeof otpSchema>) => {
        if (!email) {
            setError("Email parameter is missing. Please try again.");
            return;
        }

        setError(null);
        startTransition(async () => {
            try {
                const result = await verifyOTP(values.otp, email);
                if (result?.error) {
                    setError(result.error);
                } else {
                    toast.success("Email verified successfully!");
                }
            } catch {
                setError("An unexpected error occurred. Please try again.");
            }
        });
    };

    if (!email) {
        return (
            <CardWrapper headerLabel="Confirm Your Email">
                <div className="text-center">
                    <p className="text-red-600 text-sm">
                        Email parameter is missing. Please check your email and click the verification link again.
                    </p>
                </div>
            </CardWrapper>
        );
    }

    return (
        <CardWrapper headerLabel="Confirm Your Email">
            <div className="text-center mb-6">
                <p className="text-sm ">
                    We've sent a verification code to
                </p>
                <p className="font-semibold ">{email}</p>
                <p className="text-sm  mt-2">
                    Please enter the 6-digit code below
                </p>
            </div>

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
                        name="otp"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-center">
                                <FormLabel>Verification Code</FormLabel>
                                <FormControl>
                                    <InputOTP
                                        maxLength={6}
                                        pattern={REGEXP_ONLY_DIGITS}
                                        {...field}
                                    >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator/>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                        
                                    </InputOTP>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isPending || form.watch("otp").length !== 6}
                        className="bg-amber-400 w-full hover:bg-amber-400/70 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out"
                    >
                        {isPending ? "Verifying..." : "Verify Email"}
                    </Button>
                </form>
            </Form>

            <div className="mt-4 text-center text-sm text-gray-600">
                Didn't receive the code?{" "}
                <button 
                    className="text-amber-400 hover:text-amber-500 transition duration-300 ease-in-out underline"
                    onClick={async() => {

                        const data = await resendVerifyingCode(email)
                        if(data.success){
                            toast.success(data.success)
                        }
                    }}
                >
                    Resend
                </button>
            </div>
        </CardWrapper>
    );
};

export default ConfirmEmailForm;