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
    Send,
    CheckCircle2,
    MessageSquare,
    Terminal,
    Sparkles,
    ShieldCheck,
    Layers,
    Instagram,
    ChevronDown,
    HelpCircle,
    FileText,
    BookOpen,
} from "lucide-react";

import MatrixBackground from "@/components/MatrixBackground";
import InteractiveCyberCanvas from "@/components/InteractiveCyberCanvas";
import DraggableAiWidget from "@/components/DraggableAiWidget";
import OrbSphere from "@/components/OrbSphere";
import Navbar from "@/components/Navbar";
import TerminalBlock from "@/components/TerminalBlock";
import VentureCard from "@/components/VentureCard";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ProductCard from "@/components/ProductCard";
import Timeline from "@/components/Timeline";
import PublicationsSection from "@/components/PublicationsSection";
import BlogSection from "@/components/BlogSection";
import DailyUpdatesSection from "@/components/DailyUpdatesSection";

/* ─── Ventures Data ─── */
const ventures = [
    {
        name: "NSK GROUPS",
        role: "PARENT TECHNOLOGY HOLDING CONGLOMERATE",
        status: "HOLDING" as const,
        since: "EST. 2026",
        description:
            "Parent holding company founded by Nithyananthan Nagarajan. Governing independent subsidiaries across enterprise IT infrastructure, AI recruitment, deep tech, and proprietary software applications.",
        url: "https://nskgroups.website",
        tags: ["HOLDING COMPANY", "AI ECOSYSTEM", "ENTERPRISE", "ERODE HQ"],
    },
    {
        name: "NITECHSPARK",
        role: "IT INFRASTRUCTURE & CYBERSECURITY",
        status: "OPERATIONAL" as const,
        since: "EST. JAN 2026",
        description:
            "Enterprise IT infrastructure, Linux server administration, cloud scale DevOps, and cybersecurity auditing. Delivering zero-trust hardening, DPDP Act compliance, and automated monitoring for startups and SaaS enterprises.",
        url: "https://nitechspark.site",
        tags: ["IT INFRASTRUCTURE", "DEVOPS", "CYBERSECURITY", "MSME"],
    },
    {
        name: "NITEHIRE",
        role: "AI RECRUITMENT & TALENT ATS",
        status: "LIVE" as const,
        since: "LAUNCHED MAY 2026",
        description:
            "Next-generation AI recruitment platform built entirely by Nithyananthan. Features 2-level AI screening (communication + resume-based technical evaluation), HR Kanban workflows, and automated candidate onboarding.",
        url: "https://nitehire.site",
        tags: ["AI RECRUITMENT", "ATS PLATFORM", "GROQ SDK", "GEMINI AI"],
    },
    {
        name: "NITEORBIT",
        role: "SPACE TECH & GROUND SYSTEMS",
        status: "STEALTH" as const,
        since: "IN DEVELOPMENT",
        description:
            "New Space economy venture focusing on Space Ground Systems DevOps, satellite telemetry operations, and orbital cybersecurity infrastructure. Further details restricted.",
        url: "https://niteorbit.space",
        tags: ["SPACE TECH", "GROUND SYSTEMS", "TELEMETRY", "CLASSIFIED"],
    },
];

