"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
    id: number;
    x: number;
    size: number;
    duration: number;
    delay: number;
    color: "cyan" | "purple";
}

interface FloatingParticlesProps {
    count?: number;
}

export default function FloatingParticles({ count = 30 }: FloatingParticlesProps) {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            size: Math.random() * 4 + 1,
            duration: Math.random() * 20 + 15,
            delay: Math.random() * 10,
            color: Math.random() > 0.5 ? "cyan" : "purple",
        }));
        setParticles(newParticles);
    }, [count]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className={`absolute rounded-full ${particle.color === "cyan"
                            ? "bg-neon-cyan/30 shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                            : "bg-neon-purple/30 shadow-[0_0_10px_rgba(123,0,255,0.3)]"
                        }`}
                    style={{
                        left: `${particle.x}%`,
                        width: particle.size,
                        height: particle.size,
                    }}
                    initial={{ y: "100vh", opacity: 0 }}
                    animate={{
                        y: "-100vh",
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}

            {/* Ambient glow effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-purple/5 blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-cyan/5 blur-3xl animate-pulse-slow" />
        </div>
    );
}
