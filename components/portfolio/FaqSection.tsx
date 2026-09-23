import { getFaqs, type Locale } from "@/lib/i18n";

/** Visible FAQ (details/summary — works with zero JS) + matching FAQPage JSON-LD. */
export default function FaqSection({
    locale,
    embedSchema = true,
}: {
    locale: Locale;
    embedSchema?: boolean;
}) {
    const faqs = getFaqs(locale);
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
    };

    return (
        <section id="faq" className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/25 bg-sky-500/10 text-xs font-mono text-sky-400 mb-3">
                        FAQ
                    </div>
                    <h2 className="font-orbitron text-2xl sm:text-3xl font-bold text-white section-heading">
                        FREQUENTLY ASKED QUESTIONS
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-sans mt-4">
                        Ten honest answers — including what we will not promise.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <details
                            key={idx}
                            className="glass-card rounded-xl p-5 border border-slate-800/80 group cursor-pointer"
                            style={{ background: "rgba(15, 23, 42, 0.65)" }}
                            open={idx === 0}
                        >
                            <summary className="font-orbitron text-sm sm:text-base font-bold text-white flex items-center justify-between list-none select-none group-hover:text-sky-300 transition-colors">
                                <span>{faq.q}</span>
                                <span className="text-slate-500 group-open:rotate-180 transition-transform" aria-hidden="true">
                                    ▾
                                </span>
                            </summary>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3.5 pt-3 border-t border-slate-800 font-sans">
                                {faq.a}
                            </p>
                        </details>
                    ))}
                </div>
            </div>

            {embedSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            )}
        </section>
    );
}
