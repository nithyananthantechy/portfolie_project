"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
    number: string;
    name: string;
    category?: string;
    tagline?: string;
    description: string;
    url?: string;
    techStack: string[];
    index: number;
}

export default function ProductCard({
    number,
    name,
    category,
    tagline,
    description,
    url,
    techStack,
    index,
}: ProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index % 6) * 0.08, duration: 0.45 }}
            className="glass-card rounded-2xl p-6 group relative overflow-hidden flex flex-col justify-between border border-slate-800/80 hover:border-sky-500/40 transition-all duration-300 backdrop-blur-xl"
            style={{
                background: "rgba(15, 23, 42, 0.65)",
            }}
        >
            {/* Background Number Watermark */}
            <div className="absolute top-3 right-4 font-orbitron text-5xl font-black text-white/[0.03] group-hover:text-sky-400/[0.08] transition-all duration-500 select-none">
                {number}
            </div>

            {/* Top Glowing Edge */}
            <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.6), transparent)",
                }}
            />

            <div>
                {/* Header: Number & Category */}
                <div className="flex items-center justify-between mb-3 relative z-10">
                    <span className="font-mono text-xs font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/25 px-2.5 py-0.5 rounded">
                        PROD-{number}
                    </span>
                    {category && (
                        <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">
                            {category}
                        </span>
                    )}
                </div>

                {/* Name & Tagline */}
                <div className="mb-2.5 relative z-10">
                    <h4 className="font-orbitron font-bold text-lg sm:text-xl text-white group-hover:text-sky-300 transition-colors">
                        {name}
                    </h4>
                    {tagline && (
                        <p className="text-xs font-mono text-slate-400 mt-0.5">
                            {tagline}
                        </p>
                    )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 relative z-10">
                    {description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-4 relative z-10">
                    {techStack.map((tech) => (
                        <span
                            key={tech}
                            className="text-[10px] font-mono px-2 py-0.5 rounded border border-slate-800 text-slate-400 bg-slate-900/60"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* URL Link */}
            <div className="pt-3 border-t border-slate-800/80 relative z-10">
                {url ? (
                    <a
                        href={url.startsWith("http") ? url : `https://${url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sky-400 text-xs font-mono font-semibold hover:text-white transition-colors"
                    >
                        <span>Launch App</span>
                        <ArrowUpRight size={14} />
                    </a>
                ) : (
                    <span className="text-[11px] font-mono text-slate-500">
                        Proprietary Internal Architecture
                    </span>
                )}
            </div>
        </motion.div>
    );
}
