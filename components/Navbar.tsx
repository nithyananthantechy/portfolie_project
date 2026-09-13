"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield, Terminal, Send, Sparkles, BookOpen, FileText, Radio, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import AiCortexModal from "./AiCortexModal";

const navLinks = [
    { label: "VENTURES", href: "#ventures" },
    { label: "PRODUCTS", href: "#products" },
    { label: "PUBLICATIONS", href: "#publications" },
    { label: "BLOG", href: "#blog" },
    { label: "UPDATES", href: "#updates" },
    { label: "SKILLS", href: "#skills" },
    { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);

    const scrollTo = (href: string) => {
        setMobileOpen(false);
        if (!href.startsWith("#")) {
            router.push(href);
            return;
        }
        const id = href.replace("#", "");
        setActiveSection(id);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        } else {
            router.push(`/${href}`);
        }
    };

    return (
        <>
            <nav
                className="fixed top-0 w-full z-40 border-b transition-all duration-300"
                style={{
                    background: "rgba(3, 7, 18, 0.92)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderColor: "rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    {/* Left — Executive Identity */}
                    <div
                        onClick={() => scrollTo("#hero")}
                        className="flex items-center gap-3 cursor-pointer group select-none"
                    >
                        <div className="w-8 h-8 rounded-lg border border-slate-700 bg-slate-900/80 flex items-center justify-center p-1 group-hover:border-sky-400 transition-all shadow-sm">
                            <img src="/favicon.svg" alt="NSK Logo" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="flex items-center gap-2">
                                <span className="font-orbitron font-bold text-sm sm:text-base text-white tracking-wider group-hover:text-sky-300 transition-colors">
                                    Nithyananthan N
                                </span>
                            </div>
                            <span className="text-[10px] sm:text-xs text-slate-400 font-rajdhani tracking-[0.2em] font-medium leading-tight uppercase">
                                FOUNDER & CMD · NSK GROUPS
                            </span>
                        </div>
                    </div>

                    {/* Center — Nav Links (Desktop) */}
                    <div className="hidden lg:flex items-center gap-5 xl:gap-7">
                        {navLinks.map((link) => {
                            const id = link.href.replace("#", "");
                            const isActive = activeSection === id;
                            return (
                                <button
                                    key={link.label}
                                    onClick={() => scrollTo(link.href)}
                                    className={`text-[12px] xl:text-[13px] font-rajdhani uppercase tracking-wider font-semibold transition-all duration-200 relative py-1 ${
                                        isActive
                                            ? "text-white font-bold"
                                            : "text-slate-400 hover:text-white"
                                    }`}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-sky-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right — Action Buttons */}
                    <div className="flex items-center gap-3">
                        {/* AI Cortex Launcher button */}
                        <button
                            onClick={() => setIsAiModalOpen(true)}
                            className="inline-flex items-center gap-1.5 text-xs font-rajdhani uppercase tracking-wider text-sky-300 bg-sky-500/10 border border-sky-500/30 hover:bg-sky-500/20 hover:border-sky-400 px-3.5 py-1.5 rounded-lg transition-all font-bold shadow-sm shadow-sky-500/10"
                        >
                            <Sparkles size={13} className="text-sky-400" />
                            <span>AI CORTEX</span>
                        </button>

                        {/* Admin Portal Discrete Access */}
                        <Link
                            href="/admin/login"
                            title="Executive Admin Portal"
                            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-rajdhani uppercase tracking-wider text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800 hover:border-slate-600 px-2.5 py-1.5 rounded-lg transition-all font-semibold"
                        >
                            <Shield size={12} className="text-slate-400" />
                            <span>ADMIN</span>
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden text-slate-300 hover:text-white transition-colors p-1.5 rounded-lg border border-slate-800"
                            aria-label="Toggle Navigation Menu"
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
                            className="lg:hidden border-t overflow-hidden"
                            style={{
                                background: "rgba(3, 7, 18, 0.98)",
                                borderColor: "rgba(255, 255, 255, 0.08)",
                            }}
                        >
                            <div className="px-5 py-5 flex flex-col gap-2.5">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.label}
                                        onClick={() => scrollTo(link.href)}
                                        className="text-xs font-rajdhani uppercase tracking-wider font-semibold text-slate-300 hover:text-white transition-colors text-left py-2 flex items-center gap-2 border-b border-white/5"
                                    >
                                        <span className="text-sky-400 font-bold">{">"}</span> {link.label}
                                    </button>
                                ))}

                                <div className="pt-3 flex flex-col gap-2.5">
                                    <button
                                        onClick={() => {
                                            setMobileOpen(false);
                                            setIsAiModalOpen(true);
                                        }}
                                        className="w-full text-xs font-rajdhani uppercase tracking-wider text-sky-300 bg-sky-500/10 border border-sky-500/30 py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold"
                                    >
                                        <Sparkles size={14} className="text-sky-400" /> LAUNCH NSK CORTEX AI
                                    </button>

                                    <Link
                                        href="/admin/login"
                                        onClick={() => setMobileOpen(false)}
                                        className="w-full text-xs font-rajdhani uppercase tracking-wider text-slate-300 bg-slate-900 border border-slate-700 py-2.5 rounded-lg flex items-center justify-center gap-2 font-semibold"
                                    >
                                        <Shield size={14} className="text-slate-400" /> EXECUTIVE ADMIN PORTAL
                                    </Link>

                                    <a
                                        href="https://wa.me/916385576354"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full text-xs font-rajdhani uppercase tracking-wider text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 py-2.5 rounded-lg text-center font-semibold"
                                    >
                                        DIRECT WHATSAPP: +91 63855 76354
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* AI Cortex Dialog */}
            <AiCortexModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
        </>
    );
}
