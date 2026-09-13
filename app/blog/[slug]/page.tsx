"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Tag } from "lucide-react";
import MatrixBackground from "@/components/MatrixBackground";
import InteractiveCyberCanvas from "@/components/InteractiveCyberCanvas";
import DraggableAiWidget from "@/components/DraggableAiWidget";
import { blogPosts } from "@/lib/blogData";

export default function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];

    return (
        <main className="min-h-screen relative overflow-hidden font-rajdhani pb-24" style={{ background: "var(--bg)" }}>
            <MatrixBackground />
            <InteractiveCyberCanvas />
            <DraggableAiWidget />

            {/* Nav */}
            <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 pt-8 flex items-center justify-between">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60"
                >
                    <ArrowLeft size={14} />
                    <span>BACK TO ESSAYS</span>
                </Link>

                <div className="text-xs font-mono text-sky-400">
                    {post.category}
                </div>
            </div>

            {/* Article Container */}
            <article className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-12">
                <div
                    className="glass-panel p-6 sm:p-12 rounded-3xl border border-slate-800/80"
                    style={{ background: "rgba(15, 23, 42, 0.7)" }}
                >
                    {/* Eyebrow */}
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-4">
                        <span className="px-2.5 py-0.5 rounded bg-sky-500/15 border border-sky-500/30 text-sky-400 font-semibold">
                            {post.category}
                        </span>
                        <span className="text-slate-500">{post.date}</span>
                        <span className="text-slate-500">· {post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h1 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                        {post.title}
                    </h1>

                    {/* Excerpt Lead */}
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans italic pb-6 border-b border-slate-800">
                        "{post.excerpt}"
                    </p>

                    {/* Author Box */}
                    <div className="flex items-center gap-4 py-6 border-b border-slate-800 mb-8">
                        <div className="w-12 h-12 rounded-xl border border-sky-500/30 bg-sky-500/10 flex items-center justify-center text-sky-400 font-bold font-orbitron text-lg">
                            NN
                        </div>
                        <div>
                            <div className="font-orbitron font-bold text-sm text-white">
                                {post.author.name}
                            </div>
                            <div className="text-xs font-mono text-slate-400">
                                {post.author.role}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed font-sans space-y-6">
                        <div className="whitespace-pre-line leading-loose">
                            {post.content}
                        </div>
                    </div>

                    {/* Tags footer */}
                    <div className="mt-12 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-1.5">
                            {post.tags.map((t) => (
                                <span
                                    key={t}
                                    className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400"
                                >
                                    #{t}
                                </span>
                            ))}
                        </div>

                        <Link
                            href="/blog"
                            className="text-xs font-mono text-sky-400 hover:text-white transition-colors"
                        >
                            ← Return to Dispatches
                        </Link>
                    </div>
                </div>
            </article>
        </main>
    );
}
