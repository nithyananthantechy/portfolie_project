"use client";

import Link from "next/link";
import MatrixBackground from "@/components/MatrixBackground";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const badges = [
    "ERODE, INDIA",
    "3 VENTURES",
    "MSME REGISTERED",
    "SYSTEMS ONLINE",
];

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden">
            <MatrixBackground />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="z-10 text-center max-w-3xl glass-panel p-10 md:p-14 rounded-lg corner-accents relative"
            >
                {/* Lock Icon */}
                <motion.div variants={itemVariants} className="mb-6 flex justify-center">
                    <div className="w-16 h-16 border border-danger/40 rounded-full flex items-center justify-center relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-danger/80"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                        <div className="absolute inset-0 rounded-full animate-pulse-neon opacity-20" />
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                    variants={itemVariants}
                    className="font-orbitron text-3xl md:text-5xl font-black tracking-wider mb-3 gradient-text"
                >
                    CLASSIFIED PERSONNEL FILE
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className="font-mono text-sm md:text-base text-accent tracking-[0.25em] mb-6"
                >
                    NITHYANANTHAN NAGARAJAN // FOUNDER
                </motion.p>

                {/* One-liner */}
                <motion.p
                    variants={itemVariants}
                    className="text-text-primary/50 mb-8 max-w-lg mx-auto leading-relaxed text-sm md:text-base"
                >
                    Founder of NSK Groups. Builder of infrastructure, AI platforms,
                    and space technology.
                </motion.p>

                {/* Status Badges */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap justify-center gap-2 mb-10"
                >
                    {badges.map((badge) => (
                        <span
                            key={badge}
                            className="text-[10px] md:text-xs font-mono px-3 py-1 rounded border text-text-primary/40 tracking-wider"
                            style={{
                                borderColor: "rgba(0,245,196,0.12)",
                                background: "rgba(0,245,196,0.03)",
                            }}
                        >
                            {badge === "SYSTEMS ONLINE" ? (
                                <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neon inline-block" style={{ boxShadow: "0 0 4px #00f5c4" }} />
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
                    <Link href="/login" className="btn-cyber text-center">
                        LOGIN
                    </Link>
                    <Link href="/register" className="btn-cyber-accent text-center">
                        REQUEST ACCESS
                    </Link>
                </motion.div>

                {/* Footer */}
                <motion.div
                    variants={itemVariants}
                    className="mt-12 text-[10px] text-text-primary/20 font-mono leading-relaxed"
                >
                    SECURE CONNECTION ESTABLISHED ·
                    IP LOGGING ENABLED · ALL VISITS ARE TRACKED
                </motion.div>
            </motion.div>
        </main>
    );
}
