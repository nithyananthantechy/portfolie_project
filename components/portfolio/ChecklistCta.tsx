"use client";

import { useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { LINKS } from "@/lib/siteData";
import TrackedLink from "@/components/TrackedLink";

/**
 * Lead magnet: MSME Cyber Risk Self-Check Checklist (PDF, 1 page, 20 yes/no questions).
 * Direct download (no gate) + optional email capture.
 */
export default function ChecklistCta() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [busy, setBusy] = useState(false);

    const submitEmail = async (e: FormEvent) => {
        e.preventDefault();
        setBusy(true);
        try {
            await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: "Checklist download (optional email)",
                    email,
                    content: `Please send the MSME Cyber Risk Self-Check checklist and occasional hardening tips. Source: checklist CTA.`,
                }),
            });
        } catch {
            /* download still works even if email capture fails */
        } finally {
            setBusy(false);
            setSent(true);
            setEmail("");
            track("checklist_email_submit");
        }
    };

    return (
        <section id="checklist" className="py-16 px-4" aria-labelledby="checklist-title">
            <div className="max-w-4xl mx-auto">
                <div
                    className="rounded-2xl border border-sky-500/30 p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden"
                    style={{ background: "rgba(15, 23, 42, 0.8)" }}
                >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent" />

                    <div className="text-center">
                        <span className="inline-block text-[11px] font-mono px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-300 tracking-widest uppercase mb-4">
                            Free download · No email required
                        </span>
                        <h2 id="checklist-title" className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold text-white">
                            MSME Cyber Risk Self-Check
                        </h2>
                        <p className="text-slate-300 text-xs sm:text-sm font-sans mt-3 max-w-2xl mx-auto leading-relaxed">
                            A one-page PDF with <strong>20 yes/no questions</strong> — SSH, firewall, backups, access,
                            consent, incident response. Score yourself in five minutes before you spend anything.
                        </p>
                    </div>

                    <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
                        <TrackedLink
                            href={LINKS.checklist}
                            source="checklist_section"
                            event="checklist_download"
                            className="px-6 py-3.5 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-rajdhani font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-white/10"
                            ariaLabel="Download the MSME Cyber Risk Self-Check checklist PDF"
                        >
                            ⬇ Download the PDF checklist
                        </TrackedLink>
                        <TrackedLink
                            href={LINKS.calendly}
                            source="checklist_to_call"
                            event="calendly_open"
                            className="px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 font-rajdhani font-bold uppercase tracking-wider text-sm flex items-center justify-center transition-all"
                        >
                            Book a free 15-min intro call
                        </TrackedLink>
                    </div>

                    {/* Optional email capture */}
                    <form onSubmit={submitEmail} className="mt-7 pt-6 border-t border-slate-800 max-w-xl mx-auto">
                        <label htmlFor="checklist-email" className="block text-center text-[11px] font-mono text-slate-400 mb-2">
                            OPTIONAL — email me the checklist + occasional hardening notes (no spam, unsubscribe anytime)
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2.5">
                            <input
                                id="checklist-email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@company.com"
                                className="flex-1 rounded-lg border border-slate-700/80 bg-slate-900/90 px-3.5 py-2.5 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={busy}
                                className="px-5 py-2.5 rounded-lg bg-sky-500/15 border border-sky-500/40 text-sky-300 hover:bg-sky-500/25 text-xs font-mono font-semibold transition-all disabled:opacity-50"
                            >
                                {busy ? "SENDING…" : sent ? "SENT ✓ (check inbox + spam)" : "EMAIL IT TO ME"}
                            </button>
                        </div>
                        {sent && (
                            <p className="text-[11px] text-emerald-400 font-mono text-center mt-2">
                                Queued — the download above works immediately either way.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
