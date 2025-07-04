"use client";
import * as z from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookViewSchema } from "@/schema";
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
import { createBookViewAction } from "@/actions/create-a-book-view";
import toast from "react-hot-toast";
import { PhoneInputStyled } from "../ui/phone-input-styled";
import { CardWrapper } from "./card-wrapper";

const BookViewForm = () => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof bookViewSchema>>({
        resolver: zodResolver(bookViewSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            propertyAddress: "",
        },
    });

    const onSubmit = (values: z.infer<typeof bookViewSchema>) => {
        startTransition(async () => {
            try {
                await createBookViewAction(values);
                toast.success("Viewing booked successfully!");
                form.reset();
            } catch (error) {
                console.log(error)
                toast.error("Failed to book viewing.");
            }
        });
    };

    return (
        <CardWrapper headerLabel="Book a Viewing">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input  placeholder="John Doe" {...field} />
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
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email"  placeholder="john.doe@example.com" {...field} />
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
                        name="propertyAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Property Address</FormLabel>
                                <FormControl>
                                    <Input  placeholder="123 Main St, Anytown, USA" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="bg-amber-400 hover:bg-amber-400/20 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out" disabled={isPending} type="submit">
                        {isPending ? "Submitting..." : "Submit"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default BookViewForm;