"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const terminalLines = [
    { prompt: "$ whoami", output: "NITHYANANTHAN NAGARAJAN  |  FOUNDER & CEO, NSK GROUPS  |  ERODE, TN" },
    {
        prompt: "$ nsk --ventures --status",
        output: `[ NITECHSPARK ]  STATUS: OPERATIONAL  |  SINCE: JAN 2026
[ NITEHIRE    ]  STATUS: LIVE         |  LAUNCHED: MAY 2026
[ NITEORBIT   ]  STATUS: STEALTH      |  CLEARANCE: RESTRICTED`,
    },
    { prompt: "$ nsk --products --count", output: "6 PRODUCTS DEPLOYED  |  FLASK · REACT · NODE · AI STACK" },
];

export default function TerminalBlock() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [visibleLines, setVisibleLines] = useState(0);
    const [typedPrompt, setTypedPrompt] = useState("");
    const [showOutput, setShowOutput] = useState(false);
    const [currentPhase, setCurrentPhase] = useState<"typing" | "output" | "done">("typing");

    useEffect(() => {
        if (!isInView) return;

        if (visibleLines >= terminalLines.length) {
            setCurrentPhase("done");
            return;
        }

        const currentLine = terminalLines[visibleLines];
        let charIndex = 0;
        setTypedPrompt("");
        setShowOutput(false);
        setCurrentPhase("typing");

        const typeInterval = setInterval(() => {
            charIndex++;
            setTypedPrompt(currentLine.prompt.slice(0, charIndex));

            if (charIndex >= currentLine.prompt.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    setShowOutput(true);
                    setCurrentPhase("output");
                    setTimeout(() => {
                        setVisibleLines((prev) => prev + 1);
                    }, 800);
                }, 300);
            }
        }, 40);

        return () => clearInterval(typeInterval);
    }, [isInView, visibleLines]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl mx-auto"
        >
            {/* Terminal Chrome */}
            <div className="glass-panel rounded-lg overflow-hidden corner-accents crt-screen">
                {/* Title Bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: "rgba(0,245,196,0.1)" }}>
                    <div className="w-3 h-3 rounded-full bg-danger/80" />
                    <div className="w-3 h-3 rounded-full bg-accent/80" />
                    <div className="w-3 h-3 rounded-full bg-neon/80" />
                    <span className="ml-3 text-xs font-mono text-text-primary/40">
                        nsk-terminal — nithyananthan@nsk-groups
                    </span>
                </div>

                {/* Terminal Content */}
                <div className="p-6 font-mono text-sm leading-relaxed min-h-[280px]">
                    {/* Already completed lines */}
                    {terminalLines.slice(0, visibleLines).map((line, i) => (
                        <div key={i} className="mb-4">
                            <div className="text-neon">{line.prompt}</div>
                            <div className="text-text-primary/70 whitespace-pre-line mt-1 ml-2">
                                {line.output}
                            </div>
                        </div>
                    ))}

                    {/* Currently typing line */}
                    {visibleLines < terminalLines.length && (
                        <div className="mb-4">
                            <div className="text-neon">
                                {typedPrompt}
                                {currentPhase === "typing" && (
                                    <span className="cursor-blink text-neon ml-0.5">▊</span>
                                )}
                            </div>
                            {showOutput && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-text-primary/70 whitespace-pre-line mt-1 ml-2"
                                >
                                    {terminalLines[visibleLines].output}
                                </motion.div>
                            )}
                        </div>
                    )}

                    {/* Final blinking cursor */}
                    {currentPhase === "done" && (
                        <div className="text-neon">
                            $ <span className="cursor-blink">▊</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
