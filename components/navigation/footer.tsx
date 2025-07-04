"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {  FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Mail, Phone, MapPin, ChevronUp } from "lucide-react";
import ThemeChanger from "../ui/theme-changer";


const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Book a Viewing", path: "/book-a-viewing" },
    { name: "Services", path: "#" },
    { name: "Contact", path: "#" },
];

const socialLinks = [
    { name: "Twitter", icon: FaTwitter, path: "#" },
    { name: "Facebook", icon: FaFacebook, path: "#" },
    { name: "Instagram", icon: FaInstagram, path: "#" },
    { name: "LinkedIn", icon: FaLinkedin, path: "#" },
];

export default function Footer() {
    const [mounted, setMounted] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [mounted]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <>
            <footer className="relative  ">
                <div className="mx-2 mb-2">
                    <div className="bg-white/60 dark:bg-zinc-950/60 backdrop-blur-lg max-w-7xl rounded-2xl mx-auto ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
                        {/* Main Footer Content */}
                        <div className="px-6 py-12 lg:px-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {/* Logo & Description */}
                                <div className="lg:col-span-2">
                                    <div className="flex items-center space-x-2 mb-4">
                                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                                            RBB Automations
                                        </span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md leading-relaxed">
                                        AI-powered real estate automation that captures leads, schedules viewings, 
                                        and sends personalized follow-ups—all in under a week.
                                    </p>
                                    
                                    {/* Contact Info */}
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                                            <Mail size={16} className="text-amber-500 dark:text-amber-400" />
                                            <span className="text-sm">hello@rbbautomations.com</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                                            <Phone size={16} className="text-amber-500 dark:text-amber-400" />
                                            <span className="text-sm">+1 (617) 555-0123</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                                            <MapPin size={16} className="text-amber-500 dark:text-amber-400" />
                                            <span className="text-sm">Boston, MA</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Links */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Quick Links
                                    </h3>
                                    <ul className="space-y-3">
                                        {quickLinks.map((link) => (
                                            <li key={link.name}>
                                                <Link
                                                    href={link.path}
                                                    className="text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 text-sm"
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Social Links & Theme */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Connect With Us
                                    </h3>
                                    <div className="flex items-center space-x-3 mb-6">
                                        {socialLinks.map((social) => {
                                            const Icon = social.icon;
                                            return (
                                                <p
                                                    key={social.name}
                                                    className="group cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-lg transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-400/25"
                                                    aria-label={social.name}
                                                >
                                                    <Icon className="h-4 w-4 text-gray-600 dark:text-gray-300 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-200" />
                                                </p>
                                            );
                                        })}
                                    </div>
                                    
                                    {/* Theme Changer */}
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                                            Theme
                                        </h4>
                                        <ThemeChanger />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="border-t border-black/5 dark:border-white/10 px-6 py-6 lg:px-8">
                            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    © 2025 RBB Automations. All rights reserved.
                                </div>
                                <div className="flex items-center space-x-6">
                                    <p
                                        className="text-sm cursor-pointer text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200"
                                    >
                                        Privacy Policy
                                    </p>
                                    <p
                                        className="text-sm cursor-pointer text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200"
                                    >
                                        Terms of Service
                                    </p>
                                    <p
                                        className="text-sm cursor-pointer text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200"
                                    >
                                        Cookie Policy
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg shadow-black/10 dark:shadow-white/5 transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-400/25 group ${
                    showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
                aria-label="Scroll to top"
            >
                <ChevronUp 
                    size={20} 
                    className="text-gray-600 dark:text-gray-300 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-200" 
                />
            </button>
        </>
    );
}