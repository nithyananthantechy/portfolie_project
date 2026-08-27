"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield, Terminal, Send, Lock } from "lucide-react";
import Link from "next/link";

const navLinks = [
    { label: "ABOUT", href: "#hero" },
    { label: "VENTURES", href: "#ventures" },
    { label: "PRODUCTS", href: "#products" },
    { label: "TERMINAL", href: "#terminal" },
    { label: "SKILLS", href: "#skills" },
    { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                if (data.success && data.user.role === "ADMIN") {
                    setIsAdmin(true);
                }
            } catch (err) {
                console.error("Admin check ignored:", err);
            }
        };
        checkAdmin();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/login");
            router.refresh();
        } catch {
            router.push("/login");
        }
    };

    const scrollTo = (href: string) => {
        setMobileOpen(false);
        const id = href.replace("#", "");
        setActiveSection(id);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
            className="fixed top-0 w-full z-50 border-b transition-all duration-300"
            style={{
                background: "rgba(2, 6, 18, 0.85)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderColor: "rgba(0, 245, 196, 0.15)",
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                {/* Left — Identity */}
                <div
                    onClick={() => scrollTo("#hero")}
                    className="flex items-center gap-3 cursor-pointer group"
                >
                    <div className="w-8 h-8 rounded-lg border border-neon/30 bg-neon/5 flex items-center justify-center p-1 group-hover:border-neon transition-colors">
                        <img src="/favicon.svg" alt="NSK Logo" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2">
                            <span className="font-orbitron font-bold text-sm sm:text-base text-white tracking-wider group-hover:text-neon transition-colors">
                                Nithyananthan N
                            </span>
                        </div>
                        <span className="text-[10px] sm:text-xs text-accent font-rajdhani tracking-[0.2em] font-semibold leading-tight">
                            FOUNDER & CMD · NSK GROUPS
                        </span>
                    </div>
                </div>

                {/* Center — Nav Links (Desktop) */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => {
                        const id = link.href.replace("#", "");
                        const isActive = activeSection === id;
                        return (
                            <button
                                key={link.label}
                                onClick={() => scrollTo(link.href)}
                                className={`text-xs font-mono transition-all duration-200 tracking-wider relative py-1 ${
                                    isActive
                                        ? "text-neon font-bold"
                                        : "text-text-primary/60 hover:text-white"
                                }`}
                            >
                                {link.label}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neon rounded-full" />
                                )}
                            </button>
                        );
                    })}
                    {isAdmin && (
                        <Link
                            href="/admin/dashboard"
                            className="text-xs font-mono text-neon bg-neon/10 border border-neon/30 px-2.5 py-1 rounded-md hover:bg-neon hover:text-black transition-all tracking-wider flex items-center gap-1.5"
                        >
                            <Shield size={12} />
                            <span>FOUNDER CONSOLE</span>
                        </Link>
                    )}
                </div>

                {/* Right — Status + Action */}
                <div className="flex items-center gap-3">
                    <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full border border-neon/20 bg-neon/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon" style={{ boxShadow: "0 0 6px #00f5c4" }} />
                        <span className="text-[10px] font-mono text-neon/80 tracking-wider">
                            MSME VERIFIED
                        </span>
                    </div>

                    <a
                        href="https://wa.me/916385576354"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-white bg-emerald-600/20 border border-emerald-500/40 px-3 py-1.5 rounded-md hover:bg-emerald-600 hover:border-emerald-500 transition-all"
                    >
                        <Send size={12} />
                        <span>WHATSAPP</span>
                    </a>

                    <button
                        onClick={handleLogout}
                        className="text-xs font-mono text-danger/70 border border-danger/30 px-3 py-1.5 rounded-md hover:bg-danger hover:text-white transition-all"
                    >
                        LOGOUT
                    </button>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-text-primary/70 hover:text-neon transition-colors p-1"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
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
                            background: "rgba(3, 7, 18, 0.98)",
                            borderColor: "rgba(0, 245, 196, 0.15)",
                        }}
                    >
                        <div className="px-5 py-5 flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <button
                                    key={link.label}
                                    onClick={() => scrollTo(link.href)}
                                    className="text-sm font-mono text-text-primary/70 hover:text-neon transition-colors text-left py-1 flex items-center gap-2"
                                >
                                    <span className="text-neon">{">"}</span> {link.label}
                                </button>
                            ))}
                            {isAdmin && (
                                <Link
                                    href="/admin/dashboard"
                                    className="text-sm font-mono text-neon hover:underline py-1 flex items-center gap-2"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <Shield size={14} /> FOUNDER CONSOLE
                                </Link>
                            )}
                            <div className="pt-2 flex items-center justify-between border-t border-neon/10">
                                <a
                                    href="https://wa.me/916385576354"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-mono text-emerald-400"
                                >
                                    Direct WhatsApp: +91 63855 76354
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
