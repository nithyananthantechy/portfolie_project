"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Phone,
    Mail,
    Globe,
    Calendar,
    Building2,
    Rocket,
    Handshake,
    Shield,
    ExternalLink,
} from "lucide-react";

import MatrixBackground from "@/components/MatrixBackground";
import OrbSphere from "@/components/OrbSphere";
import Navbar from "@/components/Navbar";
import TerminalBlock from "@/components/TerminalBlock";
import VentureCard from "@/components/VentureCard";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ProductCard from "@/components/ProductCard";
import Timeline from "@/components/Timeline";

/* ─── Data ─── */
const ventures = [
    {
        name: "NITECHSPARK",
        status: "OPERATIONAL" as const,
        since: "EST. JAN 2026",
        description:
            "His first company — IT Infrastructure, DevOps, and Cybersecurity services. Targeting SaaS companies and enterprise IT teams. Udyam MSME Registered, Erode, Tamil Nadu.",
        url: "https://nitechsaprk.in",
        tags: ["IT SERVICES", "DEVOPS", "CYBERSECURITY", "MSME"],
    },
    {
        name: "NITEHIRE",
        status: "LIVE" as const,
        since: "LAUNCHED MAY 2026",
        description:
            "Full-cycle AI recruitment platform built entirely by him. 2-level AI screening: communication round + resume-based technical evaluation. HR Kanban, offer management, onboarding workflows.",
        url: "https://nitehire.nitechsaprk.in",
        tags: ["AI RECRUITMENT", "REACT 19", "GROQ", "GEMINI"],
    },
    {
        name: "NITEORBIT",
        status: "STEALTH" as const,
        since: "IN DEVELOPMENT",
        description:
            "Space Ground Systems DevOps. Space Cybersecurity. Telemetry Operations. Further details are classified.",
        tags: ["SPACE TECH", "GROUND SYSTEMS", "CLASSIFIED"],
    },
];

const products = [
    {
        number: "01",
        name: "NiteSentinel",
        tagline: "Detect. Assess. Harden.",
        description:
            "AI-driven multi-tenant security platform. Maps findings to DPDP Act 2023, ISO 27001, SOC 2.",
        url: "sentinel.nitechsaprk.in",
        techStack: ["Flask", "Python", "AI", "DPDP Act"],
    },
    {
        number: "02",
        name: "NiteHire",
        tagline: "",
        description:
            "Full-cycle AI recruitment platform. 2-level AI screening, Kanban, offers, onboarding.",
        url: "nitehire.nitechsaprk.in",
        techStack: ["React 19", "Groq", "Gemini", "Neon"],
    },
    {
        number: "03",
        name: "CyberScan",
        tagline: "",
        description:
            "Automated infrastructure security scanner with real-time vulnerability detection.",
        url: "cyberscan.nitechsaprk.in",
        techStack: ["Flask", "Python", "Security"],
    },
    {
        number: "04",
        name: "PropoTrack",
        tagline: "",
        description:
            "Client proposal tracking and sales pipeline tool.",
        url: "tracker.nitechsaprk.in",
        techStack: ["React", "Vite", "Express", "Prisma", "Neon"],
    },
    {
        number: "05",
        name: "RCA Engine",
        tagline: "",
        description:
            "AI-powered incident root cause analysis with n8n automation.",
        techStack: ["Flask", "n8n", "Groq", "Llama 3.3 70B"],
    },
    {
        number: "06",
        name: "HillSafe",
        tagline: "",
        description:
            "AI road safety monitoring using computer vision for hazard detection in hill terrain.",
        techStack: ["Python", "YOLOv8", "Computer Vision"],
    },
];

const stats = [
    { label: "Companies", value: 3, suffix: "" },
    { label: "Products Built", value: 6, suffix: "+" },
    { label: "Yrs Experience", value: 2, suffix: "+" },
    { label: "MSME Registered", value: 1, suffix: "", isFlag: true },
];

const metaBadges = [
    "ERODE, TAMIL NADU",
    "UDYAM MSME",
    "EST. 2026",
    "DCG KOVAI",
];

