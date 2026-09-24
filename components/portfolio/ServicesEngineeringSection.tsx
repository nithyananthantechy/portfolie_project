"use client";

import { motion } from "framer-motion";
import { commercialServices, WORKFLOW, LINKS } from "@/lib/siteData";
import TrackedLink from "@/components/TrackedLink";
import { Wrench, ShieldAlert, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ServicesEngineeringSection() {
    return (
        <section id="services" className="py-20 px-4 border-t border-slate-800/80">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-sky-400" />
                        <span className="text-xs font-mono text-sky-400 tracking-widest uppercase font-semibold">
                            HIREABLE HANDS-ON ENGINEERING
                        </span>
                    </div>
                    <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white section-heading">
                        CYBERSECURITY &amp; IT INFRASTRUCTURE SERVICES
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-mono mt-3 max-w-3xl">
                        {">"} Direct engineering delivery by Nithyananthan Nagarajan via NITECHSPARK. No agency layers — hands-on systems administration, server hardening, and proactive monitoring setups.
                    </p>

                    {/* Workflow Banner */}
                    <div className="mt-6 p-4 rounded-xl border border-sky-500/30 bg-sky-950/30 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-mono text-xs">
                        <span className="text-slate-400 uppercase tracking-wider font-semibold">ENGINEERING WORKFLOW:</span>
                        {WORKFLOW.map((step, idx) => (
                            <span key={step} className="flex items-center gap-2 text-white font-bold">
                                <span className="text-sky-400">{step}</span>
                                {idx < WORKFLOW.length - 1 && <span className="text-slate-600">→</span>}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {commercialServices.map((service, idx) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: (idx % 4) * 0.08 }}
                            className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-800/80 hover:border-sky-500/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between"
                            style={{ background: "rgba(15, 23, 42, 0.65)" }}
                        >
                            <div>
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <h3 className="font-orbitron font-bold text-lg text-white">
                                        {service.title}
                                    </h3>
                                    {service.priceAnchor && (
                                        <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-sky-400 font-semibold shrink-0">
                                            {service.priceAnchor}
                                        </span>
                                    )}
                                </div>

                                {/* Problem */}
                                <div className="mb-3.5 text-xs text-slate-400">
                                    <strong className="text-slate-300 font-semibold block mb-0.5">Problem:</strong>
                                    <p className="leading-relaxed font-sans">{service.problem}</p>
                                </div>

                                {/* Scope */}
                                <div className="mb-4 text-xs text-slate-400">
                                    <strong className="text-sky-300 font-semibold block mb-0.5">Scope:</strong>
                                    <p className="leading-relaxed font-sans">{service.scope}</p>
                                </div>

                                {/* Deliverables */}
                                <div className="mb-5">
                                    <strong className="text-[11px] font-mono text-slate-300 uppercase tracking-wider block mb-2">
                                        Key Deliverables:
                                    </strong>
                                    <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                                        {service.deliverables.map((deliv, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <CheckCircle2 size={13} className="text-sky-400 shrink-0 mt-0.5" />
                                                <span className="leading-relaxed">{deliv}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="pt-4 border-t border-slate-800/80">
                                <TrackedLink
                                    href={service.ctaHref}
                                    source={`service_${service.id}`}
                                    event="calendly_open"
                                    className="w-full py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 hover:border-sky-500/40 text-slate-200 hover:text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2"
                                >
                                    <span>{service.ctaLabel}</span>
                                    <ArrowRight size={13} />
                                </TrackedLink>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Scoping Note */}
                <div className="mt-10 p-5 rounded-2xl border border-slate-800 bg-slate-900/50 text-center max-w-3xl mx-auto">
                    <p className="text-xs sm:text-sm text-slate-300 font-sans">
                        Need a custom infrastructure audit or emergency server troubleshooting? Every engagement begins with a written scope of work and mutual confidentiality agreement before accessing systems.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3 justify-center">
                        <TrackedLink
                            href={LINKS.calendly}
                            source="services_bottom_cta"
                            event="calendly_open"
                            className="px-5 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-200 text-xs font-mono uppercase tracking-wider font-bold transition-all"
                        >
                            Book Technical Consultation
                        </TrackedLink>
                        <TrackedLink
                            href={LINKS.whatsapp}
                            source="services_bottom_wa"
                            event="whatsapp_click"
                            className="px-5 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono uppercase tracking-wider font-bold transition-all"
                        >
                            WhatsApp Direct
                        </TrackedLink>
                    </div>
                </div>
            </div>
        </section>
    );
}
