"use client";

import { motion } from "framer-motion";

const OrbSphere = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
            {/* Ambient cyber grid backdrop */}
            <div className="absolute inset-0 cyber-grid opacity-30" />

            {/* Radar Circular Sweep Beam */}
            <div className="absolute w-[600px] h-[600px] rounded-full overflow-hidden opacity-20 flex items-center justify-center">
                <div className="absolute inset-0 radar-beam" />
            </div>

            {/* Central Holographic Core */}
            <div
                className="absolute rounded-full"
                style={{
                    width: "250px",
                    height: "250px",
                    background:
                        "radial-gradient(circle, rgba(0,245,196,0.12) 0%, rgba(0,170,255,0.05) 50%, transparent 75%)",
                    filter: "blur(4px)",
                }}
            />

            {/* SVG Space Crosshair Tracker Overlay */}
            <svg className="absolute w-[700px] h-[700px] opacity-15" viewBox="0 0 200 200">
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
                    width: "420px",
                    height: "420px",
                    border: "1.5px solid rgba(0, 245, 196, 0.18)",
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Orbiting Node (Telemetry Point) */}
                <div
                    className="absolute w-3 h-3 rounded-full bg-neon flex items-center justify-center"
                    style={{
                        top: "0",
                        left: "50%",
                        transform: "translateX(-50%)",
                        boxShadow: "0 0 12px #00f5c4, 0 0 20px #00f5c4",
                    }}
                >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75"></span>
                </div>
            </div>

            {/* 3D Ring 2 — Counter-rotating Orbital (Blue) */}
            <div
                className="absolute rounded-full animate-orbit-reverse"
                style={{
                    width: "540px",
                    height: "540px",
                    border: "1px dashed rgba(0, 170, 255, 0.15)",
                    transformStyle: "preserve-3d",
                }}
            >
                {/* AI / Node tracking point */}
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

            {/* 3D Ring 3 — Outer telemetry boundary (Slow Amber) */}
            <div
                className="absolute rounded-full animate-orbit-slow"
                style={{
                    width: "660px",
                    height: "660px",
                    border: "1px solid rgba(245, 166, 35, 0.08)",
                    transformStyle: "preserve-3d",
                }}
            >
                <div
                    className="absolute w-1.5 h-1.5 rounded-full bg-accent"
                    style={{
                        top: "30%",
                        right: "0",
                        opacity: 0.6,
                        boxShadow: "0 0 6px #f5a623",
                    }}
                />
            </div>

            {/* Vector grid details */}
            <div className="absolute text-[9px] font-mono text-neon/30 tracking-widest translate-x-[260px] -translate-y-[150px] rotate-90 select-none">
                SYS_LOC: ERODE_IN // RADAR_ACTIVE_TRUE
            </div>
            <div className="absolute text-[9px] font-mono text-neon2/30 tracking-widest -translate-x-[280px] translate-y-[180px] select-none">
                COORD: 11.3410° N, 77.7172° E
            </div>
            <div className="absolute text-[8px] font-mono text-accent/20 tracking-wider translate-y-[240px] select-none">
                TELESCOPE_BEAM // RANGE: AUTO_LOCK_STEALTH
            </div>
        </div>
    );
};

export default OrbSphere;
