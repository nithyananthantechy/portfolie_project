"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Bot, User, ShieldCheck, Terminal, ArrowRight, CornerDownLeft } from "lucide-react";

interface AiMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    time: string;
}

interface AiCortexModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const quickPrompts = [
    "What is NSK Groups & its ventures?",
    "Explain NiteHire's 2-level AI screening",
    "Tell me about cybersecurity & zero-trust services",
    "List the 12+ production products",
    "Summarize the latest research whitepaper",
    "How do I partner or contact Chairman Nithyananthan?",
];

export default function AiCortexModal({ isOpen, onClose }: AiCortexModalProps) {
    const [messages, setMessages] = useState<AiMessage[]>([
        {
            id: "welcome",
            role: "assistant",
            content:
                "Welcome to **NSK Executive Cortex**. I am the digital intelligence advisor representing **Nithyananthan Nagarajan**, Founder & CMD of **NSK Groups**. Ask me anything regarding our ventures (NiTechSpark, NiteHire, NiteOrbit), technical architecture, whitepapers, or enterprise cybersecurity engagements.",
            time: "NOW",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loading]);

    const handleSend = async (textToSend?: string) => {
        const query = (textToSend || input).trim();
        if (!query || loading) return;

        const userMsg: AiMessage = {
            id: Date.now().toString(),
            role: "user",
            content: query,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query }),
            });
            const data = await res.json();

            const assistantMsg: AiMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.reply || "Executive connection established, but telemetry received was empty.",
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };
            setMessages((prev) => [...prev, assistantMsg]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: "Secure transmission failed. For direct communication, please contact Chairman Nithyananthan on WhatsApp (+91 63855 76354).",
                    time: "NOW",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 15 }}
                        transition={{ duration: 0.25 }}
                        className="relative w-full max-w-2xl h-[85vh] max-h-[720px] rounded-2xl flex flex-col z-10 overflow-hidden border shadow-2xl"
                        style={{
                            background: "rgba(3, 7, 18, 0.96)",
                            borderColor: "rgba(255, 255, 255, 0.12)",
                            boxShadow: "0 0 50px rgba(0, 0, 0, 0.8), 0 20px 40px rgba(0, 0, 0, 0.9)",
                        }}
                    >
                        {/* Header */}
                        <div
                            className="p-4 border-b flex items-center justify-between"
                            style={{
                                borderColor: "rgba(255, 255, 255, 0.08)",
                                background: "rgba(15, 23, 42, 0.6)",
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg border border-sky-500/30 bg-sky-500/10 flex items-center justify-center text-sky-400 relative">
                                    <Sparkles size={18} />
                                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-orbitron font-bold text-sm sm:text-base text-white tracking-wider">
                                            NSK CORTEX AI
                                        </h3>
                                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30 font-semibold">
                                            EXECUTIVE ADVISOR
                                        </span>
                                    </div>
                                    <p className="text-[11px] font-mono text-slate-400">
                                        REPRESENTING NITHYANANTHAN NAGARAJAN · CMD NSK GROUPS
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-lg border border-white/10 hover:border-rose-500/50 text-slate-400 hover:text-rose-400 flex items-center justify-center transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Quick Prompt Chips */}
                        <div className="px-4 py-2.5 border-b border-slate-800 overflow-x-auto flex items-center gap-2 bg-black/40 no-scrollbar">
                            <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider flex items-center gap-1 shrink-0">
                                <Terminal size={11} /> PROMPTS:
                            </span>
                            {quickPrompts.map((p, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSend(p)}
                                    className="text-[11px] font-mono text-slate-300 hover:text-white px-2.5 py-1 rounded-md border border-slate-800 hover:border-sky-500/40 bg-slate-900/60 hover:bg-slate-800 whitespace-nowrap transition-all"
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 font-sans text-xs sm:text-sm"
                        >
                            {messages.map((m) => (
                                <div
                                    key={m.id}
                                    className={`flex gap-3 ${
                                        m.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                                >
                                    {m.role === "assistant" && (
                                        <div className="w-7 h-7 rounded-md border border-sky-500/30 bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                                            <Bot size={15} />
                                        </div>
                                    )}

                                    <div
                                        className={`max-w-[85%] rounded-xl p-3.5 leading-relaxed relative ${
                                            m.role === "user"
                                                ? "bg-sky-500/20 border border-sky-500/40 text-white"
                                                : "bg-slate-900/90 border border-slate-800 text-slate-200"
                                        }`}
                                    >
                                        <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm">
                                            {m.content}
                                        </div>
                                        <span className="block text-[9px] font-mono text-slate-400 text-right mt-1.5">
                                            {m.time}
                                        </span>
                                    </div>

                                    {m.role === "user" && (
                                        <div className="w-7 h-7 rounded-md border border-sky-500/40 bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                                            <User size={15} />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {loading && (
                                <div className="flex gap-3 justify-start items-center">
                                    <div className="w-7 h-7 rounded-md border border-sky-500/30 bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0">
                                        <Bot size={15} />
                                    </div>
                                    <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 flex items-center gap-2 text-xs font-mono text-sky-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                                        <span>Consulting NSK Executive Cortex datastream...</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Footer */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSend();
                            }}
                            className="p-3 sm:p-4 border-t border-slate-800 bg-slate-950 flex items-center gap-2"
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Inquire about ventures, whitepapers, cybersecurity audits, or empire leadership..."
                                className="flex-1 bg-slate-900/90 border border-slate-700/60 focus:border-sky-400 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors placeholder:text-slate-500"
                            />
                            <button
                                type="submit"
                                disabled={loading || !input.trim()}
                                className="px-4 py-2.5 rounded-lg bg-white text-slate-950 hover:bg-slate-100 font-semibold text-xs flex items-center gap-1.5 shrink-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            >
                                <span>SEND</span>
                                <Send size={13} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
