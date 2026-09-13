"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, Copy, Check, ExternalLink, BookOpen, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import Link from "next/link";
import { researchPapers, ResearchPaper } from "@/lib/papersData";

export default function PublicationsSection() {
    const [papers, setPapers] = useState<ResearchPaper[]>(researchPapers);
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
    const [expandedPaper, setExpandedPaper] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/admin/publish")
            .then((res) => res.json())
            .then((data) => {
                if (data.success && Array.isArray(data.papers)) {
                    setPapers(data.papers);
                }
            })
            .catch(() => {});
    }, []);

    const categories = ["ALL", "AI & ATS ARCHITECTURE", "CYBERSECURITY & ZERO-TRUST", "SPACE TECH & SRE", "ENTERPRISE PROTOCOLS"];

    const filtered = papers.filter((p) => {
        if (selectedCategory === "ALL") return true;
        return p.category === selectedCategory;
    });

    const copyBibtex = (paper: ResearchPaper) => {
        navigator.clipboard.writeText(paper.bibtex);
        setCopiedId(paper.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <section id="publications" className="py-24 px-4 sm:px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Section Eyebrow */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 mb-3">
                        <Sparkles size={12} className="text-sky-400" />
                        <span className="font-mono text-[11px] text-sky-400 tracking-[0.2em] uppercase font-semibold">
                            NSK RESEARCH CORE // TECHNICAL PROCEEDINGS
                        </span>
                    </div>

                    <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-white section-heading tracking-wide">
                        PROJECT PAPERS & WHITEPAPERS
                    </h2>

                    <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-sans">
                        Peer-grade technical specifications, zero-trust cryptographic models, and engineering architectures
                        authored by Nithyananthan Nagarajan across NSK Groups holdings.
                    </p>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap justify-center gap-2 mt-8">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`text-[11px] font-mono px-3.5 py-1.5 rounded-lg border transition-all ${
                                    selectedCategory === cat
                                        ? "bg-white text-slate-950 border-white font-bold shadow-md"
                                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Papers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filtered.map((paper, idx) => {
                        const isExpanded = expandedPaper === paper.id;
                        return (
                            <motion.div
                                key={paper.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between relative group"
                                style={{
                                    background: "rgba(3, 7, 18, 0.75)",
                                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                                }}
                            >
                                <div>
                                    {/* Paper Header */}
                                    <div className="flex items-center justify-between mb-3 text-xs font-mono">
                                        <span className="px-2.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-400 font-semibold text-[11px]">
                                            {paper.refId}
                                        </span>
                                        <span className="text-slate-500">{paper.date}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-sky-300 transition-colors leading-snug mb-1">
                                        {paper.title}
                                    </h3>
                                    <p className="text-xs font-mono text-slate-400 mb-4">
                                        {paper.subtitle}
                                    </p>

                                    {/* Abstract */}
                                    <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                                        {isExpanded ? paper.abstract : `${paper.abstract.slice(0, 220)}...`}
                                    </p>

                                    {/* Key Findings drawer */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mb-4 pt-3 border-t border-slate-800 overflow-hidden"
                                            >
                                                <h4 className="text-[11px] font-mono text-sky-400 uppercase tracking-wider mb-2 font-semibold">
                                                    KEY ARCHITECTURAL FINDINGS:
                                                </h4>
                                                <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                                                    {paper.keyFindings.map((kf, i) => (
                                                        <li key={i} className="leading-relaxed">
                                                            {kf}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-5">
                                        {paper.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/60 text-slate-400"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3 text-xs font-mono">
                                    <button
                                        onClick={() => setExpandedPaper(isExpanded ? null : paper.id)}
                                        className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                                    >
                                        <span>{isExpanded ? "COLLAPSE ABSTRACT" : "EXPAND ABSTRACT"}</span>
                                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                    </button>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => copyBibtex(paper)}
                                            title="Copy BibTeX Citation"
                                            className="px-2.5 py-1.5 rounded border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                                        >
                                            {copiedId === paper.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                                            <span className="text-[10px]">CITE</span>
                                        </button>

                                        <a
                                            href={`/publications#${paper.id}`}
                                            className="px-3 py-1.5 rounded bg-sky-500/15 border border-sky-500/30 text-sky-300 hover:bg-sky-500 hover:text-slate-950 font-semibold flex items-center gap-1 transition-all"
                                        >
                                            <FileText size={12} />
                                            <span className="text-[10px]">FULL SPEC</span>
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* View Full Research Archive Link */}
                <div className="mt-12 text-center">
                    <Link
                        href="/publications"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-mono tracking-wider uppercase transition-all font-semibold"
                    >
                        <span>ENTER COMPLETE RESEARCH & WHITEPAPERS REPOSITORY</span>
                        <ExternalLink size={14} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
