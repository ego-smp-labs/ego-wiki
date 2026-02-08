"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {[...Array(count)].map((_, i) => (
                <PixelParticle key={i} />
            ))}
        </div>
    );
}

function PixelParticle() {
    const [config, setConfig] = useState<{ x: number, y: number, duration: number, size: number, xMove: number } | null>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setConfig({
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: 10 + Math.random() * 20,
            size: 2 + Math.random() * 4,
            xMove: Math.random() * 50 - 25,
        });
    }, []);

    if (!config) return null;

    return (
        <motion.div
            className="absolute bg-neon-purple/30 rounded-full blur-[1px]"
            style={{
                width: config.size,
                height: config.size,
                left: `${config.x}%`,
                top: `${config.y}%`,
                boxShadow: "0 0 4px var(--neon-purple)",
            }}
            animate={{
                y: [0, -100, 0],
                x: [0, config.xMove, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
            }}
            transition={{
                duration: config.duration,
                repeat: Infinity,
                ease: "linear",
            }}
        />
    );
}
