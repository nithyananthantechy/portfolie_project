"use client";

import { motion } from "framer-motion";

const OrbSphere = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0">
            {/* Ambient cyber grid backdrop */}
            <div className="absolute inset-0 cyber-grid opacity-20" />

            {/* Radar Circular Sweep Beam */}
            <div className="absolute w-[500px] sm:w-[600px] h-[500px] sm:h-[600px] rounded-full overflow-hidden opacity-15 flex items-center justify-center">
                <div className="absolute inset-0 radar-beam" />
            </div>

            {/* Central Holographic Core */}
            <div
                className="absolute rounded-full pointer-events-none opacity-40"
                style={{
                    width: "260px",
                    height: "260px",
                    background:
                        "radial-gradient(circle, rgba(0,245,196,0.15) 0%, rgba(0,170,255,0.06) 50%, transparent 75%)",
                    filter: "blur(30px)",
                }}
            />

            {/* SVG Space Crosshair Tracker Overlay */}
            <svg className="absolute w-[600px] sm:w-[720px] h-[600px] sm:h-[720px] opacity-10" viewBox="0 0 200 200">
                {/* Horizontal Axis */}
                <line x1="10" y1="100" x2="190" y2="100" stroke="#00f5c4" strokeWidth="0.5" strokeDasharray="2 3" />
                {/* Vertical Axis */}
                <line x1="100" y1="10" x2="100" y2="190" stroke="#00f5c4" strokeWidth="0.5" strokeDasharray="2 3" />
                {/* Tick marks */}
                <line x1="60" y1="98" x2="60" y2="102" stroke="#00f5c4" strokeWidth="0.5" />
                <line x1="140" y1="98" x2="140" y2="102" stroke="#00f5c4" strokeWidth="0.5" />
                <line x1="98" y1="60" x2="102" y2="60" stroke="#00f5c4" strokeWidth="0.5" />
                <line x1="98" y1="140" x2="102" y2="140" stroke="#00f5c4" strokeWidth="0.5" />
                
                {/* Concentric rings */}
                <circle cx="100" cy="100" r="40" fill="none" stroke="#00f5c4" strokeWidth="0.3" strokeDasharray="1 4" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="#00aaff" strokeWidth="0.3" strokeDasharray="3 5" />
                <circle cx="100" cy="100" r="90" fill="none" stroke="#00f5c4" strokeWidth="0.2" />
            </svg>

            {/* 3D Ring 1 — Main Orbital (Teal) */}
            <div
                className="absolute rounded-full animate-orbit"
                style={{
                    width: "380px",
                    height: "380px",
                    border: "1.2px solid rgba(0, 245, 196, 0.12)",
                    transformStyle: "preserve-3d",
                }}
            >
                <div
                    className="absolute w-2.5 h-2.5 rounded-full bg-neon flex items-center justify-center"
                    style={{
                        top: "0",
                        left: "50%",
                        transform: "translateX(-50%)",
                        boxShadow: "0 0 10px #00f5c4",
                    }}
                >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75"></span>
                </div>
            </div>

            {/* 3D Ring 2 — Counter-rotating Orbital (Blue) */}
            <div
                className="absolute rounded-full animate-orbit-reverse"
                style={{
                    width: "480px",
                    height: "480px",
                    border: "1px dashed rgba(0, 170, 255, 0.1)",
                    transformStyle: "preserve-3d",
                }}
            >
                <div
                    className="absolute w-2 h-2 rounded bg-neon2"
                    style={{
                        bottom: "0",
                        left: "50%",
                        transform: "translateX(-50%) rotate(45deg)",
                        boxShadow: "0 0 8px #00aaff",
                    }}
                />
            </div>
        </div>
    );
};

export default OrbSphere;
