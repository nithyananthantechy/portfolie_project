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
                neon: {
                    green: "#0f0", // Placeholder, will refine
                    blue: "#00f",
                }
            },
        },
    },
    plugins: [],
};
export default config;
