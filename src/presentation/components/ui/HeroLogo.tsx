"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import anime from "animejs";

export const HeroLogo = () => {
    const egoTextRef = useRef<HTMLHeadingElement>(null);
    const smpContainerRef = useRef<HTMLDivElement>(null);

    // 1. EGO - Interaction (No Color Shift, just Shadow Intensify)
    const handleEgoHover = () => {
        if (!egoTextRef.current) return;

        anime({
            targets: egoTextRef.current,
            textShadow: [
                "0 0 15px rgba(123, 0, 255, 0.5)",
                "0 0 30px rgba(123, 0, 255, 0.9), 0 0 60px rgba(123, 0, 255, 0.6)" // Stronger Violet Glow
            ],
            duration: 400, // Faster response
            easing: "easeOutExpo"
        });
    };

    const handleEgoLeave = () => {
        if (!egoTextRef.current) return;

        anime({
            targets: egoTextRef.current,
            textShadow: "0 0 15px rgba(123, 0, 255, 0.3)",
            duration: 400,
            easing: "easeOutQuad"
        });
    };

    // 2. SMP - Floating Animation
    useEffect(() => {
        if (!smpContainerRef.current) return;

        const letters = smpContainerRef.current.querySelectorAll(".smp-char");

        // A. Anti-Gravity Float (Make it visible)
        anime({
            targets: letters,
            translateY: [-5, 5], // Increased range from 2 to 5 for visibility
            rotate: [-2, 2], // Slight rotation
            duration: 3000,
            delay: anime.stagger(200), // Stagger for wave effect
            loop: true,
            direction: "alternate",
            easing: "easeInOutSine"
        });

    }, []);

    return (
        // Flex container for tighter, natural spacing
        <div className="relative mb-6 select-none cursor-default flex items-baseline justify-center gap-3 md:gap-5">
            {/* Main Title - EGO */}
            <h1
                ref={egoTextRef}
                onMouseEnter={handleEgoHover}
                onMouseLeave={handleEgoLeave}
                className="text-8xl md:text-9xl font-black tracking-tighter relative z-10"
                style={{
                    color: "#7b00ff", // Fixed Neon Violet
                    textShadow: "0 0 15px rgba(123, 0, 255, 0.3)",
                    fontFamily: "var(--font-display)",
                }}
            >
                EGO
            </h1>

            {/* SMP - Same size as EGO */}
            <div
                ref={smpContainerRef}
                className="flex gap-1 pointer-events-none"
            >
                {["S", "M", "P"].map((char, index) => (
                    <span
                        key={index}
                        className="smp-char text-8xl md:text-9xl font-bold text-white/90 inline-block drop-shadow-md"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        {char}
                    </span>
                ))}
            </div>
        </div>
    );
};
