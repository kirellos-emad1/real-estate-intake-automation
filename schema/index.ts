import * as z from "zod"
import { parsePhoneNumberWithError } from 'libphonenumber-js';

export const bookViewSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.string().nonempty("Email is required").email("Invalid email"),
    phone: z.string().nonempty("Phone number is required").refine((value) => {
        try {
            const phoneNumber = parsePhoneNumberWithError(value);
            return phoneNumber.isValid()
        } catch (error) {
            return false; // Return false for invalid phone numbers
        }
    }, "Invalid phone number"),
    propertyAddress: z.string().min(1, "Property is required"),
})

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().nonempty("Phone number is required").refine((value) => {
        try {
            const phoneNumber = parsePhoneNumberWithError(value);
            return phoneNumber.isValid()
        } catch (error) {
            return false; // Return false for invalid phone numbers
        }
    }, "Invalid phone number"),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.string().optional()
})

export const otpSchema = z.object({
    otp: z.string().min(6, 'Invalid OTP').max(6, 'Invalid OTP')
})