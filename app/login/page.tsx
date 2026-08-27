"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MatrixBackground from "@/components/MatrixBackground";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, Terminal } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { staggerChildren: 0.08, duration: 0.4 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const text = await res.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch {
                throw new Error("Server communication error. (Non-JSON stream received)");
            }

            if (data.success) {
                router.push("/portfolio");
                router.refresh();
            } else {
                setError(data.details || data.error || data.message || "Authentication rejected: Invalid Credentials");
            }
        } catch (err: any) {
            setError(err?.message || "System Malfunction. Fail-safe protocol standby.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4 font-rajdhani">
            <MatrixBackground />

            {/* Glowing Accent Orbs */}
            <div className="absolute w-96 h-96 bg-neon/10 rounded-full blur-3xl pointer-events-none -top-20 -left-20 animate-pulse" />
            <div className="absolute w-96 h-96 bg-neon2/10 rounded-full blur-3xl pointer-events-none -bottom-20 -right-20 animate-pulse" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="z-10 w-full max-w-md glass-panel p-8 md:p-10 rounded-2xl corner-accents relative border border-neon/20 shadow-2xl backdrop-blur-xl"
                style={{
                    background: "rgba(3, 7, 18, 0.85)",
                    boxShadow: "0 0 50px rgba(0, 245, 196, 0.08)",
                }}
            >
                {/* Security Badge */}
                <motion.div variants={itemVariants} className="flex items-center justify-between mb-6 pb-4 border-b border-neon/15">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-neon animate-ping" />
                        <span className="text-[11px] font-mono text-neon tracking-widest uppercase">
                            PORTAL GATEWAY // V2.6
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-text-primary/40">
                        <ShieldCheck size={14} className="text-neon" />
                        <span>AES-256</span>
                    </div>
                </motion.div>

                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-8">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl border border-neon/30 flex items-center justify-center bg-neon/5 relative group">
                        <Lock className="h-6 w-6 text-neon group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 rounded-xl bg-neon/10 blur animate-pulse" />
                    </div>

                    <h2 className="font-orbitron text-2xl md:text-3xl font-black gradient-text tracking-wider mb-2">
                        AUTHENTICATE
                    </h2>
                    <p className="font-mono text-xs text-text-primary/50 tracking-[0.2em]">
                        [ NSK GROUPS EXECUTIVE REPOSITORY ]
                    </p>
                </motion.div>

                {/* Error Banner */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border rounded-lg p-3.5 mb-6 text-xs font-mono flex items-start gap-2.5"
                        style={{
                            background: "rgba(255, 59, 92, 0.08)",
                            borderColor: "rgba(255, 59, 92, 0.35)",
                            color: "#ff4d6d",
                        }}
                    >
                        <span className="font-bold">[ERR]:</span>
                        <span>{error}</span>
                    </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <motion.div variants={itemVariants}>
                        <label className="block text-xs font-mono text-text-primary/60 mb-2 tracking-wider flex items-center gap-2">
                            <Mail size={12} className="text-neon/70" />
                            <span>AUTHORIZED EMAIL</span>
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                autoComplete="email"
                                className="w-full rounded-lg border px-4 py-3 text-sm font-mono text-neon focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 transition-all placeholder:text-text-primary/20"
                                style={{
                                    background: "rgba(6, 12, 28, 0.6)",
                                    borderColor: "rgba(0, 245, 196, 0.18)",
                                }}
                                placeholder="operator@nskgroups.website"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <label className="block text-xs font-mono text-text-primary/60 mb-2 tracking-wider flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <Lock size={12} className="text-neon/70" />
                                <span>ACCESS CIPHER</span>
                            </span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                autoComplete="current-password"
                                className="w-full rounded-lg border px-4 py-3 pr-11 text-sm font-mono text-neon focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 transition-all placeholder:text-text-primary/20"
                                style={{
                                    background: "rgba(6, 12, 28, 0.6)",
                                    borderColor: "rgba(0, 245, 196, 0.18)",
                                }}
                                placeholder="••••••••••••"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-primary/40 hover:text-neon transition-colors p-1"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-cyber text-center py-3.5 font-bold tracking-widest flex items-center justify-center gap-2 group disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-neon border-t-transparent rounded-full animate-spin" />
                                    DECRYPTING ACCESS...
                                </span>
                            ) : (
                                <>
                                    <span>GRANT ACCESS</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </motion.div>
                </form>

                {/* Footer Navigation */}
                <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-neon/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono gap-3">
                    <Link
                        href="/register"
                        className="text-text-primary/50 hover:text-neon transition-colors flex items-center gap-1.5"
                    >
                        <span>Request Access ID</span>
                        <span className="text-neon">→</span>
                    </Link>

                    <Link
                        href="/portfolio"
                        className="text-accent/80 hover:text-neon transition-colors flex items-center gap-1"
                    >
                        <Terminal size={13} />
                        <span>Direct Portfolio</span>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
