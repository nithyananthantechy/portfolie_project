"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import TrackedLink from "@/components/TrackedLink";
import { LINKS } from "@/lib/siteData";
import { getDict, type Locale } from "@/lib/i18n";

const OPTION_IDS = [
    "cybersecurity",
    "devops",
    "ats",
    "partnership",
    "other",
] as const;

type OptionId = (typeof OPTION_IDS)[number];

/**
 * Self-qualification chooser.
 * Each pick either opens Calendly (with utm_content=<option>) or pre-fills #contact.
 */
export default function SelfQualify({ locale }: { locale: Locale }) {
    const t = getDict(locale).hero;
    const [selected, setSelected] = useState<OptionId>("cybersecurity");

    const labels: Record<OptionId, string> = {
        cybersecurity: "Cybersecurity Assessment",
        devops: "IT / DevOps help",
        ats: "AI Recruitment ATS",
        partnership: "Product Partnership",
        other: "Something else",
    };

    useEffect(() => {
        const stored = sessionStorage.getItem("ns_qualify");
        if (stored && (OPTION_IDS as readonly string[]).includes(stored)) {
            setSelected(stored as OptionId);
        }
    }, []);

    const select = (id: OptionId) => {
        setSelected(id);
        track("qualify_select", { option: id });
        try {
            sessionStorage.setItem("ns_qualify", id);
        } catch {
            /* ignore */
        }
    };

    const prefillForm = () => {
        try {
            sessionStorage.setItem(
                "ns_topic",
                `I need help with: ${labels[selected]}`
            );
        } catch {
            /* ignore */
        }
        track("cta_click", { source: "qualify_prefill", option: selected });
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section aria-label="Self qualification" className="py-10 px-4">
            <div
                className="max-w-4xl mx-auto rounded-2xl border border-slate-800/80 p-6 sm:p-8 backdrop-blur-xl text-center"
                style={{ background: "rgba(15, 23, 42, 0.65)" }}
            >
                <h2 className="font-orbitron text-lg sm:text-xl font-bold text-white">{t.chooserTitle}</h2>
                <p className="text-xs text-slate-400 font-sans mt-2 mb-5">{t.chooserHint}</p>

                <div className="flex flex-wrap justify-center gap-2.5" role="radiogroup" aria-label={t.chooserTitle}>
                    {OPTION_IDS.map((id) => (
                        <button
                            key={id}
                            type="button"
                            role="radio"
                            aria-checked={selected === id}
                            onClick={() => select(id)}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-rajdhani font-bold uppercase tracking-wider transition-all border ${
                                selected === id
                                    ? "bg-white text-slate-950 border-white shadow-md"
                                    : "bg-slate-900/70 text-slate-300 border-slate-700 hover:border-sky-500/50 hover:text-white"
                            }`}
                        >
                            {labels[id]}
                        </button>
                    ))}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
                    <TrackedLink
                        href={LINKS.calendly}
                        source={`qualify_${selected}`}
                        event="calendly_open"
                        className="px-5 py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-rajdhani font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-white/10"
                    >
                        Book 15-min call about {labels[selected]}
                    </TrackedLink>
                    <button
                        type="button"
                        onClick={prefillForm}
                        className="px-5 py-3 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 font-rajdhani font-bold uppercase tracking-wider text-sm transition-all"
                    >
                        Prefer the form? Pre-fill it →
                    </button>
                </div>
            </div>
        </section>
    );
}
