"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { animate, remove } from "animejs";
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
    const perimeterRef = useRef<number>(0);

    useEffect(() => {
        if (!rectRef.current) return;
        const rect = rectRef.current;
        const perimeter = rect.getTotalLength();
        perimeterRef.current = perimeter;
        rect.style.strokeDasharray = `${perimeter}`;
        rect.style.strokeDashoffset = `${perimeter}`;
        rect.style.opacity = "1";
    }, []);

    const handleMouseEnter = useCallback(() => {
        const rect = rectRef.current;
        const button = buttonRef.current;
        const perimeter = perimeterRef.current;
        if (!rect || perimeter === 0) return;

        remove(rect);

        animate(rect, {
            strokeDashoffset: [perimeter, 0],
            duration: 400,
            easing: "easeInOutQuad",
        });

        animate(rect, {
            filter: ["drop-shadow(0 0 0px #7b00ff)", "drop-shadow(0 0 12px #7b00ff)"],
            duration: 400,
            easing: "easeOutQuad",
        });

        if (button) {
            animate(button, {
                scale: 1.03,
                duration: 300,
                easing: "easeOutExpo",
            });
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        const rect = rectRef.current;
        const button = buttonRef.current;
        const perimeter = perimeterRef.current;
        if (!rect || perimeter === 0) return;

        remove(rect);

        animate(rect, {
            strokeDashoffset: perimeter,
            duration: 250,
            easing: "easeInOutQuad",
        });

        animate(rect, {
            filter: "drop-shadow(0 0 0px #7b00ff)",
            duration: 250,
            easing: "easeOutQuad",
        });

        if (button) {
            animate(button, {
                scale: 1,
                duration: 200,
                easing: "easeOutQuad",
            });
        }
    }, []);

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
            style={{ willChange: "transform" }}
        >
            <div className="absolute inset-0 border border-white/30 rounded-[4px] pointer-events-none transition-opacity duration-300" />
            <svg
                className="absolute inset-0 pointer-events-none overflow-visible z-10"
                width="100%"
                height="100%"
            >
                <rect
                    ref={rectRef}
                    x="1"
                    y="1"
                    width="calc(100% - 2px)"
                    height="calc(100% - 2px)"
                    rx="4"
                    fill="none"
                    stroke="#7b00ff"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
            <span className="relative z-20 transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(123,0,255,0.5)]">
                {children}
            </span>
        </button>
    );
};
