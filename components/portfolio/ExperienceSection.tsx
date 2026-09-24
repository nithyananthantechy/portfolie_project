"use client";

import { motion } from "framer-motion";
import { professionalExperience } from "@/lib/siteData";
import { Server, Activity, ShieldCheck, Terminal, Cpu } from "lucide-react";

export default function ExperienceSection() {
    return (
        <section id="experience" className="py-20 px-4 border-t border-slate-800/80 relative">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-sky-400" />
                        <span className="text-xs font-mono text-sky-400 tracking-widest uppercase font-semibold">
                            ENGINEERING TRACK RECORD
                        </span>
                    </div>
                    <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                        PROFESSIONAL EXPERIENCE
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-mono mt-3 max-w-2xl">
                        {">"} Hands-on engineering roles focused on AIOps telemetry, Linux systems administration, and incident root cause analysis.
                    </p>
                </div>

                {/* Experience Cards */}
                <div className="space-y-8">
                    {professionalExperience.map((exp, idx) => (
                        <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: idx * 0.1 }}
                            className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800/90 hover:border-sky-500/40 transition-all duration-300 backdrop-blur-xl relative overflow-hidden"
                            style={{ background: "rgba(15, 23, 42, 0.7)" }}
                        >
                            {/* Accent highlight bar */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />

                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2.5 mb-2">
                                        <span className="font-orbitron text-xl sm:text-2xl font-bold text-white tracking-wide">
                                            {exp.company}
                                        </span>
                                        <span className="text-xs font-mono px-2.5 py-0.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-300">
                                            {exp.location}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm sm:text-base font-rajdhani font-semibold text-sky-400 uppercase tracking-wider">
                                        <Server size={16} />
                                        <span>{exp.role}</span>
                                    </div>
                                </div>

                                <div className="text-left md:text-right shrink-0">
                                    <span className="text-xs font-mono text-slate-400 px-3 py-1 rounded-md border border-slate-800 bg-slate-900/80">
                                        {exp.period}
                                    </span>
                                </div>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-6">
                                {exp.summary}
                            </p>

                            {/* Core Responsibilities Grid */}
                            <div className="mb-6">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold mb-3 flex items-center gap-2">
                                    <Activity size={14} className="text-sky-400" />
                                    <span>Core Responsibilities &amp; Operations</span>
                                </h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300 font-sans">
                                    {exp.responsibilities.map((resp, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-800/80 bg-slate-900/50"
                                        >
                                            <span className="text-sky-400 mt-0.5 shrink-0 font-mono text-xs">
                                                ▸
                                            </span>
                                            <span className="leading-relaxed">{resp}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Applied Engineering Technologies */}
                            <div className="pt-4 border-t border-slate-800/80">
                                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5">
                                    Verified Engineering Stack:
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-xs font-mono px-2.5 py-1 rounded-md border border-slate-800 bg-slate-900/80 text-sky-300 font-medium"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
