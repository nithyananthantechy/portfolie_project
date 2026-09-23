import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { resolveLocale, languageAlternates, baseOpenGraph } from "@/lib/serverSeo";
import {
    SITE,
    LINKS,
    credentials,
    whyUs,
    HONEST_BADGE,
    FOUNDING_SLOTS,
    BOILERPLATE_50,
    BOILERPLATE_100,
    ventures,
    productCount,
    LINKS as L,
} from "@/lib/siteData";
import Timeline from "@/components/Timeline";
import { getDict } from "@/lib/i18n";
import TrackedLink from "@/components/TrackedLink";

export const metadata: Metadata = {
    title: "About — Founder & CEO, NITECHSPARK",
    description: `${BOILERPLATE_50} Erode, Tamil Nadu, India.`,
    alternates: languageAlternates("/about"),
    openGraph: {
        ...baseOpenGraph("/about"),
        title: `About ${SITE.name} | ${SITE.company}`,
        description: BOILERPLATE_50,
    },
};

export default async function AboutPage({
    searchParams,
}: {
    searchParams: Promise<{ lang?: string }>;
}) {
    const sp = await searchParams;
    const locale = await resolveLocale(sp.lang);
    const t = getDict(locale).hero;

    return (
        <PageShell locale={locale}>
            <section className="py-14 px-4 border-b border-slate-800/60">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/25 bg-sky-500/10 text-xs font-mono text-sky-400 mb-3">
                        ABOUT
                    </div>
                    <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white section-heading">
                        {SITE.name.toUpperCase()}
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base font-sans mt-5 leading-relaxed">{BOILERPLATE_100}</p>

                    <div className="mt-6 flex flex-wrap gap-2.5">
                        {credentials.map((c) => (
                            <span
                                key={c}
                                className="text-[11px] font-mono px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/70 text-slate-300"
                            >
                                {c}
                            </span>
                        ))}
                    </div>

                    <div className="mt-8 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10">
                        <p className="text-xs sm:text-sm text-amber-200 font-sans">{HONEST_BADGE}</p>
                        <p className="text-xs font-mono text-sky-400 mt-2">
                            {FOUNDING_SLOTS} founding slots · {ventures.length} ventures · {productCount} products on /work
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-14 px-4 border-b border-slate-800/60">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-orbitron text-xl sm:text-2xl font-bold text-white section-heading mb-6">
                        {t.whyTitle}
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {whyUs.map((item) => (
                            <div
                                key={item.title}
                                className="glass-card rounded-xl p-5 border border-slate-800/80"
                                style={{ background: "rgba(15, 23, 42, 0.65)" }}
                            >
                                <h3 className="font-orbitron font-bold text-sm text-white mb-1.5">{item.title}</h3>
                                <p className="text-xs text-slate-300 font-sans leading-relaxed">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-14 px-4 border-b border-slate-800/60">
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-2xl border border-sky-500/30 p-6 sm:p-8" style={{ background: "rgba(15, 23, 42, 0.75)" }}>
                        <span className="text-[11px] font-mono px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-300">
                            Free download · No email required
                        </span>
                        <h2 className="font-orbitron text-xl font-bold text-white mt-4">MSME Cyber Risk Self-Check</h2>
                        <p className="text-slate-300 text-xs sm:text-sm font-sans mt-2">
                            20 yes/no questions — assets, access, network, patching, backup, monitoring, incident response,
                            privacy and process. Score yourself in five minutes.
                        </p>
                        <div className="mt-5 flex flex-col sm:flex-row gap-3">
                            <TrackedLink
                                href={LINKS.checklist}
                                source="about_checklist"
                                event="checklist_download"
                                className="px-5 py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-rajdhani font-bold uppercase tracking-wider text-sm text-center transition-all shadow-md"
                            >
                                ⬇ Download the PDF
                            </TrackedLink>
                            <TrackedLink
                                href={L.calendly}
                                source="about_to_call"
                                event="calendly_open"
                                className="px-5 py-3 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 font-rajdhani font-bold uppercase tracking-wider text-sm text-center transition-all"
                            >
                                Book a free 15-min intro call
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </section>

            <Timeline />
        </PageShell>
    );
}
