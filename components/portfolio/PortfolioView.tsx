import MatrixBackground from "@/components/MatrixBackground";
import InteractiveCyberCanvas from "@/components/InteractiveCyberCanvas";
import DraggableAiWidget from "@/components/DraggableAiWidget";
import Navbar from "@/components/Navbar";
import TerminalBlock from "@/components/TerminalBlock";
import Footer from "@/components/portfolio/Footer";
import { CredentialsStrip, StickyMobileBar } from "@/components/portfolio/Sections";

import Hero from "@/components/portfolio/Hero";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import AiOpsSection from "@/components/portfolio/AiOpsSection";
import SelectedProjectsSection from "@/components/portfolio/SelectedProjectsSection";
import ServicesEngineeringSection from "@/components/portfolio/ServicesEngineeringSection";
import CiscoAchievementsSection from "@/components/portfolio/CiscoAchievementsSection";
import FounderVenturesSection from "@/components/portfolio/FounderVenturesSection";
import OtherProjectsSection from "@/components/portfolio/OtherProjectsSection";
import ContactSection from "@/components/portfolio/ContactSection";
import FaqSection from "@/components/portfolio/FaqSection";
import ChecklistCta from "@/components/portfolio/ChecklistCta";

import type { Locale } from "@/lib/i18n";
import { LINKS } from "@/lib/siteData";

/**
 * The full portfolio page — SERVER COMPONENT.
 * Homepage Flow:
 * ENGINEER → EXPERIENCE → SKILLS → AIOPS → PROJECTS → SERVICES → CREDENTIALS → FOUNDER → OTHER PROJECTS → CONTACT
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
                {/* 1. Hero */}
                <Hero locale={locale} />
                <CredentialsStrip locale={locale} />

                {/* 2. Professional Experience */}
                <ExperienceSection />

                {/* 3. Core Technical Skills */}
                <SkillsSection />

                {/* 4. AIOps & Infrastructure Engineering */}
                <AiOpsSection />

                {/* 5. Selected Engineering Projects */}
                <SelectedProjectsSection />

                {/* 6. Cybersecurity & Infrastructure Services */}
                <ServicesEngineeringSection />

                {/* 7. Cisco Networking Academy Achievements */}
                <CiscoAchievementsSection />

                {/* 8. Founder / NITECHSPARK */}
                <FounderVenturesSection />

                {/* Interactive Diagnostic Terminal */}
                <section className="py-14 px-4 border-t border-slate-800/80">
                    <TerminalBlock />
                </section>

                {/* 9. Other Projects & Experiments */}
                <OtherProjectsSection />

                {/* Lead Magnet / Security Self-Check */}
                <ChecklistCta />

                {/* 10. Contact */}
                <ContactSection locale={locale} />
                <FaqSection locale={locale} />
            </main>

            <Footer />
            <StickyMobileBar />

            {/* Desktop floating WhatsApp */}
            <a
                href={LINKS.whatsapp}
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
