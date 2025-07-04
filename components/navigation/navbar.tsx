"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, User, LogOut, LogIn } from "lucide-react";
import { Button } from "../ui/button";
import { logout } from "@/actions/auth";

type UserMetadata = {
    avatar_url?: string;
    full_name?: string;
    email?: string;
    role?: string;
};

const links = [
    { name: "Home", path: "/" },
    { name: "Book a Viewing", path: "/book-a-viewing" },
];

export default function Navbar({user}:{user?:UserMetadata}) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const dropdown = document.getElementById("user-dropdown");
            if (dropdown && !dropdown.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        try {
            const error = await logout()
            if (error) {
                console.error("Error signing out:", error);
            } 
                setDropdownOpen(false);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
                <div
                    className={`mx-2 mt-2 transition-all duration-300 ${scrolled
                        ? "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-lg"
                        : "bg-white/60 dark:bg-zinc-950/60 backdrop-blur-lg"
                        } max-w-7xl rounded-2xl px-3 md:mx-auto md:px-6 ring-1 ring-black/5 dark:ring-white/10`}
                >
                    <nav className="flex h-16 w-full items-center justify-between">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="text-xl font-bold text-gray-900 dark:text-white"
                        >
                            RBB Automations
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-2">
                            {links.map((link) => {
                                const isActive = pathname === link.path;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.path}
                                        className={`px-4 py-2 text-sm lg:text-base font-medium transition-all duration-200 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 ${isActive
                                            ? "text-amber-500 dark:text-amber-400"
                                            : "text-gray-700 dark:text-gray-200 hover:text-amber-500 dark:hover:text-amber-400"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}

                            {/* User Dropdown */}
                            <div className="relative" id="user-dropdown">
                                {  (
                                    <>
                                        <button
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                            className="flex items-center space-x-2 p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
                                        >
                                            {user?.avatar_url ? (
                                                <img
                                                    src={user.avatar_url}
                                                    alt={user.full_name || "User"}
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                                                    <User size={16} className="text-white" />
                                                </div>
                                            )}
                                            <span className="text-sm font-medium">
                                                {user?.full_name || user?.email || "Guest"}
                                            </span>
                                        </button>

                                        {/* Dropdown Menu */}
                                        {dropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-black/10 dark:border-white/10 py-2 z-50">
                                                <div className="px-4 py-2 border-b border-black/10 dark:border-white/10">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {user?.full_name || "Guest"}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {user?.email}
                                                    </p>
                                                </div>

                                                {user?.role === "AGENT" && (
                                                    <>
                                                        <Link
                                                            href="/agent"
                                                            onClick={() => setDropdownOpen(false)}
                                                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
                                                        >
                                                            <User size={16} />
                                                            <span>Agent Panel</span>
                                                        </Link>
                                                        <div className="border-t border-black/10 dark:border-white/10 my-1"></div>
                                                    </>
                                                )}

                                                {user ? (
                                                    <button
                                                        onClick={handleSignOut}
                                                        className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 w-full text-left"
                                                    >
                                                        <LogOut size={16} />
                                                        <span>Sign Out</span>
                                                    </button>
                                                ) : (
                                                    <Link
                                                        href="/login"
                                                        className="w-full"
                                                        onClick={() => setDropdownOpen(false)}
                                                    >
                                                        <Button
                                                            variant="link"
                                                            className="flex items-center space-x-2 px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 w-full text-left h-auto"
                                                        >
                                                            <LogIn size={16} />
                                                            <span>Log in</span>
                                                        </Button>
                                                    </Link>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </nav>
                </div>
            </header>

            {/* Mobile Menu */}
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/20 md:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="fixed top-20 left-2 right-2 z-50 md:hidden">
                        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 shadow-xl overflow-hidden">
                            <div className="p-4">
                                {links.map((link) => {
                                    const isActive = pathname === link.path;
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.path}
                                            onClick={() => setIsOpen(false)}
                                            className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                                ? "text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20"
                                                : "text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5"
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    );
                                })}

                                {/* Mobile User Section */}
                                <div className="border-t border-black/10 dark:border-white/10 mt-4 pt-4">
                                    { (
                                        <>
                                            <div className="flex items-center space-x-3 px-4 py-2">
                                                {user?.avatar_url ? (
                                                    <img
                                                        src={user.avatar_url}
                                                        alt={user.full_name || "Guest"}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                                                        <User size={20} className="text-white" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {user?.full_name || "Guest"}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {user?.email}
                                                    </p>
                                                </div>
                                            </div>

                                            {user?.role === "AGENT" && (
                                                <Link
                                                    href="/agent"
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all duration-200"
                                                >
                                                    <User size={18} />
                                                    <span>Agent Panel</span>
                                                </Link>
                                            )}

                                            {user ? (
                                                <button
                                                    onClick={handleSignOut}
                                                    className="flex items-center space-x-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 w-full text-left"
                                                >
                                                    <LogOut size={18} />
                                                    <span>Sign Out</span>
                                                </button>
                                            ) : (
                                                <Link
                                                    href="/login"
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex items-center space-x-3 px-4 py-3 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200 w-full text-left"
                                                >
                                                    <LogIn size={18} />
                                                    <span>Log in</span>
                                                </Link>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}