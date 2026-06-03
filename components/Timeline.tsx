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
        date: "2026 — NOW",
        title: "Founder & CEO, NSK Groups",
        description:
            "Running three ventures simultaneously: NITECHSPARK (IT services, live), NiteHire (AI recruitment, live), NiteOrbit (space tech, stealth). Strategic partnership signed with Datenfarmen Centers for edge infrastructure managed services across India. Presenting at DEFCON Coimbatore.",
        highlight: true,
    },
    {
        date: "MAY 2026",
        title: "Launched NiteHire",
        description:
            "Built and shipped an end-to-end AI recruitment platform solo — from database schema to AI screening logic to deployment. Live at nitehire.nitechsaprk.in.",
    },
    {
        date: "APRIL 2026",
        title: "Presented at DEFCON Coimbatore",
        description:
            "Presented NiteSentinel at DCG Kovai. Building the cybersecurity community network in Coimbatore for business development and technical collaboration.",
    },
    {
        date: "JANUARY 2026",
        title: "Founded NITECHSPARK",
        description:
            "First company. Udyam MSME registered in Erode, Tamil Nadu. First products shipped within months: PropoTrack, CyberScan, NiteSentinel.",
    },
    {
        date: "BEFORE 2026",
        title: "2+ Years as Systems Engineer & AIOps SME",
        description:
            "The technical foundation everything else is built on — infrastructure management, application support, monitoring, KVM virtualization, Docker, enterprise cybersecurity. This is where the expertise came from.",
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
                        MY STORY
                    </h2>
                    <p className="text-text-primary/40 text-sm font-mono mt-4">
                        {">"} The journey from systems engineer to founder
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
                            className="relative max-w-sm w-full rounded-lg border border-neon/20 p-2 bg-panel/30 backdrop-blur-md overflow-hidden group"
                            style={{ boxShadow: "0 0 25px rgba(0,245,196,0.03)" }}
                        >
                            <div className="relative aspect-[3/4] w-full rounded overflow-hidden border border-neon/30">
                                <img
                                    src="/nithyananthan_profile_full.png"
                                    alt="Nithyananthan Nagarajan - Full Length"
                                    className="w-full h-full object-cover transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-4 left-4 font-mono text-[10px] text-neon/60 tracking-wider">
                                    SYS_AUTH // FOUNDER_IDENTITY
                                </div>
                            </div>
                            {/* Diagnostic bracket overlays */}
                            <div className="absolute top-4 right-4 w-6 h-[1px] bg-neon/30" />
                            <div className="absolute top-4 right-4 w-[1px] h-6 bg-neon/30" />
                            <div className="absolute bottom-4 left-4 w-6 h-[1px] bg-neon/30" />
                            <div className="absolute bottom-4 left-4 w-[1px] h-6 bg-neon/30" />
                        </motion.div>
                    </div>

                    {/* Right Column — Timeline */}
                    <div className="lg:col-span-7 relative w-full">
                        {/* Glowing vertical line */}
                        <div
                            className="absolute left-[18px] md:left-[22px] top-0 bottom-0 w-[2px] animate-glow-line"
                            style={{
                                background:
                                    "linear-gradient(to bottom, transparent, rgba(0,245,196,0.3), rgba(0,245,196,0.3), transparent)",
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
                                            borderColor: entry.highlight ? "#00f5c4" : "rgba(0,245,196,0.3)",
                                            background: entry.highlight ? "rgba(0,245,196,0.2)" : "var(--bg)",
                                            boxShadow: entry.highlight ? "0 0 12px rgba(0,245,196,0.4)" : "none",
                                        }}
                                    />

                                    {/* Date badge */}
                                    <div className="inline-block mb-2">
                                        <span
                                            className="text-[11px] font-mono px-2 py-0.5 rounded tracking-wider"
                                            style={{
                                                background: entry.highlight
                                                    ? "rgba(0,245,196,0.08)"
                                                    : "rgba(0,245,196,0.04)",
                                                color: entry.highlight ? "#00f5c4" : "rgba(0,245,196,0.5)",
                                                border: entry.highlight
                                                    ? "1px solid rgba(0,245,196,0.2)"
                                                    : "1px solid rgba(0,245,196,0.08)",
                                            }}
                                        >
                                            {entry.date}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className={`font-orbitron font-bold text-base md:text-lg mb-2 ${
                                            entry.highlight ? "text-white" : "text-white/80"
                                        }`}
                                    >
                                        {entry.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-text-primary/50 leading-relaxed">
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
