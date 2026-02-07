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

    // 2. SMP - Floating Only (No Disappearing Glitch)
    useEffect(() => {
        if (!smpContainerRef.current) return;

        const letters = smpContainerRef.current.querySelectorAll(".smp-char");

        // A. Anti-Gravity Float
        anime({
            targets: letters,
            translateY: [-2, 2], // Subtle float
            rotate: [-1, 1],
            duration: () => anime.random(3000, 5000),
            delay: () => anime.random(0, 1000),
            loop: true,
            direction: "alternate",
            easing: "easeInOutSine"
        });

        // B. Micro-Twitch (Instead of Disappearing)
        const twitchLoop = () => {
            const target = letters[anime.random(0, letters.length - 1)];

            anime({
                targets: target,
                skewX: [0, 5, 0], // Very subtle twitch
                duration: 50,
                easing: "linear",
                complete: () => {
                    setTimeout(twitchLoop, anime.random(3000, 8000)); // Rare
                }
            });
        };

        twitchLoop();

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

            {/* SMP - Larger, stronger presence */}
            <div
                ref={smpContainerRef}
                className="flex gap-1 pointer-events-none"
            >
                {["S", "M", "P"].map((char, index) => (
                    <span
                        key={index}
                        className="smp-char text-6xl md:text-8xl font-bold text-white/90 inline-block drop-shadow-md"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        {char}
                    </span>
                ))}
            </div>
        </div>
    );
};
