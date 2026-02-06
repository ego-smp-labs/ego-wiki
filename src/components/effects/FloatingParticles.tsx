"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
}

const DEFAULT_PARTICLE_COUNT = 30;

export default function FloatingParticles({ count = DEFAULT_PARTICLE_COUNT }: { count?: number }) {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {[...Array(count)].map((_, i) => (
                <PixelParticle key={i} />
            ))}
        </div>
    );
}

function PixelParticle() {
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    const duration = 10 + Math.random() * 20;
    const size = 2 + Math.random() * 4;

    return (
        <motion.div
            className="absolute bg-neon-purple/30 rounded-full blur-[1px]"
            style={{
                width: size,
                height: size,
                left: `${randomX}%`,
                top: `${randomY}%`,
                boxShadow: "0 0 4px var(--neon-purple)",
            }}
            animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
            }}
        />
    );
}
