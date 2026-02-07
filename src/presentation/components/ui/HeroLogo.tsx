"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import anime from "animejs";

export const HeroLogo = () => {
    const egoTextRef = useRef<HTMLHeadingElement>(null);
    const smpContainerRef = useRef<HTMLDivElement>(null);

    // 1. EGO - Soul Absorb Effect
    const handleEgoHover = () => {
        if (!egoTextRef.current) return;

        // Animate Color Transition (Purple -> Soul Blue)
        anime({
            targets: egoTextRef.current,
            color: ["#7b00ff", "#00f0ff"], // Neon Purple -> Cyan
            textShadow: [
                "0 0 10px rgba(123, 0, 255, 0.5)",
                "0 0 20px rgba(0, 240, 255, 0.8), 0 0 40px rgba(0, 240, 255, 0.4)"
            ],
            duration: 800,
            easing: "easeOutExpo"
        });

        // Trigger Turbulence (simulated via CSS filter animation if possible, or refined shadow)
        // Note: Anime.js can animate SVG filters, but for text, shadow manipulation is cleaner/performant.
        // We'll stick to the shadow "inhale" effect.
    };

    const handleEgoLeave = () => {
        if (!egoTextRef.current) return;

        anime({
            targets: egoTextRef.current,
            color: "#7b00ff",
            textShadow: "0 0 15px rgba(157, 0, 255, 0.5)",
            duration: 600,
            easing: "easeOutQuad"
        });
    };

    // 2. SMP - Vanishing Debris & Glitch
    useEffect(() => {
        if (!smpContainerRef.current) return;

        const letters = smpContainerRef.current.querySelectorAll(".smp-char");

        // A. Anti-Gravity Float
        anime({
            targets: letters,
            translateY: [-5, 5],
            rotate: [-2, 2],
            duration: () => anime.random(2000, 4000),
            delay: () => anime.random(0, 500),
            loop: true,
            direction: "alternate",
            easing: "easeInOutSine"
        });

        // B. The Glitch (Random Disappear/Reappear)
        const glitchLoop = () => {
            const target = letters[anime.random(0, letters.length - 1)];

            anime({
                targets: target,
                opacity: [1, 0, 1], // Blink out then in
                scale: [1, 1.2, 1],
                duration: 150, // Instant
                easing: "steps(1)", // digital glitch feel
                complete: () => {
                    // Schedule next glitch
                    setTimeout(glitchLoop, anime.random(1000, 3000));
                }
            });
        };

        glitchLoop();

    }, []);

    return (
        <div className="relative mb-6 perspective-1000 select-none cursor-default">
            {/* Main Title - EGO */}
            <h1
                ref={egoTextRef}
                onMouseEnter={handleEgoHover}
                onMouseLeave={handleEgoLeave}
                className="text-8xl md:text-9xl font-black tracking-tighter inline-block relative z-10 transition-colors"
                style={{
                    color: "#7b00ff", // Initial Neon Purple
                    textShadow: "0 0 15px rgba(157, 0, 255, 0.5)",
                    fontFamily: "var(--font-display)"
                }}
            >
                EGO
            </h1>

            {/* SMP - Deconstructed / Floating Effect */}
            <div
                ref={smpContainerRef}
                className="absolute -right-4 -bottom-2 md:-right-12 md:bottom-2 flex gap-1 pointer-events-none"
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
