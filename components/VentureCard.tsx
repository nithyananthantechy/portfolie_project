"use client";

import { motion } from "framer-motion";
import { ExternalLink, Lock, ShieldCheck, ArrowUpRight } from "lucide-react";

interface VentureCardProps {
    name: string;
    role?: string;
    status: "OPERATIONAL" | "LIVE" | "STEALTH" | "HOLDING";
    since: string;
    description: string;
    url?: string;
    tags: string[];
    index: number;
}

export default function VentureCard({
    name,
    role,
    status,
    since,
    description,
    url,
    tags,
    index,
}: VentureCardProps) {
    const statusColors = {
        HOLDING: { dot: "bg-purple-400", text: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-500/10" },
        OPERATIONAL: { dot: "bg-neon", text: "text-neon", border: "border-neon/30", bg: "bg-neon/10" },
        LIVE: { dot: "bg-neon", text: "text-neon", border: "border-neon/30", bg: "bg-neon/10" },
        STEALTH: { dot: "bg-amber-400", text: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10" },
    };

    const colors = statusColors[status] || statusColors.OPERATIONAL;
    const isStealth = status === "STEALTH";

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.5 }}
            className="glass-card rounded-2xl p-6 md:p-7 corner-accents group relative overflow-hidden flex flex-col justify-between border border-neon/15 hover:border-neon/40 transition-all duration-300 backdrop-blur-xl"
            style={{
                background: "rgba(3, 7, 18, 0.75)",
            }}
        >
            {/* Top Glowing Edge */}
            <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: isStealth
                        ? "linear-gradient(90deg, transparent, #f5a623, transparent)"
                        : "linear-gradient(90deg, transparent, #00f5c4, transparent)",
                }}
            />

            <div>
                {/* Header: Status + Timeline */}
                <div className="flex items-center justify-between mb-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${colors.border} ${colors.bg} border`}>
                        <span className={`w-2 h-2 rounded-full ${colors.dot} animate-pulse`} />
                        <span className={`text-[11px] font-mono font-bold ${colors.text} tracking-wider uppercase`}>
                            {status}
                        </span>
                    </div>
                    <span className="text-[11px] font-mono text-text-primary/40 tracking-wider">
                        {since}
                    </span>
                </div>

                {/* Venture Name & Role */}
                <div className="mb-3">
                    <h3 className="font-orbitron font-black text-xl sm:text-2xl text-white tracking-wide group-hover:text-neon transition-colors">
                        {name}
                    </h3>
                    {role && (
                        <p className="text-xs font-mono text-accent/80 tracking-wider mt-0.5">
                            {role}
                        </p>
                    )}
                </div>

                {/* Description */}
                <p className="text-sm text-text-primary/60 leading-relaxed mb-6">
                    {description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[10px] font-mono px-2.5 py-1 rounded-md border text-text-primary/60 bg-panel/40 tracking-wider"
                            style={{ borderColor: "rgba(0, 245, 196, 0.12)" }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-neon/10 flex items-center justify-between">
                {isStealth ? (
                    <div className="flex items-center gap-2 text-amber-400/80 text-xs font-mono">
                        <Lock size={14} />
                        <span>CLASSIFIED // RESTRICTED ACCESS</span>
                    </div>
                ) : url ? (
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-neon text-xs font-mono font-bold hover:underline group-hover:translate-x-0.5 transition-transform"
                    >
                        <span>VISIT PLATFORM</span>
                        <ArrowUpRight size={15} />
                    </a>
                ) : (
                    <span className="text-xs font-mono text-text-primary/40">INTERNAL PROTOCOL</span>
                )}
            </div>
        </motion.div>
    );
}