/* ─── Production Products Fleet ─── */
const products = [
    {
        number: "01",
        name: "PropoTrack",
        category: "CYBERSECURITY & SRE",
        tagline: "Contract & Proposal Pipeline",
        description:
            "Premium multi-vendor workflow coordinator, sales pipeline tool, and contract tracker for corporate proposals.",
        url: "https://tracker.nitechspark.site",
        techStack: ["React", "Vite", "Express", "Prisma", "Neon DB"],
    },
    {
        number: "02",
        name: "NiteSentinel (SecureScope)",
        category: "CYBERSECURITY & SRE",
        tagline: "Detect. Assess. Harden.",
        description:
            "AI-driven local-first endpoint security auditor and compliance mapper aligned with DPDP Act 2023, ISO 27001, and SOC 2.",
        url: "https://nitechspark.site",
        techStack: ["Python", "Flask", "Zero-Trust", "DPDP Act"],
    },
    {
        number: "03",
        name: "sparkAudit",
        category: "CYBERSECURITY & SRE",
        tagline: "Automated GRC Evidence Hub",
        description:
            "Governance, Risk, and Compliance (GRC) checklist automation tool that manages task audits and evidence synchronization under NIST and DPDP.",
        url: "https://sparkaudit.nitechspark.site",
        techStack: ["React", "Node.js", "GRC Automation", "NIST"],
    },
    {
        number: "04",
        name: "CyberScan",
        category: "CYBERSECURITY & SRE",
        tagline: "Asynchronous Network & SSL Scanner",
        description:
            "Automated infrastructure security scanner with real-time vulnerability detection, port scanner, and SSL certificate expiry monitor.",
        url: "https://cyberscan.nitechspark.site",
        techStack: ["Python", "Flask", "Async Socket", "SSL Security"],
    },
    {
        number: "05",
        name: "NiteHire ATS",
        category: "AI & TALENT ATS",
        tagline: "Autonomous 2-Level AI Screening",
        description:
            "Full-cycle AI recruitment platform with candidate coaching, automated voice/video communication analysis, and HR hiring pipelines.",
        url: "https://nitehire.site",
        techStack: ["React 19", "Groq Llama 3.3", "Gemini 2.5", "Neon"],
    },
    {
        number: "06",
        name: "Alone AI (NiteBuddy)",
        category: "AI & TALENT ATS",
        tagline: "Vector-Memory AI Companion",
        description:
            "Emotionally intelligent AI companion with Qdrant vector memory, mood tracking, reflective journaling, and growth analytics.",
        url: "https://nitebuddy.nskgroups.website",
        techStack: ["Qdrant", "FastAPI", "Vector Search", "Gemini AI"],
    },
    {
        number: "07",
        name: "RCA Engine",
        category: "CYBERSECURITY & SRE",
        tagline: "Incident Root Cause Diagnostics",
        description:
            "AI-powered incident root cause analysis engine integrating n8n automation and Llama 3.3 70B for real-time alert diagnostics.",
        url: "https://nitechspark.site",
        techStack: ["Flask", "n8n Workflows", "Groq", "Llama 3.3"],
    },
    {
        number: "08",
        name: "PDF2Excel AI",
        category: "ENTERPRISE & SAFETY APPS",
        tagline: "High-Precision OCR Pipeline",
        description:
            "High-precision OCR document text scraper and automatic Excel sheet formatting generator for enterprise financial records.",
        url: "https://nitechspark.site",
        techStack: ["Python", "Tesseract OCR", "Pandas", "FastAPI"],
    },
    {
        number: "09",
        name: "SustainHub",
        category: "ENTERPRISE & SAFETY APPS",
        tagline: "Corporate ESG Telemetry",
        description:
            "Corporate ESG metrics, operational telemetry helpdesk, circular economy tracking, and public sustainability embeddable widgets.",
        url: "https://sustainhub.nskgroups.website",
        techStack: ["Next.js", "ESG Metrics", "PostgreSQL", "Tailwind"],
    },
    {
        number: "10",
        name: "SENTRIYA",
        category: "ENTERPRISE & SAFETY APPS",
        tagline: "Mission-Critical Safety Ecosystem",
        description:
            "Women & child safety ecosystem with real-time SOS triggers, WebSockets location tracking, and tamper-proof encrypted audio/video capture.",
        url: "https://nskgroups.website",
        techStack: ["WebSockets", "Geo-Fencing", "Encryption", "React Native"],
    },
    {
        number: "11",
        name: "NSK Connect",
        category: "ENTERPRISE & SAFETY APPS",
        tagline: "Executive Incident Response Android App",
        description:
            "Enterprise-grade secure C-Suite & Incident Responder Android communication app built with Jetpack Compose and Google Gemini AI.",
        url: "https://nskgroups.website",
        techStack: ["Kotlin", "Jetpack Compose", "Gemini AI", "Android"],
    },
    {
        number: "12",
        name: "Craft Resume",
        category: "AI & TALENT ATS",
        tagline: "Intelligent ATS Resume Engine",
        description:
            "Intelligent AI resume builder and automated ATS optimization platform under NiteHire ecosystem.",
        url: "https://nitehire.site",
        techStack: ["React 19", "AI Scoring", "PDF Generation", "ATS Parser"],
    },
];

