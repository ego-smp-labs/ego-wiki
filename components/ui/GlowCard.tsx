"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowCardProps {
    children: ReactNode;
    className?: string;
    glowColor?: "cyan" | "purple";
    hoverable?: boolean;
}

const GLOW_CLASSES = {
    cyan: "hover:border-neon-cyan/30 hover:shadow-glow-cyan",
    purple: "hover:border-neon-purple/30 hover:shadow-glow-purple",
} as const;

export default function GlowCard({
    children,
    className = "",
    glowColor = "cyan",
    hoverable = true,
}: GlowCardProps) {
    const baseClasses = `
        relative overflow-hidden rounded-xl
        bg-gradient-to-br from-void-surface to-void-bg
        border border-void-border backdrop-blur-sm
    `;

    const hoverClasses = hoverable
        ? `transition-all duration-300 ${GLOW_CLASSES[glowColor]}`
        : "";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`${baseClasses} ${hoverClasses} ${className}`}
        >
            <div className="absolute inset-0 bg-glass-gradient pointer-events-none" />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}
