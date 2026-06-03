"use client";

import { motion } from "framer-motion";
import { ExternalLink, Lock } from "lucide-react";

interface VentureCardProps {
    name: string;
    status: "OPERATIONAL" | "LIVE" | "STEALTH";
    since: string;
    description: string;
    url?: string;
    tags: string[];
    index: number;
}

export default function VentureCard({
    name,
    status,
    since,
    description,
    url,
    tags,
    index,
}: VentureCardProps) {
    const statusColors = {
        OPERATIONAL: { dot: "status-dot", text: "text-neon", border: "border-neon/30", bg: "bg-neon/5" },
        LIVE: { dot: "status-dot", text: "text-neon", border: "border-neon/30", bg: "bg-neon/5" },
        STEALTH: { dot: "status-dot-amber", text: "text-accent", border: "border-accent/30", bg: "bg-accent/5" },
    };

    const colors = statusColors[status];
    const isStealth = status === "STEALTH";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="glass-card rounded-lg p-6 corner-accents group relative overflow-hidden tilt-card"
        >
            {/* Hover top glow */}
            <div
                className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{
                    background: isStealth
                        ? "linear-gradient(90deg, transparent, #f5a623, transparent)"
                        : "linear-gradient(90deg, transparent, #00f5c4, transparent)",
                    boxShadow: isStealth
                        ? "0 0 20px rgba(245,166,35,0.4)"
                        : "0 0 20px rgba(0,245,196,0.4)",
                }}
            />

            {/* Status Badge */}
            <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${colors.border} ${colors.bg} border`}>
                    <div className={colors.dot} />
                    <span className={`text-xs font-mono ${colors.text} tracking-wider`}>
                        {status}
                    </span>
                </div>
                <span className="text-xs font-mono text-text-primary/30">{since}</span>
            </div>

            {/* Name */}
            <h3 className="font-orbitron font-bold text-xl text-white mb-3 tracking-wide group-hover:text-glow transition-all">
                {name}
            </h3>

            {/* Description */}
            <p className="text-sm text-text-primary/60 leading-relaxed mb-4">
                {description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 border rounded text-text-primary/40"
                        style={{ borderColor: "rgba(0,245,196,0.1)" }}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Link / Classified */}
            {isStealth ? (
                <div className="flex items-center gap-2 text-accent/60 text-xs font-mono">
                    <Lock size={14} />
                    <span>CLASSIFIED — CLEARANCE REQUIRED</span>
                </div>
            ) : url ? (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-neon/70 text-xs font-mono hover:text-neon transition-colors"
                >
                    <ExternalLink size={14} />
                    <span>VISIT SITE →</span>
                </a>
            ) : null}
        </motion.div>
    );
}
