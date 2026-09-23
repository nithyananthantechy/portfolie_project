import Navbar from "@/components/Navbar";
import Footer from "@/components/portfolio/Footer";
import { StickyMobileBar } from "@/components/portfolio/Sections";
import MatrixBackground from "@/components/MatrixBackground";
import InteractiveCyberCanvas from "@/components/InteractiveCyberCanvas";
import DraggableAiWidget from "@/components/DraggableAiWidget";
import type { Locale } from "@/lib/i18n";

/** Shared chrome for secondary pages (services, work, about, faq, press, blog…). */
export default function PageShell({
    children,
    locale = "en",
}: {
    children: React.ReactNode;
    locale?: Locale;
}) {
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
            <main className="pt-24">{children}</main>
            <Footer />
            <StickyMobileBar />
        </div>
    );
}
