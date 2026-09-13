"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    PenTool,
    FileText,
    Radio,
    Users,
    Mail,
    LogOut,
    ExternalLink,
    Check,
    Sparkles,
    Trash2,
    RefreshCw,
    ShieldCheck,
    Plus,
    Tag,
} from "lucide-react";
import MatrixBackground from "@/components/MatrixBackground";

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"publish-blog" | "publish-paper" | "publish-wire" | "messages" | "telemetry">("publish-blog");

    // Blog form
    const [blogTitle, setBlogTitle] = useState("");
    const [blogCategory, setBlogCategory] = useState("EMPIRE & LEADERSHIP");
    const [blogExcerpt, setBlogExcerpt] = useState("");
    const [blogContent, setBlogContent] = useState("");
    const [blogTags, setBlogTags] = useState("");
    const [blogFeatured, setBlogFeatured] = useState(false);
    const [blogPublishing, setBlogPublishing] = useState(false);
    const [blogSuccess, setBlogSuccess] = useState(false);

    // Paper form
    const [paperRefId, setPaperRefId] = useState("");
    const [paperTitle, setPaperTitle] = useState("");
    const [paperSubtitle, setPaperSubtitle] = useState("");
    const [paperCategory, setPaperCategory] = useState("CYBERSECURITY & ZERO-TRUST");
    const [paperAbstract, setPaperAbstract] = useState("");
    const [paperFindings, setPaperFindings] = useState("");
    const [paperTags, setPaperTags] = useState("");
    const [paperPublishing, setPaperPublishing] = useState(false);
    const [paperSuccess, setPaperSuccess] = useState(false);

    // Daily wire form
    const [wireTitle, setWireTitle] = useState("");
    const [wireChannel, setWireChannel] = useState("CYBER & TECH DISPATCH");
    const [wireSeverity, setWireSeverity] = useState("OPERATIONAL");
    const [wireSummary, setWireSummary] = useState("");
    const [wireDirective, setWireDirective] = useState("");
    const [wireTags, setWireTags] = useState("");
    const [wirePublishing, setWirePublishing] = useState(false);
    const [wireSuccess, setWireSuccess] = useState(false);

    // Messages & Visitors
    const [messages, setMessages] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [visitCount, setVisitCount] = useState(0);
    const [loadingData, setLoadingData] = useState(true);

    const loadData = async () => {
        try {
            const resMsgs = await fetch("/api/admin/messages");
            const dataMsgs = await resMsgs.json();
            if (dataMsgs.success) setMessages(dataMsgs.messages || []);

            const resUsers = await fetch("/api/admin/users");
            const dataUsers = await resUsers.json();
            if (dataUsers.success) {
                setUsers(dataUsers.users || []);
                setVisitCount(dataUsers.stats?.visitCount || 0);
            }
        } catch {
        } finally {
            setLoadingData(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/admin/login");
            router.refresh();
        } catch {
            router.push("/admin/login");
        }
    };

    // Submit Blog
    const submitBlog = async (e: React.FormEvent) => {
        e.preventDefault();
        setBlogPublishing(true);
        try {
            const res = await fetch("/api/admin/publish", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "blog",
                    data: {
                        title: blogTitle,
                        category: blogCategory,
                        excerpt: blogExcerpt,
                        content: blogContent,
                        tags: blogTags,
                        featured: blogFeatured,
                    },
                }),
            });
            const data = await res.json();
            if (data.success) {
                setBlogSuccess(true);
                setTimeout(() => {
                    setBlogSuccess(false);
                    setBlogTitle("");
                    setBlogExcerpt("");
                    setBlogContent("");
                    setBlogTags("");
                }, 2000);
            } else {
                alert(data.error || "Failed to publish blog");
            }
        } catch (err: any) {
            alert(err.message || "Network transmission error");
        } finally {
            setBlogPublishing(false);
        }
    };

    // Submit Paper
    const submitPaper = async (e: React.FormEvent) => {
        e.preventDefault();
        setPaperPublishing(true);
        try {
            const res = await fetch("/api/admin/publish", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "paper",
                    data: {
                        refId: paperRefId || `NSK-TR-2026-${Math.floor(Math.random() * 90 + 10)}`,
                        title: paperTitle,
                        subtitle: paperSubtitle,
                        category: paperCategory,
                        abstract: paperAbstract,
                        keyFindings: paperFindings,
                        tags: paperTags,
                    },
                }),
            });
            const data = await res.json();
            if (data.success) {
                setPaperSuccess(true);
                setTimeout(() => {
                    setPaperSuccess(false);
                    setPaperRefId("");
                    setPaperTitle("");
                    setPaperSubtitle("");
                    setPaperAbstract("");
                    setPaperFindings("");
                    setPaperTags("");
                }, 2000);
            } else {
                alert(data.error || "Failed to publish paper");
            }
        } catch (err: any) {
            alert(err.message || "Network transmission error");
        } finally {
            setPaperPublishing(false);
        }
    };

    // Submit Daily Wire
    const submitWire = async (e: React.FormEvent) => {
        e.preventDefault();
        setWirePublishing(true);
        try {
            const res = await fetch("/api/admin/publish", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "update",
                    data: {
                        title: wireTitle,
                        channel: wireChannel,
                        severity: wireSeverity,
                        summary: wireSummary,
                        actionTakeaway: wireDirective,
                        tags: wireTags,
                    },
                }),
            });
            const data = await res.json();
            if (data.success) {
                setWireSuccess(true);
                setTimeout(() => {
                    setWireSuccess(false);
                    setWireTitle("");
                    setWireSummary("");
                    setWireDirective("");
                    setWireTags("");
                }, 2000);
            } else {
                alert(data.error || "Failed to post daily update");
            }
        } catch (err: any) {
            alert(err.message || "Network transmission error");
        } finally {
            setWirePublishing(false);
        }
    };

    return (
        <main className="min-h-screen relative overflow-hidden font-rajdhani pb-20" style={{ background: "var(--bg)" }}>
            <MatrixBackground />

            {/* Top Navigation */}
            <header className="relative z-20 border-b border-white/10 bg-black/60 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg border border-sky-500/30 bg-sky-500/10 flex items-center justify-center text-sky-400 font-bold font-orbitron">
                            NN
                        </div>
                        <div>
                            <span className="font-orbitron font-bold text-sm text-white tracking-wider block">
                                CHAIRMAN PUBLISHING STUDIO
                            </span>
                            <span className="text-[10px] font-mono text-sky-400 tracking-widest uppercase block">
                                NSK GROUPS // FOUNDER CONSOLE
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            target="_blank"
                            className="text-xs font-mono text-slate-400 hover:text-white px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center gap-1.5 transition-colors"
                        >
                            <span>VIEW LIVE PORTFOLIO</span>
                            <ExternalLink size={13} />
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="text-xs font-mono text-rose-400 hover:text-rose-300 px-3.5 py-1.5 rounded-lg border border-rose-500/30 hover:border-rose-500/60 bg-rose-500/10 flex items-center gap-1.5 transition-colors"
                        >
                            <LogOut size={13} />
                            <span>LOGOUT</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8">
                {/* Tabs */}
                <div className="flex flex-wrap gap-2 pb-6 border-b border-slate-800 text-xs font-mono">
                    <button
                        onClick={() => setActiveTab("publish-blog")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                            activeTab === "publish-blog"
                                ? "bg-white text-slate-950 border-white font-bold shadow-sm"
                                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                        }`}
                    >
                        <PenTool size={14} />
                        <span>WRITE & PUBLISH BLOG</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("publish-paper")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                            activeTab === "publish-paper"
                                ? "bg-white text-slate-950 border-white font-bold shadow-sm"
                                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                        }`}
                    >
                        <FileText size={14} />
                        <span>PUBLISH PROJECT PAPER</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("publish-wire")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                            activeTab === "publish-wire"
                                ? "bg-white text-slate-950 border-white font-bold shadow-sm"
                                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                        }`}
                    >
                        <Radio size={14} />
                        <span>POST DAILY WIRE</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("messages")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                            activeTab === "messages"
                                ? "bg-white text-slate-950 border-white font-bold shadow-sm"
                                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                        }`}
                    >
                        <Mail size={14} />
                        <span>INQUIRIES ({messages.length})</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("telemetry")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                            activeTab === "telemetry"
                                ? "bg-white text-slate-950 border-white font-bold shadow-sm"
                                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                        }`}
                    >
                        <Users size={14} />
                        <span>TELEMETRY & VISITS ({visitCount})</span>
                    </button>
                </div>

                {/* Tab Content */}
                <div className="pt-8">
                    {/* 1. WRITE & PUBLISH BLOG */}
                    {activeTab === "publish-blog" && (
                        <div className="max-w-3xl glass-panel p-6 sm:p-8 rounded-2xl border border-neon/30 bg-panel/70">
                            <div className="flex items-center gap-2 mb-4">
                                <PenTool size={18} className="text-neon" />
                                <h2 className="font-orbitron font-bold text-lg text-white">
                                    COMPOSE EXECUTIVE BLOG POST
                                </h2>
                            </div>
                            <p className="text-xs text-text-primary/60 mb-6">
                                Publish articles directly to the portfolio's blog archive. Articles are visible immediately to all visitors.
                            </p>

                            <form onSubmit={submitBlog} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-mono text-neon mb-1">
                                        ARTICLE TITLE:
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={blogTitle}
                                        onChange={(e) => setBlogTitle(e.target.value)}
                                        placeholder="e.g. Zero-Trust Linux Kernel Auditing & eBPF Telemetry"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-neon"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono text-neon mb-1">
                                            CATEGORY:
                                        </label>
                                        <select
                                            value={blogCategory}
                                            onChange={(e) => setBlogCategory(e.target.value)}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-neon"
                                        >
                                            <option value="EMPIRE & LEADERSHIP">EMPIRE & LEADERSHIP</option>
                                            <option value="CYBERSECURITY">CYBERSECURITY</option>
                                            <option value="LINUX SRE & DEVOPS">LINUX SRE & DEVOPS</option>
                                            <option value="AI ENGINEERING">AI ENGINEERING</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono text-neon mb-1">
                                            TAGS (COMMA SEPARATED):
                                        </label>
                                        <input
                                            type="text"
                                            value={blogTags}
                                            onChange={(e) => setBlogTags(e.target.value)}
                                            placeholder="Zero-Trust, Linux SRE, NSK Groups"
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-neon"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-neon mb-1">
                                        EXECUTIVE EXCERPT (1-2 SENTENCES):
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={blogExcerpt}
                                        onChange={(e) => setBlogExcerpt(e.target.value)}
                                        placeholder="Key takeaway or executive abstract for the preview card..."
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-neon"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-neon mb-1">
                                        FULL ESSAY CONTENT (MARKDOWN SUPPORTED):
                                    </label>
                                    <textarea
                                        rows={10}
                                        required
                                        value={blogContent}
                                        onChange={(e) => setBlogContent(e.target.value)}
                                        placeholder="Write your article sections, code snippets, or architectural blueprint..."
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-neon"
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <span className="text-xs font-mono text-text-primary/40">
                                        Author: Nithyananthan Nagarajan (CMD)
                                    </span>

                                    <button
                                        type="submit"
                                        disabled={blogPublishing}
                                        className="btn-cyber px-6 py-2.5 text-xs flex items-center gap-2 font-bold"
                                    >
                                        {blogSuccess ? <Check size={14} /> : <Plus size={14} />}
                                        <span>{blogSuccess ? "PUBLISHED LIVE!" : blogPublishing ? "TRANSMITTING..." : "PUBLISH ARTICLE"}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* 2. PUBLISH PROJECT PAPER / WHITEPAPER */}
                    {activeTab === "publish-paper" && (
                        <div className="max-w-3xl glass-panel p-6 sm:p-8 rounded-2xl border border-gold/30 bg-panel/70">
                            <div className="flex items-center gap-2 mb-4">
                                <FileText size={18} className="text-gold" />
                                <h2 className="font-orbitron font-bold text-lg text-white">
                                    PUBLISH PROJECT PAPER & TECHNICAL WHITEPAPER
                                </h2>
                            </div>
                            <p className="text-xs text-text-primary/60 mb-6">
                                Publish research papers, RFCs, and engineering specifications under NSK Groups Research Core.
                            </p>

                            <form onSubmit={submitPaper} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono text-gold mb-1">
                                            REFERENCE ID:
                                        </label>
                                        <input
                                            type="text"
                                            value={paperRefId}
                                            onChange={(e) => setPaperRefId(e.target.value)}
                                            placeholder="e.g. NSK-TR-2026-05"
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-gold font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-gold mb-1">
                                            CATEGORY:
                                        </label>
                                        <select
                                            value={paperCategory}
                                            onChange={(e) => setPaperCategory(e.target.value)}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-gold"
                                        >
                                            <option value="CYBERSECURITY & ZERO-TRUST">CYBERSECURITY & ZERO-TRUST</option>
                                            <option value="AI & ATS ARCHITECTURE">AI & ATS ARCHITECTURE</option>
                                            <option value="SPACE TECH & SRE">SPACE TECH & SRE</option>
                                            <option value="ENTERPRISE PROTOCOLS">ENTERPRISE PROTOCOLS</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-gold mb-1">
                                        PAPER TITLE:
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={paperTitle}
                                        onChange={(e) => setPaperTitle(e.target.value)}
                                        placeholder="e.g. Autonomous Multi-Agent Cryptographic Verification Protocols"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-gold"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-gold mb-1">
                                        SUBTITLE / SCOPE:
                                    </label>
                                    <input
                                        type="text"
                                        value={paperSubtitle}
                                        onChange={(e) => setPaperSubtitle(e.target.value)}
                                        placeholder="e.g. Implementation Standard for Distributed Edge Networks"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-gold"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-gold mb-1">
                                        FULL ABSTRACT:
                                    </label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={paperAbstract}
                                        onChange={(e) => setPaperAbstract(e.target.value)}
                                        placeholder="Detailed technical summary of problem statement, architecture, methodology, and outcome..."
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-gold"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-gold mb-1">
                                        KEY ARCHITECTURAL FINDINGS (ONE PER LINE):
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={paperFindings}
                                        onChange={(e) => setPaperFindings(e.target.value)}
                                        placeholder="Finding 1: Zero-trust latency reduced by 40%&#10;Finding 2: Tamper-proof hash audit guarantees 100% data integrity"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-gold"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-gold mb-1">
                                        TAGS (COMMA SEPARATED):
                                    </label>
                                    <input
                                        type="text"
                                        value={paperTags}
                                        onChange={(e) => setPaperTags(e.target.value)}
                                        placeholder="Zero-Trust, Linux, Cryptography, Whitepaper"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-gold"
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <span className="text-xs font-mono text-text-primary/40">
                                        Directorate: NSK Research Core
                                    </span>

                                    <button
                                        type="submit"
                                        disabled={paperPublishing}
                                        className="btn-imperial px-6 py-2.5 text-xs flex items-center gap-2 font-bold"
                                    >
                                        {paperSuccess ? <Check size={14} /> : <Plus size={14} />}
                                        <span>{paperSuccess ? "PUBLISHED LIVE!" : paperPublishing ? "RECORDING..." : "PUBLISH WHITEPAPER"}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* 3. POST DAILY WIRE */}
                    {activeTab === "publish-wire" && (
                        <div className="max-w-3xl glass-panel p-6 sm:p-8 rounded-2xl border border-danger/30 bg-panel/70">
                            <div className="flex items-center gap-2 mb-4">
                                <Radio size={18} className="text-danger" />
                                <h2 className="font-orbitron font-bold text-lg text-white">
                                    DISPATCH DAILY TECH OR BUSINESS WIRE
                                </h2>
                            </div>
                            <p className="text-xs text-text-primary/60 mb-6">
                                Broadcast real-time CVE alerts, kernel updates, or NSK Groups conglomerate market milestones.
                            </p>

                            <form onSubmit={submitWire} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono text-danger mb-1">
                                            CHANNEL:
                                        </label>
                                        <select
                                            value={wireChannel}
                                            onChange={(e) => setWireChannel(e.target.value)}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-danger"
                                        >
                                            <option value="CYBER & TECH DISPATCH">CYBER & TECH DISPATCH</option>
                                            <option value="NSK BUSINESS & MARKET WIRE">NSK BUSINESS & MARKET WIRE</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono text-danger mb-1">
                                            SEVERITY / PRIORITY:
                                        </label>
                                        <select
                                            value={wireSeverity}
                                            onChange={(e) => setWireSeverity(e.target.value)}
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-danger"
                                        >
                                            <option value="OPERATIONAL">OPERATIONAL</option>
                                            <option value="CRITICAL">CRITICAL (RED ALERT)</option>
                                            <option value="MILESTONE">MILESTONE (GOLD)</option>
                                            <option value="INTEL">INTEL (CYAN)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-danger mb-1">
                                        DISPATCH HEADLINE:
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={wireTitle}
                                        onChange={(e) => setWireTitle(e.target.value)}
                                        placeholder="e.g. Linux Kernel 6.12 Zero-Day Mitigation Patch Released"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-danger"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-danger mb-1">
                                        SITUATIONAL SUMMARY:
                                    </label>
                                    <textarea
                                        rows={3}
                                        required
                                        value={wireSummary}
                                        onChange={(e) => setWireSummary(e.target.value)}
                                        placeholder="Provide brief intelligence summary for subscribers and clients..."
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-danger"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-danger mb-1">
                                        ACTIONABLE DIRECTIVE / TAKEAWAY (OPTIONAL):
                                    </label>
                                    <input
                                        type="text"
                                        value={wireDirective}
                                        onChange={(e) => setWireDirective(e.target.value)}
                                        placeholder="e.g. Isolate bastion port 22 and rotate server keys immediately."
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-danger"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-danger mb-1">
                                        TAGS (COMMA SEPARATED):
                                    </label>
                                    <input
                                        type="text"
                                        value={wireTags}
                                        onChange={(e) => setWireTags(e.target.value)}
                                        placeholder="Advisory, Zero-Trust, NiTechSpark, Kernel"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-danger"
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <span className="text-xs font-mono text-text-primary/40">
                                        Broadcasting to Live Feed
                                    </span>

                                    <button
                                        type="submit"
                                        disabled={wirePublishing}
                                        className="px-6 py-2.5 rounded-xl border border-danger/50 bg-danger/20 hover:bg-danger text-white text-xs font-mono font-bold flex items-center gap-2 transition-all"
                                    >
                                        {wireSuccess ? <Check size={14} /> : <Plus size={14} />}
                                        <span>{wireSuccess ? "DISPATCHED TO WIRE!" : wirePublishing ? "BROADCASTING..." : "DISPATCH UPDATE"}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* 4. INQUIRIES & CONTACT MESSAGES */}
                    {activeTab === "messages" && (
                        <div className="space-y-4">
                            {messages.length === 0 ? (
                                <div className="text-center py-16 text-text-primary/40 font-mono text-xs">
                                    No incoming transmissions logged in the executive queue.
                                </div>
                            ) : (
                                messages.map((m) => (
                                    <div
                                        key={m.id}
                                        className="glass-panel p-5 rounded-xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs font-mono">
                                                <span className="text-gold font-bold">{m.name}</span>
                                                <span className="text-text-primary/40">· {m.email}</span>
                                                <span className="text-text-primary/30">· {new Date(m.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-xs text-text-primary/80 font-sans">
                                                {m.content}
                                            </p>
                                        </div>

                                        <a
                                            href={`mailto:${m.email}`}
                                            className="px-3 py-1.5 rounded-lg border border-gold/40 bg-gold/10 text-gold text-xs font-mono text-center shrink-0"
                                        >
                                            REPLY VIA EMAIL
                                        </a>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* 5. TELEMETRY */}
                    {activeTab === "telemetry" && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="glass-panel p-6 rounded-2xl border border-neon/30 text-center">
                                <span className="text-xs font-mono text-neon uppercase block mb-1">
                                    TOTAL VISITOR TRAFFIC
                                </span>
                                <span className="font-orbitron text-3xl font-black text-white">
                                    {visitCount}
                                </span>
                            </div>

                            <div className="glass-panel p-6 rounded-2xl border border-gold/30 text-center">
                                <span className="text-xs font-mono text-gold uppercase block mb-1">
                                    INCOMING TRANSMISSIONS
                                </span>
                                <span className="font-orbitron text-3xl font-black text-white">
                                    {messages.length}
                                </span>
                            </div>

                            <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 text-center">
                                <span className="text-xs font-mono text-cyan-400 uppercase block mb-1">
                                    HOLDINGS GOVERNED
                                </span>
                                <span className="font-orbitron text-3xl font-black text-white">
                                    3 VENTURES
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
