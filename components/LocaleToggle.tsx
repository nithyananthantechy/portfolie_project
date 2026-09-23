"use client";

import { usePathname, useRouter } from "next/navigation";
import { track, type TrackEvent } from "@/lib/analytics";

/**
 * Manual language toggle (required by spec). Sets a `lang` cookie + `?lang=` param
 * and refreshes so the server re-renders in the chosen locale.
 */
export default function LocaleToggle({ locale }: { locale: "en" | "ta" }) {
    const router = useRouter();
    const pathname = usePathname();

    const switchTo = (next: "en" | "ta") => {
        if (next === locale) return;
        document.cookie = `lang=${next};path=/;max-age=31536000;samesite=lax`;
        const url = new URL(window.location.href);
        if (next === "en") url.searchParams.delete("lang");
        else url.searchParams.set("lang", next);
        track("locale_toggle" as TrackEvent, { locale: next });
        router.push(url.pathname + url.search + url.hash);
        router.refresh();
    };

    return (
        <div
            className="flex items-center rounded-lg border border-slate-800 bg-slate-900/60 overflow-hidden"
            role="group"
            aria-label="Language / மொழி"
        >
            <button
                type="button"
                onClick={() => switchTo("en")}
                aria-pressed={locale === "en"}
                className={`px-2 py-1 text-[11px] font-mono transition-colors ${
                    locale === "en" ? "bg-sky-500/20 text-sky-300 font-semibold" : "text-slate-400 hover:text-white"
                }`}
            >
                EN
            </button>
            <button
                type="button"
                onClick={() => switchTo("ta")}
                aria-pressed={locale === "ta"}
                className={`px-2 py-1 text-[11px] font-mono transition-colors ${
                    locale === "ta" ? "bg-sky-500/20 text-sky-300 font-semibold" : "text-slate-400 hover:text-white"
                }`}
            >
                தமிழ்
            </button>
        </div>
    );
}
