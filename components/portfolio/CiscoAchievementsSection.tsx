"use client";

import { motion } from "framer-motion";
import { ciscoAchievements, type CiscoAchievement } from "@/lib/siteData";
import { Award, Shield, Network, FileCheck, CheckCircle } from "lucide-react";

export default function CiscoAchievementsSection() {
    return (
        <section id="cisco" className="py-20 px-4 border-t border-slate-800/80">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-sky-400" />
                        <span className="text-xs font-mono text-sky-400 tracking-widest uppercase font-semibold">
                            CISCO NETWORKING ACADEMY ACHIEVEMENTS
                        </span>
                    </div>
                    <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                        NETWORKING &amp; CYBERSECURITY LEARNING
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-mono mt-3 max-w-2xl">
                        {">"} Formal network engineering and cybersecurity foundations achieved through Cisco Networking Academy curriculum.
                    </p>
                </div>

                {/* Achievements Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {ciscoAchievements.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: idx * 0.05 }}
                            className="glass-card rounded-xl p-5 border border-slate-800/80 hover:border-sky-500/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between"
                            style={{ background: "rgba(15, 23, 42, 0.65)" }}
                        >
                            <div>
                                {/* Type Badge */}
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span
                                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase tracking-wider ${
                                            item.type === "Certificate"
                                                ? "bg-amber-500/10 border border-amber-500/30 text-amber-300"
                                                : item.type === "Badge"
                                                ? "bg-sky-500/10 border border-sky-500/30 text-sky-300"
                                                : "bg-slate-800/80 border border-slate-700/80 text-slate-300"
                                        }`}
                                    >
                                        {item.type}
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-500">
                                        ID-0{item.id}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="font-orbitron font-bold text-sm sm:text-base text-white mb-2 leading-snug">
                                    {item.title}
                                </h3>

                                <div className="text-xs font-mono text-slate-400 mb-3 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                                    <span>{item.issuer}</span>
                                </div>
                            </div>

                            {/* Footer: Date Issued */}
                            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                                <span>Issued</span>
                                <span className="text-slate-300 font-medium">{item.issuedDate}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
