"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Radio, Search, Terminal } from "lucide-react";
import MatrixBackground from "@/components/MatrixBackground";
import InteractiveCyberCanvas from "@/components/InteractiveCyberCanvas";
import DraggableAiWidget from "@/components/DraggableAiWidget";
import { dailyUpdates, DailyUpdate } from "@/lib/updatesData";

export default function UpdatesPage() {
    const [channelFilter, setChannelFilter] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");

    const filtered = dailyUpdates.filter((u) => {
        const matchesChannel = channelFilter === "ALL" || u.channel === channelFilter;
        const matchesSearch =
            u.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesChannel && matchesSearch;
    });

    const getSeverityBadge = (severity: DailyUpdate["severity"]) => {
        switch (severity) {
            case "CRITICAL":
                return "bg-rose-500/15 border-rose-500/40 text-rose-400";
            case "MILESTONE":
                return "bg-amber-500/15 border-amber-500/40 text-amber-400";
            case "OPERATIONAL":
                return "bg-emerald-500/15 border-emerald-500/40 text-emerald-400";
            case "INTEL":
                return "bg-sky-500/15 border-sky-500/40 text-sky-400";
        }
    };

    return (
        <main className="min-h-screen relative overflow-hidden font-rajdhani pb-24" style={{ background: "var(--bg)" }}>
            <MatrixBackground />
            <InteractiveCyberCanvas />
            <DraggableAiWidget />

            {/* Nav */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pt-8 flex items-center justify-between">
                <Link
                    href="/#updates"
                    className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60"
                >
                    <ArrowLeft size={14} />
                    <span>RETURN TO PORTFOLIO</span>
                </Link>

                <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                    <span>LIVE INTELLIGENCE STREAM</span>
                </div>
            </div>

            {/* Header */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 mb-3">
                    <Radio size={12} className="text-rose-400 animate-pulse" />
                    <span className="font-mono text-[11px] text-rose-300 tracking-[0.2em] uppercase font-semibold">
                        SITUATIONAL AWARENESS // DUAL CHANNEL
                    </span>
                </div>

                <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black text-white section-heading tracking-wide">
                    DAILY TECH & BUSINESS WIRE
                </h1>

                <p className="mt-4 text-xs sm:text-sm text-slate-300 max-w-3xl mx-auto font-sans">
                    Real-time situational intelligence, zero-day threat advisories, and operational communiqués
                    curated by the executive office of <strong>Nithyananthan Nagarajan</strong>.
                </p>

                {/* Search & Filter */}
                <div className="mt-8 max-w-2xl mx-auto">
                    <div className="relative">
                        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Filter dispatches by keyword, technology, or tag..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700/80 bg-slate-900/90 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-6">
                    {["ALL", "CYBER & TECH DISPATCH", "NSK BUSINESS & MARKET WIRE"].map((ch) => (
                        <button
                            key={ch}
                            onClick={() => setChannelFilter(ch)}
                            className={`text-[11px] font-mono px-4 py-1.5 rounded-lg border transition-all ${
                                channelFilter === ch
                                    ? "bg-white text-slate-950 border-white font-semibold shadow-sm"
                                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                            }`}
                        >
                            {ch === "ALL" ? "ALL CHANNELS" : ch}
                        </button>
                    ))}
                </div>
            </section>

            {/* Feed List */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-4 mt-6">
                {filtered.map((item) => (
                    <article
                        key={item.id}
                        className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-sky-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
                        style={{ background: "rgba(15, 23, 42, 0.65)" }}
                    >
                        <div className="flex-1 space-y-2.5">
                            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                                <span className={`px-2.5 py-0.5 rounded border text-[10px] font-semibold ${getSeverityBadge(item.severity)}`}>
                                    {item.severity}
                                </span>
                                <span className="text-slate-400 text-[11px]">
                                    {item.date} · {item.timestamp}
                                </span>
                                <span className="text-slate-600">|</span>
                                <span className="text-slate-300 font-semibold text-[11px]">
                                    {item.channel}
                                </span>
                            </div>

                            <h2 className="font-orbitron font-bold text-base sm:text-lg text-white leading-snug">
                                {item.title}
                            </h2>

                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                                {item.summary}
                            </p>

                            {item.actionTakeaway && (
                                <div className="pt-2 flex items-start gap-2 text-xs font-mono text-sky-400">
                                    <Terminal size={14} className="shrink-0 mt-0.5" />
                                    <span>
                                        <strong className="text-sky-300">DIRECTIVE:</strong> {item.actionTakeaway}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-wrap md:flex-col md:items-end gap-1.5 shrink-0">
                            {item.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}
