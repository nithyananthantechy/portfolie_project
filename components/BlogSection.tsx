"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, Tag, ArrowRight, X, Sparkles, Share2, Check } from "lucide-react";
import Link from "next/link";
import { blogPosts, BlogPost } from "@/lib/blogData";

export default function BlogSection() {
    const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [filter, setFilter] = useState<string>("ALL");
    const [copied, setCopied] = useState(false);

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

    const filtered = posts.filter((post) => {
        if (filter === "ALL") return true;
        return post.category === filter;
    });

    const handleShare = (post: BlogPost) => {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: post.excerpt,
                url: window.location.href,
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(`${window.location.origin}/blog/${post.slug}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <section id="blog" className="py-24 px-4 sm:px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 mb-3">
                        <BookOpen size={12} className="text-sky-400" />
                        <span className="font-mono text-[11px] text-sky-400 tracking-[0.2em] uppercase font-semibold">
                            CHAIRMAN & MD DISPATCHES // THOUGHT LEADERSHIP
                        </span>
                    </div>

                    <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-white section-heading tracking-wide">
                        EXECUTIVE BLOG & TECHNICAL INSIGHTS
                    </h2>

                    <p className="mt-4 text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-sans">
                        In-depth treatises on building conglomerate technology holding structures, autonomous AI evaluation systems,
                        and zero-trust Linux kernel security.
                    </p>

                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-2 mt-8">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`text-[11px] font-mono px-3.5 py-1.5 rounded-lg border transition-all ${
                                    filter === cat
                                        ? "bg-white text-slate-950 border-white font-bold shadow-md"
                                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((post, idx) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.08 }}
                            className="glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between group cursor-pointer"
                            style={{
                                background: "rgba(3, 7, 18, 0.75)",
                                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                            }}
                            onClick={() => setSelectedPost(post)}
                        >
                            <div>
                                {/* Meta info */}
                                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                                    <span className="px-2.5 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-400 font-semibold text-[10px]">
                                        {post.category}
                                    </span>
                                    <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                                        <Clock size={12} />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="font-orbitron font-bold text-base text-white group-hover:text-sky-300 transition-colors leading-snug mb-3">
                                    {post.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-xs text-slate-300 leading-relaxed font-sans mb-5">
                                    {post.excerpt}
                                </p>
                            </div>

                            <div>
                                {/* Tags */}
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {post.tags.slice(0, 3).map((t) => (
                                        <span
                                            key={t}
                                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/60 text-slate-400"
                                        >
                                            #{t}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA Row */}
                                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-sky-400 group-hover:text-white transition-colors">
                                    <span className="text-[11px] font-bold tracking-wider">READ ARTICLE</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* View Full Blog Archive Link */}
                <div className="mt-12 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-mono tracking-wider uppercase transition-all font-semibold"
                    >
                        <span>EXPLORE FULL BLOG & ARTICLES REPOSITORY</span>
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </div>

            {/* Quick Article Reader Modal */}
            <AnimatePresence>
                {selectedPost && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPost(null)}
                            className="fixed inset-0 bg-black/85 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-3xl max-h-[88vh] rounded-2xl flex flex-col z-10 overflow-hidden border shadow-2xl"
                            style={{
                                background: "rgba(3, 7, 18, 0.96)",
                                borderColor: "rgba(255, 255, 255, 0.12)",
                                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
                            }}
                        >
                            {/* Modal Header */}
                            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/40">
                                <div className="flex items-center gap-2 text-xs font-mono">
                                    <span className="px-2.5 py-1 rounded bg-sky-500/15 text-sky-400 border border-sky-500/30 font-semibold">
                                        {selectedPost.category}
                                    </span>
                                    <span className="text-slate-400">{selectedPost.date}</span>
                                    <span className="text-slate-400">· {selectedPost.readTime}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleShare(selectedPost)}
                                        title="Share Article Link"
                                        className="w-8 h-8 rounded-lg border border-slate-700 hover:border-sky-400 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                                    >
                                        {copied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
                                    </button>
                                    <button
                                        onClick={() => setSelectedPost(null)}
                                        className="w-8 h-8 rounded-lg border border-slate-700 hover:border-rose-500 text-slate-400 hover:text-rose-400 flex items-center justify-center transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                                <h1 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                                    {selectedPost.title}
                                </h1>

                                <div className="flex items-center gap-3 py-3 border-y border-slate-800">
                                    <div className="w-9 h-9 rounded-lg border border-sky-500/30 bg-sky-500/10 flex items-center justify-center text-sky-400 font-bold font-orbitron">
                                        NN
                                    </div>
                                    <div>
                                        <div className="text-xs font-orbitron font-bold text-white">
                                            {selectedPost.author.name}
                                        </div>
                                        <div className="text-[11px] font-mono text-slate-400">
                                            {selectedPost.author.role}
                                        </div>
                                    </div>
                                </div>

                                <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed font-sans space-y-4">
                                    <div className="whitespace-pre-line">
                                        {selectedPost.content}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
