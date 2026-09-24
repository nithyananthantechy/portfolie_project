import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { resolveLocale, languageAlternates, baseOpenGraph } from "@/lib/serverSeo";
import {
    offers,
    commercialServices,
    LINKS,
    PRIMARY_CTA,
    SITE,
    WORKFLOW,
    PRIMARY_MESSAGE,
} from "@/lib/siteData";
import { getDict } from "@/lib/i18n";
import TrackedLink from "@/components/TrackedLink";
import { CheckCircle2, ArrowRight, ShieldCheck, Wrench } from "lucide-react";

export const metadata: Metadata = {
    title: "Services & Pricing — Cybersecurity & IT Infrastructure Engineering",
    description:
        "Hands-on Linux server administration, troubleshooting, AIOps monitoring setups, and fixed-scope cybersecurity assessments from ₹7,500. Direct engineering delivery by Nithyananthan Nagarajan via NITECHSPARK.",
    alternates: languageAlternates("/services"),
    openGraph: {
        ...baseOpenGraph("/services"),
        title: `Services & Pricing | ${SITE.name}`,
        description:
            "Hands-on Linux server administration, troubleshooting, AIOps monitoring setups, and cybersecurity assessments.",
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
                    {/* Header */}
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

                        <div className="mt-4 p-3 rounded-xl border border-sky-500/30 bg-sky-950/30 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-sky-400">
                            <span className="text-slate-400 font-semibold">WORKFLOW:</span>
                            {WORKFLOW.map((step, idx) => (
                                <span key={step} className="flex items-center gap-1.5 font-bold text-white">
                                    <span className="text-sky-400">{step}</span>
                                    {idx < WORKFLOW.length - 1 && <span className="text-slate-600">→</span>}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Section 1: Hands-on Commercial Engineering Services */}
                    <div className="mb-14">
                        <div className="flex items-center gap-2 mb-6">
                            <Wrench size={18} className="text-sky-400" />
                            <h2 className="font-orbitron text-xl sm:text-2xl font-bold text-white">
                                Hands-On Engineering Services
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {commercialServices.map((service) => (
                                <div
                                    key={service.id}
                                    className="glass-card rounded-2xl p-6 border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between"
                                    style={{ background: "rgba(15, 23, 42, 0.65)" }}
                                >
                                    <div>
                                        <div className="flex items-start justify-between gap-3 mb-2.5">
                                            <h3 className="font-orbitron font-bold text-base text-white">
                                                {service.title}
                                            </h3>
                                            {service.priceAnchor && (
                                                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-sky-400 shrink-0 font-semibold">
                                                    {service.priceAnchor}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-300 font-sans mb-3 leading-relaxed">
                                            <strong className="text-slate-400">Scope: </strong>
                                            {service.scope}
                                        </p>
                                        <ul className="space-y-1.5 mb-4 text-xs text-slate-300 font-sans">
                                            {service.deliverables.map((d, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <CheckCircle2 size={13} className="text-sky-400 shrink-0 mt-0.5" />
                                                    <span>{d}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="pt-3 border-t border-slate-800">
                                        <TrackedLink
                                            href={service.ctaHref}
                                            source={`services_page_${service.id}`}
                                            event="calendly_open"
                                            className="w-full py-2 px-3 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5"
                                        >
                                            <span>{service.ctaLabel}</span>
                                            <ArrowRight size={12} />
                                        </TrackedLink>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 2: Fixed-Scope Cyber Risk Assessment Packages */}
                    <div className="mb-14">
                        <div className="flex items-center gap-2 mb-6">
                            <ShieldCheck size={18} className="text-sky-400" />
                            <h2 className="font-orbitron text-xl sm:text-2xl font-bold text-white">
                                Fixed-Scope Assessment Packages
                            </h2>
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
                                            <h3 className="font-orbitron font-bold text-lg text-white mt-1">
                                                {o.name}
                                            </h3>
                                            <p className="text-xs text-slate-400 font-sans mt-2 max-w-2xl">
                                                {o.summary}
                                            </p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <div className="font-orbitron text-2xl font-black text-white">
                                                {o.price}
                                            </div>
                                            {o.priceNote && (
                                                <div className="text-[11px] font-mono text-slate-500">
                                                    {o.priceNote}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <ul className="space-y-2 mb-5">
                                        {o.deliverables.map((d) => (
                                            <li
                                                key={d}
                                                className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 font-sans"
                                            >
                                                <span className="text-sky-400 mt-0.5 shrink-0" aria-hidden="true">
                                                    ✓
                                                </span>
                                                {d}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <span className="text-[11px] font-mono text-slate-500">
                                            Timeline: {o.timeline}
                                        </span>
                                        <div className="flex flex-wrap gap-3">
                                            <TrackedLink
                                                href={o.cta.href}
                                                source={`services_${o.id}`}
                                                event="calendly_open"
                                                className="px-5 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-rajdhani font-bold uppercase tracking-wider text-xs transition-all shadow-md"
                                            >
                                                {o.cta.label}
                                            </TrackedLink>
                                            {o.secondaryCta && (
                                                <a
                                                    href={o.secondaryCta.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
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
                    </div>

                    {/* Bottom CTA Banner */}
                    <div className="p-6 rounded-2xl border border-sky-500/30 bg-slate-900/60 text-center">
                        <p className="text-xs sm:text-sm text-slate-300 font-sans mb-4">
                            All engagements start with a written scope document and mutual confidentiality agreement before any server or network access.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <TrackedLink
                                href={LINKS.calendly}
                                source="services_footer"
                                event="calendly_open"
                                className="px-6 py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-rajdhani font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-white/10"
                            >
                                {PRIMARY_CTA.label}
                            </TrackedLink>
                            <TrackedLink
                                href={LINKS.whatsapp}
                                source="services_footer_wa"
                                event="whatsapp_click"
                                className="px-6 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 font-rajdhani font-bold uppercase tracking-wider text-sm transition-all"
                            >
                                Direct WhatsApp Chat
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </section>
        </PageShell>
    );
}
