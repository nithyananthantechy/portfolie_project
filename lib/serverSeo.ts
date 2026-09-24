import { cookies } from "next/headers";
import type { Metadata } from "next";
import { pickLocale, type Locale } from "@/lib/i18n";
import { SITE, LINKS } from "@/lib/siteData";

/** Resolves the active locale from `?lang=` (preferred) or the `lang` cookie. */
export async function resolveLocale(searchLang?: string | null): Promise<Locale> {
    const store = await cookies();
    return pickLocale(store.get("lang")?.value, searchLang);
}

/** Shared hreflang alternates for locale-aware pages. */
export function languageAlternates(path: string) {
    const url = `${SITE.baseUrl}${path}`;
    return {
        canonical: url,
        languages: {
            en: url,
            ta: `${SITE.baseUrl}${path}${path.includes("?") ? "&" : "?"}lang=ta`,
        },
    };
}

export function baseOpenGraph(path: string) {
    return {
        type: "website" as const,
        locale: "en_US" as const,
        url: `${SITE.baseUrl}${path}`,
        siteName: `${SITE.name} | Cybersecurity & IT Infrastructure Engineer`,
        title: `${SITE.name} | Cybersecurity & IT Infrastructure Engineer`,
        description: "Linux • AIOps • Cybersecurity • Infrastructure Automation",
        images: [
            {
                url: SITE.ogImage,
                width: 1200,
                height: 630,
                alt: `${SITE.name} — Cybersecurity & IT Infrastructure Engineer`,
            },
        ],
    };
}

export function defaultKeywords() {
    return [
        "Nithyananthan Nagarajan",
        "Cybersecurity Engineer",
        "IT Infrastructure Engineer",
        "AIOps Engineer",
        "Linux Engineer",
        "Linux System Administrator",
        "Cybersecurity Consultant",
        "IT Infrastructure Consultant",
        "Server Troubleshooting",
        "AIOps Monitoring",
        "Infrastructure Automation",
        "Cybersecurity Assessment",
        "Erode Tamil Nadu India",
        "NITECHSPARK",
        LINKS.linkedin,
        LINKS.github,
    ];
}
