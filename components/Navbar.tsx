"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";
import AiCortexModal from "./AiCortexModal";
import LocaleToggle from "./LocaleToggle";
import TrackedLink from "./TrackedLink";
import { LINKS, PRIMARY_CTA } from "@/lib/siteData";

const navLinks = [
    { label: "SERVICES", href: "/services" },
    { label: "WORK", href: "/work" },
    { label: "PRODUCTS", href: "#products" },
    { label: "ABOUT", href: "/about" },
    { label: "BLOG", href: "/blog" },
    { label: "FAQ", href: "#faq" },
    { label: "CONTACT", href: "#contact" },
];

interface NavbarProps {
    locale?: "en" | "ta";
}

export default function Navbar({ locale = "en" }: NavbarProps) {
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (href: string) => {
        setMobileOpen(false);
        if (href.startsWith("/")) {
            router.push(href);
            return;
        }
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else router.push(`/${href}`);
    };

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-40 transition-all duration-500 ${
                    scrolled
                        ? "border-b shadow-2xl"
                        : "border-b border-transparent"
                }`}
                style={{
                    background: scrolled
                        ? "rgba(2, 6, 18, 0.88)"
                        : "rgba(2, 6, 18, 0.6)",
                    backdropFilter: "blur(24px) saturate(1.4)",
                    WebkitBackdropFilter: "blur(24px) saturate(1.4)",
                    borderColor: scrolled
                        ? "rgba(56, 189, 248, 0.08)"
                        : "transparent",
                    boxShadow: scrolled
                        ? "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 60px rgba(56, 189, 248, 0.03)"
                        : "none",
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between">
                    {/* ── Identity / Logo ── */}
                    <Link
                        href="/"
                        className="flex items-center gap-3.5 cursor-pointer group select-none shrink-0"
                    >
                        {/* NITECHSPARK Cyber Shield Crest */}
                        <div className="relative w-10 h-10 flex items-center justify-center transition-all duration-300 group-hover:scale-105 filter drop-shadow-[0_0_10px_rgba(56,189,248,0.25)] group-hover:drop-shadow-[0_0_18px_rgba(56,189,248,0.5)]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/logo.svg"
                                alt="NITECHSPARK Crest"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Vertical divider */}
                        <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-sky-500/30 to-transparent" />

                        <div className="flex flex-col justify-center">
                            <span className="font-orbitron font-black text-[15px] sm:text-base text-white tracking-wide group-hover:text-sky-200 transition-colors duration-300 leading-tight">
                                NITHYANANTHAN
                            </span>
                            <span className="text-[10px] text-sky-400/80 font-mono tracking-[0.22em] font-medium leading-tight uppercase mt-0.5">
                                FOUNDER & CEO — NITECHSPARK
                            </span>
                        </div>
                    </Link>

                    {/* ── Desktop Navigation ── */}
                    <div className="hidden lg:flex items-center">
                        {/* Nav Links */}
                        <div className="flex items-center gap-1 xl:gap-1.5 mr-5">
                            {navLinks.map((link) => (
                                <button
                                    key={link.label}
                                    type="button"
                                    onClick={() => scrollTo(link.href)}
                                    className="relative text-[11px] xl:text-[12px] font-rajdhani uppercase tracking-[0.12em] font-semibold text-slate-400 hover:text-white px-2.5 xl:px-3 py-2 rounded-lg hover:bg-white/[0.04] transition-all duration-200 group"
                                >
                                    {link.label}
                                    {/* Hover underline */}
                                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-4 h-[1.5px] bg-sky-400 rounded-full transition-all duration-300" />
                                </button>
                            ))}
                        </div>

                        {/* Separator */}
                        <div className="w-px h-6 bg-white/[0.06] mr-4" />

                        {/* Action buttons */}
                        <div className="flex items-center gap-2.5">
                            <LocaleToggle locale={locale} />

                            <button
                                type="button"
                                onClick={() => {
                                    setMobileOpen(false);
                                    setIsAiModalOpen(true);
                                }}
                                className="inline-flex items-center gap-1.5 text-[11px] font-rajdhani uppercase tracking-wider text-sky-300 bg-sky-500/[0.07] border border-sky-500/20 hover:bg-sky-500/15 hover:border-sky-400/40 px-3 py-[7px] rounded-lg transition-all duration-200 font-bold"
                            >
                                <Sparkles size={12} className="text-sky-400" />
                                <span className="hidden xl:inline">CORTEX AI</span>
                            </button>

                            {/* Primary CTA — standout */}
                            <TrackedLink
                                href={LINKS.nitechspark}
                                source="navbar"
                                event="nitechspark_click"
                                className="inline-flex items-center gap-1.5 px-4 py-[7px] rounded-lg text-[11px] font-rajdhani font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20 hover:scale-[1.02]"
                                style={{
                                    background: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #0284c7 100%)",
                                    color: "#020612",
                                }}
                            >
                                <span>Work With NITECHSPARK</span>
                                <ChevronRight size={12} strokeWidth={3} />
                            </TrackedLink>
                        </div>
                    </div>

                    {/* ── Mobile toggle ── */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <LocaleToggle locale={locale} />
                        <button
                            type="button"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="text-slate-300 hover:text-white transition-colors p-2 rounded-xl border border-white/[0.06] hover:border-sky-500/20 bg-white/[0.02] hover:bg-white/[0.04]"
                            aria-label="Toggle Navigation Menu"
                            aria-expanded={mobileOpen}
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* ── Mobile Menu ── */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="lg:hidden overflow-hidden"
                            style={{
                                background: "rgba(2, 6, 18, 0.98)",
                                borderTop: "1px solid rgba(56, 189, 248, 0.06)",
                            }}
                        >
                            <div className="px-5 py-6 flex flex-col gap-1">
                                {navLinks.map((link, i) => (
                                    <motion.button
                                        key={link.label}
                                        type="button"
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.04 }}
                                        onClick={() => scrollTo(link.href)}
                                        className="text-sm font-rajdhani uppercase tracking-wider font-semibold text-slate-300 hover:text-white transition-colors text-left py-3 px-3 flex items-center gap-3 rounded-lg hover:bg-white/[0.03] group"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-sky-400/50 group-hover:bg-sky-400 transition-colors" />
                                        {link.label}
                                    </motion.button>
                                ))}

                                {/* Mobile CTA section */}
                                <div className="pt-4 mt-2 border-t border-white/[0.04] flex flex-col gap-3">
                                    <TrackedLink
                                        href={LINKS.nitechspark}
                                        source="navbar_mobile"
                                        event="nitechspark_click"
                                        className="w-full text-center text-sm font-rajdhani uppercase tracking-wider font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-sky-500/10"
                                        style={{
                                            background: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #0284c7 100%)",
                                            color: "#020612",
                                        }}
                                    >
                                        Work With NITECHSPARK
                                    </TrackedLink>

                                    <TrackedLink
                                        href={LINKS.calendly}
                                        source="navbar_mobile"
                                        event="calendly_open"
                                        className="w-full text-center text-xs font-rajdhani uppercase tracking-wider text-white bg-white/[0.06] border border-white/[0.08] py-3 rounded-xl font-semibold hover:bg-white/[0.1] transition-all"
                                    >
                                        {PRIMARY_CTA.label}
                                    </TrackedLink>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMobileOpen(false);
                                            setIsAiModalOpen(true);
                                        }}
                                        className="w-full text-xs font-rajdhani uppercase tracking-wider text-sky-300 bg-sky-500/[0.07] border border-sky-500/20 py-3 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-sky-500/15 transition-all"
                                    >
                                        <Sparkles size={14} className="text-sky-400" />
                                        NITECHSPARK CORTEX AI
                                    </button>

                                    <TrackedLink
                                        href={LINKS.whatsapp}
                                        source="navbar_mobile"
                                        event="whatsapp_click"
                                        className="w-full text-center text-xs font-rajdhani uppercase tracking-wider text-emerald-300 bg-emerald-500/[0.07] border border-emerald-500/20 py-3 rounded-xl font-semibold hover:bg-emerald-500/15 transition-all"
                                    >
                                        💬 WHATSAPP: {LINKS.phoneDisplay}
                                    </TrackedLink>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <AiCortexModal
                isOpen={isAiModalOpen}
                onClose={() => setIsAiModalOpen(false)}
            />
        </>
    );
}
