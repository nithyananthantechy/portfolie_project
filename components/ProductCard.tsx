"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface ProductCardProps {
    number: string;
    name: string;
    tagline: string;
    description: string;
    url?: string;
    techStack: string[];
    index: number;
}

export default function ProductCard({
    number,
    name,
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
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="glass-card rounded-lg p-6 group relative overflow-hidden tilt-card"
        >
            {/* Background number */}
            <div className="absolute top-3 right-4 font-orbitron text-5xl font-black text-white/[0.03] group-hover:text-neon/[0.06] transition-all duration-500 select-none">
                {number}
            </div>

            {/* Hover top glow */}
            <div
                className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, #00f5c4, transparent)",
                    boxShadow: "0 0 20px rgba(0,245,196,0.3)",
                }}
            />

            {/* Number + Name */}
            <div className="flex items-start gap-3 mb-2 relative z-10">
                <span className="font-mono text-xs text-neon/40 mt-1">{number}</span>
                <div>
                    <h4 className="font-orbitron font-bold text-base text-white group-hover:text-neon transition-colors">
                        {name}
                    </h4>
                    {tagline && (
                        <p className="text-[11px] font-mono text-accent/60 mt-0.5 italic">
                            &quot;{tagline}&quot;
                        </p>
                    )}
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-text-primary/50 leading-relaxed mb-4 relative z-10">
                {description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 mb-3 relative z-10">
                {techStack.map((tech) => (
                    <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded border text-text-primary/40"
                        style={{ borderColor: "rgba(0,245,196,0.1)", background: "rgba(0,245,196,0.03)" }}
                    >
                        {tech}
                    </span>
                ))}
            </div>

            {/* URL */}
            {url && (
                <a
                    href={`https://${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-neon/50 text-[11px] font-mono hover:text-neon transition-colors relative z-10"
                >
                    <ExternalLink size={12} />
                    {url}
                </a>
            )}
        </motion.div>
    );
}
