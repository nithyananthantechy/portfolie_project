import { credentials, whyUs, HONEST_BADGE, FOUNDING_SLOTS, LINKS, PRIMARY_CTA, offers } from "@/lib/siteData";
import { getDict, type Locale } from "@/lib/i18n";
import TrackedLink from "@/components/TrackedLink";

/* ── Credentials strip (facts only, no fake logos) ── */
export function CredentialsStrip({ locale }: { locale: Locale }) {
    const t = getDict(locale).hero;
    return (
        <section aria-label="Credentials" className="py-8 px-4 border-y border-slate-800/80 bg-slate-950/40">
            <div className="max-w-6xl mx-auto">
                <p className="text-center text-[10px] font-mono text-slate-500 tracking-widest uppercase mb-4">
                    {t.credentialsTitle}
                </p>
                <ul className="flex flex-wrap justify-center gap-2.5">
                    {credentials.map((c) => (
                        <li
                            key={c}
                            className="text-[11px] sm:text-xs font-mono px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/70 text-slate-300 tracking-wide"
                        >
                            {c}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

/* ── Stats: computed from live data, never hardcoded ── */
export function StatsStrip({
    venturesCount,
    productsCount,
}: {
    venturesCount: number;
    productsCount: number;
}) {
    const stats = [
        { label: "Ventures governed", value: String(venturesCount) },
        { label: "Products built", value: String(productsCount) },
        { label: "Udyam MSME", value: "✓" },
        { label: "Founding-client slots open", value: String(FOUNDING_SLOTS) },
    ];
    return (
        <section className="py-12 px-4" aria-label="Key facts">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((s) => (
                    <div
                        key={s.label}
                        className="rounded-2xl p-5 text-center border border-slate-800/80 backdrop-blur-md"
                        style={{ background: "rgba(15, 23, 42, 0.65)" }}
                    >
                        <div className="font-orbitron text-3xl md:text-4xl font-black gradient-text mb-1">{s.value}</div>
                        <div className="text-xs font-mono text-slate-400 tracking-wider uppercase">{s.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}

/* ── Honest proof section (replaces fake testimonials) ── */
export function WhyWorkWithUs({ locale }: { locale: Locale }) {
    const t = getDict(locale).hero;
    return (
        <section id="why-us" className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/25 bg-sky-500/10 text-xs font-mono text-sky-400 mb-3">
                        {t.whyEyebrow}
                    </div>
                    <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                        {t.whyTitle}
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-sans mt-4 max-w-2xl mx-auto">{t.whySub}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {whyUs.map((item) => (
                        <div
                            key={item.title}
                            className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-sky-500/40 transition-all backdrop-blur-xl"
                            style={{ background: "rgba(15, 23, 42, 0.65)" }}
                        >
                            <div className="flex items-start gap-3">
                                <span className="mt-1 w-2 h-2 rounded-full bg-sky-400 shrink-0" aria-hidden="true" />
                                <div>
                                    <h3 className="font-orbitron font-bold text-sm text-white mb-1.5">{item.title}</h3>
                                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">{item.body}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Honest early-stage badge */}
                <div className="mt-8 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-center">
                    <p className="text-xs sm:text-sm text-amber-200 font-sans leading-relaxed">{HONEST_BADGE}</p>
                    <a
                        href="/work/testimonials"
                        className="inline-block mt-2 text-xs font-mono text-sky-400 hover:text-white underline underline-offset-4"
                    >
                        Founding-cohort slots ({FOUNDING_SLOTS} open) →
                    </a>
                </div>
            </div>
        </section>
    );
}

/* ── Services preview band — maps ventures to buyable offers ── */
export function ServicesPreview({ locale }: { locale: Locale }) {
    const t = getDict(locale).services;
    const featured = offers.filter((o) => ["essential", "professional", "business", "nitehire"].includes(o.id));
    return (
        <section id="services-preview" className="py-20 px-4 border-t border-slate-800/60">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/25 bg-sky-500/10 text-xs font-mono text-sky-400 mb-3">
                        {t.eyebrow}
                    </div>
                    <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">{t.title}</h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-sans mt-4 max-w-3xl mx-auto">{t.sub}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {featured.map((o) => (
                        <div
                            key={o.id}
                            className="glass-card rounded-2xl p-5 border border-slate-800/80 flex flex-col justify-between backdrop-blur-xl"
                            style={{ background: "rgba(15, 23, 42, 0.65)" }}
                        >
                            <div>
                                <span className="text-[10px] font-mono text-sky-400 tracking-wider uppercase">{o.venture}</span>
                                <h3 className="font-orbitron font-bold text-sm text-white mt-1.5 leading-snug">{o.name}</h3>
                                <p className="font-orbitron text-xl font-black text-white mt-3">{o.price}</p>
                                <p className="text-xs text-slate-400 font-sans mt-2 leading-relaxed">{o.summary}</p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-800/80">
                                <span className="text-[11px] font-mono text-slate-500">{o.timeline}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <TrackedLink
                        href={LINKS.calendly}
                        source="services_preview"
                        event="calendly_open"
                        className="px-6 py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-rajdhani font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-white/10"
                    >
                        {PRIMARY_CTA.label}
                    </TrackedLink>
                    <a
                        href="/services"
                        className="px-6 py-3 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 font-rajdhani font-bold uppercase tracking-wider text-sm transition-all"
                    >
                        See all services & pricing →
                    </a>
                </div>
            </div>
        </section>
    );
}

/* ── Sticky mobile action bar: Call / WhatsApp / Book ── */
export function StickyMobileBar() {
    return (
        <div
            className="fixed bottom-0 inset-x-0 z-50 md:hidden border-t border-slate-800"
            style={{ background: "rgba(3, 7, 18, 0.96)", backdropFilter: "blur(12px)" }}
            role="navigation"
            aria-label="Quick actions"
        >
            <div className="grid grid-cols-3">
                <a
                    href={LINKS.phone}
                    onClick={undefined}
                    data-track="call_click"
                    className="flex flex-col items-center gap-0.5 py-2.5 text-slate-300 hover:text-white active:bg-slate-800/60 transition-colors"
                >
                    <span aria-hidden="true">📞</span>
                    <span className="text-[10px] font-mono tracking-wider">CALL</span>
                </a>
                <a
                    href={LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="whatsapp_click"
                    className="flex flex-col items-center gap-0.5 py-2.5 text-emerald-400 hover:text-emerald-300 active:bg-slate-800/60 border-x border-slate-800 transition-colors"
                >
                    <span aria-hidden="true">💬</span>
                    <span className="text-[10px] font-mono tracking-wider">WHATSAPP</span>
                </a>
                <a
                    href={LINKS.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="calendly_open"
                    className="flex flex-col items-center gap-0.5 py-2.5 bg-white text-slate-950 font-bold active:bg-slate-200 transition-colors"
                >
                    <span aria-hidden="true">📅</span>
                    <span className="text-[10px] font-mono tracking-wider">BOOK</span>
                </a>
            </div>
        </div>
    );
}
