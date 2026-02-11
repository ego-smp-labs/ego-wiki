"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

export const HeroLogo = () => {
    const egoRef = useRef<HTMLDivElement>(null);
    const smpRef = useRef<HTMLDivElement>(null);
    const animsRef = useRef<ReturnType<typeof animate>[]>([]);

    useEffect(() => {
        const egoEl = egoRef.current;
        const smpEl = smpRef.current;
        if (!egoEl || !smpEl) return;

        const egoChars = egoEl.querySelectorAll(".ego-char");
        const smpChars = smpEl.querySelectorAll(".smp-char");
        if (!egoChars.length || !smpChars.length) return;

        // === EGO: clip-path reveal + glow pulse ===
        // Initial state: hidden via clip
        egoChars.forEach((el) => {
            (el as HTMLElement).style.clipPath = "inset(0 100% 0 0)";
            (el as HTMLElement).style.opacity = "0";
        });

        // Reveal each letter by expanding clip from left to right
        const egoReveal = animate(egoChars, {
            opacity: [0, 1],
            duration: 600,
            delay: stagger(180, { start: 200 }),
            ease: "outExpo",
            onBegin: (anim) => {
                // Manually animate clipPath since anime.js doesn't handle it natively
                egoChars.forEach((el, i) => {
                    const charDelay = 200 + i * 180;
                    setTimeout(() => {
                        const htmlEl = el as HTMLElement;
                        htmlEl.style.transition = "clip-path 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
                        htmlEl.style.clipPath = "inset(0 0% 0 0)";
                    }, charDelay);
                });
            },
        });
        animsRef.current.push(egoReveal);

        // === SMP: gravity bounce ===
        smpChars.forEach((el) => {
            (el as HTMLElement).style.opacity = "0";
        });

        const smpDrop = animate(smpChars, {
            translateY: [-60, 0],
            opacity: [0, 1],
            duration: 900,
            delay: stagger(120, { start: 900 }),
            ease: "outBounce",
        });
        animsRef.current.push(smpDrop);

        // Gentle idle float (very lightweight)
        const floatDelay = setTimeout(() => {
            if (!smpEl) return;
            const chars = smpEl.querySelectorAll(".smp-char");
            const floatAnim = animate(chars, {
                translateY: [-1.5, 1.5],
                duration: 3000,
                delay: stagger(200),
                loop: true,
                alternate: true,
                ease: "inOutSine",
            });
            animsRef.current.push(floatAnim);
        }, 2200);

        return () => {
            clearTimeout(floatDelay);
            animsRef.current.forEach((a) => a?.pause?.());
            animsRef.current = [];
        };
    }, []);

    return (
        <div className="relative mb-6 select-none cursor-default flex items-baseline justify-center gap-3 md:gap-5">
            {/* EGO — Gradient text with reveal animation */}
            <div ref={egoRef} className="flex">
                {["E", "G", "O"].map((ch, i) => (
                    <span
                        key={i}
                        className="ego-char text-7xl md:text-[110px] font-black inline-block leading-none"
                        style={{
                            fontFamily: "var(--font-display), Orbitron, sans-serif",
                            background: "linear-gradient(135deg, #7b00ff 0%, #a855f7 50%, #c77dff 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            filter: "drop-shadow(0 0 20px rgba(123, 0, 255, 0.4))",
                            willChange: "clip-path, opacity",
                        }}
                    >
                        {ch}
                    </span>
                ))}
            </div>

            {/* SMP — Gravity bounce white text */}
            <div ref={smpRef} className="flex">
                {["S", "M", "P"].map((ch, i) => (
                    <span
                        key={i}
                        className="smp-char text-7xl md:text-[110px] font-bold text-white/90 inline-block leading-none"
                        style={{
                            fontFamily: "var(--font-mono)",
                            textShadow: "0 2px 12px rgba(123, 0, 255, 0.2)",
                            willChange: "transform, opacity",
                        }}
                    >
                        {ch}
                    </span>
                ))}
            </div>
        </div>
    );
};
