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
    { label: "HOME", href: "/" },
    { label: "EXPERIENCE", href: "/#experience" },
    { label: "SKILLS", href: "/#skills" },
    { label: "PROJECTS", href: "/#projects" },
    { label: "SERVICES", href: "/services" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/#contact" },
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
        if (href === "/" && window.location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        if (href.startsWith("/#") && window.location.pathname === "/") {
            const id = href.replace("/#", "");
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
                return;
            }
        }
        router.push(href);
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
                        className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
                    >
                        {/* Shield Crest */}
                        <div className="relative w-9 h-9 flex items-center justify-center transition-all duration-300 group-hover:scale-105 filter drop-shadow-[0_0_10px_rgba(56,189,248,0.25)]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/logo.svg"
                                alt="Crest"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Vertical divider */}
                        <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-sky-500/30 to-transparent" />

                        <div className="flex flex-col justify-center">
                            <span className="font-orbitron font-black text-[14px] sm:text-base text-white tracking-wide group-hover:text-sky-200 transition-colors duration-300 leading-tight">
                                NITHYANANTHAN
                            </span>
                            <span className="text-[9px] sm:text-[10px] text-sky-400 font-mono tracking-[0.16em] font-medium leading-tight uppercase mt-0.5">
                                CYBERSECURITY &amp; IT INFRASTRUCTURE
                            </span>
                        </div>
                    </Link>

                    {/* ── Desktop Navigation ── */}
                    <div className="hidden lg:flex items-center">
                        {/* Nav Links */}
                        <div className="flex items-center gap-0.5 xl:gap-1 mr-4">
                            {navLinks.map((link) => (
                                <button
                                    key={link.label}
                                    type="button"
                                    onClick={() => scrollTo(link.href)}
                                    className="relative text-[11px] xl:text-[12px] font-rajdhani uppercase tracking-[0.12em] font-semibold text-slate-300 hover:text-white px-2 xl:px-2.5 py-1.5 rounded-lg hover:bg-white/[0.04] transition-all duration-200 group"
                                >
                                    {link.label}
                                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 group-hover:w-4 h-[1.5px] bg-sky-400 rounded-full transition-all duration-300" />
                                </button>
                            ))}
                        </div>

                        {/* Separator */}
                        <div className="w-px h-6 bg-white/[0.08] mr-3" />

                        {/* Social icons (LinkedIn & GitHub) */}
                        <div className="flex items-center gap-1.5 mr-3">
                            <a
                                href={LINKS.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub Profile"
                                className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700 transition-all text-xs font-mono"
                                title="View GitHub"
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                            </a>
                            <a
                                href={LINKS.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn Profile"
                                className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-sky-400 hover:border-sky-500/30 transition-all text-xs font-mono"
                                title="View LinkedIn"
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2">
                            <LocaleToggle locale={locale} />

                            {/* Primary CTA */}
                            <TrackedLink
                                href={LINKS.calendly}
                                source="navbar"
                                event="calendly_open"
                                className="inline-flex items-center gap-1.5 px-3.5 py-[7px] rounded-lg text-[11px] font-rajdhani font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-sky-500/10 hover:shadow-sky-500/20 hover:scale-[1.02] bg-white text-slate-950 hover:bg-slate-200"
                            >
                                <span>Consultation</span>
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
                                <div className="pt-4 mt-2 border-t border-white/[0.04] flex flex-col gap-2.5">
                                    <TrackedLink
                                        href={LINKS.calendly}
                                        source="navbar_mobile"
                                        event="calendly_open"
                                        className="w-full text-center text-xs font-rajdhani uppercase tracking-wider font-bold py-3 rounded-xl transition-all shadow-md bg-white text-slate-950"
                                    >
                                        Book Technical Consultation
                                    </TrackedLink>

                                    <div className="grid grid-cols-2 gap-2">
                                        <a
                                            href={LINKS.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-center text-xs font-mono text-slate-300 bg-slate-900/80 border border-slate-800 py-2.5 rounded-xl hover:text-white"
                                        >
                                            GitHub Profile ↗
                                        </a>
                                        <a
                                            href={LINKS.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-center text-xs font-mono text-sky-300 bg-sky-950/40 border border-sky-800/40 py-2.5 rounded-xl hover:text-white"
                                        >
                                            LinkedIn Profile ↗
                                        </a>
                                    </div>

                                    <TrackedLink
                                        href={LINKS.whatsapp}
                                        source="navbar_mobile"
                                        event="whatsapp_click"
                                        className="w-full text-center text-xs font-rajdhani uppercase tracking-wider text-emerald-300 bg-emerald-500/[0.07] border border-emerald-500/20 py-2.5 rounded-xl font-semibold hover:bg-emerald-500/15 transition-all"
                                    >
                                        💬 WhatsApp: {LINKS.phoneDisplay}
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
