"use client";

import Link from "next/link";
import MatrixBackground from "@/components/MatrixBackground";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, ArrowRight, Terminal } from "lucide-react";

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const badges = [
    "ERODE HQ, INDIA",
    "3 CORE VENTURES",
    "UDYAM MSME REGISTERED",
    "SYSTEMS ONLINE",
];

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-rajdhani">
            <MatrixBackground />

            {/* Glowing orbs */}
            <div className="absolute w-96 h-96 bg-neon/10 rounded-full blur-3xl pointer-events-none -top-20 -left-20 animate-pulse" />
            <div className="absolute w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -bottom-20 -right-20 animate-pulse" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="z-10 text-center max-w-3xl glass-panel p-8 sm:p-12 md:p-14 rounded-3xl corner-accents relative border border-neon/20 shadow-2xl backdrop-blur-xl"
                style={{
                    background: "rgba(3, 7, 18, 0.88)",
                    boxShadow: "0 0 50px rgba(0, 245, 196, 0.08)",
                }}
            >
                {/* Lock Shield Icon */}
                <motion.div variants={itemVariants} className="mb-6 flex justify-center">
                    <div className="w-16 h-16 border border-neon/30 rounded-2xl flex items-center justify-center relative bg-neon/5 group">
                        <Lock className="h-7 w-7 text-neon group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 rounded-2xl bg-neon/10 blur animate-pulse" />
                    </div>
                </motion.div>

                {/* Classification Eyebrow */}
                <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-neon animate-ping" />
                    <span className="font-mono text-xs text-neon tracking-[0.25em] uppercase font-bold">
                        CLASSIFIED PERSONNEL FILE // CMD-001
                    </span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    variants={itemVariants}
                    className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black tracking-wider mb-3 gradient-text"
                >
                    NITHYANANTHAN NAGARAJAN
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className="font-mono text-xs sm:text-sm text-accent font-semibold tracking-[0.25em] mb-6 uppercase"
                >
                    FOUNDER & CMD · NSK GROUPS
                </motion.p>

                {/* Summary */}
                <motion.p
                    variants={itemVariants}
                    className="text-text-primary/70 mb-8 max-w-xl mx-auto leading-relaxed text-sm sm:text-base font-sans"
                >
                    Builder of enterprise IT infrastructure, Linux SRE pipelines, autonomous AI recruitment engines,
                    and space ground systems. Governing NiTechSpark, NiteHire, and NiteOrbit.
                </motion.p>

                {/* Status Badges */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap justify-center gap-2 mb-10"
                >
                    {badges.map((badge) => (
                        <span
                            key={badge}
                            className="text-[10px] sm:text-xs font-mono px-3 py-1 rounded-md border text-text-primary/60 tracking-wider bg-panel/30"
                            style={{
                                borderColor: "rgba(0, 245, 196, 0.15)",
                            }}
                        >
                            {badge === "SYSTEMS ONLINE" ? (
                                <span className="flex items-center gap-1.5 text-neon font-bold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neon inline-block" style={{ boxShadow: "0 0 6px #00f5c4" }} />
                                    {badge}
                                </span>
                            ) : (
                                badge
                            )}
                        </span>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link href="/login" className="btn-cyber text-center flex items-center justify-center gap-2">
                        <Lock size={15} />
                        <span>AUTHENTICATE</span>
                    </Link>
                    <Link href="/register" className="btn-cyber-accent text-center flex items-center justify-center gap-2">
                        <span>REQUEST ACCESS</span>
                        <ArrowRight size={15} />
                    </Link>
                    <Link
                        href="/portfolio"
                        className="px-5 py-3 rounded-lg border border-neon/20 bg-panel/40 text-xs font-mono text-text-primary/60 hover:text-neon hover:border-neon/40 transition-all flex items-center justify-center gap-2"
                    >
                        <Terminal size={14} />
                        <span>EXPLORE WORK</span>
                    </Link>
                </motion.div>

                {/* Security Footer Note */}
                <motion.div
                    variants={itemVariants}
                    className="mt-12 text-[10px] text-text-primary/30 font-mono leading-relaxed"
                >
                    SECURE CONNECTION ESTABLISHED · AES-256 ENCRYPTION ACTIVE · IP TELEMETRY ENABLED
                </motion.div>
            </motion.div>
        </main>
    );
}
