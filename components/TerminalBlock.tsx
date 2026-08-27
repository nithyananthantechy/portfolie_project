"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal, CornerDownLeft, Play, Sparkles } from "lucide-react";

interface CommandLog {
    command: string;
    response: string | React.ReactNode;
}

const defaultCommands = [
    "whoami",
    "ventures",
    "products",
    "skills",
    "contact",
    "msme",
    "clear",
];

export default function TerminalBlock() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [logs, setLogs] = useState<CommandLog[]>([]);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollBottomRef = useRef<HTMLDivElement>(null);

    // Initial sequence
    useEffect(() => {
        if (!isInView) return;

        const initialLogs: CommandLog[] = [
            {
                command: "nsk --init-handshake",
                response: (
                    <div className="text-emerald-400 space-y-1">
                        <p>[ OK ] HOST: nsk-groups-primary-node.local</p>
                        <p>[ OK ] OPERATOR: Nithyananthan Nagarajan (CMD)</p>
                        <p>[ OK ] PROTOCOLS: Linux DevOps / Zero-Trust / AI Orchestration</p>
                    </div>
                ),
            },
            {
                command: "whoami",
                response: (
                    <div className="text-text-primary/80 space-y-1">
                        <p className="text-neon font-bold">NITHYANANTHAN NAGARAJAN</p>
                        <p>Founder, Chairman & Managing Director of NSK Groups</p>
                        <p>Founder of NiTechSpark · NiteHire · NiteOrbit</p>
                        <p className="text-xs text-text-primary/50">Location: Erode, Tamil Nadu, India · MSME Registered</p>
                    </div>
                ),
            },
        ];

        setLogs(initialLogs);
    }, [isInView]);

    useEffect(() => {
        scrollBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    const executeCommand = (cmd: string) => {
        const cleanCmd = cmd.trim().toLowerCase();
        if (!cleanCmd) return;

        let response: React.ReactNode = "";

        switch (cleanCmd) {
            case "help":
                response = (
                    <div className="text-text-primary/70 space-y-1">
                        <p className="text-neon font-bold">AVAILABLE COMMANDS:</p>
                        <p>• <span className="text-neon">whoami</span> — Identity and background</p>
                        <p>• <span className="text-neon">ventures</span> — List 3 core ventures under NSK Groups</p>
                        <p>• <span className="text-neon">products</span> — Catalog of 10+ live platforms</p>
                        <p>• <span className="text-neon">skills</span> — Hard engineering & SRE competencies</p>
                        <p>• <span className="text-neon">contact</span> — Direct comms channels & WhatsApp</p>
                        <p>• <span className="text-neon">msme</span> — Official government registration status</p>
                        <p>• <span className="text-neon">clear</span> — Purge terminal buffer</p>
                    </div>
                );
                break;

            case "whoami":
                response = (
                    <div className="text-text-primary/80 space-y-1">
                        <p className="text-neon font-bold">NITHYANANTHAN NAGARAJAN</p>
                        <p>Founder & CMD at NSK Groups. Infrastructure engineer turned multi-venture builder.</p>
                        <p>Specializes in Linux Kernel DevOps, AI Recruitment ATS, and Zero-Trust Compliance.</p>
                    </div>
                );
                break;

            case "ventures":
                response = (
                    <div className="text-text-primary/70 space-y-2">
                        <div>
                            <span className="text-purple-400 font-bold">[ NSK GROUPS ]</span> — Parent Technology Holding Conglomerate (nskgroups.website)
                        </div>
                        <div>
                            <span className="text-neon font-bold">[ NITECHSPARK ]</span> — IT Infrastructure, Linux DevOps, Cybersecurity & SRE (nitechspark.site)
                        </div>
                        <div>
                            <span className="text-cyan-400 font-bold">[ NITEHIRE ]</span> — Next-Gen AI Recruitment, 2-Level Screening & ATS (nitehire.site)
                        </div>
                        <div>
                            <span className="text-amber-400 font-bold">[ NITEORBIT ]</span> — Space Ground Systems & Satellite Telemetry (niteorbit.space)
                        </div>
                    </div>
                );
                break;

            case "products":
                response = (
                    <div className="text-text-primary/70 space-y-1">
                        <p className="text-neon font-bold">PRODUCTION PRODUCT FLEET:</p>
                        <p>1. <span className="text-white font-bold">PropoTrack</span> — Multi-vendor proposal tracker (tracker.nitechspark.site)</p>
                        <p>2. <span className="text-white font-bold">NiteSentinel</span> — Zero-trust endpoint security & DPDP compliance</p>
                        <p>3. <span className="text-white font-bold">sparkAudit</span> — GRC evidence automation & checklist sync</p>
                        <p>4. <span className="text-white font-bold">CyberScan</span> — Async port scanner & SSL certificate monitor</p>
                        <p>5. <span className="text-white font-bold">RCA Engine</span> — AI incident root cause diagnostic system</p>
                        <p>6. <span className="text-white font-bold">Alone AI (NiteBuddy)</span> — Vector-memory emotional AI companion</p>
                        <p>7. <span className="text-white font-bold">SustainHub</span> — Corporate ESG telemetry & metrics helpdesk</p>
                        <p>8. <span className="text-white font-bold">NSK Connect</span> — Secure C-Suite incident response Android app</p>
                    </div>
                );
                break;

            case "skills":
                response = (
                    <div className="text-text-primary/70 space-y-1">
                        <p className="text-neon font-bold">CORE TECHNICAL ARSENAL:</p>
                        <p>• Linux (Ubuntu, Parrot, Kali), Docker, KVM, Nginx, PM2, Shell scripting</p>
                        <p>• Prometheus, Grafana, ELK, Loki, PRTG, Syslog telemetry pipelines</p>
                        <p>• DPDP Act 2023, ISO 27001, SOC 2, Vulnerability Auditing, SSL Hardening</p>
                        <p>• Python (Flask), React 19, Node.js, PostgreSQL/Neon, Prisma, Groq, Gemini API</p>
                    </div>
                );
                break;

            case "contact":
                response = (
                    <div className="text-text-primary/70 space-y-1">
                        <p className="text-neon font-bold">COMMUNICATION CHANNELS:</p>
                        <p>• Direct Email: <span className="text-white">nithyananthan@nskgroups.website</span></p>
                        <p>• Phone / WhatsApp: <span className="text-white">+91 63855 76354</span></p>
                        <p>• Calendly: <span className="text-white">calendly.com/nithyananthan-nskgroups</span></p>
                    </div>
                );
                break;

            case "msme":
                response = (
                    <div className="text-emerald-400 space-y-1">
                        <p className="font-bold">[ VERIFIED ] UDYAM MSME REGISTERED</p>
                        <p className="text-text-primary/70">Category: Micro, Small and Medium Enterprises (Govt. of India)</p>
                        <p className="text-text-primary/70">Location: Erode, Tamil Nadu, India</p>
                    </div>
                );
                break;

            case "clear":
            case "cls":
                setLogs([]);
                setInputValue("");
                return;

            default:
                response = (
                    <div className="text-danger/80">
                        Command not recognized: &quot;{cleanCmd}&quot;. Type <span className="text-neon underline cursor-pointer" onClick={() => executeCommand("help")}>help</span> for diagnostic list.
                    </div>
                );
        }

        setLogs((prev) => [...prev, { command: cmd, response }]);
        setInputValue("");
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        executeCommand(inputValue);
    };

    return (
        <motion.div
            ref={ref}
            id="terminal"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-5xl mx-auto"
        >
            {/* Terminal Container */}
            <div className="glass-panel rounded-2xl overflow-hidden corner-accents border border-neon/20 shadow-2xl backdrop-blur-xl bg-[#020612]/90">
                {/* Title Bar */}
                <div
                    className="flex flex-wrap items-center justify-between px-5 py-3 border-b border-neon/15"
                    style={{ background: "rgba(3, 7, 18, 0.85)" }}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-danger/80" />
                        <div className="w-3 h-3 rounded-full bg-accent/80" />
                        <div className="w-3 h-3 rounded-full bg-neon/80" />
                        <span className="ml-3 text-xs font-mono text-text-primary/50 flex items-center gap-1.5">
                            <Terminal size={13} className="text-neon" />
                            <span>nsk-shell // nithyananthan@nsk-primary: ~</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-neon/70 bg-neon/5 border border-neon/20 px-2 py-0.5 rounded">
                            INTERACTIVE SHELL
                        </span>
                    </div>
                </div>

                {/* Command Suggestions */}
                <div className="px-5 py-2.5 border-b border-neon/10 bg-panel/30 flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="text-text-primary/40 text-[11px]">Quick Triggers:</span>
                    {defaultCommands.map((cmd) => (
                        <button
                            key={cmd}
                            onClick={() => executeCommand(cmd)}
                            className="px-2 py-0.5 rounded bg-neon/5 hover:bg-neon/20 text-neon border border-neon/20 text-[11px] transition-all hover:scale-105"
                        >
                            ${cmd}
                        </button>
                    ))}
                </div>

                {/* Terminal Screen Logs */}
                <div
                    className="p-6 font-mono text-xs sm:text-sm leading-relaxed max-h-[380px] overflow-y-auto space-y-4"
                    onClick={() => inputRef.current?.focus()}
                >
                    {logs.map((log, i) => (
                        <div key={i} className="space-y-1">
                            <div className="flex items-center gap-2 text-neon font-bold">
                                <span className="text-text-primary/40">nithyananthan@nsk:~$</span>
                                <span>{log.command}</span>
                            </div>
                            <div className="pl-4 text-xs sm:text-sm border-l border-neon/15 py-0.5">
                                {log.response}
                            </div>
                        </div>
                    ))}

                    {/* Interactive Input Line */}
                    <form onSubmit={handleFormSubmit} className="flex items-center gap-2 pt-2 text-neon font-bold">
                        <span className="text-text-primary/40 flex-shrink-0">nithyananthan@nsk:~$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type command (e.g. 'ventures', 'products', 'help')..."
                            className="w-full bg-transparent border-none outline-none text-neon text-xs sm:text-sm font-mono placeholder:text-text-primary/20"
                            autoComplete="off"
                            spellCheck="false"
                        />
                        <button type="submit" className="text-text-primary/40 hover:text-neon p-1">
                            <CornerDownLeft size={14} />
                        </button>
                    </form>

                    <div ref={scrollBottomRef} />
                </div>
            </div>
        </motion.div>
    );
}
