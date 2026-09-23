"use client";

import { useEffect, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { LINKS, PRIMARY_CTA, SITE } from "@/lib/siteData";
import { getDict, type Locale } from "@/lib/i18n";
import TrackedLink from "@/components/TrackedLink";

/** Contact channels + form. Topic pre-fill comes from SelfQualify via sessionStorage. */
export default function ContactSection({ locale }: { locale: Locale }) {
    const t = getDict(locale).contact;
    const [form, setForm] = useState({ name: "", email: "", content: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        const topic = sessionStorage.getItem("ns_topic");
        if (topic) {
            setForm((f) => ({ ...f, content: `${topic}\n\n` }));
            sessionStorage.removeItem("ns_topic");
        }
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                setStatus("success");
                setFeedback(t.success);
                setForm({ name: "", email: "", content: "" });
                track("contact_form_submit");
            } else {
                setStatus("error");
                setFeedback(data.error || t.error);
            }
        } catch {
            setStatus("error");
            setFeedback(t.error);
        }
    };

    const inputCls =
        "w-full rounded-lg border border-slate-700/80 bg-slate-900/90 px-3.5 py-2.5 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 transition-colors";

    return (
        <section id="contact" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-sky-400" />
                        <span className="text-xs font-mono text-sky-400 tracking-widest uppercase font-semibold">
                            {t.eyebrow}
                        </span>
                    </div>
                    <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                        {t.title}
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-sans mt-3">{t.sub}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Direct channels */}
                    <div className="lg:col-span-5 space-y-4">
                        <div
                            className="glass-card rounded-2xl p-6 border border-slate-800/80 space-y-5 backdrop-blur-xl"
                            style={{ background: "rgba(15, 23, 42, 0.65)" }}
                        >
                            <h3 className="font-orbitron text-sm font-bold text-white tracking-wider mb-2">
                                DIRECT CHANNELS
                            </h3>

                            <a href={LINKS.phone} className="flex items-center gap-3.5 text-slate-300 hover:text-sky-400 transition-colors group">
                                <div className="w-10 h-10 rounded-xl border border-sky-500/20 bg-sky-500/5 flex items-center justify-center group-hover:border-sky-400" aria-hidden="true">
                                    📞
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono text-slate-500">{t.phoneLabel}</div>
                                    <div className="text-sm font-mono font-semibold text-white">{LINKS.phoneDisplay}</div>
                                </div>
                            </a>

                            <TrackedLink
                                href={LINKS.whatsapp}
                                source="contact"
                                event="whatsapp_click"
                                className="flex items-center gap-3.5 text-slate-300 hover:text-emerald-400 transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center group-hover:border-emerald-400" aria-hidden="true">
                                    💬
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono text-slate-500">{t.whatsappLabel}</div>
                                    <div className="text-sm font-mono font-semibold text-emerald-400">Chat instantly</div>
                                </div>
                            </TrackedLink>

                            <a href={`mailto:${LINKS.email}`} className="flex items-center gap-3.5 text-slate-300 hover:text-sky-400 transition-colors group">
                                <div className="w-10 h-10 rounded-xl border border-sky-500/20 bg-sky-500/5 flex items-center justify-center group-hover:border-sky-400" aria-hidden="true">
                                    ✉️
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono text-slate-500">{t.emailLabel}</div>
                                    <div className="text-sm font-mono font-semibold text-white break-all">{LINKS.email}</div>
                                </div>
                            </a>

                            <a
                                href={LINKS.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3.5 text-slate-300 hover:text-sky-400 transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-xl border border-sky-500/20 bg-sky-500/5 flex items-center justify-center group-hover:border-sky-400" aria-hidden="true">
                                    in
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono text-slate-500">{t.linkedinLabel}</div>
                                    <div className="text-sm font-mono font-semibold text-white">linkedin.com/in/nithyananthan-nagarajan</div>
                                </div>
                            </a>

                            <TrackedLink
                                href={LINKS.calendly}
                                source="contact"
                                event="calendly_open"
                                className="flex items-center gap-3.5 text-slate-300 hover:text-sky-400 transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-xl border border-sky-500/20 bg-sky-500/5 flex items-center justify-center group-hover:border-sky-400" aria-hidden="true">
                                    📅
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono text-slate-500">{t.calendlyLabel}</div>
                                    <div className="text-sm font-mono font-semibold text-white">{t.calendlyValue}</div>
                                </div>
                            </TrackedLink>

                            <div className="flex items-center gap-3.5 text-slate-300">
                                <div className="w-10 h-10 rounded-xl border border-slate-700 bg-slate-900/60 flex items-center justify-center" aria-hidden="true">
                                    📍
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono text-slate-500">{t.hqLabel}</div>
                                    <div className="text-sm font-mono font-semibold text-white">{t.hqValue}</div>
                                </div>
                            </div>
                        </div>

                        {/* Primary CTA repeated once as the section's single action */}
                        <TrackedLink
                            href={LINKS.calendly}
                            source="contact_primary"
                            event="calendly_open"
                            className="block text-center px-5 py-3.5 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-rajdhani font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-white/10"
                        >
                            {PRIMARY_CTA.label}
                        </TrackedLink>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-7">
                        <div
                            className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800/80 backdrop-blur-xl"
                            style={{ background: "rgba(15, 23, 42, 0.7)" }}
                        >
                            <h3 className="font-orbitron text-base font-bold text-white mb-2">{t.formTitle}</h3>
                            <p className="text-xs text-slate-400 font-sans mb-6">{t.formSub}</p>

                            {feedback && (
                                <div
                                    className={`p-3.5 rounded-lg text-xs font-mono mb-5 ${
                                        status === "success"
                                            ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                            : "border border-rose-500/30 bg-rose-500/10 text-rose-400"
                                    }`}
                                    role="status"
                                >
                                    {feedback}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="cf-name" className="block text-xs font-mono text-slate-400 mb-1.5">
                                            $ {t.name}
                                        </label>
                                        <input
                                            id="cf-name"
                                            type="text"
                                            required
                                            placeholder="Name"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            className={inputCls}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cf-email" className="block text-xs font-mono text-slate-400 mb-1.5">
                                            $ {t.email}
                                        </label>
                                        <input
                                            id="cf-email"
                                            type="email"
                                            required
                                            placeholder="you@company.com"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            className={inputCls}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="cf-content" className="block text-xs font-mono text-slate-400 mb-1.5">
                                        $ {t.message}
                                    </label>
                                    <textarea
                                        id="cf-content"
                                        required
                                        rows={5}
                                        placeholder="One sentence on what you need — servers, an audit, hiring, or a product idea…"
                                        value={form.content}
                                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                                        className={`${inputCls} resize-none font-sans`}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 shadow-md transition-all font-mono text-xs"
                                >
                                    {status === "loading" ? t.sending : t.submit}
                                </button>
                            </form>

                            <p className="text-[11px] text-slate-500 font-sans mt-4">
                                {SITE.company} · {SITE.address.addressLocality}, {SITE.address.addressRegion} · replies come from the founder, usually within one working day.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
