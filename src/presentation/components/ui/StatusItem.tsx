"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { animate, remove } from "animejs";

interface StatusItemProps {
    children: React.ReactNode;
    delay: number;
}

const StatusItem = ({ children, delay }: StatusItemProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (!cardRef.current || !glowRef.current) return;

        remove(glowRef.current);
        animate(glowRef.current, {
            opacity: [0, 1],
            scaleY: [0.3, 1],
            duration: 400,
            ease: "outExpo",
        });
    };

    const handleMouseLeave = () => {
        if (!glowRef.current) return;

        remove(glowRef.current);
        animate(glowRef.current, {
            opacity: [1, 0],
            scaleY: [1, 0.3],
            duration: 300,
            ease: "inQuad",
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5, ease: "easeOut" }}
            className="h-full"
        >
            <div
                ref={cardRef}
                className="relative h-full p-6 rounded-xl bg-void-surface/50 border border-white/10 overflow-hidden group transition-colors duration-300 hover:border-neon-purple/30"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Left border glow line */}
                <div
                    ref={glowRef}
                    className="absolute left-0 top-0 w-[3px] h-full origin-top"
                    style={{
                        background: "linear-gradient(180deg, #7b00ff, #a855f7, #7b00ff)",
                        boxShadow: "0 0 12px 2px rgba(123, 0, 255, 0.6), 0 0 24px 4px rgba(123, 0, 255, 0.3)",
                        opacity: 0,
                        borderRadius: "0 0 0 0",
                    }}
                />

                <div className="relative z-10">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

export default StatusItem;
