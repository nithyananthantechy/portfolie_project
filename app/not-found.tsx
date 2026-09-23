import Link from "next/link";
import type { Metadata } from "next";
import MatrixBackground from "@/components/MatrixBackground";
import { LINKS, PRIMARY_CTA } from "@/lib/siteData";

export const metadata: Metadata = {
    title: "Page not found",
    robots: { index: false, follow: false },
};

export default function NotFound() {
    return (
        <main
            className="min-h-screen flex items-center justify-center px-4 relative"
            style={{ background: "var(--bg)" }}
        >
            <MatrixBackground />
            <div className="relative z-10 text-center max-w-lg">
                <p className="font-mono text-xs text-sky-400 tracking-widest mb-4">ERROR 404 // ROUTE NOT FOUND</p>
                <h1 className="font-orbitron text-4xl sm:text-5xl font-black text-white mb-4">LOST IN THE MATRIX</h1>
                <p className="text-slate-400 text-sm font-sans mb-8">
                    This path does not exist. Head back to the portfolio or book a call — the founder still answers.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-rajdhani font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-white/10"
                    >
                        Back to portfolio
                    </Link>
                    <Link
                        href="/services"
                        className="px-6 py-3 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 font-rajdhani font-bold uppercase tracking-wider text-sm transition-all"
                    >
                        Services
                    </Link>
                    <a
                        href={LINKS.calendly}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 font-rajdhani font-bold uppercase tracking-wider text-sm transition-all"
                    >
                        {PRIMARY_CTA.label}
                    </a>
                </div>
            </div>
        </main>
    );
}
