"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Bot, GripHorizontal, MessageSquareCode } from "lucide-react";
import AiCortexModal from "./AiCortexModal";

export default function DraggableAiWidget() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasDragged, setHasDragged] = useState(false);

    return (
        <>
            <motion.div
                drag
                dragMomentum={false}
                onDragStart={() => setHasDragged(true)}
                onDragEnd={() => {
                    // Small delay to prevent drag release from triggering onClick immediately
                    setTimeout(() => setHasDragged(false), 120);
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="fixed bottom-6 left-6 z-40 cursor-grab active:cursor-grabbing select-none"
                style={{ touchAction: "none" }}
            >
                <div
                    onClick={() => {
                        if (!hasDragged) {
                            setIsModalOpen(true);
                        }
                    }}
                    className="relative group flex items-center gap-3 px-4 py-2.5 rounded-2xl border backdrop-blur-2xl shadow-2xl transition-all"
                    style={{
                        background: "rgba(3, 7, 18, 0.92)",
                        borderColor: "rgba(255, 255, 255, 0.12)",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.08)",
                    }}
                >
                    {/* Drag Handle Indicator */}
                    <div className="text-slate-500 group-hover:text-sky-400 transition-colors">
                        <GripHorizontal size={14} />
                    </div>

                    {/* Glowing AI Icon */}
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400 group-hover:border-sky-400 group-hover:bg-sky-500/20 transition-all">
                        <Sparkles size={15} />
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                    </div>

                    {/* Text Label */}
                    <div className="flex flex-col text-left">
                        <div className="flex items-center gap-1.5">
                            <span className="font-orbitron font-bold text-xs text-white tracking-wider group-hover:text-sky-300 transition-colors">
                                NSK CORTEX
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 font-semibold">
                                AI
                            </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                            DRAG ANYWHERE · CLICK TO ASK
                        </span>
                    </div>

                    {/* Ambient Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-sky-500/5 blur-md -z-10 group-hover:bg-sky-500/10 transition-all" />
                </div>
            </motion.div>

            {/* AI Cortex Chat Modal */}
            <AiCortexModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
