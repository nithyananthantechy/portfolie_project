"use client";

import { motion } from "framer-motion";
import { Server, Activity, Shield, Code2, Database } from "lucide-react";
import { skillGroups } from "@/lib/siteData";

const iconMap = [Server, Activity, Shield, Code2, Database];

export default function SkillsSection() {
    return (
        <section id="skills" className="py-20 px-4 border-t border-slate-800/80">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-sky-400" />
                        <span className="text-xs font-mono text-sky-400 tracking-widest uppercase font-semibold">
                            CORE CAPABILITIES
                        </span>
                    </div>
                    <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                        TECHNICAL SKILLS
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-mono mt-3">
                        {">"} Professional technical competencies organized strictly by domain. No arbitrary percentage ratings.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillGroups.map((group, idx) => {
                        const Icon = iconMap[idx % iconMap.length];
                        return (
                            <motion.div
                                key={group.title}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.08 }}
                                className={`glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-sky-500/40 transition-all duration-300 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between ${
                                    idx === 0 || idx === 1 ? "md:col-span-1" : ""
                                }`}
                                style={{ background: "rgba(15, 23, 42, 0.65)" }}
                            >
                                {/* Top Edge Subtle Accent */}
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />

                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl border border-sky-500/30 bg-sky-500/10 flex items-center justify-center text-sky-400">
                                                <Icon size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-orbitron font-bold text-base text-white">
                                                    {group.title}
                                                </h3>
                                                <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">
                                                    GROUP {group.groupNumber} • {group.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Skills Tag Cloud */}
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {group.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="text-xs font-mono px-3 py-1.5 rounded-lg border border-slate-800/90 bg-slate-900/80 text-slate-200 hover:border-sky-500/40 hover:text-white transition-all duration-150"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
