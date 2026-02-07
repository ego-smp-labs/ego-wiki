"use client";

import React, { useRef, useEffect, useState } from "react";
import anime from "animejs";
import { cn } from "@core/lib/utils";

interface NeonBorderButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    href?: string;
}

export const NeonBorderButton = ({
    onClick,
    children,
    className,
}: NeonBorderButtonProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const rectRef = useRef<SVGRectElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Update dimensions on mount and resize to ensure SVG fits perfectly
    useEffect(() => {
        const updateDimensions = () => {
            if (buttonRef.current) {
                setDimensions({
                    width: buttonRef.current.offsetWidth,
                    height: buttonRef.current.offsetHeight,
                });
            }
        };

        updateDimensions();
        // Small delay to ensure layout is settled
        setTimeout(updateDimensions, 100);

        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [children]);

    const handleMouseEnter = () => {
        if (!rectRef.current || !buttonRef.current) return;

        // 1. Animate Stroke (Clockwise Fill)
        anime.remove(rectRef.current);
        const perimeter = rectRef.current.getTotalLength();
        rectRef.current.style.strokeDasharray = `${perimeter}`;
        rectRef.current.style.strokeDashoffset = `${perimeter}`;
        rectRef.current.style.opacity = "1";

        anime({
            targets: rectRef.current,
            strokeDashoffset: [perimeter, 0],
            easing: "easeInOutSine",
            duration: 400,
        });

        // 2. Animate Glow (Subtle - NO Background Change)
        anime.remove(buttonRef.current);
        anime({
            targets: buttonRef.current,
            boxShadow: "0 0 15px rgba(123, 0, 255, 0.4)", // Violet glow only
            easing: "easeOutQuad",
            duration: 400,
        });
    };

    const handleMouseLeave = () => {
        if (!rectRef.current || !buttonRef.current) return;

        // 1. Reverse Stroke (Undraw)
        const perimeter = rectRef.current.getTotalLength();

        anime.remove(rectRef.current);
        anime({
            targets: rectRef.current,
            strokeDashoffset: perimeter, // Go back to hidden
            easing: "easeInOutSine",
            duration: 300, // Faster exit
            complete: () => {
                if (rectRef.current) rectRef.current.style.opacity = "0";
            }
        });

        // 2. Remove Glow
        anime.remove(buttonRef.current);
        anime({
            targets: buttonRef.current,
            boxShadow: "0 0 0px rgba(0, 0, 0, 0)",
            easing: "easeOutQuad",
            duration: 300,
        });
    };

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "relative group px-8 py-3 bg-transparent text-white font-mono uppercase tracking-widest text-sm",
                className
            )}
        >
            {/* Idle State: Thin White Border (30%) */}
            <div className={`absolute inset-0 border border-white/30 rounded-[4px] pointer-events-none transition-opacity duration-300`} />

            {/* Active State: SVG Overlay for Animated Stroke */}
            <svg
                className="absolute inset-0 pointer-events-none overflow-visible z-10"
                width="100%"
                height="100%"
                style={{ overflow: "visible" }}
            >
                <rect
                    ref={rectRef}
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    rx="4"
                    fill="none"
                    stroke="#7b00ff" // Neon Violet
                    strokeWidth="2"
                    strokeOpacity="0" // Hidden by default
                    vectorEffect="non-scaling-stroke"
                />
            </svg>

            {/* Content */}
            <span className="relative z-20 transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(123,0,255,0.5)]">
                {children}
            </span>
        </button>
    );
};
