import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { resolveLocale, languageAlternates, baseOpenGraph } from "@/lib/serverSeo";
import {
    SITE,
    LINKS,
    credentials,
    professionalExperience,
    selectedEngineeringProjects,
    ciscoAchievements,
    skillGroups,
    aiopsFocusAreas,
    ventures,
    BOILERPLATE_100,
} from "@/lib/siteData";
import TrackedLink from "@/components/TrackedLink";
import { Server, Activity, ShieldCheck, Code2, Award, Terminal, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
    title: `About ${SITE.name} | Cybersecurity & IT Infrastructure Engineer`,
    description: `Professional engineering profile of ${SITE.name}. Hands-on AIOps, Linux administration, cybersecurity assessment, and founder at NITECHSPARK.`,
    alternates: languageAlternates("/about"),
    openGraph: {
        ...baseOpenGraph("/about"),
        title: `About ${SITE.name} | Cybersecurity & IT Infrastructure Engineer`,
        description: `Professional engineering profile of ${SITE.name}: Linux, AIOps, Cybersecurity, and Infrastructure Automation.`,
    },
};

export default async function AboutPage({
    searchParams,
}: {
    searchParams: Promise<{ lang?: string }>;
}) {
    const sp = await searchParams;
    const locale = await resolveLocale(sp.lang);

    return (
        <PageShell locale={locale}>
            {/* 1. Who I Am */}
            <section className="py-14 px-4 border-b border-slate-800/80">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/25 bg-sky-500/10 text-xs font-mono text-sky-400 mb-3">
                        ENGINEERING PROFILE
                    </div>
                    <h1 className="font-orbitron text-3xl sm:text-4xl font-bold text-white section-heading">
                        WHO I AM
                    </h1>
                    <p className="text-slate-300 text-base sm:text-lg font-sans mt-4 leading-relaxed">
                        I am <strong>{SITE.name}</strong>, a Cybersecurity, Linux, and IT Infrastructure Engineer based in Erode, Tamil Nadu, India. My core focus is hands-on: building, troubleshooting, securing, and automating real-world servers, networks, and business infrastructure.
                    </p>
                    <p className="text-slate-400 text-sm sm:text-base font-sans mt-3 leading-relaxed">
                        Alongside my technical engineering background in AIOps telemetry and Linux administration, I am the Founder &amp; CEO of <strong>NITECHSPARK</strong>, a registered MSME studio providing cybersecurity assessments, Linux server hardening, and infrastructure consulting.
                    </p>

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

                    <div className="mt-6 flex flex-wrap gap-3">
                        <a
                            href={LINKS.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-all"
                        >
                            View LinkedIn Profile ↗
                        </a>
                        <a
                            href={LINKS.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-all"
                        >
                            View GitHub Repositories ↗
                        </a>
                    </div>
                </div>
            </section>

            {/* 2. Professional Experience */}
            <section className="py-14 px-4 border-b border-slate-800/80">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-2">
                        <Server size={18} className="text-sky-400" />
                        <h2 className="font-orbitron text-xl sm:text-2xl font-bold text-white">
                            PROFESSIONAL EXPERIENCE
                        </h2>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm font-mono mb-6">
                        {">"} Production operations and systems engineering.
                    </p>

                    {professionalExperience.map((exp) => (
                        <div
                            key={exp.company}
                            className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-800/90"
                            style={{ background: "rgba(15, 23, 42, 0.65)" }}
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                <div>
                                    <h3 className="font-orbitron font-bold text-xl text-white">
                                        {exp.company}
                                    </h3>
                                    <span className="text-sm font-mono text-sky-400 font-semibold">
                                        {exp.role}
                                    </span>
                                </div>
                                <span className="text-xs font-mono px-3 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 self-start sm:self-auto">
                                    {exp.period}
                                </span>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-5">
                                {exp.summary}
                            </p>

                            <div className="mb-5">
                                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5 font-semibold">
                                    Documented Responsibilities:
                                </h4>
                                <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-300 font-sans">
                                    {exp.responsibilities.map((r, i) => (
                                        <li key={i} className="flex items-start gap-2 p-2 rounded bg-slate-900/60 border border-slate-800/60">
                                            <span className="text-sky-400 font-mono">▸</span>
                                            <span>{r}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <span className="text-[11px] font-mono text-slate-400 block mb-2">Technologies Used:</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {exp.technologies.map((t) => (
                                        <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-sky-300">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Technical Focus */}
            <section className="py-14 px-4 border-b border-slate-800/80">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-orbitron text-xl sm:text-2xl font-bold text-white mb-2">
                        TECHNICAL FOCUS
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-mono mb-6">
                        {">"} Core architectural disciplines across infrastructure, automation, and defense.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {skillGroups.map((g) => (
                            <div
                                key={g.title}
                                className="glass-card rounded-xl p-5 border border-slate-800/80"
                                style={{ background: "rgba(15, 23, 42, 0.65)" }}
                            >
                                <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider font-semibold">
                                    GROUP {g.groupNumber} • {g.category}
                                </span>
                                <h3 className="font-orbitron font-bold text-base text-white mt-1 mb-3">
                                    {g.title}
                                </h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {g.skills.map((s) => (
                                        <span
                                            key={s}
                                            className="text-xs font-mono px-2 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-200"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. AIOps Experience */}
            <section className="py-14 px-4 border-b border-slate-800/80">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-2">
                        <Activity size={18} className="text-sky-400" />
                        <h2 className="font-orbitron text-xl sm:text-2xl font-bold text-white">
                            AIOPS EXPERIENCE
                        </h2>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm font-mono mb-6">
                        {">"} Real-time telemetry, automated triage, and observability.
                    </p>

                    <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
                        My practical AIOps work bridges the gap between infrastructure monitoring and actionable incident resolution. In production environments, alerts can overwhelm operations teams; by combining Zabbix and Prometheus metric thresholding with centralized Elastic Stack log collection and automated triage scripts, I focus on cutting mean-time-to-recovery (MTTR) and isolating the exact root cause of incidents.
                    </p>

                    <div className="grid sm:grid-cols-3 gap-3">
                        {aiopsFocusAreas.slice(0, 3).map((a) => (
                            <div key={a.area} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                                <h4 className="font-orbitron font-bold text-xs text-white mb-1.5">{a.area}</h4>
                                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{a.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Cybersecurity Focus */}
            <section className="py-14 px-4 border-b border-slate-800/80">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck size={18} className="text-sky-400" />
                        <h2 className="font-orbitron text-xl sm:text-2xl font-bold text-white">
                            CYBERSECURITY FOCUS
                        </h2>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm font-mono mb-4">
                        {">"} Hardening, assessment methodology, and zero-trust principles.
                    </p>

                    <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-5">
                        In cybersecurity, I emphasize preventative systems hardening and realistic vulnerability assessment rather than theoretical check-box audits. Real security begins at the operating system: locking down SSH access, configuring stateful ingress firewalls with iptables, deploying fail2ban rate limiters, auditing exposed ports, and ensuring compliance with the DPDP Act 2023.
                    </p>

                    <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/30 text-xs font-mono text-sky-300">
                        Methodology: ASSESS → REPORT → REMEDIATE → RE-TEST
                    </div>
                </div>
            </section>

            {/* 6. Founder Journey */}
            <section className="py-14 px-4 border-b border-slate-800/80">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-orbitron text-xl sm:text-2xl font-bold text-white mb-2">
                        FOUNDER JOURNEY — NITECHSPARK
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-mono mb-4">
                        {">"} Building practical cybersecurity and infrastructure solutions.
                    </p>

                    <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-4">
                        Founded in 2026, <strong>NITECHSPARK</strong> was created to deliver transparent, fixed-scope engineering services to MSMEs and technology teams who cannot afford bloated enterprise retainers. Registered under Udyam MSME in Erode, Tamil Nadu, we operate with founder-led technical delivery, mutual non-disclosure agreements, and clear written deliverables.
                    </p>
                </div>
            </section>

            {/* 7. Selected Engineering Work */}
            <section className="py-14 px-4 border-b border-slate-800/80">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-2">
                        <Terminal size={18} className="text-sky-400" />
                        <h2 className="font-orbitron text-xl sm:text-2xl font-bold text-white">
                            SELECTED ENGINEERING WORK
                        </h2>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm font-mono mb-6">
                        {">"} Key projects demonstrating implementation depth.
                    </p>

                    <div className="space-y-4">
                        {selectedEngineeringProjects.slice(0, 4).map((p) => (
                            <div
                                key={p.id}
                                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                            >
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-orbitron font-bold text-sm text-white">{p.name}</h3>
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/25">
                                            {p.engineeringFocus}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-300 font-sans">{p.problem}</p>
                                </div>
                                {p.githubUrl && (
                                    <a
                                        href={p.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-mono text-sky-400 hover:text-white shrink-0 inline-flex items-center gap-1"
                                    >
                                        <span>View Code</span>
                                        <ArrowUpRight size={12} />
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. Networking & Cybersecurity Learning */}
            <section className="py-14 px-4 border-b border-slate-800/80">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-2">
                        <Award size={18} className="text-sky-400" />
                        <h2 className="font-orbitron text-xl sm:text-2xl font-bold text-white">
                            NETWORKING &amp; CYBERSECURITY LEARNING
                        </h2>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm font-mono mb-6">
                        {">"} Cisco Networking Academy curriculum and verifiable badges.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3">
                        {ciscoAchievements.map((item) => (
                            <div key={item.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                                <div>
                                    <h4 className="font-orbitron font-bold text-xs text-white">{item.title}</h4>
                                    <span className="text-[10px] font-mono text-slate-400">{item.issuer} • {item.issuedDate}</span>
                                </div>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700">
                                    {item.type}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. Current Focus & Consultation CTA */}
            <section className="py-14 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-orbitron text-xl sm:text-2xl font-bold text-white mb-3">
                        CURRENT FOCUS
                    </h2>
                    <p className="text-slate-300 text-xs sm:text-sm font-sans max-w-2xl mx-auto mb-6 leading-relaxed">
                        Currently focused on executing cybersecurity audits, Linux server troubleshooting, AIOps monitoring setups, and automation projects for growing businesses and technical teams across India.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <TrackedLink
                            href={LINKS.calendly}
                            source="about_bottom"
                            event="calendly_open"
                            className="px-6 py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-200 text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-md"
                        >
                            Book Technical Consultation
                        </TrackedLink>
                        <TrackedLink
                            href={LINKS.whatsapp}
                            source="about_bottom_wa"
                            event="whatsapp_click"
                            className="px-6 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 text-xs font-mono uppercase tracking-wider font-bold transition-all"
                        >
                            WhatsApp Direct
                        </TrackedLink>
                    </div>
                </div>
            </section>
        </PageShell>
    );
}
