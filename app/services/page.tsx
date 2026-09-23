import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { resolveLocale, languageAlternates, baseOpenGraph } from "@/lib/serverSeo";
import { offers, LINKS, PRIMARY_CTA, SITE, services, WORKFLOW, PRIMARY_MESSAGE } from "@/lib/siteData";
import { getDict } from "@/lib/i18n";
import TrackedLink from "@/components/TrackedLink";

export const metadata: Metadata = {
    title: "Services & Pricing — Cyber Assessments, DevOps, AI ATS",
    description:
        "Fixed-scope cyber risk assessments from ₹7,500, NiteHire ATS demo, and custom product builds. Founder-led oversight with a dedicated cybersecurity team, written scope, NDA available.",
    alternates: languageAlternates("/services"),
    openGraph: {
        ...baseOpenGraph("/services"),
        title: `Services & Pricing | ${SITE.name}`,
        description:
            "Fixed-scope cyber risk assessments from ₹7,500, NiteHire ATS demo, and custom product builds. Founder-led & dedicated cyber team.",
    },
};

export default async function ServicesPage({
    searchParams,
}: {
    searchParams: Promise<{ lang?: string }>;
}) {
    const sp = await searchParams;
    const locale = await resolveLocale(sp.lang);
    const t = getDict(locale).services;

    return (
        <PageShell locale={locale}>
            <section className="py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/25 bg-sky-500/10 text-xs font-mono text-sky-400 mb-3">
                            {t.eyebrow}
                        </div>
                        <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white section-heading">
                            {t.title}
                        </h1>
                        <p className="text-slate-400 text-xs sm:text-sm font-sans mt-4 max-w-3xl mx-auto">
                            {t.sub}
                        </p>
                        <p className="text-sky-300 text-xs font-mono mt-3">
                            {PRIMARY_MESSAGE}
                        </p>
                        <div className="mt-3 flex flex-wrap justify-center gap-2 text-[11px] font-mono text-slate-400">
                            {services.map((s) => (
                                <span
                                    key={s}
                                    className="px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-900/70"
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                        <p className="mt-4 text-xs font-mono text-sky-400">
                            WORKFLOW: {WORKFLOW.join(" → ")}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {offers.map((o) => (
                            <article
                                key={o.id}
                                className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800/80 backdrop-blur-xl"
                                style={{ background: "rgba(15, 23, 42, 0.7)" }}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                                    <div>
                                        <span className="text-[10px] font-mono text-sky-400 tracking-wider uppercase">
                                            {o.venture}
                                        </span>
                                        <h2 className="font-orbitron font-bold text-lg text-white mt-1">{o.name}</h2>
                                        <p className="text-xs text-slate-400 font-sans mt-2 max-w-2xl">{o.summary}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="font-orbitron text-2xl font-black text-white">{o.price}</div>
                                        {o.priceNote && (
                                            <div className="text-[11px] font-mono text-slate-500">{o.priceNote}</div>
                                        )}
                                    </div>
                                </div>

                                <ul className="space-y-2 mb-5">
                                    {o.deliverables.map((d) => (
                                        <li key={d} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 font-sans">
                                            <span className="text-sky-400 mt-0.5 shrink-0" aria-hidden="true">
                                                ✓
                                            </span>
                                            {d}
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <span className="text-[11px] font-mono text-slate-500">{o.timeline}</span>
                                    <div className="flex flex-wrap gap-3">
                                        {o.cta.primary ? (
                                            <TrackedLink
                                                href={o.cta.href.startsWith("#") ? `/services${o.cta.href}` : o.cta.href}
                                                source={`services_${o.id}`}
                                                event={o.cta.href.startsWith("http") ? "calendly_open" : "cta_click"}
                                                className="px-5 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-rajdhani font-bold uppercase tracking-wider text-xs transition-all shadow-md"
                                            >
                                                {o.cta.label}
                                            </TrackedLink>
                                        ) : (
                                            <a
                                                href={o.cta.href}
                                                className="px-5 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-rajdhani font-bold uppercase tracking-wider text-xs transition-all shadow-md"
                                            >
                                                {o.cta.label}
                                            </a>
                                        )}
                                        {o.secondaryCta && (
                                            <a
                                                href={o.secondaryCta.href}
                                                target={o.secondaryCta.href.startsWith("http") ? "_blank" : undefined}
                                                rel={
                                                    o.secondaryCta.href.startsWith("http")
                                                        ? "noopener noreferrer"
                                                        : undefined
                                                }
                                                className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 font-rajdhani font-bold uppercase tracking-wider text-xs transition-all"
                                            >
                                                {o.secondaryCta.label}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-10 p-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-center">
                        <p className="text-xs sm:text-sm text-amber-200 font-sans">{t.pricingNote}</p>
                        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
                            <TrackedLink
                                href={LINKS.calendly}
                                source="services_footer"
                                event="calendly_open"
                                className="px-6 py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-rajdhani font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-white/10"
                            >
                                {PRIMARY_CTA.label}
                            </TrackedLink>
                            <a
                                href="/faq"
                                className="px-6 py-3 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 font-rajdhani font-bold uppercase tracking-wider text-sm transition-all"
                            >
                                Read the FAQ →
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </PageShell>
    );
}
