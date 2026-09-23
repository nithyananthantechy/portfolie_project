import type { Metadata } from "next";
import PortfolioView from "@/components/portfolio/PortfolioView";
import { resolveLocale, languageAlternates, baseOpenGraph, defaultKeywords } from "@/lib/serverSeo";
import { SITE } from "@/lib/siteData";

export const metadata: Metadata = {
    title: {
        default: `${SITE.name} | Founder-led Cybersecurity & IT Infrastructure · NITECHSPARK`,
        template: `%s | ${SITE.name} · ${SITE.company}`,
    },
    description: SITE.description,
    keywords: defaultKeywords(),
    authors: [{ name: SITE.name, url: SITE.baseUrl }],
    creator: SITE.name,
    publisher: SITE.company,
    alternates: languageAlternates("/portfolio"),
    openGraph: {
        ...baseOpenGraph("/portfolio"),
        title: `${SITE.name} | Founder & CEO · ${SITE.company}`,
        description: SITE.description,
    },
    twitter: {
        card: "summary_large_image",
        title: `${SITE.name} | Founder & CEO · ${SITE.company}`,
        description: SITE.description,
        images: [SITE.ogImage],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    other: {
        "theme-color": SITE.themeColor,
    },
};

export default async function PortfolioPage({
    searchParams,
}: {
    searchParams: Promise<{ lang?: string }>;
}) {
    const sp = await searchParams;
    const locale = await resolveLocale(sp.lang);
    return <PortfolioView locale={locale} />;
}