/* ─── Count-Up Hook ─── */
function useCountUp(target: number, isInView: boolean, duration = 1500) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isInView || hasAnimated.current) return;
        hasAnimated.current = true;

        const startTime = Date.now();
        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));

            if (progress >= 1) {
                setCount(target);
                clearInterval(timer);
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isInView, target, duration]);

    return count;
}

/* ─── Stat Card ─── */
function StatCard({
    label,
    value,
    suffix,
    isFlag,
    index,
}: {
    label: string;
    value: number;
    suffix: string;
    isFlag?: boolean;
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });
    const count = useCountUp(value, isInView);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="glass-card rounded-lg p-5 text-center group tilt-card"
        >
            <div className="font-orbitron text-3xl md:text-4xl font-black gradient-text mb-1">
                {isFlag ? "✓" : `${count}${suffix}`}
            </div>
            <div className="text-xs font-mono text-text-primary/40 tracking-wider uppercase">
                {label}
            </div>
        </motion.div>
    );
}

/* ─── Hero Stagger ─── */
const heroContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};
const heroItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* ─── Main Page ─── */
export default function PortfolioPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1800);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "var(--bg)" }}>
                <MatrixBackground />
                <div className="z-10 text-center">
                    <div className="font-orbitron text-xl md:text-2xl gradient-text mb-4 animate-pulse tracking-wider">
                        LOADING SECURE ASSETS
                    </div>
                    <div className="w-64 h-1 rounded-full overflow-hidden" style={{ background: "rgba(0,245,196,0.1)" }}>
                        <div
                            className="h-full rounded-full"
                            style={{
                                background: "linear-gradient(90deg, #00f5c4, #00aaff)",
                                animation: "loading-bar 1.8s ease-out forwards",
                                width: "0%",
                            }}
                        />
                    </div>
                    <style jsx>{`
                        @keyframes loading-bar {
                            to { width: 100%; }
                        }
                    `}</style>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-rajdhani selection:bg-neon/10 selection:text-white pb-20" style={{ background: "var(--bg)" }}>
            <MatrixBackground />
            <Navbar />

            {/* ═══════════ HERO ═══════════ */}
            <section id="hero" className="min-h-screen flex items-center justify-center pt-24 pb-12 relative overflow-hidden">
                <OrbSphere />

                <motion.div
                    variants={heroContainer}
                    initial="hidden"
                    animate="visible"
                    className="z-10 px-4 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left"
                >
                    {/* Left Column — Text */}
                    <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
                        {/* Eyebrow */}
                        <motion.p
                            variants={heroItem}
                            className="font-mono text-xs md:text-sm text-neon/50 mb-4 tracking-[0.3em]"
                        >
                            {">"} CLASSIFIED PERSONNEL FILE // NTN-001
                        </motion.p>

                        {/* Name */}
                        <motion.h1
                            variants={heroItem}
                            className="font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-wider mb-4 gradient-text leading-none"
                        >
                            NITHYANANTHAN
                            <br />
                            <span className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl">NAGARAJAN</span>
                        </motion.h1>

                        {/* Title */}
                        <motion.div
                            variants={heroItem}
                            className="mb-6"
                        >
                            <span className="font-rajdhani text-sm md:text-base text-accent font-semibold tracking-[0.3em] uppercase">
                                FOUNDER & CEO · NSK GROUPS
                            </span>
                        </motion.div>

                        {/* Bio */}
                        <motion.p
                            variants={heroItem}
                            className="text-sm md:text-base text-text-primary/50 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8"
                        >
                            I started as a systems engineer — building and securing infrastructure,
                            running monitoring stacks, managing Linux servers and Docker environments.
                            I turned that hands-on experience into a company. Then two more. Today I
                            run NSK Groups — a technology holding company with three ventures across
                            IT services, AI recruitment, and space technology.
                        </motion.p>

                        {/* Meta Badges */}
                        <motion.div
                            variants={heroItem}
                            className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8"
                        >
                            {metaBadges.map((badge) => (
                                <span
                                    key={badge}
                                    className="text-[10px] md:text-xs font-mono px-3 py-1 rounded border text-text-primary/40 tracking-wider"
                                    style={{
                                        borderColor: "rgba(0,245,196,0.1)",
                                        background: "rgba(0,245,196,0.03)",
                                    }}
                                >
                                    {badge}
                                </span>
                            ))}
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            variants={heroItem}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto"
                        >
                            <a
                                href="https://calendly.com/nithyananthannagarajan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-cyber-accent text-center flex items-center justify-center gap-2"
                            >
                                <Calendar size={16} />
                                BOOK A CALL →
                            </a>
                            <a
                                href="#products"
                                className="btn-cyber text-center"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                                }}
                            >
                                VIEW MY WORK
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Column — Photo with Hologram Frame */}
                    <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
                        <motion.div
                            variants={heroItem}
                            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 border border-neon/30 bg-panel/30 backdrop-blur-md"
                            style={{ boxShadow: "0 0 30px rgba(0,245,196,0.05)" }}
                        >
                            {/* Inner rotating orbit */}
                            <div className="absolute inset-0 rounded-full border border-dashed border-neon2/20 animate-spin" style={{ animationDuration: "16s" }} />

                            {/* Image wrapper */}
                            <div className="w-full h-full rounded-full overflow-hidden border border-neon/40 relative">
                                <img
                                    src="/nithyananthan_profile_close.jpg"
                                    alt="Nithyananthan Nagarajan"
                                    className="w-full h-full object-cover transition-all duration-700"
                                />
                                {/* Cyber diagonal scanlines overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent opacity-45 pointer-events-none" />
                            </div>

                            {/* Target bracket details */}
                            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-neon" />
                            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-neon" />
                            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-neon" />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-neon" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
                    <div className="w-5 h-8 border border-neon/20 rounded-full flex justify-center pt-1.5">
                        <div className="w-1 h-2 bg-neon/40 rounded-full animate-pulse" />
                    </div>
                </div>
            </section>

            {/* ═══════════ QUICK STATS ═══════════ */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 tilt-card-parent">
                    {stats.map((stat, i) => (
                        <StatCard key={stat.label} {...stat} index={i} />
                    ))}
                </div>
            </section>

            {/* ═══════════ TERMINAL ═══════════ */}
            <section className="py-10 px-4">
                <TerminalBlock />
            </section>

            {/* ═══════════ VENTURES ═══════════ */}
            <section id="ventures" className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                            WHAT I&apos;VE BUILT
                        </h2>
                        <p className="text-text-primary/40 text-sm font-mono mt-4">
                            {">"} Three ventures operating under NSK Groups
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 tilt-card-parent">
                        {ventures.map((v, i) => (
                            <VentureCard key={v.name} {...v} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ SKILLS ═══════════ */}
            <SkillsSection />

            {/* ═══════════ PRODUCTS ═══════════ */}
            <section id="products" className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                            PRODUCTS
                        </h2>
                        <p className="text-text-primary/40 text-sm font-mono mt-4">
                            {">"} 6 products conceived, built, and deployed
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 tilt-card-parent">
                        {products.map((p, i) => (
                            <ProductCard key={p.name} {...p} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ TIMELINE ═══════════ */}
            <Timeline />

            {/* ═══════════ CONTACT ═══════════ */}
            <section id="contact" className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                            GET IN TOUCH
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Direct Contact */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-card rounded-lg p-6 space-y-5"
                        >
                            <h3 className="font-orbitron text-sm font-bold text-white tracking-wider mb-4">
                                DIRECT CHANNELS
                            </h3>

                            <a
                                href="tel:+916385576354"
                                className="flex items-center gap-3 text-text-primary/50 hover:text-neon transition-colors group"
                            >
                                <div className="w-9 h-9 rounded border flex items-center justify-center group-hover:border-neon/40 group-hover:bg-neon/5 transition-all" style={{ borderColor: "rgba(0,245,196,0.12)" }}>
                                    <Phone size={16} className="text-neon/60" />
                                </div>
                                <span className="text-sm font-mono">+91 63855 76354</span>
                            </a>

                            <a
                                href="mailto:nithyananthan@nskgroups.website"
                                className="flex items-center gap-3 text-text-primary/50 hover:text-neon transition-colors group"
                            >
                                <div className="w-9 h-9 rounded border flex items-center justify-center group-hover:border-neon/40 group-hover:bg-neon/5 transition-all" style={{ borderColor: "rgba(0,245,196,0.12)" }}>
                                    <Mail size={16} className="text-neon/60" />
                                </div>
                                <span className="text-sm font-mono">nithyananthan@nskgroups.website</span>
                            </a>

                            <a
                                href="https://nitechsaprk.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-text-primary/50 hover:text-neon transition-colors group"
                            >
                                <div className="w-9 h-9 rounded border flex items-center justify-center group-hover:border-neon/40 group-hover:bg-neon/5 transition-all" style={{ borderColor: "rgba(0,245,196,0.12)" }}>
                                    <Globe size={16} className="text-neon/60" />
                                </div>
                                <span className="text-sm font-mono">nitechsaprk.in</span>
                            </a>

                            <a
                                href="https://calendly.com/nithyananthannagarajan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-text-primary/50 hover:text-neon transition-colors group"
                            >
                                <div className="w-9 h-9 rounded border flex items-center justify-center group-hover:border-neon/40 group-hover:bg-neon/5 transition-all" style={{ borderColor: "rgba(0,245,196,0.12)" }}>
                                    <Calendar size={16} className="text-neon/60" />
                                </div>
                                <span className="text-sm font-mono">Calendly — Book a Call</span>
                            </a>

                            <a
                                href="https://nskgroups.website"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-text-primary/50 hover:text-neon transition-colors group"
                            >
                                <div className="w-9 h-9 rounded border flex items-center justify-center group-hover:border-neon/40 group-hover:bg-neon/5 transition-all" style={{ borderColor: "rgba(0,245,196,0.12)" }}>
                                    <Building2 size={16} className="text-neon/60" />
                                </div>
                                <span className="text-sm font-mono">nskgroups.website</span>
                            </a>
                        </motion.div>

                        {/* What I'm Open To */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-card rounded-lg p-6"
                        >
                            <h3 className="font-orbitron text-sm font-bold text-white tracking-wider mb-6">
                                OPEN FOR
                            </h3>

                            <div className="space-y-4">
                                {[
                                    {
                                        icon: Handshake,
                                        title: "Strategic Partnerships",
                                        desc: "Infrastructure managed services, edge computing, enterprise deals.",
                                    },
                                    {
                                        icon: Building2,
                                        title: "Enterprise Clients",
                                        desc: "IT infrastructure, DevOps consulting, security auditing via NITECHSPARK.",
                                    },
                                    {
                                        icon: Shield,
                                        title: "Cybersecurity Mandates",
                                        desc: "DPDP Act compliance, ISO 27001, SOC 2 readiness assessments.",
                                    },
                                    {
                                        icon: Rocket,
                                        title: "NiteHire Pilots",
                                        desc: "AI recruitment platform trials for HR teams and staffing agencies.",
                                    },
                                ].map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={item.title}
                                            className="flex items-start gap-3 p-3 rounded border transition-all hover:border-neon/20"
                                            style={{
                                                borderColor: "rgba(0,245,196,0.06)",
                                                background: "rgba(0,245,196,0.02)",
                                            }}
                                        >
                                            <Icon
                                                size={18}
                                                className="text-accent/60 mt-0.5 flex-shrink-0"
                                            />
                                            <div>
                                                <div className="text-sm font-semibold text-white/80">
                                                    {item.title}
                                                </div>
                                                <div className="text-xs text-text-primary/40 mt-0.5">
                                                    {item.desc}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════ FOOTER ═══════════ */}
            <footer className="py-8 px-4 border-t" style={{ borderColor: "rgba(0,245,196,0.06)" }}>
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-[10px] font-mono text-text-primary/20 leading-relaxed">
                        © {new Date().getFullYear()} NITHYANANTHAN NAGARAJAN · NSK GROUPS · ALL RIGHTS RESERVED
                        <br />
                        SYSTEM: OPERATIONAL // SECURITY LEVEL: MAX // ERODE, TAMIL NADU, INDIA
                    </p>
                </div>
            </footer>
        </div>
    );
}
