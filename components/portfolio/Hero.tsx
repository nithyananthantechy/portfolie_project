import { SITE, LINKS, META_BADGES } from "@/lib/siteData";
import { getDict, type Locale } from "@/lib/i18n";
import TrackedLink from "@/components/TrackedLink";
import Image from "next/image";

/**
 * Above-the-fold professional engineering hero — server component.
 * Communicates technical credibility first: Linux, AIOps, Cybersecurity, IT Infrastructure.
 */
export default function Hero({ locale }: { locale: Locale }) {
    const t = getDict(locale).hero;

    return (
        <section
            id="hero"
            className="min-h-[90vh] flex items-center justify-center pt-28 pb-16 relative overflow-hidden"
        >
            {/* Subtle ambient background */}
            <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" aria-hidden="true" />
            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none opacity-20"
                style={{
                    background:
                        "radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(148,163,184,0.03) 50%, transparent 75%)",
                    filter: "blur(40px)",
                }}
                aria-hidden="true"
            />

            <div className="z-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center text-left">
                {/* Left: Professional Engineering Identity */}
                <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 animate-fade-in-up">
                    {/* Eyebrow */}
                    <div className="flex items-center gap-2.5 mb-3.5 px-3 py-1.5 rounded-full border border-sky-500/25 bg-sky-500/10">
                        <span className="w-2 h-2 rounded-full bg-sky-400" />
                        <span className="font-mono text-[11px] sm:text-xs text-sky-300 tracking-[0.2em] uppercase font-semibold">
                            {t.eyebrow}
                        </span>
                    </div>

                    {/* H1 */}
                    <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black tracking-tight mb-3 text-white leading-[1.12] break-words">
                        <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                            {t.titleLine1}
                        </span>{" "}
                        <span className="text-white">
                            {t.titleLine2}
                        </span>
                    </h1>

                    {/* Sub-identity: Engineering + Founder */}
                    <div className="mb-4 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                        <span className="text-xs sm:text-sm font-mono text-sky-400 font-semibold tracking-wider uppercase bg-sky-950/60 border border-sky-800/50 px-2.5 py-1 rounded">
                            {SITE.name}
                        </span>
                        <span className="text-slate-600 hidden sm:inline">•</span>
                        <span className="text-xs sm:text-sm font-mono text-slate-300 font-medium tracking-wide">
                            Founder &amp; CEO — NITECHSPARK
                        </span>
                    </div>

                    {/* Supporting line */}
                    <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-6 font-sans">
                        {t.bio}
                    </p>

                    {/* Badges / Verifiable Facts */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-7">
                        {META_BADGES.map((badge) => (
                            <span
                                key={badge}
                                className="text-[10px] sm:text-[11px] font-mono px-3 py-1 rounded-md border border-slate-800 bg-slate-900/80 text-slate-300 tracking-wider shadow-sm"
                            >
                                {badge}
                            </span>
                        ))}
                    </div>

                    {/* Primary CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-stretch sm:items-center justify-center lg:justify-start mb-5">
                        <TrackedLink
                            href={LINKS.calendly}
                            source="hero_primary"
                            event="calendly_open"
                            className="px-6 py-3.5 rounded-xl bg-white text-slate-950 hover:bg-slate-200 text-sm font-rajdhani font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-white/10"
                        >
                            <CalendarIcon />
                            <span>{t.primaryCta}</span>
                        </TrackedLink>

                        <a
                            href="#projects"
                            className="px-6 py-3.5 rounded-xl border border-sky-500/40 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 text-sm font-rajdhani font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        >
                            <span>{t.secondaryCta}</span>
                            <span aria-hidden="true">↓</span>
                        </a>

                        <TrackedLink
                            href={LINKS.whatsapp}
                            source="hero_whatsapp"
                            event="whatsapp_click"
                            className="px-5 py-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-sm font-rajdhani font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        >
                            <WhatsappIcon />
                            <span>{t.whatsappCta || "WhatsApp Me"}</span>
                        </TrackedLink>
                    </div>

                    {/* Verified profile links (GitHub & LinkedIn) */}
                    <div className="flex items-center gap-3 pt-2 text-xs font-mono text-slate-400">
                        <span className="text-slate-500">Verified:</span>
                        <a
                            href={LINKS.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sky-400 hover:text-white underline underline-offset-4 transition-colors"
                        >
                            <LinkedInIcon />
                            <span>View LinkedIn</span>
                        </a>
                        <span className="text-slate-700">|</span>
                        <a
                            href={LINKS.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white underline underline-offset-4 transition-colors"
                        >
                            <GitHubIcon />
                            <span>View GitHub</span>
                        </a>
                    </div>
                </div>

                {/* Right: Clean Professional Portrait */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
                    <div
                        className="relative w-64 h-80 sm:w-72 sm:h-92 md:w-80 md:h-[410px] rounded-2xl p-2.5 border border-slate-800/90 bg-slate-900/60 backdrop-blur-xl group hover:border-sky-500/30 transition-all duration-300"
                        style={{
                            boxShadow:
                                "0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.04)",
                        }}
                    >
                        <div className="w-full h-full rounded-xl overflow-hidden border border-slate-800 relative bg-black/60">
                            <Image
                                src={SITE.headshot}
                                alt={`${SITE.name} — Cybersecurity & IT Infrastructure Engineer`}
                                fill
                                priority
                                sizes="(max-width: 768px) 288px, 320px"
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent opacity-60 pointer-events-none" />
                            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800/80">
                                <div className="text-[11px] font-orbitron font-bold text-white tracking-wide">
                                    {SITE.name}
                                </div>
                                <div className="text-[10px] font-mono text-sky-400">
                                    Cybersecurity &amp; IT Infrastructure
                                </div>
                            </div>
                        </div>

                        {/* Subtle corner brackets */}
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-sky-400/60" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-sky-400/60" />
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-sky-400/60" />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-sky-400/60" />
                    </div>
                </div>
            </div>

            {/* In-page navigation helper */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-6 text-[11px] font-mono text-slate-500">
                <a href="#experience" className="hover:text-sky-400 transition-colors">EXPERIENCE</a>
                <a href="#skills" className="hover:text-sky-400 transition-colors">SKILLS</a>
                <a href="#aiops" className="hover:text-sky-400 transition-colors">AIOPS</a>
                <a href="#projects" className="hover:text-sky-400 transition-colors">PROJECTS</a>
                <a href="#services" className="hover:text-sky-400 transition-colors">SERVICES</a>
                <a href="#cisco" className="hover:text-sky-400 transition-colors">CREDENTIALS</a>
                <a href="#contact" className="hover:text-sky-400 transition-colors">CONTACT</a>
            </div>
        </section>
    );
}

function CalendarIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
    );
}

function WhatsappIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
    );
}

function GitHubIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
        </svg>
    );
}
