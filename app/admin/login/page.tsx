"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Key, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import MatrixBackground from "@/components/MatrixBackground";

export default function AdminLoginPage() {
    const router = useRouter();
    const [authMode, setAuthMode] = useState<"masterKey" | "credentials">("masterKey");
    const [masterKey, setMasterKey] = useState("");
    const [email, setEmail] = useState("nithyananthank@gmail.com");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const body =
                authMode === "masterKey"
                    ? { masterKey }
                    : { email, password };

            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (data.success) {
                router.push("/admin/dashboard");
                router.refresh();
            } else {
                setError(data.error || "Authentication rejected. Invalid master passkey.");
            }
        } catch (err: any) {
            setError(err.message || "Failed to establish secure authentication link.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main
            className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-rajdhani"
            style={{ background: "var(--bg)" }}
        >
            <MatrixBackground />

            {/* Back to public link */}
            <div className="absolute top-6 left-6 z-20">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 backdrop-blur-md"
                >
                    <ArrowLeft size={14} />
                    <span>RETURN TO PUBLIC PORTFOLIO</span>
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="z-10 w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl border relative shadow-2xl backdrop-blur-2xl"
                style={{
                    background: "rgba(15, 23, 42, 0.8)",
                    borderColor: "rgba(255, 255, 255, 0.12)",
                    boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
                }}
            >
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 text-xs font-mono">
                    <div className="flex items-center gap-2 text-sky-400 font-semibold">
                        <ShieldCheck size={16} />
                        <span>FOUNDER & CMD ACCESS</span>
                    </div>
                    <span className="text-slate-500 font-mono text-[10px]">
                        NSK-SOVEREIGN-AUTH
                    </span>
                </div>

                {/* Identity */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl border border-sky-500/30 bg-sky-500/10 flex items-center justify-center text-sky-400 relative shadow-lg shadow-sky-500/10">
                        <Lock size={26} />
                        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-sky-400 animate-ping" />
                    </div>

                    <h1 className="font-orbitron font-bold text-xl sm:text-2xl text-white tracking-wide">
                        CHAIRMAN STUDIO
                    </h1>
                    <p className="text-xs font-mono text-sky-400 mt-1 font-medium">
                        AUTHORIZATION GATEWAY // PUBLISHING PORTAL
                    </p>
                    <p className="text-[11px] text-slate-400 mt-2 font-sans">
                        Restricted to Nithyananthan Nagarajan for publishing research papers, blogs, and daily intelligence.
                    </p>
                </div>

                {/* Auth Mode Toggle */}
                <div className="flex rounded-xl p-1 bg-slate-950/80 border border-slate-800 mb-6 text-xs font-mono">
                    <button
                        type="button"
                        onClick={() => setAuthMode("masterKey")}
                        className={`flex-1 py-2 rounded-lg transition-all ${
                            authMode === "masterKey"
                                ? "bg-white text-slate-950 font-bold shadow-sm"
                                : "text-slate-400 hover:text-white"
                        }`}
                    >
                        MASTER KEY
                    </button>
                    <button
                        type="button"
                        onClick={() => setAuthMode("credentials")}
                        className={`flex-1 py-2 rounded-lg transition-all ${
                            authMode === "credentials"
                                ? "bg-white text-slate-950 font-bold shadow-sm"
                                : "text-slate-400 hover:text-white"
                        }`}
                    >
                        EMAIL & PASS
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    {authMode === "masterKey" ? (
                        <div>
                            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase font-medium">
                                ENTER FOUNDER MASTER PASSKEY:
                            </label>
                            <div className="relative">
                                <Key size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="password"
                                    required
                                    value={masterKey}
                                    onChange={(e) => setMasterKey(e.target.value)}
                                    placeholder="Enter admin master passkey..."
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700/80 bg-slate-900/90 text-white text-xs font-mono focus:outline-none focus:border-sky-400 transition-colors placeholder:text-slate-600"
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase font-medium">
                                    CHAIRMAN EMAIL:
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700/80 bg-slate-900/90 text-white text-xs font-mono focus:outline-none focus:border-sky-400 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase font-medium">
                                    SECRET PASSWORD:
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700/80 bg-slate-900/90 text-white text-xs font-mono focus:outline-none focus:border-sky-400 transition-colors placeholder:text-slate-600"
                                />
                            </div>
                        </>
                    )}

                    {error && (
                        <div className="p-3 rounded-lg border border-rose-500/40 bg-rose-500/10 text-rose-400 text-xs font-mono">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-100 text-xs flex items-center justify-center gap-2 disabled:opacity-50 font-bold tracking-wider mt-2 shadow-md transition-all font-mono"
                    >
                        <span>{loading ? "AUTHENTICATING TELEMETRY..." : "ACCESS PUBLISHING STUDIO"}</span>
                        <ArrowRight size={14} />
                    </button>
                </form>

                <div className="mt-8 pt-4 border-t border-slate-800 text-center">
                    <p className="text-[10px] font-mono text-slate-500">
                        PUBLIC ACCESS ACTIVE · NO CREDENTIALS REQUIRED FOR PORTFOLIO VIEWERS
                    </p>
                </div>
            </motion.div>
        </main>
    );
}
