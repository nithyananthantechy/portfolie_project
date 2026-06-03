"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Eye, ShieldCheck, RefreshCw, ArrowLeft } from "lucide-react";
import MatrixBackground from "@/components/MatrixBackground";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    category: string;
    jobRole?: string;
    degree?: string;
    createdAt: string;
}

const ventureStatuses = [
    { name: "NITECHSPARK", status: "OPERATIONAL", color: "#00f5c4" },
    { name: "NITEHIRE", status: "LIVE", color: "#00f5c4" },
    { name: "NITEORBIT", status: "STEALTH", color: "#f5a623" },
];

export default function AdminDashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const [stats, setStats] = useState({ visitCount: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/admin/users");
            const data = await res.json();
            if (data.success) {
                setUsers(data.users);
                setStats(data.stats);
            } else {
                setError(data.error);
            }
        } catch (e) {
            setError("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center font-mono" style={{ background: "var(--bg)" }}>
                <MatrixBackground />
                <div className="z-10 font-orbitron text-lg gradient-text animate-pulse tracking-wider">
                    LOADING ADMIN PROTOCOLS...
                </div>
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8" style={{ background: "var(--bg)" }}>
                <MatrixBackground />
                <div className="z-10 text-center">
                    <h1 className="font-orbitron text-2xl text-danger mb-4">ACCESS DENIED</h1>
                    <p className="text-text-primary/50 font-mono text-sm mb-6">{error}</p>
                    <Link href="/portfolio" className="btn-cyber inline-block">
                        Return to Safety
                    </Link>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen font-rajdhani" style={{ background: "var(--bg)" }}>
            <MatrixBackground />

            <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8">
                {/* Venture Status Strip */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap items-center gap-4 mb-6 px-4 py-2.5 rounded-lg"
                    style={{
                        background: "rgba(0,20,40,0.4)",
                        border: "1px solid rgba(0,245,196,0.08)",
                    }}
                >
                    {ventureStatuses.map((v, i) => (
                        <div key={v.name} className="flex items-center gap-2">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{
                                    background: v.color,
                                    boxShadow: `0 0 6px ${v.color}`,
                                }}
                            />
                            <span className="text-xs font-mono text-text-primary/50">
                                {v.name}:{" "}
                                <span style={{ color: v.color }}>{v.status}</span>
                            </span>
                            {i < ventureStatuses.length - 1 && (
                                <span className="text-text-primary/10 ml-2">|</span>
                            )}
                        </div>
                    ))}
                </motion.div>

                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-4 border-b" style={{ borderColor: "rgba(0,245,196,0.08)" }}>
                    <div>
                        <h1 className="font-orbitron text-xl md:text-2xl font-bold gradient-text tracking-wider">
                            FOUNDER CONSOLE // NSK GROUPS
                        </h1>
                        <p className="text-xs text-text-primary/30 font-mono mt-1">
                            Welcome, Administrator Nithyananthan
                        </p>
                    </div>
                    <Link
                        href="/portfolio"
                        className="mt-3 md:mt-0 flex items-center gap-2 text-text-primary/40 hover:text-neon text-sm font-mono border rounded px-4 py-2 transition-all hover:border-neon/30"
                        style={{ borderColor: "rgba(0,245,196,0.1)" }}
                    >
                        <ArrowLeft size={14} />
                        PORTFOLIO VIEW
                    </Link>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0 }}
                        className="glass-card rounded-lg p-6 relative overflow-hidden group"
                    >
                        <div className="absolute right-4 top-4 opacity-10 group-hover:opacity-20 transition-all">
                            <Users size={48} className="text-neon2" />
                        </div>
                        <div className="text-xs font-mono text-text-primary/30 mb-2 tracking-wider">
                            TOTAL USERS
                        </div>
                        <div className="font-orbitron text-4xl font-bold text-neon2">
                            {users.length}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card rounded-lg p-6 relative overflow-hidden group"
                    >
                        <div className="absolute right-4 top-4 opacity-10 group-hover:opacity-20 transition-all">
                            <Eye size={48} className="text-neon" />
                        </div>
                        <div className="text-xs font-mono text-text-primary/30 mb-2 tracking-wider">
                            TOTAL INCIDENTS (VIEWS)
                        </div>
                        <div className="font-orbitron text-4xl font-bold text-neon">
                            {stats.visitCount}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card rounded-lg p-6 relative overflow-hidden group"
                    >
                        <div className="absolute right-4 top-4 opacity-10 group-hover:opacity-20 transition-all">
                            <ShieldCheck size={48} className="text-accent" />
                        </div>
                        <div className="text-xs font-mono text-text-primary/30 mb-2 tracking-wider">
                            SYSTEM INTEGRITY
                        </div>
                        <div className="font-orbitron text-4xl font-bold text-accent">
                            100%
                        </div>
                    </motion.div>
                </div>

                {/* Users Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-panel rounded-lg overflow-hidden"
                >
                    <div
                        className="p-4 flex justify-between items-center border-b"
                        style={{ borderColor: "rgba(0,245,196,0.08)" }}
                    >
                        <h3 className="font-orbitron text-sm font-bold text-neon tracking-wider">
                            REGISTERED ENTITIES_LOG
                        </h3>
                        <button
                            onClick={fetchUsers}
                            className="flex items-center gap-1.5 text-xs font-mono text-text-primary/30 hover:text-neon transition-colors"
                        >
                            <RefreshCw size={12} />
                            REFRESH
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr
                                    className="text-text-primary/30 font-mono text-xs"
                                    style={{ background: "rgba(0,20,40,0.3)" }}
                                >
                                    <th className="p-4 font-normal tracking-wider">TIMESTAMP</th>
                                    <th className="p-4 font-normal tracking-wider">IDENTITY</th>
                                    <th className="p-4 font-normal tracking-wider">EMAIL</th>
                                    <th className="p-4 font-normal tracking-wider">CATEGORY</th>
                                    <th className="p-4 font-normal tracking-wider">ROLE/DEGREE</th>
                                    <th className="p-4 font-normal tracking-wider">ACCESS LEVEL</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y" style={{ borderColor: "rgba(0,245,196,0.05)" }}>
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-neon/[0.02] transition-colors"
                                    >
                                        <td className="p-4 text-text-primary/30 whitespace-nowrap font-mono text-xs">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 font-semibold text-white/80">
                                            {user.name}
                                        </td>
                                        <td className="p-4 text-text-primary/40 font-mono text-xs">
                                            {user.email}
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                                                    user.category === "PROFESSIONAL"
                                                        ? "text-neon2/70 border border-neon2/20"
                                                        : "text-accent/70 border border-accent/20"
                                                }`}
                                                style={{ background: "rgba(0,20,40,0.4)" }}
                                            >
                                                {user.category}
                                            </span>
                                        </td>
                                        <td className="p-4 text-white/60 text-xs">
                                            {user.jobRole || user.degree || "—"}
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                                                    user.role === "ADMIN"
                                                        ? "text-danger border border-danger/30"
                                                        : "text-text-primary/30"
                                                }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {users.length === 0 && (
                            <div className="p-8 text-center text-text-primary/20 font-mono text-sm">
                                NO RECORDS FOUND IN DATABASE
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
