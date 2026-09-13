"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Search, BookOpen, Clock, PenTool } from "lucide-react";
import MatrixBackground from "@/components/MatrixBackground";
import InteractiveCyberCanvas from "@/components/InteractiveCyberCanvas";
import DraggableAiWidget from "@/components/DraggableAiWidget";
import { blogPosts, BlogPost } from "@/lib/blogData";

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("ALL");

    useEffect(() => {
        fetch("/api/admin/publish")
            .then((res) => res.json())
            .then((data) => {
                if (data.success && Array.isArray(data.blogs)) {
                    setPosts(data.blogs);
                }
            })
            .catch(() => {});
    }, []);

    const categories = ["ALL", "EMPIRE & LEADERSHIP", "CYBERSECURITY", "LINUX SRE & DEVOPS", "AI ENGINEERING"];

    const filtered = posts.filter((p) => {
        const matchesCat = category === "ALL" || p.category === category;
        const matchesSearch =
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCat && matchesSearch;
    });

    return (
        <main className="min-h-screen relative overflow-hidden font-rajdhani pb-24" style={{ background: "var(--bg)" }}>
            <MatrixBackground />
            <InteractiveCyberCanvas />
            <DraggableAiWidget />

            {/* Top Navigation */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pt-8 flex items-center justify-between">
                <Link
                    href="/#blog"
                    className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60"
                >
                    <ArrowLeft size={14} />
                    <span>RETURN TO PORTFOLIO</span>
                </Link>

                {/* Founder Studio link */}
                <Link
                    href="/admin/login"
                    className="inline-flex items-center gap-2 text-xs font-mono text-slate-200 border border-slate-700 bg-slate-900/80 hover:bg-slate-800 hover:text-white px-3.5 py-1.5 rounded-lg transition-all font-semibold shadow-sm"
                >
                    <PenTool size={13} className="text-sky-400" />
                    <span>FOUNDER STUDIO</span>
                </Link>
            </div>

            {/* Header */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 mb-3">
                    <BookOpen size={12} className="text-sky-400" />
                    <span className="font-mono text-[11px] text-sky-300 tracking-[0.2em] uppercase font-semibold">
                        EXECUTIVE BLOG ARCHIVE // STRATEGIC ESSAYS
                    </span>
                </div>

                <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-black text-white section-heading tracking-wide">
                    CHAIRMAN & MD DISPATCHES
                </h1>

                <p className="mt-4 text-xs sm:text-sm text-slate-300 max-w-3xl mx-auto font-sans">
                    Articles, technical post-mortems, and executive blueprints on enterprise infrastructure,
                    AI ATS architectures, and sovereign venture building by <strong>Nithyananthan Nagarajan</strong>.
                </p>

                {/* Search */}
                <div className="mt-8 max-w-2xl mx-auto">
                    <div className="relative">
                        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search essays by keyword, topic, or technology..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700/80 bg-slate-900/90 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                        />
                    </div>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`text-[11px] font-mono px-3.5 py-1.5 rounded-lg border transition-all ${
                                category === cat
                                    ? "bg-white text-slate-950 border-white font-semibold shadow-sm"
                                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Articles Grid */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filtered.map((post) => (
                    <article
                        key={post.id}
                        className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-sky-500/40 transition-all flex flex-col justify-between"
                        style={{ background: "rgba(15, 23, 42, 0.65)" }}
                    >
                        <div>
                            <div className="flex items-center justify-between mb-3 text-xs font-mono">
                                <span className="px-2.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/25 text-sky-400 font-semibold text-[10px]">
                                    {post.category}
                                </span>
                                <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                                    <Clock size={12} />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>

                            <Link href={`/blog/${post.slug}`}>
                                <h2 className="font-orbitron font-bold text-base text-white hover:text-sky-300 transition-colors leading-snug mb-3">
                                    {post.title}
                                </h2>
                            </Link>

                            <p className="text-xs text-slate-300 leading-relaxed font-sans mb-5">
                                {post.excerpt}
                            </p>
                        </div>

                        <div>
                            <div className="flex flex-wrap gap-1 mb-4">
                                {post.tags.slice(0, 3).map((t) => (
                                    <span
                                        key={t}
                                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                                    >
                                        #{t}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                                <span className="text-slate-500 text-[11px]">{post.date}</span>
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="text-sky-400 hover:text-white transition-colors font-semibold text-[11px]"
                                >
                                    READ FULL ESSAY →
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}
