import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { resolveLocale, languageAlternates, baseOpenGraph } from "@/lib/serverSeo";
import {
    SITE,
    LINKS,
    BOILERPLATE_50,
    BOILERPLATE_100,
    PRESS_CONTACT,
    BRAND_COLORS,
    BRAND_TYPE,
    ventures,
    NITEORBIT_STATUS,
} from "@/lib/siteData";

export const metadata: Metadata = {
    title: "Press Kit — Boilerplate, Brand Assets, Contact",
    description: `${BOILERPLATE_50} Press contact and brand facts.`,
    alternates: languageAlternates("/press"),
    openGraph: {
        ...baseOpenGraph("/press"),
        title: `Press Kit | ${SITE.name} · ${SITE.company}`,
        description: BOILERPLATE_50,
    },
};

export default async function PressPage({
    searchParams,
}: {
    searchParams: Promise<{ lang?: string }>;
}) {
    const sp = await searchParams;
    const locale = await resolveLocale(sp.lang);

    return (
        <PageShell locale={locale}>
            <section className="py-14 px-4">
                <div className="max-w-4xl mx-auto space-y-10">
                    <header>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/25 bg-sky-500/10 text-xs font-mono text-sky-400 mb-3">
                            PRESS
                        </div>
                        <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white section-heading">
                            PRESS KIT
                        </h1>
                        <p className="text-slate-400 text-xs sm:text-sm font-sans mt-4">
                            Approved boilerplate and brand facts. Please do not invent clients, awards, funding, or
                            metrics — if a claim is not on this site, it is not approved.
                        </p>
                    </header>

                    <article className="glass-card rounded-2xl p-6 border border-slate-800/80" style={{ background: "rgba(15, 23, 42, 0.7)" }}>
                        <h2 className="font-orbitron text-lg font-bold text-white mb-3">Boilerplate — 50 words</h2>
                        <p className="text-sm text-slate-300 font-sans leading-relaxed">{BOILERPLATE_50}</p>
                    </article>

                    <article className="glass-card rounded-2xl p-6 border border-slate-800/80" style={{ background: "rgba(15, 23, 42, 0.7)" }}>
                        <h2 className="font-orbitron text-lg font-bold text-white mb-3">Boilerplate — 100 words</h2>
                        <p className="text-sm text-slate-300 font-sans leading-relaxed">{BOILERPLATE_100}</p>
                    </article>

                    <article className="glass-card rounded-2xl p-6 border border-slate-800/80" style={{ background: "rgba(15, 23, 42, 0.7)" }}>
                        <h2 className="font-orbitron text-lg font-bold text-white mb-4">Quick facts</h2>
                        <dl className="space-y-3 text-sm">
                            {[
                                ["Name", SITE.name],
                                ["Role", `${SITE.role}, ${SITE.company}`],
                                ["HQ", "Erode, Tamil Nadu, India"],
                                ["Registration", "Government of India Udyam MSME"],
                                ["Ventures", ventures.map((v) => `${v.name} (${v.statusLabel ?? v.status})`).join(" · ")],
                                ["NiteOrbit status", NITEORBIT_STATUS],
                                ["LinkedIn", LINKS.linkedin],
                                ["Email", LINKS.email],
                                ["Phone / WhatsApp", LINKS.phoneDisplay],
                                ["Booking", LINKS.calendly],
                                ["Website", SITE.baseUrl],
                            ].map(([k, v]) => (
                                <div key={k} className="flex flex-col sm:flex-row sm:gap-4 border-b border-slate-800 pb-2">
                                    <dt className="font-mono text-xs text-slate-500 sm:w-40 shrink-0 uppercase">{k}</dt>
                                    <dd className="text-slate-200 font-sans break-all">{v}</dd>
                                </div>
                            ))}
                        </dl>
                    </article>

                    <div className="grid sm:grid-cols-2 gap-5">
                        <article className="glass-card rounded-2xl p-6 border border-slate-800/80" style={{ background: "rgba(15, 23, 42, 0.7)" }}>
                            <h2 className="font-orbitron text-lg font-bold text-white mb-4">Brand colors</h2>
                            <ul className="space-y-3">
                                {BRAND_COLORS.map((c) => (
                                    <li key={c.hex} className="flex items-center gap-3">
                                        <span
                                            className="w-8 h-8 rounded-lg border border-slate-700 shrink-0"
                                            style={{ background: c.hex }}
                                            aria-hidden="true"
                                        />
                                        <div>
                                            <div className="text-sm text-white font-sans">{c.name}</div>
                                            <div className="text-xs font-mono text-slate-400">{c.hex}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </article>

                        <article className="glass-card rounded-2xl p-6 border border-slate-800/80" style={{ background: "rgba(15, 23, 42, 0.7)" }}>
                            <h2 className="font-orbitron text-lg font-bold text-white mb-4">Typography</h2>
                            <ul className="space-y-3 text-sm text-slate-300 font-sans">
                                <li>{BRAND_TYPE.display}</li>
                                <li>{BRAND_TYPE.body}</li>
                                <li>{BRAND_TYPE.mono}</li>
                            </ul>
                            <p className="text-xs font-mono text-slate-500 mt-5">Logo: /favicon.svg · OG image: /og-image.png</p>
                        </article>
                    </div>

                    <article className="rounded-2xl border border-sky-500/30 p-6" style={{ background: "rgba(15, 23, 42, 0.8)" }}>
                        <h2 className="font-orbitron text-lg font-bold text-white mb-3">{PRESS_CONTACT.label}</h2>
                        <p className="text-sm text-slate-300 font-sans">
                            Email{" "}
                            <a href={`mailto:${PRESS_CONTACT.email}`} className="text-sky-400 hover:text-white underline">
                                {PRESS_CONTACT.email}
                            </a>{" "}
                            · WhatsApp{" "}
                            <a href={LINKS.whatsapp} className="text-emerald-400 hover:text-white underline">
                                {PRESS_CONTACT.whatsapp}
                            </a>
                        </p>
                    </article>
                </div>
            </section>
        </PageShell>
    );
}
