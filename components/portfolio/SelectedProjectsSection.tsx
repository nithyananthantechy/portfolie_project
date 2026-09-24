"use client";

import { motion } from "framer-motion";
import { selectedEngineeringProjects } from "@/lib/siteData";
import { ArrowUpRight, Github, ExternalLink, ShieldCheck, Lock } from "lucide-react";

export default function SelectedProjectsSection() {
    return (
        <section id="projects" className="py-20 px-4 border-t border-slate-800/80">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-sky-400" />
                        <span className="text-xs font-mono text-sky-400 tracking-widest uppercase font-semibold">
                            CODE &amp; IMPLEMENTATION
                        </span>
                    </div>
                    <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                        SELECTED ENGINEERING PROJECTS
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-mono mt-3 max-w-3xl">
                        {">"} Curated engineering projects demonstrating real-world technical depth across AIOps, Linux server hardening, monitoring, and infrastructure automation.
                    </p>
                </div>

                {/* Project Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedEngineeringProjects.map((project, idx) => (
                        <motion.article
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: (idx % 4) * 0.1 }}
                            className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-800/90 hover:border-sky-500/40 transition-all duration-300 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between"
                            style={{ background: "rgba(15, 23, 42, 0.7)" }}
                        >
                            {/* Card Header: Focus Badge + Status */}
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3.5">
                                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/30 text-sky-300 uppercase tracking-wider font-semibold">
                                        {project.engineeringFocus}
                                    </span>
                                    <span
                                        className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${
                                            project.status === "Live"
                                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                                                : project.status === "Completed"
                                                ? "bg-blue-500/10 border-blue-500/30 text-blue-300"
                                                : "bg-amber-500/10 border-amber-500/30 text-amber-300"
                                        }`}
                                    >
                                        {project.status}
                                    </span>
                                </div>

                                {/* Project Name */}
                                <h3 className="font-orbitron font-bold text-lg sm:text-xl text-white mb-2 leading-snug">
                                    {project.name}
                                </h3>

                                {/* Problem Statement */}
                                <div className="mb-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                                        Problem:
                                    </span>
                                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                                        {project.problem}
                                    </p>
                                </div>

                                {/* What I Built */}
                                <div className="mb-5">
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 block mb-1 font-semibold">
                                        What I Built:
                                    </span>
                                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                                        {project.whatIBuilt}
                                    </p>
                                </div>

                                {/* Tech Stack Badges */}
                                <div className="mb-6">
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                                        Tech Stack:
                                    </span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.techStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="text-[11px] font-mono px-2 py-0.5 rounded border border-slate-800 bg-slate-900/80 text-slate-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer: Links & Safety */}
                            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                                {project.isPrivate ? (
                                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                                        <Lock size={13} className="text-amber-400" />
                                        <span>{project.privateNote || "Private Engineering Work"}</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-wrap items-center gap-4">
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                                            >
                                                <Github size={14} />
                                                <span>GitHub Repository</span>
                                                <ArrowUpRight size={12} />
                                            </a>
                                        )}
                                        {project.demoUrl && (
                                            <a
                                                href={project.demoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors"
                                            >
                                                <ExternalLink size={14} />
                                                <span>Live Demo</span>
                                                <ArrowUpRight size={12} />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
