"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Venture, VentureStatus } from "@/lib/siteData";

interface VentureCardProps extends Venture {
    index: number;
}

export default function VentureCard({
    name,
    role,
    status,
    statusLabel,
    since,
    description,
    url,
    tags,
    index,
}: VentureCardProps) {
    const statusColors: Record<VentureStatus, { dot: string; text: string; border: string; bg: string }> = {
        OPERATIONAL: { dot: "bg-emerald-400", text: "text-emerald-300", border: "border-emerald-500/30", bg: "bg-emerald-500/10" },
        LIVE: { dot: "bg-emerald-400", text: "text-emerald-300", border: "border-emerald-500/30", bg: "bg-emerald-500/10" },
        "IN DEVELOPMENT": { dot: "bg-amber-400", text: "text-amber-300", border: "border-amber-500/30", bg: "bg-amber-500/10" },
    };

    const colors = statusColors[status] || statusColors.OPERATIONAL;
    const inDevelopment = status === "IN DEVELOPMENT";

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.5 }}
            className="glass-card rounded-2xl p-6 md:p-7 group relative overflow-hidden flex flex-col justify-between border border-slate-800/80 hover:border-sky-500/40 transition-all duration-300 backdrop-blur-xl"
            style={{ background: "rgba(15, 23, 42, 0.65)" }}
        >
            <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.6), transparent)" }}
            />

            <div>
                <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${colors.border} ${colors.bg} border`}>
                        <span className={`w-2 h-2 rounded-full ${colors.dot} animate-pulse`} />
                        <span className={`text-[11px] font-mono font-semibold ${colors.text} tracking-wider uppercase`}>
                            {statusLabel ?? status}
                        </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 tracking-wider">{since}</span>
                </div>

                <div className="mb-3">
                    <h3 className="font-orbitron font-bold text-xl sm:text-2xl text-white tracking-wide group-hover:text-sky-300 transition-colors">
                        {name}
                    </h3>
                    {role && (
                        <p className="text-xs font-mono text-slate-400 tracking-wider mt-0.5 uppercase">{role}</p>
                    )}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">{description}</p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[10px] font-mono px-2.5 py-1 rounded-md border border-slate-800 text-slate-400 bg-slate-900/60 tracking-wider"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                {inDevelopment ? (
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono hover:text-amber-300 transition-colors"
                    >
                        <span>PRE-LAUNCH · VISIT SITE</span>
                        <ArrowUpRight size={14} />
                    </a>
                ) : url ? (
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sky-400 text-xs font-mono font-semibold hover:text-white transition-colors group-hover:translate-x-0.5"
                    >
                        <span>VISIT PLATFORM</span>
                        <ArrowUpRight size={15} />
                    </a>
                ) : (
                    <span className="text-xs font-mono text-slate-500">INTERNAL</span>
                )}
            </div>
        </motion.div>
    );
}
