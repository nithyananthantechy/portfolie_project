"use client";

import { motion } from "framer-motion";
import { ventures, whyUs, HONEST_BADGE, FOUNDING_SLOTS, LINKS } from "@/lib/siteData";
import { ShieldCheck, ExternalLink } from "lucide-react";
import TrackedLink from "@/components/TrackedLink";

export default function FounderVenturesSection() {
    return (
        <section id="founder" className="py-20 px-4 border-t border-slate-800/80">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-sky-400" />
                        <span className="text-xs font-mono text-sky-400 tracking-widest uppercase font-semibold">
                            FOUNDER &amp; COMMERCIAL VENTURE
                        </span>
                    </div>
                    <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                        NITECHSPARK &amp; VENTURES
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-mono mt-3 max-w-2xl">
                        {">"} Commercial entity founded and led by Nithyananthan Nagarajan to deliver hands-on cybersecurity assessments, Linux hardening, and infrastructure reliability.
                    </p>
                </div>

                {/* Primary Company Card (NITECHSPARK) */}
                <div
                    className="rounded-2xl p-6 sm:p-8 border border-sky-500/30 backdrop-blur-xl mb-8 relative overflow-hidden"
                    style={{ background: "rgba(15, 23, 42, 0.75)" }}
                >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                        <div>
                            <span className="text-[10px] font-mono text-sky-400 tracking-widest uppercase font-semibold bg-sky-950/70 border border-sky-800/50 px-2 py-0.5 rounded">
                                PRIMARY COMMERCIAL VENTURE • UDYAM MSME REGISTERED
                            </span>
                            <h3 className="font-orbitron text-2xl sm:text-3xl font-black text-white mt-2">
                                NITECHSPARK
                            </h3>
                            <p className="text-xs font-mono text-slate-300 mt-1">
                                Founder &amp; CEO — Nithyananthan Nagarajan • Erode, Tamil Nadu
                            </p>
                        </div>
                        <a
                            href={LINKS.nitechspark}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 hover:text-white hover:bg-sky-500/20 text-xs font-mono uppercase tracking-wider transition-all self-start"
                        >
                            <span>Visit nitechspark.site</span>
                            <ExternalLink size={13} />
                        </a>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-6 max-w-3xl">
                        NITECHSPARK provides founder-led cybersecurity and IT infrastructure consulting for MSMEs, startups, and growing enterprises. Engagements follow a disciplined methodology: ASSESS → REPORT → REMEDIATE → RE-TEST, ensuring critical infrastructure is audited, hardened, and monitored against real-world threats.
                    </p>

                    {/* Why Us Highlights Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-4 border-t border-slate-800">
                        {whyUs.map((w) => (
                            <div key={w.title} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                                <h4 className="font-orbitron font-semibold text-xs text-white mb-1">
                                    {w.title}
                                </h4>
                                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                                    {w.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Secondary Ventures (Compact) */}
                <div>
                    <h4 className="font-orbitron font-bold text-xs text-slate-400 uppercase tracking-widest mb-3">
                        Secondary Ventures &amp; Product Labs
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {ventures
                            .filter((v) => v.name !== "NITECHSPARK")
                            .map((v) => (
                                <div
                                    key={v.name}
                                    className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/50 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-1.5">
                                            <span className="font-orbitron font-bold text-sm text-white">
                                                {v.name}
                                            </span>
                                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                                                {v.status}
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider block mb-2">
                                            {v.role}
                                        </span>
                                        <p className="text-xs text-slate-300 font-sans leading-relaxed">
                                            {v.description}
                                        </p>
                                    </div>

                                    <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between">
                                        <div className="flex flex-wrap gap-1">
                                            {v.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800/60 text-slate-400"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        {v.url && (
                                            <a
                                                href={v.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[11px] font-mono text-sky-400 hover:text-white inline-flex items-center gap-1"
                                            >
                                                <span>Visit</span>
                                                <ExternalLink size={10} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
