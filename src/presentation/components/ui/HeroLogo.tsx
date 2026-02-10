"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { animate, stagger } from "animejs";

export const HeroLogo = () => {
    const egoTextRef = useRef<HTMLHeadingElement>(null);
    const smpContainerRef = useRef<HTMLDivElement>(null);

    const handleEgoHover = useCallback(() => {
        if (!egoTextRef.current) return;
        animate(egoTextRef.current, {
            textShadow: [
                "0 0 15px rgba(123, 0, 255, 0.5)",
                "0 0 30px rgba(123, 0, 255, 0.9), 0 0 60px rgba(123, 0, 255, 0.6)"
            ],
            duration: 400,
            easing: "easeOutExpo"
        });
    }, []);

    const handleEgoLeave = useCallback(() => {
        if (!egoTextRef.current) return;
        animate(egoTextRef.current, {
            textShadow: "0 0 15px rgba(123, 0, 255, 0.3)",
            duration: 400,
            easing: "easeOutQuad"
        });
    }, []);

    useEffect(() => {
        if (!smpContainerRef.current) return;
        const letters = smpContainerRef.current.querySelectorAll(".smp-char");
        animate(letters, {
            translateY: [-5, 5],
            rotate: [-2, 2],
            duration: 3000,
            delay: stagger(200),
            loop: true,
            direction: "alternate",
            easing: "easeInOutSine"
        });
    }, []);

    return (
        <div className="relative mb-6 select-none cursor-default flex items-baseline justify-center gap-3 md:gap-5">
            <h1
                ref={egoTextRef}
                onMouseEnter={handleEgoHover}
                onMouseLeave={handleEgoLeave}
                className="text-8xl md:text-9xl font-black tracking-tighter relative z-10"
                style={{
                    color: "#7b00ff",
                    textShadow: "0 0 15px rgba(123, 0, 255, 0.3)",
                    fontFamily: "var(--font-display)",
                }}
            >
                EGO
            </h1>

            <div ref={smpContainerRef} className="flex gap-1 pointer-events-none">
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
