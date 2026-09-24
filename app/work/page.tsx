import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import SelectedProjectsSection from "@/components/portfolio/SelectedProjectsSection";
import OtherProjectsSection from "@/components/portfolio/OtherProjectsSection";
import { resolveLocale, languageAlternates, baseOpenGraph } from "@/lib/serverSeo";
import { selectedEngineeringProjects, secondaryProjects, caseTemplates, LINKS, SITE } from "@/lib/siteData";

export const metadata: Metadata = {
    title: `Selected Engineering Projects & Fleet | ${SITE.name}`,
    description: `Selected engineering projects and applications across AIOps, Linux server security, monitoring, and infrastructure automation by ${SITE.name}.`,
    alternates: languageAlternates("/work"),
    openGraph: {
        ...baseOpenGraph("/work"),
        title: `Selected Engineering Projects | ${SITE.name}`,
        description:
            "AIOps telemetry, Linux packet filtering, Zabbix monitoring setups, and full-stack utilities.",
    },
};

export default async function WorkPage({
    searchParams,
}: {
    searchParams: Promise<{ lang?: string }>;
}) {
    const sp = await searchParams;
    const locale = await resolveLocale(sp.lang);

    return (
        <PageShell locale={locale}>
            {/* Header */}
            <section className="py-12 px-4 border-b border-slate-800/80">
                <div className="max-w-5xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/25 bg-sky-500/10 text-xs font-mono text-sky-400 mb-3">
                        PORTFOLIO OF WORK
                    </div>
                    <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white section-heading">
                        ENGINEERING PROJECTS &amp; LABS
                    </h1>
                    <p className="text-slate-400 text-xs sm:text-sm font-sans mt-4 max-w-3xl leading-relaxed">
                        Curated implementation work divided into <strong>Primary Engineering Projects</strong> (infrastructure, monitoring, and security), <strong>Secondary Applications</strong>, and <strong>Anonymized Case Templates</strong> showing operational problem-solving patterns.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs font-mono">
                        <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-white underline underline-offset-4">
                            GitHub Profile ↗
                        </a>
                        <a href={LINKS.calendly} className="text-slate-400 hover:text-white underline underline-offset-4">
                            Book Technical Consultation
                        </a>
                    </div>
                </div>
            </section>

            {/* Primary Engineering Projects */}
            <SelectedProjectsSection />

            {/* Secondary Products & Experiments */}
            <OtherProjectsSection />

            {/* Illustrative Case Templates */}
            <section id="case-templates" className="py-16 px-4 border-t border-slate-800/80">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-300 mb-3">
                            ILLUSTRATIVE SCENARIOS — NOT CLIENT STORIES
                        </div>
                        <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                            ANONYMIZED PROBLEM TEMPLATES
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm font-mono mt-3">
                            {">"} How we systematically analyze and remediate common infrastructure failure modes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {caseTemplates.map((c) => (
                            <article
                                key={c.id}
                                className="glass-card rounded-2xl p-6 border border-slate-800/80 flex flex-col"
                                style={{ background: "rgba(15, 23, 42, 0.65)" }}
                            >
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 w-fit mb-3">
                                    {c.patternLabel}
                                </span>
                                <h3 className="font-orbitron font-bold text-sm text-white leading-snug mb-3">{c.title}</h3>
                                <p className="text-xs text-slate-400 font-sans mb-3">
                                    <strong className="text-slate-300">Problem: </strong>
                                    {c.problem}
                                </p>
                                <p className="text-xs text-slate-300 font-sans mb-4">
                                    <strong className="text-sky-400">Approach: </strong>
                                    {c.approach}
                                </p>
                                <p className="text-[11px] font-mono text-slate-500 mt-auto pt-3 border-t border-slate-800">
                                    {c.outcomeType}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </PageShell>
    );
}
