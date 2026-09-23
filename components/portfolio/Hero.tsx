import { SITE, LINKS, PRIMARY_CTA, SECONDARY_CTA, META_BADGES } from "@/lib/siteData";
import { getDict, type Locale } from "@/lib/i18n";
import TrackedLink from "@/components/TrackedLink";
import Image from "next/image";

/**
 * Above-the-fold conversion hero — pure server component.
 * Fully present in initial HTML (no JS gate, no spinner). Animation only enhances.
 */
export default function Hero({ locale }: { locale: Locale }) {
    const t = getDict(locale).hero;

    return (
        <section id="hero" className="min-h-[90vh] flex items-center justify-center pt-32 pb-16 relative overflow-hidden">
            {/* ambient background (server-safe CSS, no JS) */}
            <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" aria-hidden="true" />
            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-25"
                style={{
                    background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, rgba(148,163,184,0.04) 50%, transparent 75%)",
                    filter: "blur(35px)",
                }}
                aria-hidden="true"
            />

            <div className="z-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center text-left">
                {/* Left — text (crawler-visible H1 + intro) */}
                <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 animate-fade-in-up">
                    <div className="flex items-center gap-2.5 mb-4">
                        <span className="w-2 h-2 rounded-full bg-sky-400" />
                        <span className="font-mono text-[11px] sm:text-xs text-sky-400 tracking-[0.25em] uppercase font-semibold">
                            {t.eyebrow}
                        </span>
                    </div>

                    <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-white leading-tight break-words">
                        <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                            {t.titleLine1}
                        </span>
                        <br />
                        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-extrabold tracking-wide">
                            {t.titleLine2}
                        </span>
                    </h1>

                    <div className="mb-5 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                        <span className="font-rajdhani text-sm md:text-base text-slate-100 font-bold tracking-[0.16em] uppercase">
                            {t.role}
                        </span>
                        <span className="text-slate-600 hidden sm:inline">|</span>
                        <span className="text-xs font-mono text-sky-400 font-semibold tracking-wider">
                            {t.specialty}
                        </span>
                    </div>

                    <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-7 font-sans">
                        {t.bio}
                    </p>

                    {/* Meta badges — facts only */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 mb-8">
                        {META_BADGES.map((badge) => (
                            <span
                                key={badge}
                                className="text-[10px] sm:text-xs font-mono px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 tracking-wider shadow-sm"
                            >
                                {badge}
                            </span>
                        ))}
                    </div>

                    {/* ONE dominant primary CTA + secondary WhatsApp */}
                    <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto items-stretch sm:items-center justify-center lg:justify-start">
                        <TrackedLink
                            href={LINKS.calendly}
                            source="hero_primary"
                            event="calendly_open"
                            className="px-6 py-3.5 rounded-xl bg-white text-slate-950 hover:bg-slate-200 text-sm sm:text-base font-rajdhani font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-white/15"
                        >
                            <CalendarIcon />
                            <span>{t.primaryCta}</span>
                        </TrackedLink>

                        <TrackedLink
                            href={LINKS.whatsapp}
                            source="hero_whatsapp"
                            event="whatsapp_click"
                            className="px-5 py-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-sm font-rajdhani font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                        >
                            <WhatsappIcon />
                            <span>{t.secondaryCta}</span>
                        </TrackedLink>
                    </div>
                </div>

                {/* Right — professional headshot */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
                    <div
                        className="relative w-64 h-80 sm:w-72 sm:h-92 md:w-80 md:h-[400px] rounded-3xl p-3 border border-slate-800 bg-slate-900/60 backdrop-blur-xl group hover:border-sky-500/40 transition-all duration-500"
                        style={{ boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.06)" }}
                    >
                        <div
                            className="absolute inset-0 rounded-3xl border border-dashed border-sky-500/20 animate-spin pointer-events-none"
                            style={{ animationDuration: "36s" }}
                            aria-hidden="true"
                        />
                        <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-800 relative bg-black/50">
                            <Image
                                src={SITE.headshot}
                                    alt={`${SITE.name} — Founder & CEO, NITECHSPARK`}
                                fill
                                priority
                                sizes="(max-width: 768px) 288px, 320px"
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-50 pointer-events-none" />
                        </div>
                        <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-sky-400/60" />
                        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-sky-400/60" />
                        <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-sky-400/60" />
                        <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-sky-400/60" />
                    </div>
                </div>
            </div>

            {/* secondary in-page navigation (never competes with primary CTA) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-5 text-xs font-mono text-slate-500">
                <a href="#services-preview" className="hover:text-sky-400 transition-colors">SERVICES</a>
                <a href="#products" className="hover:text-sky-400 transition-colors">PRODUCTS</a>
                <a href="#why-us" className="hover:text-sky-400 transition-colors">WHY US</a>
                <a href="#faq" className="hover:text-sky-400 transition-colors">FAQ</a>
                <a href="#contact" className="hover:text-sky-400 transition-colors">CONTACT</a>
            </div>
        </section>
    );
}

function CalendarIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