const stats = [
    { label: "Ventures Governed", value: 3, suffix: "" },
    { label: "Products Built", value: 12, suffix: "+" },
    { label: "Yrs Engineering", value: 2, suffix: "+" },
    { label: "MSME Registered", value: 1, suffix: "", isFlag: true },
];

const metaBadges = [
    "ERODE, TAMIL NADU",
    "UDYAM MSME",
    "EST. 2026",
    "DEFCON KOVAI",
    "LINUX SRE",
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
            transition={{ delay: index * 0.08, duration: 0.45 }}
            className="glass-card rounded-2xl p-5 text-center group border border-slate-800/80 hover:border-sky-500/40 transition-all backdrop-blur-md"
            style={{ background: "rgba(15, 23, 42, 0.65)" }}
        >
            <div className="font-orbitron text-3xl md:text-4xl font-black gradient-text mb-1">
                {isFlag ? "✓" : `${count}${suffix}`}
            </div>
            <div className="text-xs font-mono text-slate-400 tracking-wider uppercase">
                {label}
            </div>
        </motion.div>
    );
}

/* ─── Hero Animation Stagger ─── */
const heroContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};
const heroItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ─── Main Page ─── */
export default function PortfolioPage() {
    const [loading, setLoading] = useState(true);
    const [productFilter, setProductFilter] = useState("ALL");
    const [contactForm, setContactForm] = useState({ name: "", email: "", content: "" });
    const [contactStatus, setContactStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [contactFeedback, setContactFeedback] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900);
        // Log real visit
        fetch("/api/visit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path: "/portfolio" }),
        }).catch(() => {});
        return () => clearTimeout(timer);
    }, []);

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setContactStatus("loading");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contactForm),
            });
            const data = await res.json();
            if (data.success) {
                setContactStatus("success");
                setContactFeedback("Transmission acknowledged. Your message has been logged in the executive queue.");
                setContactForm({ name: "", email: "", content: "" });
            } else {
                setContactStatus("error");
                setContactFeedback(data.error || "Transmission interrupted.");
            }
        } catch {
            setContactStatus("error");
            setContactFeedback("Transmission failed. Please use direct WhatsApp.");
        }
    };

    const filteredProducts = products.filter((p) => {
        if (productFilter === "ALL") return true;
        return p.category === productFilter;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center font-mono" style={{ background: "var(--bg)" }}>
                <MatrixBackground />
                <div className="z-10 text-center">
                    <div className="w-14 h-14 border-2 border-neon border-t-transparent rounded-full animate-spin mx-auto mb-5" />
                    <div className="font-orbitron text-xl md:text-2xl gradient-text mb-2 tracking-wider">
                        ESTABLISHING SECURE PROTOCOLS
                    </div>
                    <p className="text-xs text-text-primary/40 tracking-widest">NSK GROUPS // DECRYPTING DATASTREAM</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-rajdhani selection:bg-neon/20 selection:text-white pb-20 relative" style={{ background: "var(--bg)" }}>
            <MatrixBackground />
            <InteractiveCyberCanvas />
            <DraggableAiWidget />
            <Navbar />

            {/* ═══════════ HERO SECTION ═══════════ */}
            <section id="hero" className="min-h-[90vh] flex items-center justify-center pt-32 pb-20 relative overflow-hidden">
                <OrbSphere />

                <motion.div
                    variants={heroContainer}
                    initial="hidden"
                    animate="visible"
                    className="z-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center text-left"
                >
                    {/* Left Column — Text */}
                    <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
                        {/* Eyebrow */}
                        <motion.div variants={heroItem} className="flex items-center gap-2.5 mb-4">
                            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                            <span className="font-mono text-[11px] sm:text-xs text-sky-400 tracking-[0.25em] uppercase font-semibold">
                                NSK GROUPS · EXECUTIVE COMMAND DIRECTORY
                            </span>
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            variants={heroItem}
                            className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-white leading-tight break-words"
                        >
                            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                                NITHYANANTHAN
                            </span>
                            <br />
                            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-extrabold tracking-wide">
                                NAGARAJAN
                            </span>
                        </motion.h1>

                        {/* Title */}
                        <motion.div variants={heroItem} className="mb-6 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                            <span className="font-rajdhani text-sm md:text-base text-slate-100 font-bold tracking-[0.16em] uppercase">
                                FOUNDER, CHAIRMAN & MANAGING DIRECTOR · NSK GROUPS
                            </span>
                            <span className="text-slate-600 hidden sm:inline">|</span>
                            <span className="text-xs font-mono text-sky-400 font-semibold tracking-wider">
                                ENTERPRISE CYBERSECURITY & LINUX SRE ARCHITECT
                            </span>
                        </motion.div>

                        {/* Bio */}
                        <motion.p
                            variants={heroItem}
                            className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-7 font-sans"
                        >
                            Sovereign technology founder and enterprise cybersecurity architect.
                            I design zero-trust infrastructure, Linux SRE clusters, autonomous AI recruitment engines,
                            and orbital ground telemetry stations. Governing the <span className="text-white font-semibold">NSK Groups</span> holding conglomerate
                            comprising <span className="text-slate-100 font-semibold underline decoration-sky-400/50 underline-offset-4">NiTechSpark</span>, <span className="text-slate-100 font-semibold underline decoration-sky-400/50 underline-offset-4">NiteHire</span>, and <span className="text-slate-100 font-semibold underline decoration-sky-400/50 underline-offset-4">NiteOrbit</span>.
                        </motion.p>

                        {/* Meta Badges */}
                        <motion.div
                            variants={heroItem}
                            className="flex flex-wrap justify-center lg:justify-start gap-2.5 mb-9"
                        >
                            {metaBadges.map((badge) => (
                                <span
                                    key={badge}
                                    className="text-[10px] sm:text-xs font-mono px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 tracking-wider shadow-sm"
                                >
                                    {badge}
                                </span>
                            ))}
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            variants={heroItem}
                            className="flex flex-wrap gap-3.5 justify-center lg:justify-start w-full"
                        >
                            <a
                                href="#publications"
                                className="px-5 py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-200 text-xs sm:text-sm font-rajdhani font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-white/10"
                            >
                                <FileText size={15} className="text-slate-950" />
                                <span>RESEARCH PAPERS</span>
                            </a>

                            <a
                                href="#blog"
                                className="px-5 py-3 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 hover:border-slate-500 text-slate-200 hover:text-white text-xs sm:text-sm font-rajdhani font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                            >
                                <BookOpen size={15} />
                                <span>EXECUTIVE BLOG</span>
                            </a>

                            <a
                                href="https://wa.me/916385576354"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-rajdhani font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                            >
                                <Send size={14} />
                                <span>DIRECT WHATSAPP</span>
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Column — Photo with Refined Frame */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
                        <motion.div
                            variants={heroItem}
                            className="relative w-64 h-80 sm:w-72 sm:h-92 md:w-80 md:h-[400px] rounded-3xl p-3 border border-slate-800 bg-slate-900/60 backdrop-blur-xl group hover:border-sky-500/40 transition-all duration-500"
                            style={{ boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.06)" }}
                        >
                            {/* Rotating subtle ring */}
                            <div className="absolute inset-0 rounded-3xl border border-dashed border-sky-500/20 animate-spin pointer-events-none" style={{ animationDuration: "36s" }} />

                            {/* Image wrapper */}
                            <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-800 relative bg-black/50">
                                <img
                                    src="/nithyananthan_executive.png"
                                    alt="Nithyananthan Nagarajan - Founder & CMD NSK Groups"
                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-50 pointer-events-none" />
                            </div>

                            {/* Corner bracket accents */}
                            <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-sky-400/60" />
                            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-sky-400/60" />
                            <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-sky-400/60" />
                            <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-sky-400/60" />
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* ═══════════ QUICK STATS ═══════════ */}
            <section className="py-12 px-4">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <StatCard key={stat.label} {...stat} index={i} />
                    ))}
                </div>
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
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                            <span className="text-xs font-mono text-sky-400 tracking-widest uppercase font-semibold">
                                CONGLOMERATE STRUCTURE
                            </span>
                        </div>
                        <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                            VENTURE ECOSYSTEM
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm font-mono mt-3">
                            {">"} Independent subsidiaries operating under NSK Groups holding.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {ventures.map((v, i) => (
                            <VentureCard key={v.name} {...v} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ INTERACTIVE TERMINAL ═══════════ */}
            <section className="py-16 px-4">
                <TerminalBlock />
            </section>

            {/* ═══════════ PRODUCTS MATRIX ═══════════ */}
            <section id="products" className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
                    >
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                                <span className="text-xs font-mono text-sky-400 tracking-widest uppercase font-semibold">
                                    APPLICATIONS & PLATFORMS
                                </span>
                            </div>
                            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                                PRODUCT FLEET
                            </h2>
                            <p className="text-slate-400 text-xs sm:text-sm font-mono mt-3">
                                {">"} 12 proprietary applications engineered across cybersecurity, AI, and enterprise.
                            </p>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap gap-2">
                            {["ALL", "CYBERSECURITY & SRE", "AI & TALENT ATS", "ENTERPRISE & SAFETY APPS"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setProductFilter(tab)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                                        productFilter === tab
                                            ? "bg-white text-slate-950 font-semibold shadow-sm"
                                            : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredProducts.map((p, i) => (
                            <ProductCard key={p.name} {...p} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ RESEARCH & WHITEPAPERS ═══════════ */}
            <PublicationsSection />

            {/* ═══════════ EXECUTIVE BLOG & INSIGHTS ═══════════ */}
            <BlogSection />

            {/* ═══════════ DAILY DISPATCH & MARKET WIRE ═══════════ */}
            <DailyUpdatesSection />

            {/* ═══════════ SKILLS SECTION ═══════════ */}
            <SkillsSection />

            {/* ═══════════ TIMELINE & MILESTONES ═══════════ */}
            <Timeline />

            {/* ═══════════ CONTACT & TRANSMISSION ═══════════ */}
            <section id="contact" className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                            <span className="text-xs font-mono text-sky-400 tracking-widest uppercase font-semibold">
                                DIRECT CHANNELS
                            </span>
                        </div>
                        <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                            GET IN TOUCH
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Direct Contacts Info */}
                        <div className="lg:col-span-5 space-y-4">
                            <div
                                className="glass-card rounded-2xl p-6 border border-slate-800/80 space-y-5 backdrop-blur-xl"
                                style={{ background: "rgba(15, 23, 42, 0.65)" }}
                            >
                                <h3 className="font-orbitron text-sm font-bold text-white tracking-wider mb-2">
                                    EXECUTIVE CONTACT
                                </h3>

                                <a
                                    href="https://www.instagram.com/nithyananthan.tech.founder/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3.5 text-slate-300 hover:text-pink-400 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-xl border border-pink-500/20 bg-pink-500/5 flex items-center justify-center group-hover:border-pink-400">
                                        <Instagram size={16} className="text-pink-400" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-mono text-slate-500">OFFICIAL INSTAGRAM</div>
                                        <div className="text-sm font-mono font-semibold text-pink-400">@nithyananthan.tech.founder</div>
                                    </div>
                                </a>

                                <a
                                    href="tel:+916385576354"
                                    className="flex items-center gap-3.5 text-slate-300 hover:text-sky-400 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-xl border border-sky-500/20 bg-sky-500/5 flex items-center justify-center group-hover:border-sky-400">
                                        <Phone size={16} className="text-sky-400" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-mono text-slate-500">PHONE / VOICE</div>
                                        <div className="text-sm font-mono font-semibold text-white">+91 63855 76354</div>
                                    </div>
                                </a>

                                <a
                                    href="https://wa.me/916385576354"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3.5 text-slate-300 hover:text-emerald-400 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center group-hover:border-emerald-400">
                                        <Send size={16} className="text-emerald-400" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-mono text-slate-500">WHATSAPP DIRECT</div>
                                        <div className="text-sm font-mono font-semibold text-emerald-400">Chat Instantly</div>
                                    </div>
                                </a>

                                <a
                                    href="mailto:nithyananthan@nskgroups.website"
                                    className="flex items-center gap-3.5 text-slate-300 hover:text-sky-400 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-xl border border-sky-500/20 bg-sky-500/5 flex items-center justify-center group-hover:border-sky-400">
                                        <Mail size={16} className="text-sky-400" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-mono text-slate-500">OFFICIAL EMAIL</div>
                                        <div className="text-sm font-mono font-semibold text-white">nithyananthan@nskgroups.website</div>
                                    </div>
                                </a>

                                <a
                                    href="https://calendly.com/nithyananthan-nskgroups"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3.5 text-slate-300 hover:text-sky-400 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-xl border border-sky-500/20 bg-sky-500/5 flex items-center justify-center group-hover:border-sky-400">
                                        <Calendar size={16} className="text-sky-400" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-mono text-slate-500">CALENDLY</div>
                                        <div className="text-sm font-mono font-semibold text-white">Book a 30-min Call</div>
                                    </div>
                                </a>

                                <a
                                    href="https://nskgroups.website"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3.5 text-slate-300 hover:text-sky-400 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-xl border border-sky-500/20 bg-sky-500/5 flex items-center justify-center group-hover:border-sky-400">
                                        <Building2 size={16} className="text-sky-400" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-mono text-slate-500">HEADQUARTERS</div>
                                        <div className="text-sm font-mono font-semibold text-white">nskgroups.website · Erode, TN</div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Interactive Message Transmission Form */}
                        <div className="lg:col-span-7">
                            <div
                                className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800/80 backdrop-blur-xl"
                                style={{ background: "rgba(15, 23, 42, 0.7)" }}
                            >
                                <h3 className="font-orbitron text-base font-bold text-white mb-2 flex items-center gap-2">
                                    <MessageSquare size={18} className="text-sky-400" />
                                    <span>TRANSMIT INQUIRY</span>
                                </h3>
                                <p className="text-xs text-slate-400 font-mono mb-6">
                                    Direct messages are securely logged into the Founder Command Center queue.
                                </p>

                                {contactFeedback && (
                                    <div
                                        className={`p-3.5 rounded-lg text-xs font-mono mb-5 flex items-start gap-2 ${
                                            contactStatus === "success"
                                                ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                                : "border border-rose-500/30 bg-rose-500/10 text-rose-400"
                                        }`}
                                    >
                                        <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" />
                                        <span>{contactFeedback}</span>
                                    </div>
                                )}

                                <form onSubmit={handleContactSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-mono text-slate-400 mb-1.5">
                                                $ YOUR NAME
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Executive / Client"
                                                value={contactForm.name}
                                                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                                className="w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-3.5 py-2.5 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-mono text-slate-400 mb-1.5">
                                                $ YOUR EMAIL
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                placeholder="client@organization.com"
                                                value={contactForm.email}
                                                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                                className="w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-3.5 py-2.5 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono text-slate-400 mb-1.5">
                                            $ TRANSMISSION CONTENT
                                        </label>
                                        <textarea
                                            required
                                            rows={4}
                                            placeholder="Discussing IT Infrastructure, NiteHire ATS trials, or cybersecurity audits..."
                                            value={contactForm.content}
                                            onChange={(e) => setContactForm({ ...contactForm, content: e.target.value })}
                                            className="w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-3.5 py-2.5 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 resize-none font-sans transition-colors"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={contactStatus === "loading"}
                                        className="w-full py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 shadow-md transition-all font-mono text-xs"
                                    >
                                        {contactStatus === "loading" ? (
                                            <span>TRANSMITTING TO NODE...</span>
                                        ) : (
                                            <>
                                                <span>SEND TRANSMISSION</span>
                                                <Send size={15} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════ FAQ / AEO SECTION ═══════════ */}
            <section id="faq" className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/25 bg-sky-500/10 text-xs font-mono text-sky-400 mb-3">
                            <HelpCircle size={14} />
                            <span>AI OVERVIEW & EXECUTIVE INQUIRIES</span>
                        </div>
                        <h2 className="font-orbitron text-2xl sm:text-3xl font-bold text-white section-heading">
                            FREQUENTLY ASKED QUESTIONS
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                q: "Who is Nithyananthan Nagarajan?",
                                a: "Nithyananthan Nagarajan is the Founder, Chairman & Managing Director (CMD) of NSK Groups. He is an infrastructure engineer, Linux SRE, and cybersecurity builder who governs NiTechSpark, NiteHire, and NiteOrbit from Erode, Tamil Nadu, India.",
                            },
                            {
                                q: "What companies operate under NSK Groups?",
                                a: "NSK Groups is a technology holding company governing 3 specialized subsidiaries: NiTechSpark (IT Infrastructure, Linux DevOps, and Cybersecurity), NiteHire (Autonomous AI Recruitment ATS), and NiteOrbit (Space Ground Systems & Satellite Telemetry).",
                            },
                            {
                                q: "What services does NiTechSpark provide to enterprises?",
                                a: "NiTechSpark delivers enterprise-grade Linux server administration, Docker/KVM virtualization, Prometheus & Grafana observability, zero-trust cybersecurity audits, and DPDP Act 2023 / ISO 27001 compliance automation.",
                            },
                            {
                                q: "How does NiteHire's AI Recruitment ATS evaluate candidates?",
                                a: "NiteHire features an autonomous 2-level screening engine: Level 1 conducts automated AI communication screening, and Level 2 executes resume-based technical evaluation, giving HR teams scored candidate profiles and Kanban pipelines.",
                            },
                            {
                                q: "Is NSK Groups an officially registered entity?",
                                a: "Yes, NSK Groups and its subsidiaries are Government of India Udyam MSME Registered Micro, Small, and Medium Enterprises based in Erode, Tamil Nadu.",
                            },
                        ].map((faq, idx) => (
                            <details
                                key={idx}
                                className="glass-card rounded-xl p-5 border border-slate-800/80 group cursor-pointer"
                                style={{ background: "rgba(15, 23, 42, 0.65)" }}
                            >
                                <summary className="font-orbitron text-sm sm:text-base font-bold text-white flex items-center justify-between list-none select-none group-hover:text-sky-300 transition-colors">
                                    <span>{faq.q}</span>
                                    <ChevronDown size={16} className="text-slate-500 group-open:rotate-180 transition-transform" />
                                </summary>
                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3.5 pt-3 border-t border-slate-800 font-sans">
                                    {faq.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ FLOATING WHATSAPP BUTTON ═══════════ */}
            <a
                href="https://wa.me/916385576354"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center text-white shadow-2xl hover:scale-105 transition-all duration-200 group"
                style={{ boxShadow: "0 0 25px rgba(16, 185, 129, 0.4)" }}
                aria-label="Direct WhatsApp Chat"
            >
                <Send size={22} className="group-hover:rotate-12 transition-transform" />
            </a>

            {/* ═══════════ FOOTER ═══════════ */}
            <footer className="py-8 px-4 border-t border-slate-800/80">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
                    <p className="text-xs font-mono text-slate-500 leading-relaxed">
                        © {new Date().getFullYear()} NITHYANANTHAN NAGARAJAN · NSK GROUPS · ALL RIGHTS RESERVED
                        <br />
                        <span className="text-[10px] text-slate-600">
                            ERODE, TAMIL NADU, INDIA · MSME REGISTERED · ZERO-TRUST ARCHITECTURE
                        </span>
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
                        <a href="https://www.instagram.com/nithyananthan.tech.founder/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 flex items-center gap-1 transition-colors">
                            <Instagram size={13} />
                            <span>Instagram</span>
                        </a>
                        <span className="text-slate-700">·</span>
                        <a href="https://nskgroups.website" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            NSK Groups
                        </a>
                        <span className="text-slate-700">·</span>
                        <a href="https://nitechspark.site" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            NiTechSpark
                        </a>
                        <span className="text-slate-700">·</span>
                        <a href="https://nitehire.site" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            NiteHire
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
