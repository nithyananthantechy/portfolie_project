"use client";

import { motion } from "framer-motion";
import { secondaryProjects } from "@/lib/siteData";
import { ExternalLink } from "lucide-react";

export default function OtherProjectsSection() {
    return (
        <section id="other-projects" className="py-16 px-4 border-t border-slate-800/80">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-slate-500" />
                        <span className="text-xs font-mono text-slate-400 tracking-widest uppercase font-semibold">
                            SECONDARY APPLICATIONS &amp; LABS
                        </span>
                    </div>
                    <h2 className="font-orbitron text-xl md:text-2xl font-bold text-white section-heading">
                        OTHER PROJECTS &amp; EXPERIMENTS
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-mono mt-2 max-w-2xl">
                        {">"} Additional enterprise utilities, safety prototypes, and software experiments built across product labs.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {secondaryProjects.map((item, idx) => (
                        <div
                            key={item.name}
                            className="glass-card rounded-xl p-5 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between"
                            style={{ background: "rgba(15, 23, 42, 0.55)" }}
                        >
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <h3 className="font-orbitron font-bold text-base text-white">
                                        {item.name}
                                    </h3>
                                    <span
                                        className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase ${
                                            item.status === "Live"
                                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                                                : item.status === "Beta"
                                                ? "bg-sky-500/10 border-sky-500/30 text-sky-300"
                                                : "bg-slate-800 border-slate-700 text-slate-400"
                                        }`}
                                    >
                                        {item.status}
                                    </span>
                                </div>
                                <p className="text-[11px] font-mono text-sky-400 mb-2.5">
                                    {item.tagline}
                                </p>
                                <p className="text-xs text-slate-300 leading-relaxed font-sans mb-3">
                                    {item.description}
                                </p>
                            </div>

                            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                                <div className="flex flex-wrap gap-1">
                                    {item.techStack.slice(0, 3).map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-800 bg-slate-900/60 text-slate-400"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                {item.url && (
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-mono text-sky-400 hover:text-white inline-flex items-center gap-1"
                                    >
                                        <span>Demo</span>
                                        <ExternalLink size={11} />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
