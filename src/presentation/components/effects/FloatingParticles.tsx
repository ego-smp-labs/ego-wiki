"use client";

import { useEffect, useState, memo } from "react";

/**
 * FloatingParticles — Dreamy, ethereal particles across the entire page.
 * Uses pure CSS animations for maximum performance.
 * Multiple layers: tiny dots, medium orbs, and large blurred glows.
 */

const PARTICLE_COUNT = 40;

interface ParticleStyle {
    width: number;
    height: number;
    left: string;
    top: string;
    animationDuration: string;
    animationDelay: string;
    opacity: number;
    filter: string;
    background: string;
}

function generateParticleStyle(index: number): ParticleStyle {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Three tiers of particles
    const tier = index % 3;
    let size: number, opacity: number, blur: number, color: string;

    if (tier === 0) {
        // Tiny sparkle dots
        size = 1.5 + Math.random() * 2;
        opacity = 0.15 + Math.random() * 0.2;
        blur = 0;
        color = "rgba(168, 85, 247, 0.4)"; // purple
    } else if (tier === 1) {
        // Medium soft orbs
        size = 4 + Math.random() * 5;
        opacity = 0.08 + Math.random() * 0.12;
        blur = 2 + Math.random() * 3;
        color = Math.random() > 0.5
            ? "rgba(139, 92, 246, 0.3)"  // violet
            : "rgba(34, 211, 238, 0.2)"; // cyan
    } else {
        // Large blurred glows
        size = 12 + Math.random() * 20;
        opacity = 0.03 + Math.random() * 0.06;
        blur = 8 + Math.random() * 12;
        color = Math.random() > 0.5
            ? "rgba(123, 0, 255, 0.15)"   // deep purple
            : "rgba(168, 85, 247, 0.1)";  // soft purple
    }

    const duration = 15 + Math.random() * 25;
    const delay = Math.random() * -duration;

    return {
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        opacity,
        filter: blur > 0 ? `blur(${blur}px)` : "none",
        background: color,
    };
}

const FloatingParticles = memo(function FloatingParticles({ count = PARTICLE_COUNT }: { count?: number }) {
    const [styles, setStyles] = useState<ParticleStyle[]>([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStyles(Array.from({ length: count }, (_, i) => generateParticleStyle(i)));
    }, [count]);

    if (styles.length === 0) return null;

    return (
        <>
            <style jsx global>{`
                @keyframes float-drift {
                    0% {
                        transform: translateY(0) translateX(0) scale(0.5);
                        opacity: 0;
                    }
                    15% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    35% {
                        transform: translateY(-60px) translateX(30px) scale(1.1);
                    }
                    65% {
                        transform: translateY(-120px) translateX(-20px) scale(0.9);
                    }
                    85% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-200px) translateX(10px) scale(0.3);
                        opacity: 0;
                    }
                }

                @keyframes float-sway {
                    0% {
                        transform: translateY(0) translateX(0) scale(0.8);
                        opacity: 0;
                    }
                    20% {
                        opacity: 1;
                    }
                    40% {
                        transform: translateY(-40px) translateX(50px) scale(1);
                    }
                    60% {
                        transform: translateY(-100px) translateX(-30px) scale(1.15);
                    }
                    80% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-180px) translateX(15px) scale(0.4);
                        opacity: 0;
                    }
                }
            `}</style>
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
                {styles.map((style, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: style.width,
                            height: style.height,
                            left: style.left,
                            top: style.top,
                            opacity: style.opacity,
                            filter: style.filter,
                            background: style.background,
                            animation: `${i % 2 === 0 ? "float-drift" : "float-sway"} ${style.animationDuration} ${style.animationDelay} linear infinite`,
                        }}
                    />
                ))}
            </div>
        </>
    );
});

export default FloatingParticles;
