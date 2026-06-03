"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
    { label: "ABOUT", href: "#hero" },
    { label: "VENTURES", href: "#ventures" },
    { label: "SKILLS", href: "#skills" },
    { label: "PRODUCTS", href: "#products" },
    { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                if (data.success && data.user.role === "ADMIN") {
                    setIsAdmin(true);
                }
            } catch (err) {
                console.error("Failed to check admin status", err);
            }
        };
        checkAdmin();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout failed", error);
            router.push("/login");
        }
    };

    const scrollTo = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
            className="fixed top-0 w-full z-50 border-b"
            style={{
                background: "rgba(2,9,18,0.85)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderColor: "rgba(0,245,196,0.15)",
            }}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                {/* Left — Identity */}
                <div className="flex flex-col justify-center">
                    <span className="font-orbitron font-bold text-sm md:text-base text-white tracking-wider leading-tight">
                        Nithyananthan N
                    </span>
                    <span className="text-[10px] md:text-xs text-accent font-rajdhani tracking-[0.2em] font-semibold leading-tight">
                        FOUNDER & CEO · NSK GROUPS
                    </span>
                </div>

                {/* Center — Nav Links (Desktop) */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => scrollTo(link.href)}
                            className="text-xs font-mono text-text-primary/60 hover:text-neon transition-colors duration-200 tracking-wider"
                        >
                            {link.label}
                        </button>
                    ))}
                    {isAdmin && (
                        <Link
                            href="/admin/dashboard"
                            className="text-xs font-mono text-accent hover:text-accent/80 transition-colors duration-200 tracking-wider border border-accent/20 px-2 py-0.5 rounded bg-accent/5 animate-pulse"
                        >
                            ADMIN CONSOLE
                        </Link>
                    )}
                </div>

                {/* Right — Status + Logout */}
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2">
                        <div className="status-dot" />
                        <span className="text-[10px] font-mono text-neon/70 tracking-wider">
                            SYSTEMS ONLINE
                        </span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="text-xs font-mono text-danger/70 border border-danger/30 px-3 py-1.5 hover:bg-danger hover:text-white transition-all duration-200"
                    >
                        LOGOUT
                    </button>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-text-primary/60 hover:text-neon transition-colors"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t overflow-hidden"
                        style={{
                            background: "rgba(2,9,18,0.95)",
                            borderColor: "rgba(0,245,196,0.1)",
                        }}
                    >
                        <div className="px-4 py-4 flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <button
                                    key={link.label}
                                    onClick={() => scrollTo(link.href)}
                                    className="text-sm font-mono text-text-primary/60 hover:text-neon transition-colors text-left py-1"
                                >
                                    {">"} {link.label}
                                </button>
                            ))}
                            {isAdmin && (
                                <Link
                                    href="/admin/dashboard"
                                    className="text-sm font-mono text-accent hover:text-accent/80 transition-colors text-left py-1"
                                >
                                    {">"} ADMIN CONSOLE
                                </Link>
                            )}
                            <div className="flex items-center gap-2 pt-2 border-t border-neon/10">
                                <div className="status-dot" />
                                <span className="text-[10px] font-mono text-neon/70 tracking-wider">
                                    SYSTEMS ONLINE
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
