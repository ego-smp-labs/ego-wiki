"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, svg, stagger } from "animejs";

/**
 * SVG paths for "EGO" letters - outlined font paths for draw animation.
 * Each letter is designed in a 100x100 viewBox for consistent sizing.
 */
const EGO_PATHS = {
    E: [
        // Top horizontal bar
        "M 8 15 L 72 15",
        // Vertical bar
        "M 8 15 L 8 85",
        // Middle horizontal bar  
        "M 8 50 L 60 50",
        // Bottom horizontal bar
        "M 8 85 L 72 85",
    ],
    G: [
        // Main arc (top → left → bottom → right)
        "M 65 25 C 55 10, 25 10, 15 30 C 5 50, 10 75, 30 85 C 45 92, 65 88, 70 70",
        // Horizontal bar inward
        "M 70 70 L 70 52 L 45 52",
    ],
    O: [
        // Full oval
        "M 40 12 C 15 12, 5 35, 5 50 C 5 65, 15 88, 40 88 C 65 88, 75 65, 75 50 C 75 35, 65 12, 40 12 Z",
    ],
};

export const HeroLogo = () => {
    const egoSvgRef = useRef<SVGSVGElement>(null);
    const smpContainerRef = useRef<HTMLDivElement>(null);
    const [drawComplete, setDrawComplete] = useState(false);

    // EGO SVG Draw Animation
    useEffect(() => {
        if (!egoSvgRef.current) return;
        const paths = egoSvgRef.current.querySelectorAll(".ego-line");
        if (paths.length === 0) return;

        const drawables = svg.createDrawable(paths);

        // Initial state: hidden
        animate(drawables, { draw: "0 0", duration: 0 });

        // Draw animation: appear → fill → stay
        const drawAnim = animate(drawables, {
            draw: ["0 0", "0 1"],
            ease: "inOutQuad",
            duration: 1800,
            delay: stagger(80),
            onComplete: () => {
                setDrawComplete(true);
            }
        });

        // Subtle glow pulse after draw completes
        const glowAnim = animate(paths, {
            strokeOpacity: [0.7, 1],
            duration: 2000,
            delay: stagger(100, { start: 2200 }),
            loop: true,
            alternate: true,
            ease: "inOutSine",
        });

        return () => {
            drawAnim?.pause?.();
            glowAnim?.pause?.();
        };
    }, []);

    // SMP Gravity Bounce Animation
    useEffect(() => {
        if (!smpContainerRef.current) return;
        const letters = smpContainerRef.current.querySelectorAll(".smp-char");
        if (letters.length === 0) return;

        // Initial state: letters spawn above, invisible
        animate(letters, {
            translateY: -60,
            opacity: 0,
            duration: 0,
        });

        // Phase 1: Gravity drop with bounce
        const dropAnim = animate(letters, {
            translateY: 0,
            opacity: 1,
            duration: 1200,
            delay: stagger(150, { start: 1200 }), // Start after EGO draw begins
            ease: "outBounce",
        });

        // Phase 2: Wind sway (starts after drop completes)
        const swayDelay = 1200 + 150 * 3 + 1200; // after all letters dropped
        const swayTimeout = setTimeout(() => {
            if (!smpContainerRef.current) return;
            const chars = smpContainerRef.current.querySelectorAll(".smp-char");

            animate(chars, {
                translateX: [-3, 3],
                rotate: [-1.5, 1.5],
                duration: 3500,
                delay: stagger(300),
                loop: true,
                alternate: true,
                ease: "inOutSine",
            });
        }, swayDelay);

        return () => {
            dropAnim?.pause?.();
            clearTimeout(swayTimeout);
        };
    }, []);

    return (
        <div className="relative mb-6 select-none cursor-default flex items-center justify-center gap-2 md:gap-4">
            {/* EGO: SVG Draw Effect */}
            <svg
                ref={egoSvgRef}
                viewBox="0 0 260 100"
                className="h-[80px] md:h-[120px] w-auto"
                aria-label="EGO"
            >
                {/* Purple neon glow filter */}
                <defs>
                    <filter id="ego-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <linearGradient id="ego-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7b00ff" />
                        <stop offset="50%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#c77dff" />
                    </linearGradient>
                </defs>

                {/* Letter E (offset x: 0) */}
                <g transform="translate(0, 0)" filter="url(#ego-glow)">
                    {EGO_PATHS.E.map((d, i) => (
                        <path
                            key={`e-${i}`}
                            className="ego-line"
                            d={d}
                            fill="none"
                            stroke="url(#ego-gradient)"
                            strokeWidth="7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    ))}
                </g>

                {/* Letter G (offset x: 85) */}
                <g transform="translate(85, 0)" filter="url(#ego-glow)">
                    {EGO_PATHS.G.map((d, i) => (
                        <path
                            key={`g-${i}`}
                            className="ego-line"
                            d={d}
                            fill="none"
                            stroke="url(#ego-gradient)"
                            strokeWidth="7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    ))}
                </g>

                {/* Letter O (offset x: 175) */}
                <g transform="translate(175, 0)" filter="url(#ego-glow)">
                    {EGO_PATHS.O.map((d, i) => (
                        <path
                            key={`o-${i}`}
                            className="ego-line"
                            d={d}
                            fill="none"
                            stroke="url(#ego-gradient)"
                            strokeWidth="7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    ))}
                </g>

                {/* Fill text that fades in after draw completes */}
                <text
                    x="130"
                    y="68"
                    textAnchor="middle"
                    className="transition-opacity duration-1000"
                    style={{
                        fontFamily: "var(--font-display), Orbitron, sans-serif",
                        fontSize: "72px",
                        fontWeight: 900,
                        fill: "#7b00ff",
                        opacity: drawComplete ? 0.15 : 0,
                        letterSpacing: "-0.02em",
                    }}
                >
                    EGO
                </text>
            </svg>

            {/* SMP: Gravity Bounce Letters */}
            <div ref={smpContainerRef} className="flex gap-0.5 md:gap-1">
                {["S", "M", "P"].map((char, index) => (
                    <span
                        key={index}
                        className="smp-char text-7xl md:text-9xl font-bold text-white/90 inline-block will-change-transform"
                        style={{
                            fontFamily: "var(--font-mono)",
                            backfaceVisibility: "hidden",
                            WebkitFontSmoothing: "antialiased",
                            textShadow: "0 2px 10px rgba(123, 0, 255, 0.3)",
                            opacity: 0, // Start hidden, animate in
                        }}
                    >
                        {char}
                    </span>
                ))}
            </div>
        </div>
    );
};
