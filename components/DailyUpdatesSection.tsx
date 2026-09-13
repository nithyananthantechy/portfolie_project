"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Radio, ShieldAlert, TrendingUp, Cpu, Terminal, Sparkles, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { dailyUpdates, DailyUpdate } from "@/lib/updatesData";

export default function DailyUpdatesSection() {
    const [updates, setUpdates] = useState<DailyUpdate[]>(dailyUpdates);
    const [channelFilter, setChannelFilter] = useState<string>("ALL");

    useEffect(() => {
        fetch("/api/admin/publish")
            .then((res) => res.json())
            .then((data) => {
                if (data.success && Array.isArray(data.updates)) {
                    setUpdates(data.updates);
                }
            })
            .catch(() => {});
    }, []);

    const filtered = updates.filter((u) => {
        if (channelFilter === "ALL") return true;
        return u.channel === channelFilter;
    });

    const getSeverityBadge = (severity: DailyUpdate["severity"]) => {
        switch (severity) {
            case "CRITICAL":
                return "bg-red-500/15 border-red-500/40 text-red-400";
            case "MILESTONE":
                return "bg-amber-500/15 border-amber-500/40 text-amber-300";
            case "OPERATIONAL":
                return "bg-emerald-500/15 border-emerald-500/40 text-emerald-400";
            case "INTEL":
                return "bg-sky-500/15 border-sky-500/40 text-sky-400";
        }
    };

    return (
        <section id="updates" className="py-24 px-4 sm:px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-red-500/30 bg-red-500/10 mb-3">
                        <Radio size={12} className="text-red-400" />
                        <span className="font-mono text-[11px] text-red-400 tracking-[0.2em] uppercase font-semibold">
                            LIVE TELEMETRY // INTELLIGENCE FEED
                        </span>
                    </div>

                    <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-white section-heading tracking-wide">
                        DAILY TECH & BUSINESS WIRE
                    </h2>

                    <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-sans">
                        Continuous situational dispatches covering cybersecurity vulnerability alerts, infrastructure telemetry,
                        and NSK Groups corporate conglomerate growth.
                    </p>

                    {/* Filter buttons */}
                    <div className="flex flex-wrap justify-center gap-2 mt-8">
                        {["ALL", "CYBER & TECH DISPATCH", "NSK BUSINESS & MARKET WIRE"].map((ch) => (
                            <button
                                key={ch}
                                onClick={() => setChannelFilter(ch)}
                                className={`text-[11px] font-mono px-4 py-1.5 rounded-lg border transition-all ${
                                    channelFilter === ch
                                        ? "bg-white text-slate-950 border-white font-bold shadow-md"
                                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                                }`}
                            >
                                {ch === "ALL" ? "ALL CHANNELS" : ch}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Updates Feed */}
                <div className="space-y-4">
                    {filtered.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: idx * 0.05 }}
                            className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                            style={{
                                background: "rgba(3, 7, 18, 0.75)",
                            }}
                        >
                            {/* Left details */}
                            <div className="flex-1 space-y-2">
                                <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                                    <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${getSeverityBadge(item.severity)}`}>
                                        {item.severity}
                                    </span>
                                    <span className="text-slate-500 font-mono text-[11px]">
                                        {item.date} · {item.timestamp}
                                    </span>
                                    <span className="text-slate-700">|</span>
                                    <span className="text-slate-300 text-[11px] font-semibold">
                                        {item.channel}
                                    </span>
                                </div>

                                <h3 className="font-orbitron font-bold text-sm sm:text-base text-white leading-snug">
                                    {item.title}
                                </h3>

                                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                                    {item.summary}
                                </p>

                                {item.actionTakeaway && (
                                    <div className="pt-2 flex items-start gap-2 text-[11px] font-mono text-slate-300">
                                        <Terminal size={12} className="shrink-0 mt-0.5 text-sky-400" />
                                        <span>
                                            <strong className="text-sky-400 font-semibold">DIRECTIVE:</strong> {item.actionTakeaway}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Tags pill */}
                            <div className="flex flex-wrap md:flex-col md:items-end gap-1.5 shrink-0">
                                {item.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/60 text-slate-400 whitespace-nowrap"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View Archive Link */}
                <div className="mt-10 text-center">
                    <Link
                        href="/updates"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-mono tracking-wider uppercase transition-all font-semibold"
                    >
                        <span>VIEW ARCHIVED INTELLIGENCE DISPATCHES</span>
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
