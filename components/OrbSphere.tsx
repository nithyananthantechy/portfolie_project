"use client";

import { motion } from "framer-motion";

const OrbSphere = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0">
            {/* Ambient subtle cyber grid backdrop */}
            <div className="absolute inset-0 cyber-grid opacity-15" />

            {/* Radar Circular Sweep Beam */}
            <div className="absolute w-[500px] sm:w-[600px] h-[500px] sm:h-[600px] rounded-full overflow-hidden opacity-10 flex items-center justify-center">
                <div className="absolute inset-0 radar-beam" />
            </div>

            {/* Central Holographic Core */}
            <div
                className="absolute rounded-full pointer-events-none opacity-25"
                style={{
                    width: "280px",
                    height: "280px",
                    background:
                        "radial-gradient(circle, rgba(56,189,248,0.12) 0%, rgba(148,163,184,0.04) 50%, transparent 75%)",
                    filter: "blur(35px)",
                }}
            />

            {/* SVG Coordinate Tracker Overlay */}
            <svg className="absolute w-[600px] sm:w-[720px] h-[600px] sm:h-[720px] opacity-10" viewBox="0 0 200 200">
                {/* Horizontal Axis */}
                <line x1="10" y1="100" x2="190" y2="100" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2 4" />
                {/* Vertical Axis */}
                <line x1="100" y1="10" x2="100" y2="190" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2 4" />
                {/* Tick marks */}
                <line x1="60" y1="98" x2="60" y2="102" stroke="#38bdf8" strokeWidth="0.5" />
                <line x1="140" y1="98" x2="140" y2="102" stroke="#38bdf8" strokeWidth="0.5" />
                <line x1="98" y1="60" x2="102" y2="60" stroke="#38bdf8" strokeWidth="0.5" />
                <line x1="98" y1="140" x2="102" y2="140" stroke="#38bdf8" strokeWidth="0.5" />
                
                {/* Concentric rings */}
                <circle cx="100" cy="100" r="40" fill="none" stroke="#94a3b8" strokeWidth="0.3" strokeDasharray="1 4" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="#38bdf8" strokeWidth="0.3" strokeDasharray="3 5" />
                <circle cx="100" cy="100" r="90" fill="none" stroke="#475569" strokeWidth="0.2" />
            </svg>

            {/* 3D Ring 1 — Main Orbital (Refined Azure) */}
            <div
                className="absolute rounded-full animate-orbit"
                style={{
                    width: "380px",
                    height: "380px",
                    border: "1px solid rgba(56, 189, 248, 0.12)",
                    transformStyle: "preserve-3d",
                }}
            >
                <div
                    className="absolute w-2 h-2 rounded-full bg-sky-400 flex items-center justify-center"
                    style={{
                        top: "0",
                        left: "50%",
                        transform: "translateX(-50%)",
                        boxShadow: "0 0 8px #38bdf8",
                    }}
                >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-60"></span>
                </div>
            </div>

            {/* 3D Ring 2 — Counter-rotating Orbital (Platinum Slate) */}
            <div
                className="absolute rounded-full animate-orbit-reverse"
                style={{
                    width: "480px",
                    height: "480px",
                    border: "1px dashed rgba(255, 255, 255, 0.08)",
                    transformStyle: "preserve-3d",
                }}
            >
                <div
                    className="absolute w-1.5 h-1.5 rounded-full bg-slate-300"
                    style={{
                        bottom: "0",
                        left: "50%",
                        transform: "translateX(-50%)",
                        boxShadow: "0 0 6px #ffffff",
                    }}
                />
            </div>
        </div>
    );
};

export default OrbSphere;
