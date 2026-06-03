"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MatrixBackground from "@/components/MatrixBackground";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        category: "STUDENT",
        jobRole: "",
        degree: "",
        adminCode: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        // Determine Role
        // If adminCode is provided, try to register as ADMIN
        const payload = { ...form, role: form.adminCode ? "ADMIN" : "VISITOR" };


        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.success) {
                router.push("/portfolio");
                router.refresh();
            } else {
                // Show detailed error if available, else standard error
                setError(data.details || data.error || "Registration failed");
            }
        } catch (err: any) {
            // Try to show more info if possible
            setError(err?.message || "System Malfunction. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const inputClasses =
        "w-full rounded border px-3 py-2.5 text-sm font-mono text-neon focus:outline-none focus:border-neon/50 transition-colors";
    const inputStyle = {
        background: "rgba(0,20,40,0.4)",
        borderColor: "rgba(0,245,196,0.12)",
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
            <MatrixBackground />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="z-10 w-full max-w-lg glass-panel p-8 md:p-10 rounded-lg corner-accents"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-8">
                    <h2 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
                        REQUEST ACCESS
                    </h2>
                    <p className="font-mono text-xs text-accent/60 tracking-[0.2em]">
                        [ IDENTITY VERIFICATION REQUIRED ]
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
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Identity */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-mono text-text-primary/40 mb-1.5 tracking-wider">
                                $ FULL NAME
                            </label>
                            <input
                                type="text"
                                required
                                className={inputClasses}
                                style={inputStyle}
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-text-primary/40 mb-1.5 tracking-wider">
                                $ EMAIL
                            </label>
                            <input
                                type="email"
                                required
                                className={inputClasses}
                                style={inputStyle}
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>
                    </motion.div>

                    {/* Classification */}
                    <motion.div variants={itemVariants}>
                        <label className="block text-xs font-mono text-text-primary/40 mb-1.5 tracking-wider">
                            $ USER CATEGORY
                        </label>
                        <select
                            className={inputClasses}
                            style={inputStyle}
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                        >
                            <option value="STUDENT">Student / Learner</option>
                            <option value="PROFESSIONAL">Working Professional</option>
                        </select>
                    </motion.div>

                    {/* Conditional Logic */}
                    {form.category === "PROFESSIONAL" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <label className="block text-xs font-mono text-text-primary/40 mb-1.5 tracking-wider">
                                $ JOB ROLE
                            </label>
                            <input
                                type="text"
                                required
                                className={inputClasses}
                                style={inputStyle}
                                placeholder="e.g. DevOps Engineer"
                                value={form.jobRole}
                                onChange={(e) => setForm({ ...form, jobRole: e.target.value })}
                            />
                        </motion.div>
                    )}

                    {form.category === "STUDENT" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <label className="block text-xs font-mono text-text-primary/40 mb-1.5 tracking-wider">
                                $ DEGREE / COURSE
                            </label>
                            <input
                                type="text"
                                required
                                className={inputClasses}
                                style={inputStyle}
                                placeholder="e.g. B.Tech CS"
                                value={form.degree}
                                onChange={(e) => setForm({ ...form, degree: e.target.value })}
                            />
                        </motion.div>
                    )}

                    {/* Security */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-mono text-text-primary/40 mb-1.5 tracking-wider">
                                $ PASSWORD
                            </label>
                            <input
                                type="password"
                                required
                                className={inputClasses}
                                style={inputStyle}
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-text-primary/40 mb-1.5 tracking-wider">
                                $ CONFIRM
                            </label>
                            <input
                                type="password"
                                required
                                className={inputClasses}
                                style={inputStyle}
                                value={form.confirmPassword}
                                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                            />
                        </div>
                    </motion.div>

                    {/* Admin Code */}
                    <motion.div variants={itemVariants}>
                        <label className="block text-[10px] font-mono text-text-primary/20 mb-1.5 tracking-wider">
                            $ FOUNDER OVERRIDE CODE (optional)
                        </label>
                        <input
                            type="password"
                            className="w-full rounded border px-3 py-2 text-xs font-mono text-danger/60 focus:outline-none focus:border-danger/40 transition-colors"
                            style={{
                                background: "rgba(0,20,40,0.2)",
                                borderColor: "rgba(255,59,92,0.08)",
                            }}
                            placeholder="Authorization Code"
                            value={form.adminCode}
                            onChange={(e) => setForm({ ...form, adminCode: e.target.value })}
                        />
                    </motion.div>

                    {/* Submit */}
                    <motion.div variants={itemVariants}>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-cyber text-center py-3 mt-2 disabled:opacity-50"
                        >
                            {loading ? "REGISTERING..." : "INITIATE PROTOCOL [ REGISTER ]"}
                        </button>
                    </motion.div>
                </form>

                {/* Footer Link */}
                <motion.div variants={itemVariants} className="mt-6 text-center">
                    <Link
                        href="/login"
                        className="text-xs font-mono text-text-primary/30 hover:text-neon transition-colors"
                    >
                        {">"} Already Authorized? Login
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
