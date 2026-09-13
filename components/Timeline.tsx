"use client";

import { motion } from "framer-motion";

interface TimelineEntry {
    date: string;
    title: string;
    description: string;
    highlight?: boolean;
}

const entries: TimelineEntry[] = [
    {
        date: "2026 — PRESENT",
        title: "Founder, Chairman & Managing Director, NSK Groups",
        description:
            "Directing three ventures concurrently: NiTechSpark (Enterprise IT & SRE, operational), NiteHire (AI candidate screening & ATS, live), NiteOrbit (space ground systems & telemetry, stealth). Strategic edge datacenter infrastructure partnerships established across India.",
        highlight: true,
    },
    {
        date: "MAY 2026",
        title: "Launched NiteHire ATS",
        description:
            "Engineered and deployed an autonomous 2-level AI recruitment and talent assessment platform solo — from vector architecture and resume parsing to real-time communication assessment pipelines.",
    },
    {
        date: "APRIL 2026",
        title: "Presented at DEFCON Coimbatore",
        description:
            "Keynote architecture presentation on NiteSentinel zero-trust compliance scanner at DCG Kovai Chapter. Active technical contributor in Tamil Nadu's elite enterprise cybersecurity network.",
    },
    {
        date: "JANUARY 2026",
        title: "Founded NiTechSpark",
        description:
            "Initial enterprise venture incorporated. Udyam MSME registered in Erode, Tamil Nadu. Shipped production security tooling: PropoTrack, CyberScan, sparkAudit, and NiteSentinel.",
    },
    {
        date: "FOUNDATIONAL YEARS",
        title: "Systems Engineer & Linux SRE / AIOps Architect",
        description:
            "Deep engineering foundation across distributed Linux clusters, KVM virtualization, automated CI/CD pipelines, Prometheus/Grafana observability telemetry, and zero-trust perimeter defense.",
    },
];

export default function Timeline() {
    return (
        <section id="timeline" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center lg:text-left"
                >
                    <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                        EXECUTIVE JOURNEY
                    </h2>
                    <p className="text-slate-400 text-sm font-mono mt-4">
                        {">"} Trajectory from systems engineering architect to technology holding founder
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column — Full-body portrait */}
                    <div className="lg:col-span-5 hidden lg:flex justify-center sticky top-24">
                        <motion.div
                            initial={{ opacity: 0, x: -35 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative max-w-sm w-full rounded-2xl border border-slate-800 p-2.5 bg-slate-900/40 backdrop-blur-md overflow-hidden group hover:border-sky-500/30 transition-all"
                        >
                            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-slate-800">
                                <img
                                    src="/nithyananthan_profile_full.png"
                                    alt="Nithyananthan Nagarajan - Founder & CMD"
                                    className="w-full h-full object-cover transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-4 left-4 font-mono text-[10px] text-sky-400 tracking-wider">
                                    SYS_AUTH // FOUNDER_IDENTITY
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column — Timeline */}
                    <div className="lg:col-span-7 relative w-full">
                        {/* Glowing vertical line */}
                        <div
                            className="absolute left-[18px] md:left-[22px] top-0 bottom-0 w-[2px]"
                            style={{
                                background:
                                    "linear-gradient(to bottom, transparent, rgba(56,189,248,0.4), rgba(148,163,184,0.2), transparent)",
                            }}
                        />

                        <div className="space-y-10">
                            {entries.map((entry, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="relative pl-12 md:pl-14"
                                >
                                    {/* Diamond dot */}
                                    <div
                                        className="absolute left-[10px] md:left-[14px] top-1 w-4 h-4 rotate-45 border-2"
                                        style={{
                                            borderColor: entry.highlight ? "#38bdf8" : "rgba(148,163,184,0.4)",
                                            background: entry.highlight ? "rgba(56,189,248,0.2)" : "#030712",
                                            boxShadow: entry.highlight ? "0 0 12px rgba(56,189,248,0.5)" : "none",
                                        }}
                                    />

                                    {/* Date badge */}
                                    <div className="inline-block mb-2">
                                        <span
                                            className="text-[11px] font-mono px-2.5 py-0.5 rounded tracking-wider font-semibold"
                                            style={{
                                                background: entry.highlight
                                                    ? "rgba(56,189,248,0.12)"
                                                    : "rgba(148,163,184,0.06)",
                                                color: entry.highlight ? "#38bdf8" : "#94a3b8",
                                                border: entry.highlight
                                                    ? "1px solid rgba(56,189,248,0.3)"
                                                    : "1px solid rgba(148,163,184,0.15)",
                                            }}
                                        >
                                            {entry.date}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className={`font-orbitron font-bold text-base md:text-lg mb-2 ${
                                            entry.highlight ? "text-white" : "text-slate-200"
                                        }`}
                                    >
                                        {entry.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-slate-300 leading-relaxed font-sans">
                                        {entry.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
