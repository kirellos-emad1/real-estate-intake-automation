"use server";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { bookViewSchema } from "@/schema";


export async function createBookViewAction(values: z.infer<typeof bookViewSchema>) {

    const validatedFields = bookViewSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new Error("Invalid booking details");
    }
    const { name, email, phone, propertyAddress } = validatedFields.data;

    const webhookUrl = process.env.N8N_NEW_LEAD_WEBHOOK_URL;
    if (!webhookUrl) {
        throw new Error("N8N_NEW_LEAD_WEBHOOK_URL environment variable is not set");
    }
    console.log(phone)
    const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            phone,
            property_address: propertyAddress,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to create booking");
    }

    // Revalidate the current path to reflect changes
    revalidatePath("/book-a-viewing");

}