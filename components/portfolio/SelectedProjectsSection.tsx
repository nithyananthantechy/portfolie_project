"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { selectedEngineeringProjects, EngineeringProject } from "@/lib/siteData";
import {
    ArrowUpRight,
    Github,
    ExternalLink,
    ShieldCheck,
    Lock,
    Image as ImageIcon,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    Trash2,
    CheckCircle2,
    AlertCircle,
    X,
    Maximize2,
    Edit3,
} from "lucide-react";

export default function SelectedProjectsSection() {
    const [projects, setProjects] = useState<EngineeringProject[]>(selectedEngineeringProjects);
    const [activeImageIndices, setActiveImageIndices] = useState<Record<string, number>>({});
    const [expandedProblems, setExpandedProblems] = useState<Record<string, boolean>>({});
    const [expandedBuilt, setExpandedBuilt] = useState<Record<string, boolean>>({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [statusToast, setStatusToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

    // Fullscreen Image Lightbox state
    const [lightbox, setLightbox] = useState<{
        projectId: string;
        title: string;
        images: string[];
        currentIndex: number;
    } | null>(null);

    useEffect(() => {
        // Check if admin is logged in
        fetch("/api/auth/me")
            .then((r) => r.json())
            .then((res) => {
                if (res.success && res.user?.role === "ADMIN") {
                    setIsAdmin(true);
                }
            })
            .catch(() => {});

        // 1. Instant hydration from localStorage, excluding tombstones
        try {
            const deleted = new Set(JSON.parse(localStorage.getItem("nn_deleted_projects") || "[]"));
            const localSaved = JSON.parse(localStorage.getItem("nn_custom_projects") || "[]");
            if (Array.isArray(localSaved) && localSaved.length > 0) {
                setProjects((prev) => {
                    const ids = new Set(localSaved.map((p: any) => p.id));
                    const merged = [...localSaved, ...prev.filter((p) => !ids.has(p.id))];
                    return merged.filter((p) => !deleted.has(p.id));
                });
            } else {
                setProjects((prev) => prev.filter((p) => !deleted.has(p.id)));
            }
        } catch {}

        // 2. Fresh live fetch with cache-busting
        fetch(`/api/admin/publish?t=${Date.now()}`, { cache: "no-store" })
            .then((res) => res.json())
            .then((data) => {
                if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
                    const deleted = new Set(JSON.parse(localStorage.getItem("nn_deleted_projects") || "[]"));
                    const filtered = data.projects.filter((p: EngineeringProject) => !deleted.has(p.id));
                    setProjects(filtered);
                    try {
                        const customOnes = filtered.filter(
                            (p: EngineeringProject) => !selectedEngineeringProjects.some((orig) => orig.id === p.id)
                        );
                        localStorage.setItem("nn_custom_projects", JSON.stringify(customOnes));
                    } catch {}
                }
            })
            .catch(() => {});
    }, []);

    // Handle Lightbox keyboard shortcuts
    const handleLightboxNext = useCallback(() => {
        if (!lightbox) return;
        setLightbox((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                currentIndex: (prev.currentIndex + 1) % prev.images.length,
            };
        });
    }, [lightbox]);

    const handleLightboxPrev = useCallback(() => {
        if (!lightbox) return;
        setLightbox((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
            };
        });
    }, [lightbox]);

    useEffect(() => {
        if (!lightbox) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightbox(null);
            if (e.key === "ArrowRight") handleLightboxNext();
            if (e.key === "ArrowLeft") handleLightboxPrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightbox, handleLightboxNext, handleLightboxPrev]);

    const handleDeleteLiveProject = async (project: EngineeringProject) => {
        const confirmed = window.confirm(
            `Are you sure you want to permanently delete "${project.name}" from the live portfolio?`
        );
        if (!confirmed) return;

        setDeletingId(project.id);
        try {
            const res = await fetch(`/api/admin/publish?type=project&id=${project.id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success) {
                setProjects((prev) => prev.filter((p) => p.id !== project.id));

                try {
                    const localSaved = JSON.parse(localStorage.getItem("nn_custom_projects") || "[]");
                    const updated = localSaved.filter((p: any) => p.id !== project.id);
                    localStorage.setItem("nn_custom_projects", JSON.stringify(updated));

                    const deleted = JSON.parse(localStorage.getItem("nn_deleted_projects") || "[]");
                    if (!deleted.includes(project.id)) {
                        deleted.push(project.id);
                        localStorage.setItem("nn_deleted_projects", JSON.stringify(deleted));
                    }
                } catch {}

                setStatusToast({
                    type: "success",
                    message: `Project "${project.name}" was permanently removed from live portfolio.`,
                });
            } else {
                setStatusToast({
                    type: "error",
                    message: data.error || "Failed to delete project. Please make sure you are logged in as admin.",
                });
            }
        } catch (err: any) {
            setStatusToast({
                type: "error",
                message: err.message || "Network error while deleting project.",
            });
        } finally {
            setDeletingId(null);
            setTimeout(() => setStatusToast(null), 4000);
        }
    };

    return (
        <section id="projects" className="py-20 px-4 border-t border-slate-800/80">
            <div className="max-w-6xl mx-auto">
                {/* Status Toast */}
                <AnimatePresence>
                    {statusToast && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`mb-6 p-4 rounded-xl border flex items-center justify-between text-xs font-mono shadow-xl ${
                                statusToast.type === "success"
                                    ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                                    : "bg-rose-950/80 border-rose-500/40 text-rose-300"
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                {statusToast.type === "success" ? (
                                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                                ) : (
                                    <AlertCircle size={16} className="text-rose-400 shrink-0" />
                                )}
                                <span>{statusToast.message}</span>
                            </div>
                            <button
                                onClick={() => setStatusToast(null)}
                                className="text-slate-400 hover:text-white ml-3"
                            >
                                <X size={14} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Header */}
                <div className="mb-12 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-sky-400" />
                            <span className="text-xs font-mono text-sky-400 tracking-widest uppercase font-semibold">
                                CODE &amp; IMPLEMENTATION
                            </span>
                        </div>

                        {isAdmin && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[10px] font-mono">
                                <ShieldCheck size={11} className="text-rose-400" />
                                <span>FOUNDER ADMIN CONTROLS ACTIVE</span>
                            </span>
                        )}
                    </div>

                    <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                        SELECTED ENGINEERING PROJECTS
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-mono mt-3 max-w-3xl">
                        {">"} Curated engineering projects demonstrating real-world technical depth across AIOps, Linux server hardening, monitoring, and infrastructure automation.
                    </p>
                </div>

                {/* Project Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {projects.map((project, idx) => {
                        const allImages = project.images && project.images.length > 0
                            ? project.images
                            : project.image
                            ? [project.image]
                            : [];
                        const activeIdx = activeImageIndices[project.id] || 0;
                        const currentImg = allImages[activeIdx] || allImages[0];

                        const isProblemLong = (project.problem || "").length > 220;
                        const isProblemExpanded = Boolean(expandedProblems[project.id]);

                        const isBuiltLong = (project.whatIBuilt || "").length > 220;
                        const isBuiltExpanded = Boolean(expandedBuilt[project.id]);

                        return (
                            <motion.article
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: (idx % 4) * 0.1 }}
                                className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-800/90 hover:border-sky-500/40 transition-all duration-300 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between"
                                style={{ background: "rgba(15, 23, 42, 0.7)" }}
                            >
                                {/* Card Header: Focus Badge + Status + Admin Controls */}
                                <div>
                                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/30 text-sky-300 uppercase tracking-wider font-semibold">
                                                {project.engineeringFocus}
                                            </span>
                                            <span
                                                className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${
                                                    project.status === "Live"
                                                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                                                        : project.status === "Completed"
                                                        ? "bg-blue-500/10 border-blue-500/30 text-blue-300"
                                                        : "bg-amber-500/10 border-amber-500/30 text-amber-300"
                                                }`}
                                            >
                                                {project.status}
                                            </span>
                                        </div>

                                        {isAdmin && (
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/admin/dashboard?tab=publish-project&editId=${project.id}`}
                                                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono text-sky-300 hover:text-white bg-sky-950/80 hover:bg-sky-900 border border-sky-500/40 hover:border-sky-400 rounded-md transition-all shadow-sm"
                                                    title={`Edit "${project.name}" in Founder Studio`}
                                                >
                                                    <Edit3 size={11} className="text-sky-400" />
                                                    <span>EDIT</span>
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteLiveProject(project);
                                                    }}
                                                    disabled={deletingId === project.id}
                                                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono text-rose-300 hover:text-white bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 hover:border-rose-400 rounded-md transition-all shadow-sm group/del cursor-pointer"
                                                    title={`Permanently delete "${project.name}" from live portfolio`}
                                                >
                                                    <Trash2 size={11} className="text-rose-400 group-hover/del:text-rose-200" />
                                                    <span>{deletingId === project.id ? "DELETING..." : "DELETE"}</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Multi-Image Gallery / Carousel with Fullscreen View Trigger */}
                                    {allImages.length > 0 && (
                                        <div className="mb-4">
                                            <div
                                                onClick={() => {
                                                    setLightbox({
                                                        projectId: project.id,
                                                        title: project.name,
                                                        images: allImages,
                                                        currentIndex: activeIdx,
                                                    });
                                                }}
                                                className="rounded-xl overflow-hidden border border-slate-700/60 bg-black/40 relative aspect-video max-h-56 group/img shadow-lg cursor-zoom-in"
                                                title="Click to view full image in high resolution"
                                            >
                                                <img
                                                    src={currentImg}
                                                    alt={`${project.name} image ${activeIdx + 1}`}
                                                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                                                {/* Fullscreen Expand Badge in Top-Right */}
                                                <div className="absolute top-2.5 right-2.5 bg-black/80 hover:bg-black/95 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono px-2 py-1 rounded-md flex items-center gap-1.5 opacity-85 group-hover/img:opacity-100 transition-opacity shadow-md z-10">
                                                    <Maximize2 size={11} className="text-sky-400" />
                                                    <span>View Full Image</span>
                                                </div>

                                                {/* Left/Right controls if >1 image */}
                                                {allImages.length > 1 && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setActiveImageIndices((prev) => ({
                                                                    ...prev,
                                                                    [project.id]: (activeIdx - 1 + allImages.length) % allImages.length,
                                                                }));
                                                            }}
                                                            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity backdrop-blur-sm border border-white/20 z-10"
                                                            title="Previous image"
                                                        >
                                                            <ChevronLeft size={16} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setActiveImageIndices((prev) => ({
                                                                    ...prev,
                                                                    [project.id]: (activeIdx + 1) % allImages.length,
                                                                }));
                                                            }}
                                                            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity backdrop-blur-sm border border-white/20 z-10"
                                                            title="Next image"
                                                        >
                                                            <ChevronRight size={16} />
                                                        </button>

                                                        {/* Image Counter Badge */}
                                                        <div className="absolute bottom-2.5 right-2.5 bg-black/85 backdrop-blur-sm border border-white/20 text-white text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1.5 shadow-md z-10">
                                                            <ImageIcon size={11} className="text-sky-400" />
                                                            <span>{activeIdx + 1} / {allImages.length}</span>
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                            {/* Thumbnail preview strip if >1 image */}
                                            {allImages.length > 1 && (
                                                <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1 scrollbar-thin">
                                                    {allImages.map((thumbUrl, tIdx) => (
                                                        <button
                                                            key={tIdx}
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setActiveImageIndices((prev) => ({
                                                                    ...prev,
                                                                    [project.id]: tIdx,
                                                                }));
                                                            }}
                                                            className={`relative rounded-md overflow-hidden border w-12 h-9 flex-shrink-0 transition-all ${
                                                                activeIdx === tIdx
                                                                    ? "border-sky-400 ring-2 ring-sky-500/50 scale-105"
                                                                    : "border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600"
                                                            }`}
                                                        >
                                                            <img
                                                                src={thumbUrl}
                                                                alt={`thumbnail ${tIdx + 1}`}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Project Name */}
                                    <h3 className="font-orbitron text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                                        {project.name}
                                    </h3>

                                    {/* Problem Statement with Expand/Collapse for Long Content */}
                                    <div className="mb-4">
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 block mb-1 font-semibold">
                                            The Engineering Challenge:
                                        </span>
                                        <div
                                            className={`relative transition-all duration-300 ${
                                                isProblemLong && !isProblemExpanded
                                                    ? "max-h-24 overflow-hidden"
                                                    : "max-h-none"
                                            }`}
                                        >
                                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                                                {project.problem}
                                            </p>
                                            {isProblemLong && !isProblemExpanded && (
                                                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[rgba(15,23,42,0.95)] to-transparent pointer-events-none" />
                                            )}
                                        </div>
                                        {isProblemLong && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setExpandedProblems((prev) => ({
                                                        ...prev,
                                                        [project.id]: !prev[project.id],
                                                    }))
                                                }
                                                className="mt-1 text-[11px] font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1 font-semibold transition-colors"
                                            >
                                                <span>{isProblemExpanded ? "Show Less" : "Read Full Challenge"}</span>
                                                {isProblemExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                            </button>
                                        )}
                                    </div>

                                    {/* What I Built with Expand/Collapse for Long Content */}
                                    <div className="mb-5">
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 block mb-1 font-semibold">
                                            What I Built:
                                        </span>
                                        <div
                                            className={`relative transition-all duration-300 ${
                                                isBuiltLong && !isBuiltExpanded
                                                    ? "max-h-24 overflow-hidden"
                                                    : "max-h-none"
                                            }`}
                                        >
                                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                                                {project.whatIBuilt}
                                            </p>
                                            {isBuiltLong && !isBuiltExpanded && (
                                                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[rgba(15,23,42,0.95)] to-transparent pointer-events-none" />
                                            )}
                                        </div>
                                        {isBuiltLong && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setExpandedBuilt((prev) => ({
                                                        ...prev,
                                                        [project.id]: !prev[project.id],
                                                    }))
                                                }
                                                className="mt-1 text-[11px] font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1 font-semibold transition-colors"
                                            >
                                                <span>{isBuiltExpanded ? "Show Less" : "Read Full Overview"}</span>
                                                {isBuiltExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                            </button>
                                        )}
                                    </div>

                                    {/* Tech Stack Badges */}
                                    <div className="mb-6">
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                                            Tech Stack:
                                        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.techStack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="text-[11px] font-mono px-2 py-0.5 rounded border border-slate-800 bg-slate-900/80 text-slate-300"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer: Links & Safety */}
                                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                                    {project.isPrivate ? (
                                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                                            <Lock size={13} className="text-amber-400" />
                                            <span>{project.privateNote || "Private Engineering Work"}</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap items-center gap-4">
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                                                >
                                                    <Github size={14} />
                                                    <span>GitHub Repository</span>
                                                    <ArrowUpRight size={12} />
                                                </a>
                                            )}
                                            {project.demoUrl && (
                                                <a
                                                    href={project.demoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors"
                                                >
                                                    <ExternalLink size={14} />
                                                    <span>Live Demo</span>
                                                    <ArrowUpRight size={12} />
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>

            {/* FULLSCREEN LIGHTBOX MODAL */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6"
                        onClick={() => setLightbox(null)}
                    >
                        {/* Top Bar: Title, Counter & Close */}
                        <div
                            className="flex items-center justify-between w-full max-w-7xl mx-auto z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-3">
                                <span className="font-orbitron font-bold text-white text-base sm:text-lg">
                                    {lightbox.title}
                                </span>
                                <span className="text-xs font-mono text-sky-400 px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30">
                                    Screenshot {lightbox.currentIndex + 1} of {lightbox.images.length}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                                    Use Arrow keys or Esc
                                </span>
                                <button
                                    onClick={() => setLightbox(null)}
                                    className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-all cursor-pointer"
                                    title="Close fullscreen view (Esc)"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Middle: Full Image with Prev/Next buttons */}
                        <div
                            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={lightbox.images[lightbox.currentIndex]}
                                alt={`${lightbox.title} full view`}
                                className="max-h-[78vh] max-w-[94vw] w-auto h-auto object-contain rounded-xl shadow-2xl border border-white/10"
                            />

                            {lightbox.images.length > 1 && (
                                <>
                                    <button
                                        onClick={handleLightboxPrev}
                                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all shadow-xl hover:scale-110 cursor-pointer"
                                        title="Previous image (Left Arrow)"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>

                                    <button
                                        onClick={handleLightboxNext}
                                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all shadow-xl hover:scale-110 cursor-pointer"
                                        title="Next image (Right Arrow)"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Bottom: Thumbnail Strip */}
                        {lightbox.images.length > 1 && (
                            <div
                                className="w-full max-w-4xl mx-auto flex items-center justify-center gap-2 overflow-x-auto py-2 z-10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {lightbox.images.map((imgUrl, thumbIdx) => (
                                    <button
                                        key={thumbIdx}
                                        onClick={() =>
                                            setLightbox((prev) => (prev ? { ...prev, currentIndex: thumbIdx } : null))
                                        }
                                        className={`w-16 h-12 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
                                            lightbox.currentIndex === thumbIdx
                                                ? "border-sky-400 scale-105 shadow-md shadow-sky-500/20"
                                                : "border-slate-800 opacity-50 hover:opacity-100"
                                        }`}
                                    >
                                        <img src={imgUrl} alt={`thumb ${thumbIdx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
