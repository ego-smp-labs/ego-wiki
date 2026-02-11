"use client";

import { useEffect, useState, memo } from "react";

/**
 * Lightweight floating particles using pure CSS animations
 * instead of framer-motion to avoid JS-driven per-frame updates.
 */

const PARTICLE_COUNT = 12; // Reduced from 30

function generateParticleStyle(index: number) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = 2 + Math.random() * 3;
    const duration = 12 + Math.random() * 18;
    const delay = Math.random() * -duration; // negative = stagger start

    return {
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
    } as React.CSSProperties;
}

const FloatingParticles = memo(function FloatingParticles({ count = PARTICLE_COUNT }: { count?: number }) {
    const [styles, setStyles] = useState<React.CSSProperties[]>([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStyles(Array.from({ length: count }, (_, i) => generateParticleStyle(i)));
    }, [count]);

    if (styles.length === 0) return null;

    return (
        <>
            <style jsx global>{`
                @keyframes float-particle {
                    0% {
                        transform: translateY(0) translateX(0) scale(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.6;
                        transform: scale(1);
                    }
                    50% {
                        transform: translateY(-80px) translateX(20px) scale(1.2);
                        opacity: 0.4;
                    }
                    90% {
                        opacity: 0.6;
                    }
                    100% {
                        transform: translateY(-160px) translateX(-10px) scale(0);
                        opacity: 0;
                    }
                }
            `}</style>
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
                {styles.map((style, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-neon-purple/25"
                        style={{
                            ...style,
                            animation: `float-particle ${style.animationDuration} ${style.animationDelay} linear infinite`,
                        }}
                    />
                ))}
            </div>
        </>
    );
});

export default FloatingParticles;
