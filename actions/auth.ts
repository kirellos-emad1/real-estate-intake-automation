"use server"

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'
import { loginSchema, signupSchema } from '@/schema'
import { getUserByEmail } from '@/data/get-user-by-email'

export async function login(values: z.infer<typeof loginSchema>) {
  const supabase = await createClient()

  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { error, data } = await supabase.auth.signInWithPassword(validatedFields.data)

  if (!data.session?.user.email_confirmed_at) {
    redirect(`/confirm?email=${values.email}`)
  }

  if (error) {
    console.error('Login error:', error);
    return { error: error.message };
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(values: z.infer<typeof signupSchema>) {
  const supabase = await createClient()

  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, name, password, phone, role } = validatedFields.data;

  try {
    // Check if user already exists
    const existingUsers = await getUserByEmail(email);
    console.log(existingUsers);

    if (existingUsers && existingUsers.length > 0) {
      return { error: 'Email already exists. Please try to login instead.' };
    }

    const { data: authUser, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, role },
      }
    })

    if (authError) {
      console.error('Auth error:', authError)
      return { error: authError.message };
    }

    // Insert user data into the users table
    if (authUser.user) {
      const { error: insertError } = await supabase
        .from('users')
        .insert([
          {
            id: authUser.user.id,
            name,
            email,
            phone,
            role: role as 'USER' | 'AGENT', // Type assertion for the enum
          }
        ])

      if (insertError) {
        console.error('Error inserting user data:', insertError)
        return { error: 'Failed to create user profile' };
      }
    }
    
    // Success - prepare for redirect
    revalidatePath('/', 'layout')
    
  } catch(error) {
    console.error('Signup error:', error);
    return { error: 'An unexpected error occurred during signup' };
  }
  
  // Redirect happens here, outside the try-catch
  redirect(`/confirm?email=${email}`)
}
export const logout = async function () {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error.message);
    return error
  }
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function verifyOTP(OTP: string, email: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    email: email,
    token: OTP,
    type: "signup",

  });

  if (error) {
    console.error('OTP verification error:', error);
    return { error: error.message };
  }
  revalidatePath('/', 'layout')
  redirect('/')

  // Return success if no error
  return { success: true };
}

export async function resendVerifyingCode(email: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resend({
    email: email,
    type: "signup",
  });

  if (error) {
    console.error('OTP resend error:', error);
    return { error: error.message };
  }
  revalidatePath('/', 'layout')
  return { success: "New verification code sent!" }
}