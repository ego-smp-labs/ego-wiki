import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/presentation/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                void: {
                    bg: "#050505",
                    surface: "#0a0a0f",
                    "surface-light": "#0f0f18",
                    border: "#1a1a2e",
                    "border-light": "#2a2a4e",
                },
                neon: {
                    cyan: "#00f0ff",
                    "cyan-dim": "#00a0aa",
                    purple: "#7b00ff",
                    "purple-dim": "#5a00bb",
                    pink: "#ff00ff",
                },
            },
            fontFamily: {
                sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
                mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
                display: ["Orbitron", "var(--font-geist-sans)", "sans-serif"],
            },
            boxShadow: {
                "glow-cyan": "0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1)",
                "glow-cyan-intense": "0 0 30px rgba(0, 240, 255, 0.5), 0 0 60px rgba(0, 240, 255, 0.2)",
                "glow-purple": "0 0 20px rgba(123, 0, 255, 0.3), 0 0 40px rgba(123, 0, 255, 0.1)",
                "glow-purple-intense": "0 0 30px rgba(123, 0, 255, 0.5), 0 0 60px rgba(123, 0, 255, 0.2)",
                glass: "0 8px 32px rgba(0, 0, 0, 0.5)",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "void-gradient": "linear-gradient(180deg, #050505 0%, #0a0a0f 50%, #0f0f18 100%)",
                "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                "neon-gradient": "linear-gradient(90deg, #00f0ff 0%, #7b00ff 100%)",
            },
            animation: {
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
                "float": "float 6s ease-in-out infinite",
                "shimmer": "shimmer 2s linear infinite",
                "fade-in": "fade-in 0.5s ease-out",
                "slide-up": "slide-up 0.5s ease-out",
                "particle": "particle 10s linear infinite",
            },
            keyframes: {
                "pulse-glow": {
                    "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
                    "50%": { opacity: "1", transform: "scale(1.02)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "slide-up": {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                particle: {
                    "0%": { transform: "translateY(100vh) rotate(0deg)", opacity: "0" },
                    "10%": { opacity: "1" },
                    "90%": { opacity: "1" },
                    "100%": { transform: "translateY(-100vh) rotate(720deg)", opacity: "0" },
                },
            },
            backdropBlur: {
                xs: "2px",
            },
        },
    },
    plugins: [],
};

export default config;
