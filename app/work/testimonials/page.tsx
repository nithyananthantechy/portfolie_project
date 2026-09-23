import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { resolveLocale, languageAlternates, baseOpenGraph } from "@/lib/serverSeo";
import { testimonials, FOUNDING_SLOTS, HONEST_BADGE, LINKS, PRIMARY_CTA, SITE } from "@/lib/siteData";
import TrackedLink from "@/components/TrackedLink";

export const metadata: Metadata = {
    title: "Testimonials — Founding Cohort",
    description:
        "We do not publish testimonials until real, permissioned quotes exist. Founding-client slots are open — references under NDA once engagements begin.",
    alternates: languageAlternates("/work/testimonials"),
    openGraph: {
        ...baseOpenGraph("/work/testimonials"),
        title: `Testimonials | ${SITE.name}`,
        description: "Honest proof page — no fabricated quotes. Founding-cohort slots open.",
    },
};

export default async function TestimonialsPage({
    searchParams,
}: {
    searchParams: Promise<{ lang?: string }>;
}) {
    const sp = await searchParams;
    const locale = await resolveLocale(sp.lang);
    const approved = testimonials.filter((t) => t.approved);

    return (
        <PageShell locale={locale}>
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-300 mb-4">
                        HONEST PROOF
                    </div>
                    <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white section-heading">
                        TESTIMONIALS
                    </h1>

                    {approved.length === 0 ? (
                        <div
                            className="mt-10 rounded-2xl border border-slate-800 p-8 sm:p-10 text-left"
                            style={{ background: "rgba(15, 23, 42, 0.7)" }}
                        >
                            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed mb-4">
                                <strong className="text-white">No testimonials yet — on purpose.</strong> NITECHSPARK is
                                early-stage. We will not invent quotes, logos, star ratings, or client counts. When a
                                founding-cohort engagement completes and the client approves attribution in writing, their
                                words will appear here.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed mb-6">
                                {HONEST_BADGE}
                            </p>

                            <ul className="space-y-3 mb-8">
                                {[
                                    "Written scope before any work starts",
                                    "NDA available before system access",
                                    "Founder-led oversight backed by a dedicated cybersecurity team",
                                    "Published price anchors — no surprise invoices",
                                    `Only ${FOUNDING_SLOTS} founding-client slots for this cohort`,
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-slate-300 font-sans">
                                        <span className="text-sky-400 mt-0.5" aria-hidden="true">
                                            ✓
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <TrackedLink
                                    href={LINKS.calendly}
                                    source="testimonials_page"
                                    event="calendly_open"
                                    className="px-6 py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-rajdhani font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-white/10"
                                >
                                    {PRIMARY_CTA.label}
                                </TrackedLink>
                                <a
                                    href="/work"
                                    className="px-6 py-3 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 font-rajdhani font-bold uppercase tracking-wider text-sm transition-all"
                                >
                                    See the product fleet →
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-10 grid gap-5 sm:grid-cols-2">
                            {approved.map((t) => (
                                <blockquote
                                    key={t.name}
                                    className="glass-card rounded-2xl p-6 border border-slate-800/80 text-left"
                                    style={{ background: "rgba(15, 23, 42, 0.7)" }}
                                >
                                    <p className="text-sm text-slate-300 font-sans leading-relaxed mb-4">
                                        “{t.quote}”
                                    </p>
                                    <footer className="text-xs font-mono text-slate-400">
                                        <strong className="text-white">{t.name}</strong> — {t.role}
                                        {t.company ? ` · ${t.company}` : ""}
                                    </footer>
                                </blockquote>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PageShell>
    );
}
