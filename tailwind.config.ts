import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                bg: "#020912",
                bg2: "#060e1c",
                panel: "rgba(0, 20, 40, 0.6)",
                neon: {
                    DEFAULT: "#00f5c4",
                    dim: "rgba(0, 245, 196, 0.15)",
                },
                neon2: "#00aaff",
                accent: "#f5a623",
                danger: "#ff3b5c",
                "text-primary": "#c8e0f0",
                border: "rgba(0, 245, 196, 0.15)",
            },
            fontFamily: {
                orbitron: ["Orbitron", "sans-serif"],
                rajdhani: ["Rajdhani", "sans-serif"],
                mono: ["Share Tech Mono", "monospace"],
            },
            keyframes: {
                "pulse-neon": {
                    "0%, 100%": {
                        boxShadow: "0 0 4px #00f5c4, 0 0 8px #00f5c4",
                    },
                    "50%": {
                        boxShadow:
                            "0 0 8px #00f5c4, 0 0 16px #00f5c4, 0 0 24px #00f5c4",
                    },
                },
                orbit: {
                    "0%": { transform: "rotateX(70deg) rotateZ(0deg)" },
                    "100%": { transform: "rotateX(70deg) rotateZ(360deg)" },
                },
                "orbit-reverse": {
                    "0%": { transform: "rotateX(65deg) rotateZ(360deg)" },
                    "100%": { transform: "rotateX(65deg) rotateZ(0deg)" },
                },
                "orbit-slow": {
                    "0%": { transform: "rotateX(75deg) rotateZ(0deg)" },
                    "100%": { transform: "rotateX(75deg) rotateZ(360deg)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                blink: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0" },
                },
                "glow-line": {
                    "0%, 100%": {
                        boxShadow: "0 0 4px rgba(0,245,196,0.3)",
                    },
                    "50%": {
                        boxShadow: "0 0 12px rgba(0,245,196,0.6)",
                    },
                },
            },
            animation: {
                "pulse-neon": "pulse-neon 2s ease-in-out infinite",
                orbit: "orbit 20s linear infinite",
                "orbit-reverse": "orbit-reverse 25s linear infinite",
                "orbit-slow": "orbit-slow 30s linear infinite",
                float: "float 6s ease-in-out infinite",
                "fade-in-up": "fade-in-up 0.6s ease-out forwards",
                blink: "blink 1s step-end infinite",
                "glow-line": "glow-line 3s ease-in-out infinite",
            },
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    plugins: [],
};
export default config;
