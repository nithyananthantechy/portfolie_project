import type { Metadata } from "next";
import PortfolioView from "@/components/portfolio/PortfolioView";
import { resolveLocale, languageAlternates, baseOpenGraph, defaultKeywords } from "@/lib/serverSeo";
import { SITE } from "@/lib/siteData";

export const metadata: Metadata = {
    title: `${SITE.name} | Founder-led Cybersecurity, IT & AI Studio · ${SITE.company}`,
    description: SITE.description,
    keywords: defaultKeywords(),
    alternates: languageAlternates("/"),
    openGraph: {
        ...baseOpenGraph("/"),
        title: `${SITE.name} | Founder & CEO · ${SITE.company}`,
        description: SITE.description,
    },
    twitter: {
        card: "summary_large_image",
        title: `${SITE.name} | Founder & CEO · ${SITE.company}`,
        description: SITE.description,
        images: [SITE.ogImage],
    },
};

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ lang?: string }>;
}) {
    const sp = await searchParams;
    const locale = await resolveLocale(sp.lang);
    return <PortfolioView locale={locale} />;
}
