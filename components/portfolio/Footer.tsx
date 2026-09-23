import { SITE, LINKS, copyrightYear, offers, PRIMARY_CTA } from "@/lib/siteData";
import TrackedLink from "@/components/TrackedLink";

/** Site footer — dynamic year, single LinkedIn URL, checklist promotion, page links. */
export default function Footer() {
    const year = copyrightYear();

    return (
        <footer className="py-10 px-4 border-t border-slate-800/80 pb-28 md:pb-10">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Lead magnet strip */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-slate-800 bg-slate-950/50">
                    <p className="text-xs font-sans text-slate-300 text-center sm:text-left">
                        <strong className="text-white">Free:</strong> MSME Cyber Risk Self-Check Checklist — 20 yes/no questions, 1 page PDF.
                    </p>
                    <a
                        href={LINKS.checklist}
                        className="text-xs font-mono font-semibold px-4 py-2 rounded-lg bg-sky-500/15 border border-sky-500/40 text-sky-300 hover:bg-sky-500/25 transition-all whitespace-nowrap"
                    >
                        ⬇ Download PDF
                    </a>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-5">
                    <p className="text-xs font-mono text-slate-500 leading-relaxed">
                        © {year} {SITE.name} · {SITE.company} · ALL RIGHTS RESERVED
                        <br />
                        <span className="text-[10px] text-slate-600">
                            ERODE, TAMIL NADU, INDIA · UDYAM MSME REGISTERED · FOUNDER-LED &amp; DEDICATED CYBER TEAM
                        </span>
                    </p>

                    <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-mono text-slate-400">
                        <a href="/services" className="hover:text-white transition-colors">Services</a>
                        <a href="/work" className="hover:text-white transition-colors">Work</a>
                        <a href="/about" className="hover:text-white transition-colors">About</a>
                        <a href="/blog" className="hover:text-white transition-colors">Blog</a>
                        <a href="/faq" className="hover:text-white transition-colors">FAQ</a>
                        <a href="/press" className="hover:text-white transition-colors">Press</a>
                        <span className="text-slate-700">·</span>
                        <a
                            href={LINKS.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-sky-400 transition-colors"
                        >
                            LinkedIn
                        </a>
                        <a
                            href={LINKS.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-pink-400 transition-colors"
                        >
                            Instagram
                        </a>
                        <a href={LINKS.nitechspark} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            NITECHSPARK
                        </a>
                        <a href={LINKS.nitehire} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            NiteHire
                        </a>
                    </nav>
                </div>

                <div className="text-center">
                    <TrackedLink
                        href={LINKS.calendly}
                        source="footer"
                        event="calendly_open"
                        className="inline-block px-5 py-2.5 rounded-lg bg-white text-slate-950 hover:bg-slate-200 font-rajdhani font-bold uppercase tracking-wider text-xs transition-all shadow-md"
                    >
                        {PRIMARY_CTA.label}
                    </TrackedLink>
                    <p className="text-[10px] text-slate-600 font-mono mt-3">
                        Price anchors: {offers.slice(0, 3).map((o) => `${o.name.split("—").pop()?.trim()} ${o.price}`).join(" · ")} ·{" "}
                        <a href={LINKS.pricing} className="underline hover:text-slate-400" target="_blank" rel="noopener noreferrer">
                            full pricing
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
