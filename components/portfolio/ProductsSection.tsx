"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { productCount, type Product } from "@/lib/siteData";

const CATEGORIES = ["ALL", "CYBERSECURITY & SRE", "AI & TALENT ATS", "ENTERPRISE & SAFETY APPS"] as const;

/** Product fleet with client-side filter; count is always computed from the data array. */
export default function ProductsSection({ products }: { products: Product[] }) {
    const [filter, setFilter] = useState<string>("ALL");
    const filtered = products.filter((p) => filter === "ALL" || p.category === filter);

    return (
        <section id="products" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-sky-400" />
                            <span className="text-xs font-mono text-sky-400 tracking-widest uppercase font-semibold">
                                APPLICATIONS & PLATFORMS
                            </span>
                        </div>
                        <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                            PRODUCT FLEET
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm font-mono mt-3">
                            {">"} {productCount} applications engineered across cybersecurity, AI and enterprise — count computed from the live product list.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setFilter(tab)}
                                aria-pressed={filter === tab}
                                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                                    filter === tab
                                        ? "bg-white text-slate-950 font-semibold shadow-sm"
                                        : "border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map((p, i) => (
                        <ProductCard key={p.name} {...p} index={i} />
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <a
                        href="/work"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-mono tracking-wider uppercase transition-all font-semibold"
                    >
                        See product work, problem → solution → status →
                    </a>
                </div>
            </div>
        </section>
    );
}
