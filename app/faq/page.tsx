import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import FaqSection from "@/components/portfolio/FaqSection";
import { resolveLocale, languageAlternates, baseOpenGraph } from "@/lib/serverSeo";
import { SITE, LINKS, PRIMARY_CTA } from "@/lib/siteData";
import TrackedLink from "@/components/TrackedLink";

export const metadata: Metadata = {
    title: "FAQ — Pricing, Scope, NDA, Payment Terms",
    description:
        "Ten honest answers: assessment pricing from ₹7,500, 9-area scope, no hack guarantees, NDA, payment terms, and who does the work.",
    alternates: languageAlternates("/faq"),
    openGraph: {
        ...baseOpenGraph("/faq"),
        title: `FAQ | ${SITE.name}`,
        description: "Ten honest answers on pricing, scope, NDA and payment terms.",
    },
};

export default async function FaqPage({
    searchParams,
}: {
    searchParams: Promise<{ lang?: string }>;
}) {
    const sp = await searchParams;
    const locale = await resolveLocale(sp.lang);

    return (
        <PageShell locale={locale}>
            <div className="pt-4">
                <FaqSection locale={locale} />
            </div>
            <section className="pb-16 px-4 text-center">
                <TrackedLink
                    href={LINKS.calendly}
                    source="faq_page"
                    event="calendly_open"
                    className="inline-block px-6 py-3.5 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-rajdhani font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-white/10"
                >
                    {PRIMARY_CTA.label}
                </TrackedLink>
            </section>
        </PageShell>
    );
}
