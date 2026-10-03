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
    FolderGit2,
    Upload,
    Image as ImageIcon,
    CheckCircle2,
    AlertCircle,
    X,
} from "lucide-react";
import MatrixBackground from "@/components/MatrixBackground";

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"publish-blog" | "publish-project" | "publish-paper" | "publish-wire" | "messages" | "telemetry">("publish-blog");

    // Blog form
    const [blogTitle, setBlogTitle] = useState("");
    const [blogCategory, setBlogCategory] = useState("FOUNDER & LEADERSHIP");
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

    // Project form
    const [projectName, setProjectName] = useState("");
    const [projectFocus, setProjectFocus] = useState("Full Stack");
    const [projectStatus, setProjectStatus] = useState("Completed");
    const [projectProblem, setProjectProblem] = useState("");
    const [projectWhatIBuilt, setProjectWhatIBuilt] = useState("");
    const [projectTechStack, setProjectTechStack] = useState("");
    const [projectGithubUrl, setProjectGithubUrl] = useState("");
    const [projectDemoUrl, setProjectDemoUrl] = useState("");
    const [projectIsPrivate, setProjectIsPrivate] = useState(false);
    const [projectPrivateNote, setProjectPrivateNote] = useState("");
    const [projectImages, setProjectImages] = useState<string[]>([]);
    const [manualImageUrl, setManualImageUrl] = useState("");
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [projectPublishing, setProjectPublishing] = useState(false);
    const [projectSuccess, setProjectSuccess] = useState(false);
    const [publishedProjects, setPublishedProjects] = useState<any[]>([]);

    // Messages & Visitors
    const [messages, setMessages] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [visitCount, setVisitCount] = useState(0);
    const [loadingData, setLoadingData] = useState(true);

    const loadData = async () => {
        try {
            const timestamp = Date.now();
            const resMsgs = await fetch(`/api/admin/messages?t=${timestamp}`, { cache: "no-store" });
            const dataMsgs = await resMsgs.json();
            if (dataMsgs.success) setMessages(dataMsgs.messages || []);

            const resUsers = await fetch(`/api/admin/users?t=${timestamp}`, { cache: "no-store" });
            const dataUsers = await resUsers.json();
            if (dataUsers.success) {
                setUsers(dataUsers.users || []);
                setVisitCount(dataUsers.stats?.visitCount || 0);
            }

            const resPublish = await fetch(`/api/admin/publish?t=${timestamp}`, { cache: "no-store" });
            const dataPublish = await resPublish.json();
            if (dataPublish.success && Array.isArray(dataPublish.projects)) {
                setPublishedProjects(dataPublish.projects);
            } else {
                try {
                    const localSaved = JSON.parse(localStorage.getItem("nn_custom_projects") || "[]");
                    if (Array.isArray(localSaved) && localSaved.length > 0) {
                        setPublishedProjects((prev) => {
                            const ids = new Set(prev.map((p) => p.id));
                            const missing = localSaved.filter((p: any) => !ids.has(p.id));
                            return [...missing, ...prev];
                        });
                    }
                } catch {}
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
                        refId: paperRefId || `NS-TR-2026-${Math.floor(Math.random() * 90 + 10)}`,
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

    const compressImageClient = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            if (file.type === "image/svg+xml") {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = () => resolve("");
                reader.readAsDataURL(file);
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    let { width, height } = img;
                    const maxWidth = 1400;
                    const maxHeight = 1000;

                    if (width > maxWidth || height > maxHeight) {
                        if (width / height > maxWidth / maxHeight) {
                            height = Math.round((height * maxWidth) / width);
                            width = maxWidth;
                        } else {
                            width = Math.round((width * maxHeight) / height);
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    if (!ctx) {
                        resolve(e.target?.result as string);
                        return;
                    }
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL("image/webp", 0.82));
                };
                img.onerror = () => resolve(e.target?.result as string);
                img.src = e.target?.result as string;
            };
            reader.onerror = () => resolve("");
            reader.readAsDataURL(file);
        });
    };

    // Multiple image upload handler with client-side compression fallback
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        setUploadingImage(true);
        setUploadError("");

        try {
            // Compress in browser for instant safety and to avoid payload limits
            const clientCompressedUrls: string[] = [];
            for (let i = 0; i < files.length; i++) {
                const compressed = await compressImageClient(files[i]);
                if (compressed) clientCompressedUrls.push(compressed);
            }

            // Attempt server upload
            let serverSuccess = false;
            try {
                const formData = new FormData();
                for (let i = 0; i < files.length; i++) {
                    formData.append("files", files[i]);
                }
                const res = await fetch("/api/admin/upload", {
                    method: "POST",
                    body: formData,
                });
                const data = await res.json();
                if (data.success && (data.urls || data.url)) {
                    serverSuccess = true;
                    const incomingUrls: string[] = data.urls || (data.url ? [data.url] : []);
                    setProjectImages((prev) => {
                        const next = [...prev];
                        for (const u of incomingUrls) {
                            if (!next.includes(u)) next.push(u);
                        }
                        return next;
                    });
                }
            } catch {
                serverSuccess = false;
            }

            // Fallback to client-compressed WebP Data URLs if server didn't provide URLs
            if (!serverSuccess && clientCompressedUrls.length > 0) {
                setProjectImages((prev) => {
                    const next = [...prev];
                    for (const u of clientCompressedUrls) {
                        if (!next.includes(u)) next.push(u);
                    }
                    return next;
                });
            }
        } catch (err: any) {
            setUploadError(err.message || "Failed to process images");
        } finally {
            setUploadingImage(false);
            e.target.value = "";
        }
    };

    const handleAddManualImageUrl = () => {
        if (!manualImageUrl.trim()) return;
        const urls = manualImageUrl
            .split(/[\n,]+/)
            .map((u) => u.trim())
            .filter(Boolean);
        setProjectImages((prev) => {
            const next = [...prev];
            for (const u of urls) {
                if (!next.includes(u)) next.push(u);
            }
            return next;
        });
        setManualImageUrl("");
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setProjectImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    };

    const handleSetCoverImage = (indexToCover: number) => {
        setProjectImages((prev) => {
            const target = prev[indexToCover];
            if (!target) return prev;
            return [target, ...prev.filter((_, idx) => idx !== indexToCover)];
        });
    };

    // Submit Project
    const submitProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setProjectPublishing(true);
        try {
            const res = await fetch("/api/admin/publish", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "project",
                    data: {
                        name: projectName,
                        engineeringFocus: projectFocus,
                        status: projectStatus,
                        problem: projectProblem,
                        whatIBuilt: projectWhatIBuilt,
                        techStack: projectTechStack,
                        githubUrl: projectGithubUrl,
                        demoUrl: projectDemoUrl,
                        isPrivate: projectIsPrivate,
                        privateNote: projectPrivateNote,
                        image: projectImages[0] || "",
                        images: projectImages,
                    },
                }),
            });
            const data = await res.json();
            if (data.success) {
                // Update state immediately so UI reflects without delay
                if (data.projects && Array.isArray(data.projects)) {
                    setPublishedProjects(data.projects);
                } else if (data.item) {
                    setPublishedProjects((prev) => [data.item, ...prev.filter((p) => p.id !== data.item.id)]);
                }

                // Instant browser backup
                if (data.item) {
                    try {
                        const localSaved = JSON.parse(localStorage.getItem("nn_custom_projects") || "[]");
                        const updated = [data.item, ...localSaved.filter((p: any) => p.id !== data.item.id)];
                        localStorage.setItem("nn_custom_projects", JSON.stringify(updated));
                    } catch {}
                }

                setProjectSuccess(true);
                await loadData();
                setTimeout(() => {
                    setProjectSuccess(false);
                    setProjectName("");
                    setProjectProblem("");
                    setProjectWhatIBuilt("");
                    setProjectTechStack("");
                    setProjectGithubUrl("");
                    setProjectDemoUrl("");
                    setProjectIsPrivate(false);
                    setProjectPrivateNote("");
                    setProjectImages([]);
                    setManualImageUrl("");
                }, 2000);
            } else {
                alert(data.error || "Failed to publish project");
            }
        } catch (err: any) {
            alert(err.message || "Network transmission error");
        } finally {
            setProjectPublishing(false);
        }
    };

    // Delete Project
    const handleDeleteProject = async (id: string) => {
        if (!confirm("Are you sure you want to remove this project from live portfolio?")) return;
        try {
            const res = await fetch(`/api/admin/publish?type=project&id=${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success) {
                setPublishedProjects(data.projects || []);
                try {
                    const localSaved = JSON.parse(localStorage.getItem("nn_custom_projects") || "[]");
                    const updated = localSaved.filter((p: any) => p.id !== id);
                    localStorage.setItem("nn_custom_projects", JSON.stringify(updated));
                } catch {}
            } else {
                alert(data.error || "Failed to delete project");
            }
        } catch (e: any) {
            alert(e.message || "Error deleting project");
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
                                FOUNDER PUBLISHING STUDIO
                            </span>
                            <span className="text-[10px] font-mono text-sky-400 tracking-widest uppercase block">
                                NITECHSPARK // FOUNDER CONSOLE
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
                        onClick={() => setActiveTab("publish-project")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                            activeTab === "publish-project"
                                ? "bg-white text-slate-950 border-white font-bold shadow-sm"
                                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                        }`}
                    >
                        <FolderGit2 size={14} />
                        <span>PUBLISH PROJECT</span>
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
                                            <option value="FOUNDER & LEADERSHIP">FOUNDER & LEADERSHIP</option>
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
                                            placeholder="Zero-Trust, Linux SRE, NITECHSPARK"
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
                                        Author: Nithyananthan Nagarajan (Founder & CEO)
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

                    {/* 2. PUBLISH PROJECT */}
                    {activeTab === "publish-project" && (
                        <div className="space-y-8">
                            <div className="max-w-4xl glass-panel p-6 sm:p-8 rounded-2xl border border-sky-500/30 bg-panel/70">
                                <div className="flex items-center gap-2 mb-4">
                                    <FolderGit2 size={20} className="text-sky-400" />
                                    <h2 className="font-orbitron font-bold text-lg text-white">
                                        PUBLISH SELECTED ENGINEERING PROJECT
                                    </h2>
                                </div>
                                <p className="text-xs text-text-primary/60 mb-6">
                                    Deploy engineering projects directly to the portfolio's live showcase and /work page. Upload screenshots or architecture diagrams, specify problem statements, technical implementations, and stack.
                                </p>

                                <form onSubmit={submitProject} className="space-y-5">
                                    {/* Project Name */}
                                    <div>
                                        <label className="block text-xs font-mono text-sky-400 mb-1">
                                            PROJECT NAME / TITLE: *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={projectName}
                                            onChange={(e) => setProjectName(e.target.value)}
                                            placeholder="e.g. Sentriya — Autonomous Drone Fleet Dispatch Platform"
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-sky-400"
                                        />
                                    </div>

                                    {/* Focus, Status & Tech Stack */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-mono text-sky-400 mb-1">
                                                ENGINEERING FOCUS:
                                            </label>
                                            <select
                                                value={projectFocus}
                                                onChange={(e) => setProjectFocus(e.target.value)}
                                                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-sky-400"
                                            >
                                                <option value="Full Stack">Full Stack</option>
                                                <option value="Infrastructure Automation">Infrastructure Automation</option>
                                                <option value="Cybersecurity">Cybersecurity</option>
                                                <option value="AIOps">AIOps</option>
                                                <option value="Monitoring">Monitoring</option>
                                                <option value="Linux Hardening">Linux Hardening</option>
                                                <option value="Incident Diagnostics">Incident Diagnostics</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-mono text-sky-400 mb-1">
                                                PROJECT STATUS:
                                            </label>
                                            <select
                                                value={projectStatus}
                                                onChange={(e) => setProjectStatus(e.target.value)}
                                                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-sky-400"
                                            >
                                                <option value="Completed">Completed</option>
                                                <option value="Live">Live</option>
                                                <option value="Beta">Beta</option>
                                                <option value="Pilot">Pilot</option>
                                                <option value="In Development">In Development</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-mono text-sky-400 mb-1">
                                                TECH STACK (COMMA SEPARATED):
                                            </label>
                                            <input
                                                type="text"
                                                value={projectTechStack}
                                                onChange={(e) => setProjectTechStack(e.target.value)}
                                                placeholder="Next.js, TypeScript, Docker, Linux"
                                                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-sky-400"
                                            />
                                        </div>
                                    </div>

                                    {/* IMAGE UPLOAD SECTION */}
                                    <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-950/20 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-mono text-sky-300 font-semibold flex items-center gap-1.5">
                                                <ImageIcon size={14} className="text-sky-400" />
                                                <span>PROJECT IMAGES &amp; SCREENSHOTS ({projectImages.length} attached):</span>
                                            </label>
                                            <span className="text-[10px] font-mono text-slate-400">
                                                Batch Upload Supported · PNG, JPG, WEBP, SVG
                                            </span>
                                        </div>

                                        {/* Upload Dropzone with Multiple selection */}
                                        <div className="relative border-2 border-dashed border-sky-500/30 hover:border-sky-400/60 rounded-xl p-5 transition-colors bg-black/30 flex flex-col items-center justify-center text-center group cursor-pointer">
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                disabled={uploadingImage}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                                            />
                                            <div className="flex flex-col items-center gap-2 pointer-events-none">
                                                <div className="w-12 h-12 rounded-full bg-sky-500/10 border border-sky-500/30 group-hover:scale-110 group-hover:border-sky-400 flex items-center justify-center text-sky-400 transition-all">
                                                    {uploadingImage ? (
                                                        <RefreshCw size={20} className="animate-spin" />
                                                    ) : (
                                                        <Upload size={20} />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-xs text-white font-mono font-medium">
                                                        {uploadingImage
                                                            ? "Uploading multiple images to server..."
                                                            : "Click or Drag & Drop multiple images here"}
                                                    </p>
                                                    <p className="text-[10px] text-sky-400/80 font-mono mt-0.5">
                                                        Select all screenshots at once (PNG, JPG, WEBP up to 15MB each)
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {uploadError && (
                                            <p className="text-xs text-rose-400 font-mono flex items-center gap-1">
                                                <AlertCircle size={13} /> {uploadError}
                                            </p>
                                        )}

                                        {/* Image Gallery Grid Preview */}
                                        {projectImages.length > 0 && (
                                            <div className="space-y-2 pt-2 border-t border-sky-500/20">
                                                <div className="flex items-center justify-between text-xs font-mono">
                                                    <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                                                        <span>Attached Images</span>
                                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300">
                                                            {projectImages.length}
                                                        </span>
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => setProjectImages([])}
                                                        className="text-[10px] text-rose-400 hover:text-rose-300 underline"
                                                    >
                                                        Clear All Images
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                                    {projectImages.map((imgUrl, idx) => (
                                                        <div
                                                            key={`${imgUrl}-${idx}`}
                                                            className={`relative rounded-xl overflow-hidden border bg-black/60 group p-1.5 flex flex-col justify-between ${
                                                                idx === 0
                                                                    ? "border-emerald-500/60 shadow-md shadow-emerald-500/10"
                                                                    : "border-slate-800 hover:border-sky-500/40"
                                                            }`}
                                                        >
                                                            <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-950 relative">
                                                                <img
                                                                    src={imgUrl}
                                                                    alt={`Upload ${idx + 1}`}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                                {idx === 0 && (
                                                                    <div className="absolute top-1 left-1 bg-emerald-500 text-black text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shadow">
                                                                        COVER
                                                                    </div>
                                                                )}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveImage(idx)}
                                                                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-500/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors shadow"
                                                                    title="Remove image"
                                                                >
                                                                    <X size={11} />
                                                                </button>
                                                            </div>

                                                            <div className="pt-1.5 flex items-center justify-between text-[10px] font-mono">
                                                                <span className="text-slate-400">
                                                                    #{idx + 1}
                                                                </span>
                                                                {idx !== 0 && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleSetCoverImage(idx)}
                                                                        className="text-sky-400 hover:text-white transition-colors"
                                                                        title="Make this the primary cover image"
                                                                    >
                                                                        Set Cover
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Direct / External URL bulk input */}
                                        <div className="pt-2 border-t border-sky-500/15">
                                            <label className="block text-[11px] font-mono text-slate-400 mb-1">
                                                Or paste external image URLs (comma or newline separated):
                                            </label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={manualImageUrl}
                                                    onChange={(e) => setManualImageUrl(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            handleAddManualImageUrl();
                                                        }
                                                    }}
                                                    placeholder="https://... or /uploads/..."
                                                    className="flex-1 px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-sky-400"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleAddManualImageUrl}
                                                    className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 text-xs font-mono transition-colors"
                                                >
                                                    Add URL
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Problem Statement */}
                                    <div>
                                        <label className="block text-xs font-mono text-sky-400 mb-1">
                                            PROBLEM STATEMENT: *
                                        </label>
                                        <textarea
                                            rows={3}
                                            required
                                            value={projectProblem}
                                            onChange={(e) => setProjectProblem(e.target.value)}
                                            placeholder="What specific engineering limitation, vulnerability, or operational pain point does this address?"
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-sky-400"
                                        />
                                    </div>

                                    {/* What I Built */}
                                    <div>
                                        <label className="block text-xs font-mono text-sky-400 mb-1">
                                            WHAT I BUILT / ARCHITECTURE DETAILS: *
                                        </label>
                                        <textarea
                                            rows={4}
                                            required
                                            value={projectWhatIBuilt}
                                            onChange={(e) => setProjectWhatIBuilt(e.target.value)}
                                            placeholder="Engineered low-level packet filters, configured automated alerts, designed high-throughput pipelines..."
                                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-sky-400"
                                        />
                                    </div>

                                    {/* URLs: GitHub & Live Demo */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-mono text-sky-400 mb-1">
                                                GITHUB REPOSITORY URL (OPTIONAL):
                                            </label>
                                            <input
                                                type="url"
                                                value={projectGithubUrl}
                                                onChange={(e) => setProjectGithubUrl(e.target.value)}
                                                placeholder="https://github.com/nithyananthantechy/..."
                                                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-sky-400"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-mono text-sky-400 mb-1">
                                                LIVE DEMO URL (OPTIONAL):
                                            </label>
                                            <input
                                                type="url"
                                                value={projectDemoUrl}
                                                onChange={(e) => setProjectDemoUrl(e.target.value)}
                                                placeholder="https://myproject.nitechspark.site"
                                                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-sky-400"
                                            />
                                        </div>
                                    </div>

                                    {/* Confidentiality / Private Work */}
                                    <div className="p-3.5 rounded-xl border border-white/10 bg-black/40 space-y-2">
                                        <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
                                            <input
                                                type="checkbox"
                                                checked={projectIsPrivate}
                                                onChange={(e) => setProjectIsPrivate(e.target.checked)}
                                                className="rounded bg-black border-slate-700 text-sky-500 focus:ring-sky-500"
                                            />
                                            <span>Mark as Confidential / Private Engineering Project (Hides code links)</span>
                                        </label>
                                        {projectIsPrivate && (
                                            <input
                                                type="text"
                                                value={projectPrivateNote}
                                                onChange={(e) => setProjectPrivateNote(e.target.value)}
                                                placeholder="e.g. Built as part of professional infrastructure engineering work under NDA."
                                                className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-amber-500/30 text-amber-200 text-xs font-mono focus:outline-none focus:border-amber-400"
                                            />
                                        )}
                                    </div>

                                    {/* Action Bar */}
                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <span className="text-xs font-mono text-text-primary/40">
                                            Visible in Live Portfolio &amp; /work instantly
                                        </span>

                                        <button
                                            type="submit"
                                            disabled={projectPublishing}
                                            className="btn-cyber px-6 py-2.5 text-xs flex items-center gap-2 font-bold bg-sky-500/20 border-sky-400 text-sky-300 hover:bg-sky-500/30"
                                        >
                                            {projectSuccess ? <Check size={14} /> : <Plus size={14} />}
                                            <span>
                                                {projectSuccess
                                                    ? "PROJECT PUBLISHED LIVE!"
                                                    : projectPublishing
                                                    ? "TRANSMITTING..."
                                                    : "PUBLISH PROJECT TO PORTFOLIO"}
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* CURRENTLY ACTIVE PROJECTS FEED */}
                            <div className="max-w-4xl glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 bg-panel/70">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={18} className="text-sky-400" />
                                        <h3 className="font-orbitron font-bold text-base text-white">
                                            ACTIVE PORTFOLIO PROJECTS ({publishedProjects.length})
                                        </h3>
                                    </div>
                                    <button
                                        onClick={loadData}
                                        className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5"
                                    >
                                        <RefreshCw size={12} />
                                        <span>Sync</span>
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {publishedProjects.map((p) => (
                                        <div
                                            key={p.id}
                                            className="p-4 rounded-xl border border-slate-800 bg-black/50 flex flex-col justify-between"
                                        >
                                            <div>
                                                <div className="flex items-center justify-between gap-2 mb-2">
                                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-300">
                                                        {p.engineeringFocus}
                                                    </span>
                                                    <span className="text-[10px] font-mono text-slate-400">
                                                        {p.status}
                                                    </span>
                                                </div>
                                                {(p.image || (p.images && p.images.length > 0)) && (
                                                    <div className="w-full h-24 mb-2 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 relative">
                                                        <img
                                                            src={p.image || p.images?.[0]}
                                                            alt={p.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        {p.images && p.images.length > 1 && (
                                                            <div className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-sm border border-white/20 text-white text-[9px] font-mono px-1.5 py-0.5 rounded flex items-center gap-1">
                                                                <ImageIcon size={10} />
                                                                <span>{p.images.length} photos</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                                <h4 className="font-orbitron text-sm font-bold text-white mb-1">
                                                    {p.name}
                                                </h4>
                                                <p className="text-xs text-slate-300 line-clamp-2 mb-3">
                                                    {p.problem}
                                                </p>
                                            </div>

                                            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                                                <span className="text-[10px] font-mono text-slate-500 truncate max-w-[180px]">
                                                    {Array.isArray(p.techStack) ? p.techStack.join(", ") : p.techStack}
                                                </span>
                                                <button
                                                    onClick={() => handleDeleteProject(p.id)}
                                                    className="text-slate-400 hover:text-rose-400 p-1.5 rounded transition-colors"
                                                    title="Remove project"
                                                >
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3. PUBLISH PROJECT PAPER / WHITEPAPER */}
                    {activeTab === "publish-paper" && (
                        <div className="max-w-3xl glass-panel p-6 sm:p-8 rounded-2xl border border-gold/30 bg-panel/70">
                            <div className="flex items-center gap-2 mb-4">
                                <FileText size={18} className="text-gold" />
                                <h2 className="font-orbitron font-bold text-lg text-white">
                                    PUBLISH PROJECT PAPER & TECHNICAL WHITEPAPER
                                </h2>
                            </div>
                            <p className="text-xs text-text-primary/60 mb-6">
                                Publish research papers, RFCs, and engineering specifications under NITECHSPARK Research Core.
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
                                            placeholder="e.g. NS-TR-2026-05"
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
                                        Directorate: NITECHSPARK Research Core
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
                                Broadcast real-time CVE alerts, kernel updates, or NITECHSPARK business and market milestones.
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
                                            <option value="NITECHSPARK BUSINESS & MARKET WIRE">NITECHSPARK BUSINESS & MARKET WIRE</option>
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
                                    VENTURES GOVERNED
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
