import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/navbar";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/navigation/footer";
import { createClient } from "@/utils/supabase/server";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Real Estate Intake Automation",
  description:
    "A modern automation tool for capturing real estate leads, sending confirmations, and tracking statuses in real time.",
};

export default async function  RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient()
  const {data} = await supabase.auth.getUser()
  const user =  data.user?.user_metadata
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} `}
      >
        <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
        <main className="h-full bg-[#F7F7F7] dark:bg-zinc-950 antialiased">
         <Navbar user={user} /> 
        <Toaster/>
          {children}
          <Footer />
        </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
