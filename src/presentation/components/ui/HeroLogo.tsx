"use client";

import React, { useEffect, useRef } from "react";
import { animate, svg, stagger } from "animejs";

export const HeroLogo = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const smpRef = useRef<HTMLDivElement>(null);
    const animsRef = useRef<ReturnType<typeof animate>[]>([]);

    useEffect(() => {
        const svgEl = svgRef.current;
        const smpEl = smpRef.current;
        if (!svgEl || !smpEl) return;

        const paths = svgEl.querySelectorAll(".ego-stroke");
        const chars = smpEl.querySelectorAll(".smp-char");
        if (!paths.length || !chars.length) return;

        // === EGO: SVG line draw ===
        const drawables = svg.createDrawable(paths);
        animate(drawables, { draw: "0 0", duration: 0 });

        const drawAnim = animate(drawables, {
            draw: ["0 0", "0 1"],
            ease: "inOutQuad",
            duration: 1400,
            delay: stagger(60),
        });
        animsRef.current.push(drawAnim);

        // === SMP: gravity drop ===
        animate(chars, { translateY: -50, opacity: 0, duration: 0 });

        const dropAnim = animate(chars, {
            translateY: 0,
            opacity: 1,
            duration: 900,
            delay: stagger(120, { start: 800 }),
            ease: "outBounce",
        });
        animsRef.current.push(dropAnim);

        // Gentle float after landing (lightweight, no loop on expensive props)
        const floatTimer = setTimeout(() => {
            if (!smpEl) return;
            const c = smpEl.querySelectorAll(".smp-char");
            const floatAnim = animate(c, {
                translateY: [-2, 2],
                duration: 3000,
                delay: stagger(250),
                loop: true,
                alternate: true,
                ease: "inOutSine",
            });
            animsRef.current.push(floatAnim);
        }, 2200);

        return () => {
            clearTimeout(floatTimer);
            animsRef.current.forEach(a => a?.pause?.());
            animsRef.current = [];
        };
    }, []);

    return (
        <div className="relative mb-6 select-none cursor-default flex items-baseline justify-center gap-3 md:gap-5">
            {/* EGO — SVG outlined strokes */}
            <svg
                ref={svgRef}
                viewBox="0 0 320 100"
                className="h-[72px] md:h-[110px] w-auto"
                aria-label="EGO"
                role="img"
            >
                <defs>
                    <linearGradient id="ego-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7b00ff" />
                        <stop offset="60%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#c77dff" />
                    </linearGradient>
                </defs>

                <g
                    fill="none"
                    stroke="url(#ego-grad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {/* ===== E ===== */}
                    {/* Vertical spine */}
                    <path className="ego-stroke" d="M 10,15 L 10,85" />
                    {/* Top bar */}
                    <path className="ego-stroke" d="M 10,15 L 70,15" />
                    {/* Middle bar */}
                    <path className="ego-stroke" d="M 10,50 L 58,50" />
                    {/* Bottom bar */}
                    <path className="ego-stroke" d="M 10,85 L 70,85" />

                    {/* ===== G ===== */}
                    {/* Arc from top-right → top → left → bottom → right */}
                    <path className="ego-stroke" d="M 170,28 C 155,12 120,10 105,25 C 90,40 90,65 105,78 C 120,90 155,88 170,72" />
                    {/* Horizontal shelf */}
                    <path className="ego-stroke" d="M 170,72 L 170,52 L 142,52" />

                    {/* ===== O ===== */}
                    {/* Full ellipse */}
                    <path className="ego-stroke" d="M 250,15 C 222,15 210,35 210,50 C 210,65 222,85 250,85 C 278,85 290,65 290,50 C 290,35 278,15 250,15 Z" />
                </g>
            </svg>

            {/* SMP — gravity drop text */}
            <div ref={smpRef} className="flex">
                {["S", "M", "P"].map((ch, i) => (
                    <span
                        key={i}
                        className="smp-char text-7xl md:text-[110px] font-bold text-white/90 inline-block leading-none"
                        style={{
                            fontFamily: "var(--font-mono)",
                            textShadow: "0 2px 12px rgba(123,0,255,0.25)",
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
