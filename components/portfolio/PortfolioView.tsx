import MatrixBackground from "@/components/MatrixBackground";
import InteractiveCyberCanvas from "@/components/InteractiveCyberCanvas";
import DraggableAiWidget from "@/components/DraggableAiWidget";
import Navbar from "@/components/Navbar";
import TerminalBlock from "@/components/TerminalBlock";
import VentureCard from "@/components/VentureCard";
import SkillsSection from "@/components/portfolio/SkillsSection";
import Timeline from "@/components/Timeline";
import PublicationsSection from "@/components/PublicationsSection";
import BlogSection from "@/components/BlogSection";
import DailyUpdatesSection from "@/components/DailyUpdatesSection";

import Hero from "@/components/portfolio/Hero";
import SelfQualify from "@/components/portfolio/SelfQualify";
import ContactSection from "@/components/portfolio/ContactSection";
import FaqSection from "@/components/portfolio/FaqSection";
import ChecklistCta from "@/components/portfolio/ChecklistCta";
import ProductsSection from "@/components/portfolio/ProductsSection";
import Footer from "@/components/portfolio/Footer";
import {
    CredentialsStrip,
    StatsStrip,
    WhyWorkWithUs,
    ServicesPreview,
    StickyMobileBar,
} from "@/components/portfolio/Sections";

import { ventures, products } from "@/lib/siteData";
import type { Locale } from "@/lib/i18n";

/**
 * The full portfolio page — SERVER COMPONENT.
 * All sections render into initial HTML (no loading spinner, no client-only gate).
 * Client components below hydrate on top of server-rendered markup.
 */
export default function PortfolioView({ locale }: { locale: Locale }) {
    return (
        <div
            className="min-h-screen font-rajdhani selection:bg-sky-400/20 selection:text-white relative"
            style={{ background: "var(--bg)" }}
            lang={locale}
        >
            <MatrixBackground />
            <InteractiveCyberCanvas />
            <DraggableAiWidget />
            <Navbar locale={locale} />

            <main>
                <Hero locale={locale} />
                <CredentialsStrip locale={locale} />
                <StatsStrip venturesCount={ventures.length} productsCount={products.length} />
                <SelfQualify locale={locale} />
                <WhyWorkWithUs locale={locale} />
                <ServicesPreview locale={locale} />

                {/* Ventures */}
                <section id="ventures" className="py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-12">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-sky-400" />
                                <span className="text-xs font-mono text-sky-400 tracking-widest uppercase font-semibold">
                                    FOUNDER&apos;S VENTURES
                                </span>
                            </div>
                            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                                VENTURES &amp; PRODUCTS
                            </h2>
                            <p className="text-slate-400 text-xs sm:text-sm font-mono mt-3">
                                {">"} Ventures built and led by Nithyananthan Nagarajan under the NITECHSPARK brand.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {ventures.map((v, i) => (
                                <VentureCard key={v.name} {...v} index={i} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Interactive terminal */}
                <section className="py-16 px-4">
                    <TerminalBlock />
                </section>

                <ProductsSection products={products} />
                <PublicationsSection />
                <BlogSection />
                <DailyUpdatesSection />
                <SkillsSection />
                <Timeline />
                <ChecklistCta />
                <ContactSection locale={locale} />
                <FaqSection locale={locale} />
            </main>

            <Footer />
            <StickyMobileBar />

            {/* Desktop floating WhatsApp (mobile uses the sticky bar) */}
            <a
                href="https://wa.me/916385576354"
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                className="fixed bottom-6 right-6 z-40 hidden md:flex w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 items-center justify-center text-white shadow-2xl hover:scale-105 transition-all duration-200"
                style={{ boxShadow: "0 0 25px rgba(16, 185, 129, 0.4)" }}
                aria-label="Direct WhatsApp Chat"
            >
                <span aria-hidden="true" className="text-xl">💬</span>
            </a>
        </div>
    );
}
