"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MatrixBackground from "@/components/MatrixBackground";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
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

            // Read raw text first to handle non-JSON responses (like 500 HTML errors)
            const text = await res.text();
            let data;

            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error("Failed to parse JSON response:", text);
                throw new Error("Server communication error. (Received non-JSON response)");
            }

            if (data.success) {
                router.push("/portfolio");
                router.refresh();
            } else {
                setError(data.details || data.error || data.message || "Login failed");
            }
        } catch (err: any) {
            setError(err?.message || "System Malfunction. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
            <MatrixBackground />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="z-10 w-full max-w-md glass-panel p-8 md:p-10 rounded-lg corner-accents"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-8">
                    <h2 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
                        AUTHENTICATE
                    </h2>
                    <p className="font-mono text-xs text-accent/60 tracking-[0.2em]">
                        [ AUTHORIZED PERSONNEL ONLY ]
                    </p>
                </motion.div>

                {/* Error */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border rounded p-3 mb-5 text-sm font-mono"
                        style={{
                            background: "rgba(255,59,92,0.05)",
                            borderColor: "rgba(255,59,92,0.3)",
                            color: "#ff3b5c",
                        }}
                    >
                        [ERROR]: {error}
                    </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <motion.div variants={itemVariants}>
                        <label className="block text-xs font-mono text-text-primary/40 mb-1.5 tracking-wider">
                            $ EMAIL
                        </label>
                        <input
                            type="email"
                            required
                            autoComplete="email"
                            className="w-full rounded border px-3 py-2.5 text-sm font-mono text-neon focus:outline-none focus:border-neon/50 transition-colors"
                            style={{
                                background: "rgba(0,20,40,0.4)",
                                borderColor: "rgba(0,245,196,0.12)",
                            }}
                            placeholder="user@system.local"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <label className="block text-xs font-mono text-text-primary/40 mb-1.5 tracking-wider">
                            $ PASSWORD
                        </label>
                        <input
                            type="password"
                            required
                            autoComplete="current-password"
                            className="w-full rounded border px-3 py-2.5 text-sm font-mono text-neon focus:outline-none focus:border-neon/50 transition-colors"
                            style={{
                                background: "rgba(0,20,40,0.4)",
                                borderColor: "rgba(0,245,196,0.12)",
                            }}
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-cyber text-center py-3 disabled:opacity-50"
                        >
                            {loading ? "DECRYPTING..." : "ACCESS GRANTED [ LOGIN ]"}
                        </button>
                    </motion.div>
                </form>

                {/* Footer Link */}
                <motion.div variants={itemVariants} className="mt-6 text-center">
                    <Link
                        href="/register"
                        className="text-xs font-mono text-text-primary/30 hover:text-neon transition-colors"
                    >
                        {">"} New User? Initialize Registration
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
