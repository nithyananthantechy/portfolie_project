"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Download, Copy, Check, Sparkles, Shield } from "lucide-react";
import MatrixBackground from "@/components/MatrixBackground";
import InteractiveCyberCanvas from "@/components/InteractiveCyberCanvas";
import DraggableAiWidget from "@/components/DraggableAiWidget";
import { researchPapers, ResearchPaper } from "@/lib/papersData";

export default function PublicationsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("ALL");
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const categories = ["ALL", "AI & ATS ARCHITECTURE", "CYBERSECURITY & ZERO-TRUST", "SPACE TECH & SRE", "ENTERPRISE PROTOCOLS"];

    const filtered = researchPapers.filter((p) => {
        const matchesCat = category === "ALL" || p.category === category;
        const matchesSearch =
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCat && matchesSearch;
    });

    const copyBibtex = (paper: ResearchPaper) => {
        navigator.clipboard.writeText(paper.bibtex);
        setCopiedId(paper.id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <main className="min-h-screen relative overflow-hidden font-rajdhani pb-24" style={{ background: "var(--bg)" }}>
            <MatrixBackground />
            <InteractiveCyberCanvas />
            <DraggableAiWidget />

            {/* Top Navigation */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pt-8 flex items-center justify-between">
                <Link
                    href="/#publications"
                    className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60"
                >
                    <ArrowLeft size={14} />
                    <span>RETURN TO PORTFOLIO</span>
                </Link>

                <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                    <Shield size={14} />
                    <span>NSK RESEARCH PROCEEDINGS</span>
                </div>
            </div>

            {/* Header */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 mb-3">
                    <Sparkles size={12} className="text-sky-400" />
                    <span className="font-mono text-[11px] text-sky-300 tracking-[0.2em] uppercase font-semibold">
                        OFFICIAL RESEARCH ARCHIVE // PEER-GRADE SPECIFICATIONS
                    </span>
                </div>

                <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black text-white section-heading tracking-wide">
                    PROJECT PAPERS & WHITEPAPERS
                </h1>

                <p className="mt-4 text-xs sm:text-sm text-slate-300 max-w-3xl mx-auto font-sans">
                    Architecture whitepapers, sovereign cybersecurity models, and zero-trust algorithms
                    authored by <strong>Nithyananthan Nagarajan</strong>, Founder & CMD of NSK Groups.
                </p>

                {/* Search & Filter Controls */}
                <div className="mt-8 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search papers by keyword, technology, or tag..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700/80 bg-slate-900/90 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                        />
                    </div>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`text-[11px] font-mono px-3.5 py-1.5 rounded-lg border transition-all ${
                                category === cat
                                    ? "bg-white text-slate-950 border-white font-semibold shadow-sm"
                                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Papers List */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-8 mt-6">
                {filtered.length === 0 ? (
                    <div className="text-center py-16 text-slate-500 font-mono text-xs">
                        No technical papers matched your search criteria.
                    </div>
                ) : (
                    filtered.map((paper) => (
                        <article
                            key={paper.id}
                            id={paper.id}
                            className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800/80 hover:border-sky-500/40 transition-all space-y-6"
                            style={{ background: "rgba(15, 23, 42, 0.65)" }}
                        >
                            {/* Paper Meta Top */}
                            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                                <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30 font-semibold">
                                        {paper.refId}
                                    </span>
                                    <span className="text-slate-400">{paper.category}</span>
                                </div>
                                <div className="text-slate-500">
                                    {paper.date} · {paper.readTime}
                                </div>
                            </div>

                            {/* Title & Subtitle */}
                            <div>
                                <h2 className="font-orbitron text-xl sm:text-2xl font-bold text-white leading-snug">
                                    {paper.title}
                                </h2>
                                <p className="text-xs sm:text-sm font-mono text-sky-400 mt-1">
                                    {paper.subtitle}
                                </p>
                            </div>

                            {/* Author Row */}
                            <div className="text-xs font-mono text-slate-400 flex flex-wrap gap-4 py-2 border-y border-slate-800">
                                <div>
                                    <span className="text-slate-200 font-semibold">AUTHORS: </span>
                                    {paper.authors.join(", ")}
                                </div>
                                <div>
                                    <span className="text-slate-200 font-semibold">ORGANIZATION: </span>
                                    {paper.organization}
                                </div>
                            </div>

                            {/* Abstract */}
                            <div>
                                <h3 className="text-xs font-mono text-slate-200 uppercase tracking-wider mb-2 font-bold">
                                    EXECUTIVE ABSTRACT:
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                                    {paper.abstract}
                                </p>
                            </div>

                            {/* Key Architectural Findings */}
                            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                                <h3 className="text-xs font-mono text-sky-400 uppercase tracking-wider mb-2 font-bold flex items-center gap-1.5">
                                    <Sparkles size={13} /> KEY ARCHITECTURAL CONTRIBUTIONS:
                                </h3>
                                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300 list-disc list-inside font-sans">
                                    {paper.keyFindings.map((finding, idx) => (
                                        <li key={idx} className="leading-relaxed">
                                            {finding}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Tags & Action Buttons */}
                            <div className="flex flex-wrap items-center justify-between gap-4 pt-3">
                                <div className="flex flex-wrap gap-1.5">
                                    {paper.tags.map((t) => (
                                        <span
                                            key={t}
                                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                                        >
                                            #{t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2 text-xs font-mono">
                                    <button
                                        onClick={() => copyBibtex(paper)}
                                        className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900/60 hover:border-slate-500 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                                    >
                                        {copiedId === paper.id ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                                        <span>{copiedId === paper.id ? "COPIED CITATION" : "COPY BIBTEX"}</span>
                                    </button>

                                    <button
                                        onClick={() => alert(`Paper ${paper.refId} PDF generation initiated.`)}
                                        className="px-4 py-1.5 rounded-lg bg-white text-slate-950 hover:bg-slate-100 font-semibold text-[11px] flex items-center gap-1.5 shadow-sm transition-all"
                                    >
                                        <Download size={13} />
                                        <span>DOWNLOAD PDF</span>
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))
                )}
            </section>
        </main>
    );
}
