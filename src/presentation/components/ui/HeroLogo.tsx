"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import anime from "animejs";

export const HeroLogo = () => {
    const egoTextRef = useRef<HTMLHeadingElement>(null);
    const smpContainerRef = useRef<HTMLDivElement>(null);

    // 1. EGO - Interaction
    const handleEgoHover = () => {
        if (!egoTextRef.current) return;

        anime({
            targets: egoTextRef.current,
            color: ["#7b00ff", "#a855f7"], // Keep it in Violet range (Neon -> Light Violet)
            textShadow: [
                "0 0 15px rgba(123, 0, 255, 0.5)",
                "0 0 30px rgba(123, 0, 255, 0.8), 0 0 60px rgba(123, 0, 255, 0.4)" // Stronger Violet Glow
            ],
            duration: 600,
            easing: "easeOutExpo"
        });
    };

    const handleEgoLeave = () => {
        if (!egoTextRef.current) return;

        anime({
            targets: egoTextRef.current,
            color: "#7b00ff",
            textShadow: "0 0 15px rgba(123, 0, 255, 0.3)",
            duration: 600,
            easing: "easeOutQuad"
        });
    };

    // 2. SMP - Floating & Subtle Glitch
    useEffect(() => {
        if (!smpContainerRef.current) return;

        const letters = smpContainerRef.current.querySelectorAll(".smp-char");

        // A. Anti-Gravity Float (Slower, more majestic)
        anime({
            targets: letters,
            translateY: [-3, 3],
            rotate: [-1, 1],
            duration: () => anime.random(3000, 5000),
            delay: () => anime.random(0, 1000),
            loop: true,
            direction: "alternate",
            easing: "easeInOutSine"
        });

        // B. The Glitch (Rare and quick, not fully disappearing)
        const glitchLoop = () => {
            const target = letters[anime.random(0, letters.length - 1)];

            // Occasional twitch instead of full disappear
            anime({
                targets: target,
                opacity: [1, 0.6, 1], // Don't go to 0, just flicker
                skewX: [0, 10, 0], // Twitch
                duration: 100,
                easing: "steps(2)",
                complete: () => {
                    setTimeout(glitchLoop, anime.random(2000, 5000));
                }
            });
        };

        glitchLoop();

    }, []);

    return (
        <div className="relative mb-6 perspective-1000 select-none cursor-default inline-block">
            {/* Main Title - EGO */}
            <h1
                ref={egoTextRef}
                onMouseEnter={handleEgoHover}
                onMouseLeave={handleEgoLeave}
                className="text-8xl md:text-9xl font-black tracking-tighter relative z-10 transition-colors"
                style={{
                    color: "#7b00ff", // Neon Violet
                    textShadow: "0 0 15px rgba(123, 0, 255, 0.3)",
                    fontFamily: "var(--font-display)",
                    marginRight: "0.2em" // Space for SMP
                }}
            >
                EGO
            </h1>

            {/* SMP - Tightened Spacing */}
            <div
                ref={smpContainerRef}
                className="absolute right-0 bottom-3 md:bottom-5 flex gap-0.5 pointer-events-none"
                style={{ transform: "translateX(100%)" }} // Position exactly to the right
            >
                {["S", "M", "P"].map((char, index) => (
                    <span
                        key={index}
                        className="smp-char text-4xl md:text-6xl font-bold text-white/90 inline-block drop-shadow-md"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        {char}
                    </span>
                ))}
            </div>
        </div>
    );
};
