"use client";

import { motion } from "framer-motion";
import { aiopsFocusAreas } from "@/lib/siteData";
import { Activity, ShieldCheck, Terminal, Cpu, Layers, CheckCircle2 } from "lucide-react";

export default function AiOpsSection() {
    return (
        <section id="aiops" className="py-20 px-4 border-t border-slate-800/80 relative">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-sky-400" />
                        <span className="text-xs font-mono text-sky-400 tracking-widest uppercase font-semibold">
                            PRACTICAL ENGINEERING
                        </span>
                    </div>
                    <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                        AIOPS &amp; INFRASTRUCTURE ENGINEERING
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-mono mt-3 max-w-3xl">
                        {">"} Connecting hands-on DesiCrew AIOps experience with end-to-end production systems: monitoring, alerting, telemetry aggregation, Linux administration, and root cause analysis.
                    </p>
                </div>

                {/* Practical Capabilities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {aiopsFocusAreas.map((item, idx) => (
                        <motion.div
                            key={item.area}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.08 }}
                            className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-sky-500/40 transition-all backdrop-blur-xl flex flex-col justify-between"
                            style={{ background: "rgba(15, 23, 42, 0.65)" }}
                        >
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                                    <h3 className="font-orbitron font-bold text-base text-white">
                                        {item.area}
                                    </h3>
                                </div>
                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-4">
                                    {item.description}
                                </p>
                            </div>

                            <div className="pt-3 border-t border-slate-800/80">
                                <div className="flex flex-wrap gap-1.5">
                                    {item.technologies.map((t) => (
                                        <span
                                            key={t}
                                            className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded border border-slate-800 bg-slate-900/80 text-sky-300"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Engineering Highlights Banner */}
                <div
                    className="rounded-2xl p-6 sm:p-8 border border-sky-500/30 backdrop-blur-xl relative overflow-hidden"
                    style={{ background: "rgba(15, 23, 42, 0.75)" }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        <div className="lg:col-span-8">
                            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-400 uppercase tracking-widest">
                                Hands-On Engineering Foundation
                            </span>
                            <h3 className="font-orbitron text-lg sm:text-xl font-bold text-white mt-2">
                                Production Observability &amp; Incident Readiness
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-sans">
                                Practical troubleshooting experience involves diagnosing real incidents, investigating application crashes through deep log dives, suppressing alert noise, and automating remediation workflows to maintain high server reliability.
                            </p>
                        </div>
                        <div className="lg:col-span-4 flex flex-col gap-2.5 font-mono text-xs text-slate-300">
                            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                                <CheckCircle2 size={14} className="text-sky-400 shrink-0" />
                                <span>Zabbix &amp; Prometheus Telemetry</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                                <CheckCircle2 size={14} className="text-sky-400 shrink-0" />
                                <span>Elastic Stack (ELK) Log Ingestion</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                                <CheckCircle2 size={14} className="text-sky-400 shrink-0" />
                                <span>Python &amp; Shell Health Automation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
