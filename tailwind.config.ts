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
                bg: "#020612",
                bg2: "#050e1f",
                bg3: "#0a182f",
                panel: "rgba(3, 14, 30, 0.65)",
                neon: {
                    DEFAULT: "#00f5c4",
                    dim: "rgba(0, 245, 196, 0.15)",
                },
                neon2: "#00d2ff",
                gold: {
                    DEFAULT: "#f5a623",
                    light: "#ffd269",
                    dark: "#b8780e",
                    dim: "rgba(245, 166, 35, 0.15)",
                },
                accent: "#f5a623",
                danger: "#ff3b5c",
                "text-primary": "#cbe3f7",
                border: "rgba(0, 245, 196, 0.15)",
                "border-gold": "rgba(245, 166, 35, 0.25)",
            },
            fontFamily: {
                orbitron: ["'Plus Jakarta Sans'", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
                rajdhani: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
                mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
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
                "pulse-gold": {
                    "0%, 100%": {
                        boxShadow: "0 0 4px #f5a623, 0 0 8px #f5a623",
                    },
                    "50%": {
                        boxShadow:
                            "0 0 8px #f5a623, 0 0 16px #f5a623, 0 0 24px rgba(245, 166, 35, 0.4)",
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
                    "50%": { transform: "translateY(-8px)" },
                },
                "float-gentle": {
                    "0%, 100%": { transform: "translate(0, 0)" },
                    "50%": { transform: "translate(4px, -6px)" },
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
                "pulse-gold": "pulse-gold 2.5s ease-in-out infinite",
                orbit: "orbit 20s linear infinite",
                "orbit-reverse": "orbit-reverse 25s linear infinite",
                "orbit-slow": "orbit-slow 30s linear infinite",
                float: "float 6s ease-in-out infinite",
                "float-gentle": "float-gentle 8s ease-in-out infinite",
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
