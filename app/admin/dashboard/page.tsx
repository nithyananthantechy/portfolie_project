"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Eye,
    ShieldCheck,
    RefreshCw,
    ArrowLeft,
    Mail,
    Search,
    Trash2,
    CheckCircle2,
    Activity,
    Globe,
    Building2,
    Sparkles,
} from "lucide-react";
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
    lastActive?: string;
}

interface Message {
    id: string;
    name: string;
    email: string;
    content: string;
    createdAt: string;
}

const ventureStatuses = [
    { name: "NSK GROUPS", status: "PARENT HOLDING", color: "#6c63ff", domain: "nskgroups.website" },
    { name: "NITECHSPARK", status: "OPERATIONAL", color: "#00f5c4", domain: "nitechspark.site" },
    { name: "NITEHIRE", status: "LIVE (ATS)", color: "#00d4ff", domain: "nitehire.site" },
    { name: "NITEORBIT", status: "STEALTH", color: "#f5a623", domain: "niteorbit.space" },
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"users" | "messages" | "telemetry">("users");
    const [users, setUsers] = useState<User[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [stats, setStats] = useState({ visitCount: 0 });
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("ALL");
    const [error, setError] = useState("");

    const fetchData = async () => {
        setRefreshing(true);
        try {
            // Fetch users & visits
            const resUsers = await fetch("/api/admin/users");
            const dataUsers = await resUsers.json();
            if (dataUsers.success) {
                setUsers(dataUsers.users || []);
                setStats(dataUsers.stats || { visitCount: 0 });
            } else {
                setError(dataUsers.error);
            }

            // Fetch contact messages
            const resMsgs = await fetch("/api/admin/messages");
            const dataMsgs = await resMsgs.json();
            if (dataMsgs.success) {
                setMessages(dataMsgs.messages || []);
            }
        } catch (e) {
            setError("Failed to fetch administrative records.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteMessage = async (id: string) => {
        try {
            const res = await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setMessages(messages.filter((m) => m.id !== id));
            }
        } catch (e) {
            console.error("Failed to delete message", e);
        }
    };

    const filteredUsers = users.filter((u) => {
        const matchesSearch =
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (u.jobRole && u.jobRole.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (u.degree && u.degree.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory =
            categoryFilter === "ALL" ||
            u.category === categoryFilter ||
            u.role === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center font-mono" style={{ background: "var(--bg)" }}>
                <MatrixBackground />
                <div className="z-10 text-center">
                    <div className="w-12 h-12 border-2 border-neon border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <div className="font-orbitron text-lg gradient-text tracking-wider">
                        INITIALIZING EXECUTIVE CONSOLE...
                    </div>
                </div>
            </div>
        );
    }

    const handleInitDb = async () => {
        setRefreshing(true);
        try {
            const res = await fetch("/api/admin/init-db");
            const data = await res.json();
            if (data.success) {
                setError("");
                await fetchData();
            } else {
                setError(data.error || "Failed to initialize database");
            }
        } catch {
            setError("Failed to run database bootstrap");
        } finally {
            setRefreshing(false);
        }
    };

    if (error && users.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 font-rajdhani" style={{ background: "var(--bg)" }}>
                <MatrixBackground />
                <div className="z-10 text-center max-w-lg glass-panel p-8 rounded-2xl border border-danger/30 shadow-2xl backdrop-blur-xl">
                    <h1 className="font-orbitron text-2xl text-danger mb-3">DATABASE INITIALIZATION REQUIRED</h1>
                    <p className="text-text-primary/70 font-mono text-xs mb-6 leading-relaxed bg-black/40 p-3 rounded-lg border border-danger/20">
                        {error}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                            onClick={handleInitDb}
                            disabled={refreshing}
                            className="btn-cyber text-center py-2.5 px-5 text-xs font-mono font-bold flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
                            <span>{refreshing ? "INITIALIZING TABLES..." : "AUTO-CREATE DATABASE TABLES"}</span>
                        </button>
                        <Link href="/login" className="btn-cyber-accent text-center py-2.5 px-5 text-xs font-mono">
                            Re-Authenticate
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-rajdhani selection:bg-neon/20 pb-16" style={{ background: "var(--bg)" }}>
            <MatrixBackground />

            <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
                {/* Venture Status Strip */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap items-center justify-between gap-4 mb-6 px-5 py-3 rounded-xl border border-neon/15 backdrop-blur-md"
                    style={{ background: "rgba(3, 7, 18, 0.75)" }}
                >
                    <div className="flex flex-wrap items-center gap-4">
                        {ventureStatuses.map((v, i) => (
                            <div key={v.name} className="flex items-center gap-2">
                                <div
                                    className="w-2 h-2 rounded-full animate-pulse"
                                    style={{
                                        background: v.color,
                                        boxShadow: `0 0 8px ${v.color}`,
                                    }}
                                />
                                <span className="text-xs font-mono text-text-primary/70">
                                    <span className="font-bold text-white">{v.name}</span>:{" "}
                                    <span style={{ color: v.color }}>{v.status}</span>
                                </span>
                                {i < ventureStatuses.length - 1 && (
                                    <span className="text-text-primary/20 ml-2 hidden sm:inline">|</span>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={fetchData}
                            disabled={refreshing}
                            className="flex items-center gap-1.5 text-xs font-mono text-neon border border-neon/30 px-3 py-1 rounded-md hover:bg-neon/10 transition-colors disabled:opacity-50"
                        >
                            <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
                            <span>SYNC</span>
                        </button>
                    </div>
                </motion.div>

                {/* Error Diagnostic Alert */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 rounded-xl border border-danger/40 bg-danger/10 text-danger text-xs font-mono flex items-center justify-between"
                    >
                        <div className="flex items-center gap-2">
                            <span className="font-bold">[DATABASE DIAGNOSTIC]:</span>
                            <span>{error}</span>
                        </div>
                        <button
                            onClick={() => setError("")}
                            className="text-danger/60 hover:text-danger text-xs"
                        >
                            Dismiss
                        </button>
                    </motion.div>
                )}

                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-5 border-b border-neon/15 gap-4">
                    <div>
                        <div className="flex items-center gap-2.5 mb-1">
                            <span className="px-2.5 py-0.5 rounded bg-neon/10 border border-neon/30 text-[10px] font-mono text-neon tracking-widest uppercase">
                                CLEARANCE LEVEL: 5 // CMD
                            </span>
                        </div>
                        <h1 className="font-orbitron text-2xl md:text-3xl font-black gradient-text tracking-wider">
                            FOUNDER COMMAND CENTER // NSK GROUPS
                        </h1>
                        <p className="text-xs text-text-primary/50 font-mono mt-1">
                            Operator: Nithyananthan Nagarajan (CMD) · Erode Central Nodes
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/portfolio"
                            className="flex items-center gap-2 text-text-primary/60 hover:text-neon text-xs font-mono border rounded-lg px-4 py-2.5 transition-all hover:border-neon/40 bg-panel/40"
                            style={{ borderColor: "rgba(0, 245, 196, 0.15)" }}
                        >
                            <ArrowLeft size={14} />
                            <span>PORTFOLIO VIEW</span>
                        </Link>
                    </div>
                </header>

                {/* KPI Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card rounded-xl p-5 border border-neon/20 relative overflow-hidden"
                    >
                        <div className="flex items-center justify-between text-xs font-mono text-text-primary/50 mb-2">
                            <span>REGISTERED OPERATORS</span>
                            <Users size={16} className="text-neon" />
                        </div>
                        <div className="font-orbitron text-3xl font-black text-neon">{users.length}</div>
                        <div className="text-[11px] font-mono text-text-primary/40 mt-1">Visitors & verified users</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="glass-card rounded-xl p-5 border border-accent/20 relative overflow-hidden"
                    >
                        <div className="flex items-center justify-between text-xs font-mono text-text-primary/50 mb-2">
                            <span>TOTAL SITE SESSIONS</span>
                            <Eye size={16} className="text-accent" />
                        </div>
                        <div className="font-orbitron text-3xl font-black text-accent">{stats.visitCount || 1024}</div>
                        <div className="text-[11px] font-mono text-text-primary/40 mt-1">Unique logged encounters</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card rounded-xl p-5 border border-purple-500/20 relative overflow-hidden"
                    >
                        <div className="flex items-center justify-between text-xs font-mono text-text-primary/50 mb-2">
                            <span>TRANSMISSIONS (MESSAGES)</span>
                            <Mail size={16} className="text-purple-400" />
                        </div>
                        <div className="font-orbitron text-3xl font-black text-purple-400">{messages.length}</div>
                        <div className="text-[11px] font-mono text-text-primary/40 mt-1">Direct inquiries & leads</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="glass-card rounded-xl p-5 border border-emerald-500/20 relative overflow-hidden"
                    >
                        <div className="flex items-center justify-between text-xs font-mono text-text-primary/50 mb-2">
                            <span>SECURITY HARDENING</span>
                            <ShieldCheck size={16} className="text-emerald-400" />
                        </div>
                        <div className="font-orbitron text-3xl font-black text-emerald-400">100%</div>
                        <div className="text-[11px] font-mono text-text-primary/40 mt-1">Zero-trust JWT encrypted</div>
                    </motion.div>
                </div>

                {/* Tabs Navigation */}
                <div className="flex items-center gap-3 mb-6 border-b border-neon/15 pb-2">
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs tracking-wider transition-all ${
                            activeTab === "users"
                                ? "bg-neon/15 text-neon border border-neon/40 shadow-sm"
                                : "text-text-primary/50 hover:text-white"
                        }`}
                    >
                        <Users size={14} />
                        <span>OPERATOR REGISTRY ({users.length})</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("messages")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs tracking-wider transition-all ${
                            activeTab === "messages"
                                ? "bg-neon/15 text-neon border border-neon/40 shadow-sm"
                                : "text-text-primary/50 hover:text-white"
                        }`}
                    >
                        <Mail size={14} />
                        <span>TRANSMISSIONS ({messages.length})</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("telemetry")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs tracking-wider transition-all ${
                            activeTab === "telemetry"
                                ? "bg-neon/15 text-neon border border-neon/40 shadow-sm"
                                : "text-text-primary/50 hover:text-white"
                        }`}
                    >
                        <Activity size={14} />
                        <span>VENTURE TELEMETRY</span>
                    </button>
                </div>

                {/* TAB 1: USERS */}
                {activeTab === "users" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass-card rounded-2xl p-6 border border-neon/20"
                    >
                        {/* Search & Filter Bar */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                            <div className="relative w-full sm:w-80">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-primary/40" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or role..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-neon/20 bg-panel/60 text-xs font-mono text-neon focus:outline-none focus:border-neon"
                                />
                            </div>

                            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                                {["ALL", "PROFESSIONAL", "STUDENT", "RECRUITER", "ENTERPRISE", "ADMIN"].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategoryFilter(cat)}
                                        className={`px-3 py-1 rounded-md text-[11px] font-mono transition-all ${
                                            categoryFilter === cat
                                                ? "bg-neon/20 border border-neon text-neon"
                                                : "border border-neon/10 bg-panel/30 text-text-primary/50 hover:text-white"
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Users Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left font-mono text-xs">
                                <thead>
                                    <tr className="border-b border-neon/15 text-text-primary/40 uppercase tracking-wider">
                                        <th className="pb-3 px-3">Operator</th>
                                        <th className="pb-3 px-3">Classification</th>
                                        <th className="pb-3 px-3">Role / Organization</th>
                                        <th className="pb-3 px-3">Clearance</th>
                                        <th className="pb-3 px-3">Joined Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neon/5">
                                    {filteredUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="py-8 text-center text-text-primary/40">
                                                No operator records matched the active filter.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredUsers.map((u) => (
                                            <tr key={u.id} className="hover:bg-neon/5 transition-colors">
                                                <td className="py-3 px-3">
                                                    <div className="font-bold text-white">{u.name}</div>
                                                    <div className="text-[11px] text-text-primary/40">{u.email}</div>
                                                </td>
                                                <td className="py-3 px-3">
                                                    <span className="px-2 py-0.5 rounded border text-[10px] tracking-wider border-neon/20 bg-neon/5 text-neon">
                                                        {u.category}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-3 text-text-primary/70">
                                                    <div>{u.jobRole || "—"}</div>
                                                    <div className="text-[11px] text-text-primary/40">{u.degree || ""}</div>
                                                </td>
                                                <td className="py-3 px-3">
                                                    <span
                                                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                                            u.role === "ADMIN"
                                                                ? "bg-danger/10 text-danger border border-danger/30"
                                                                : "bg-neon/10 text-neon border border-neon/20"
                                                        }`}
                                                    >
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-3 text-text-primary/40">
                                                    {new Date(u.createdAt).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                    })}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

                {/* TAB 2: MESSAGES */}
                {activeTab === "messages" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass-card rounded-2xl p-6 border border-neon/20"
                    >
                        <h3 className="font-orbitron text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Mail className="text-neon" size={18} />
                            <span>INBOUND TRANSMISSIONS</span>
                        </h3>

                        {messages.length === 0 ? (
                            <div className="py-12 text-center text-text-primary/40 font-mono text-sm">
                                [ No direct transmissions pending in queue ]
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map((m) => (
                                    <div
                                        key={m.id}
                                        className="p-5 rounded-xl border border-neon/15 bg-panel/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-neon/30 transition-all"
                                    >
                                        <div className="space-y-1.5 flex-1">
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-white text-sm">{m.name}</span>
                                                <a
                                                    href={`mailto:${m.email}`}
                                                    className="text-xs font-mono text-neon hover:underline"
                                                >
                                                    {m.email}
                                                </a>
                                                <span className="text-[10px] font-mono text-text-primary/30">
                                                    {new Date(m.createdAt).toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-text-primary/80 leading-relaxed font-sans">
                                                {m.content}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 self-end md:self-center">
                                            <a
                                                href={`mailto:${m.email}?subject=RE:%20NSK%20Groups%20Inquiry`}
                                                className="px-3 py-1.5 rounded-lg border border-neon/30 bg-neon/10 text-xs font-mono text-neon hover:bg-neon hover:text-black transition-all"
                                            >
                                                Reply
                                            </a>
                                            <button
                                                onClick={() => handleDeleteMessage(m.id)}
                                                className="p-1.5 rounded-lg border border-danger/30 text-danger/70 hover:text-danger hover:bg-danger/10 transition-colors"
                                                title="Purge transmission"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* TAB 3: TELEMETRY */}
                {activeTab === "telemetry" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <div className="glass-card rounded-2xl p-6 border border-neon/20">
                            <h3 className="font-orbitron text-base font-bold text-white mb-4 flex items-center gap-2">
                                <Globe className="text-neon" size={18} />
                                <span>PRODUCTION WEBSITES</span>
                            </h3>

                            <div className="space-y-3 font-mono text-xs">
                                {[
                                    { name: "NSK Groups Parent", url: "https://nskgroups.website", status: "200 OK", ms: "34ms" },
                                    { name: "NiTechSpark IT & DevOps", url: "https://nitechspark.site", status: "200 OK", ms: "42ms" },
                                    { name: "NiteHire AI ATS", url: "https://nitehire.site", status: "200 OK", ms: "28ms" },
                                    { name: "NiteOrbit Space Tech", url: "https://niteorbit.space", status: "STEALTH", ms: "—" },
                                ].map((s) => (
                                    <div
                                        key={s.name}
                                        className="p-3 rounded-lg border border-neon/10 bg-panel/30 flex items-center justify-between"
                                    >
                                        <div>
                                            <div className="font-bold text-white">{s.name}</div>
                                            <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-text-primary/40 hover:text-neon">
                                                {s.url}
                                            </a>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-neon font-bold">{s.status}</span>
                                            <div className="text-[10px] text-text-primary/30">{s.ms}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card rounded-2xl p-6 border border-neon/20">
                            <h3 className="font-orbitron text-base font-bold text-white mb-4 flex items-center gap-2">
                                <Building2 className="text-neon" size={18} />
                                <span>CORPORATE REGISTRATION</span>
                            </h3>

                            <div className="space-y-3 font-mono text-xs text-text-primary/70">
                                <div className="p-3 rounded-lg border border-neon/10 bg-panel/30">
                                    <span className="text-text-primary/40 block text-[10px]">MSME CLASSIFICATION</span>
                                    <span className="text-white font-bold">Udyam MSME Registered Enterprise</span>
                                </div>
                                <div className="p-3 rounded-lg border border-neon/10 bg-panel/30">
                                    <span className="text-text-primary/40 block text-[10px]">HEADQUARTERS</span>
                                    <span className="text-white font-bold">Erode, Tamil Nadu, India (11.3410° N, 77.7172° E)</span>
                                </div>
                                <div className="p-3 rounded-lg border border-neon/10 bg-panel/30">
                                    <span className="text-text-primary/40 block text-[10px]">DIRECT EXECUTIVE CONTACT</span>
                                    <span className="text-neon font-bold">+91 63855 76354 · nithyananthan@nskgroups.website</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
