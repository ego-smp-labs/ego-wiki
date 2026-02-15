"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

/**
 * HeroLogo — Displays `logo_icon.png` as the main hero logo.
 *
 * Default:   Grayscale, slightly dim.
 * Hover:     Transitions smoothly to full color + brightness boost + glow intensifies.
 * Release:   Fades back to grayscale.
 */
export const HeroLogo = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Entrance animation
    useEffect(() => {
        if (!containerRef.current) return;

        animate(containerRef.current, {
            opacity: [0, 1],
            scale: [0.85, 1],
            duration: 1000,
            delay: 200,
            easing: "easeOutCubic",
        });
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative mb-6 select-none cursor-pointer flex items-center justify-center opacity-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            {/* Glow behind the logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                    className={`w-[80%] h-[80%] rounded-full blur-[60px] transition-all duration-700 ${
                        isHovered
                            ? "bg-neon-purple/40 scale-125"
                            : "bg-neon-purple/15 scale-100"
                    }`}
                />
            </div>

            {/* The actual logo image */}
            <img
                src="/logo_icon.png"
                alt="EGO SMP"
                className={`relative z-10 w-auto max-w-[500px] h-auto max-h-[280px] md:max-w-[600px] md:max-h-[340px] object-contain transition-all duration-700 drop-shadow-[0_0_30px_rgba(123,0,255,0.4)] ${
                    isHovered
                        ? "grayscale-0 brightness-110 drop-shadow-[0_0_50px_rgba(123,0,255,0.6)]"
                        : "grayscale brightness-75"
                }`}
            />

            {/* Hover hint text */}
            <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-10 text-white/30 text-xs font-mono tracking-widest transition-opacity duration-500 ${
                    isHovered ? "opacity-0" : "opacity-100 animate-pulse"
                }`}
            >
                HOVER TO AWAKEN
            </div>
        </div>
    );
};
