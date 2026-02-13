"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@core/lib/utils";
import { animate } from "animejs";

interface HoldToEnterProps {
    onComplete: () => void;
    duration?: number; // ms
    className?: string;
    children: React.ReactNode;
}

export const HoldToEnter = ({
    onComplete,
    duration = 2000,
    className,
    children,
}: HoldToEnterProps) => {
    const [isHolding, setIsHolding] = useState(false);
    const progressRef = useRef<SVGCircleElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const animationRef = useRef<any | null>(null);

    const startHold = () => {
        setIsHolding(true);
        const el = progressRef.current;
        if (el) {
            // AnimeJS v4 syntax
            animationRef.current = animate(el, {
                strokeDashoffset: [283, 0], // 2 * PI * r (45) ~= 283
                duration: duration,
                easing: "linear",
                onComplete: () => {
                    onComplete();
                    setIsHolding(false);
                },
            });
        }
    };

    const endHold = () => {
        setIsHolding(false);
        if (animationRef.current) {
            animationRef.current.pause();
            // Optional: Animate back to 0
            const el = progressRef.current;
            if (el) {
                animate(el, {
                    strokeDashoffset: 283,
                    duration: 300,
                    easing: "easeOutQuad",
                });
            }
        }
    };

    return (
        <div
            className={cn("relative inline-flex items-center justify-center select-none cursor-pointer group", className)}
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
        >
            {/* Ring SVG */}
            <svg
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                viewBox="0 0 100 100"
            >
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="4"
                />
                <circle
                    ref={progressRef}
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#ef4444" // Red for "Forbidden/Sins"
                    strokeWidth="4"
                    strokeDasharray="283"
                    strokeDashoffset="283"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                />
            </svg>

            {/* Content */}
            <div className={cn("relative z-10 transition-transform duration-200", isHolding ? "scale-95" : "scale-100")}>
                {children}
            </div>
            
            {/* Text Hint */}
            <div className={cn(
                "absolute -bottom-8 text-xs font-bold tracking-widest text-red-500 transition-opacity duration-300",
                isHolding ? "opacity-100" : "opacity-0 group-hover:opacity-50"
            )}>
                HOLD TO JOIN
            </div>
        </div>
    );
};
