"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MatrixBackground from "@/components/MatrixBackground";
import { motion } from "framer-motion";
import { UserPlus, ShieldAlert, Eye, EyeOff, CheckCircle2, ArrowRight, Terminal, Building, GraduationCap, Briefcase, Award } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { staggerChildren: 0.06, duration: 0.4 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const categories = [
    { id: "PROFESSIONAL", label: "Engineer / Pro", icon: Briefcase, desc: "Tech Lead, DevOps, SRE" },
    { id: "STUDENT", label: "Student / Researcher", icon: GraduationCap, desc: "CS, IT, Cyber Research" },
    { id: "RECRUITER", label: "Recruiter / Talent", icon: Award, desc: "HR, Executive Hiring" },
    { id: "ENTERPRISE", label: "Enterprise Partner", icon: Building, desc: "Client, Investor, Partner" },
];

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        category: "PROFESSIONAL",
        jobRole: "",
        degree: "",
        adminCode: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showAdminField, setShowAdminField] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Access Ciphers do not match. Verification failed.");
            setLoading(false);
            return;
        }

        if (form.password.length < 6) {
            setError("Access Cipher must be at least 6 characters in length.");
            setLoading(false);
            return;
        }

        const payload = {
            ...form,
            role: form.adminCode ? "ADMIN" : "VISITOR",
        };

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
                setError(data.details || data.error || "Registration rejected by identity protocol.");
            }
        } catch (err: any) {
            setError(err?.message || "System Malfunction. Fail-safe activated.");
        } finally {
            setLoading(false);
        }
    };

    const inputClasses =
        "w-full rounded-lg border px-3.5 py-2.5 text-sm font-mono text-neon focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon/30 transition-all placeholder:text-text-primary/20";
    const inputStyle = {
        background: "rgba(6, 12, 28, 0.6)",
        borderColor: "rgba(0, 245, 196, 0.18)",
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4 py-12 font-rajdhani">
            <MatrixBackground />

            {/* Glowing Accent Orbs */}
            <div className="absolute w-96 h-96 bg-neon/10 rounded-full blur-3xl pointer-events-none -top-20 -right-20 animate-pulse" />
            <div className="absolute w-96 h-96 bg-neon2/10 rounded-full blur-3xl pointer-events-none -bottom-20 -left-20 animate-pulse" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="z-10 w-full max-w-xl glass-panel p-6 sm:p-10 rounded-2xl corner-accents relative border border-neon/20 shadow-2xl backdrop-blur-xl"
                style={{
                    background: "rgba(3, 7, 18, 0.88)",
                    boxShadow: "0 0 50px rgba(0, 245, 196, 0.08)",
                }}
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-6">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl border border-neon/30 flex items-center justify-center bg-neon/5 relative group">
                        <UserPlus className="h-6 w-6 text-neon group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute inset-0 rounded-xl bg-neon/10 blur animate-pulse" />
                    </div>

                    <h2 className="font-orbitron text-2xl sm:text-3xl font-black gradient-text tracking-wider mb-1">
                        REQUEST ACCESS
                    </h2>
                    <p className="font-mono text-xs text-text-primary/50 tracking-[0.2em]">
                        [ IDENTITY VERIFICATION & CREDENTIAL MINTING ]
                    </p>
                </motion.div>

                {/* Error Banner */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border rounded-lg p-3 mb-5 text-xs font-mono flex items-start gap-2.5"
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
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Category Selection */}
                    <motion.div variants={itemVariants}>
                        <label className="block text-xs font-mono text-text-primary/60 mb-2 tracking-wider">
                            $ SELECT CLASSIFICATION
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {categories.map((cat) => {
                                const Icon = cat.icon;
                                const isSelected = form.category === cat.id;
                                return (
                                    <button
                                        type="button"
                                        key={cat.id}
                                        onClick={() => setForm({ ...form, category: cat.id })}
                                        className={`p-2.5 rounded-lg border text-left flex flex-col items-center sm:items-start gap-1 transition-all ${
                                            isSelected
                                                ? "border-neon bg-neon/10 text-white shadow-sm shadow-neon/20"
                                                : "border-neon/10 bg-panel/30 text-text-primary/50 hover:border-neon/30"
                                        }`}
                                    >
                                        <Icon size={16} className={isSelected ? "text-neon" : "text-text-primary/40"} />
                                        <span className="text-xs font-mono font-bold">{cat.label.split("/")[0]}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Identity Details */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                            <label className="block text-xs font-mono text-text-primary/60 mb-1.5 tracking-wider">
                                $ OPERATOR NAME
                            </label>
                            <input
                                type="text"
                                required
                                className={inputClasses}
                                style={inputStyle}
                                placeholder="Alex Vance"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-text-primary/60 mb-1.5 tracking-wider">
                                $ OFFICIAL EMAIL
                            </label>
                            <input
                                type="email"
                                required
                                className={inputClasses}
                                style={inputStyle}
                                placeholder="alex@company.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>
                    </motion.div>

                    {/* Conditional Profile Fields */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                            <label className="block text-xs font-mono text-text-primary/60 mb-1.5 tracking-wider">
                                {form.category === "STUDENT" ? "$ INSTITUTION / COLLEGE" : "$ ROLE / TITLE"}
                            </label>
                            <input
                                type="text"
                                className={inputClasses}
                                style={inputStyle}
                                placeholder={form.category === "STUDENT" ? "e.g., Anna University" : "e.g., Senior SRE / Recruiter"}
                                value={form.jobRole}
                                onChange={(e) => setForm({ ...form, jobRole: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-text-primary/60 mb-1.5 tracking-wider">
                                {form.category === "STUDENT" ? "$ DEGREE / MAJOR" : "$ ORGANIZATION / VENTURE"}
                            </label>
                            <input
                                type="text"
                                className={inputClasses}
                                style={inputStyle}
                                placeholder={form.category === "STUDENT" ? "e.g., B.Tech Information Tech" : "e.g., Acme Cloud Corp"}
                                value={form.degree}
                                onChange={(e) => setForm({ ...form, degree: e.target.value })}
                            />
                        </div>
                    </motion.div>

                    {/* Passwords */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                            <label className="block text-xs font-mono text-text-primary/60 mb-1.5 tracking-wider">
                                $ SET CIPHER
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className={`${inputClasses} pr-9`}
                                    style={inputStyle}
                                    placeholder="Min 6 chars"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-primary/40 hover:text-neon"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-text-primary/60 mb-1.5 tracking-wider">
                                $ CONFIRM CIPHER
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                className={inputClasses}
                                style={inputStyle}
                                placeholder="Re-enter cipher"
                                value={form.confirmPassword}
                                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                            />
                        </div>
                    </motion.div>

                    {/* Admin Access Code Toggle */}
                    <motion.div variants={itemVariants}>
                        {!showAdminField ? (
                            <button
                                type="button"
                                onClick={() => setShowAdminField(true)}
                                className="text-[11px] font-mono text-text-primary/40 hover:text-accent flex items-center gap-1.5 transition-colors"
                            >
                                <ShieldAlert size={12} />
                                <span>Have an Executive Clearance Passkey?</span>
                            </button>
                        ) : (
                            <div className="p-3 rounded-lg border border-accent/20 bg-accent/5">
                                <label className="block text-xs font-mono text-accent mb-1 tracking-wider flex items-center gap-1.5">
                                    <ShieldAlert size={13} />
                                    <span>EXECUTIVE ADMIN PASSKEY</span>
                                </label>
                                <input
                                    type="password"
                                    className={inputClasses}
                                    style={{
                                        background: "rgba(0, 30, 40, 0.6)",
                                        borderColor: "rgba(0, 245, 196, 0.3)",
                                    }}
                                    placeholder="Enter authorization key"
                                    value={form.adminCode}
                                    onChange={(e) => setForm({ ...form, adminCode: e.target.value })}
                                />
                            </div>
                        )}
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={itemVariants} className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-cyber-accent text-center py-3.5 font-bold tracking-widest flex items-center justify-center gap-2 group disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                                    COMMITTING REGISTRATION...
                                </span>
                            ) : (
                                <>
                                    <span>INITIALIZE CREDENTIALS</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </motion.div>
                </form>

                {/* Footer Navigation */}
                <motion.div variants={itemVariants} className="mt-6 pt-5 border-t border-neon/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono gap-3">
                    <Link
                        href="/login"
                        className="text-text-primary/50 hover:text-neon transition-colors flex items-center gap-1"
                    >
                        <span>Already Authorized? Authenticate</span>
                        <span className="text-neon">→</span>
                    </Link>

                    <Link
                        href="/portfolio"
                        className="text-accent/80 hover:text-neon transition-colors flex items-center gap-1"
                    >
                        <Terminal size={13} />
                        <span>Bypass to Portfolio</span>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
