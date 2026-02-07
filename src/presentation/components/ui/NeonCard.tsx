"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import anime from "animejs";
import { cn } from "@core/lib/utils";

interface NeonCardProps {
    children: React.ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
    color?: string; // Default to #7b00ff
}

export const NeonCard = ({
    children,
    className,
    href,
    onClick,
    color = "#7b00ff", // Neon Violet default
}: NeonCardProps) => {
    const cardRef = useRef<any>(null);
    const rectRef = useRef<SVGRectElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Handle resize if needed, but 100% width/height usually handles it
    }, []);

    const handleMouseEnter = () => {
        if (!rectRef.current) return;

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
            // SVG Filter Glow (Border Only)
            filter: [`drop-shadow(0 0 0px ${color})`, `drop-shadow(0 0 8px ${color})`]
        });
    };

    const handleMouseLeave = () => {
        if (!rectRef.current) return;

        // 1. Reverse Stroke (Undraw)
        const perimeter = rectRef.current.getTotalLength();

        anime.remove(rectRef.current);
        anime({
            targets: rectRef.current,
            strokeDashoffset: perimeter, // Go back to hidden
            filter: `drop-shadow(0 0 0px ${color})`, // Turn off glow
            easing: "easeInOutSine",
            duration: 300,
            complete: () => {
                if (rectRef.current) rectRef.current.style.opacity = "0";
            }
        });
    };

    const Container = (href ? Link : "div") as React.ElementType;
    const props = href ? { href } : { onClick };

    return (
        <Container
            {...props}
            ref={cardRef}
            className={cn(
                "relative group block overflow-hidden rounded-xl bg-void-surface transition-all duration-300",
                "border border-white/10", // Idle border
                "shadow-lg shadow-black/40", // Static "Raised" Shadow (Bóng đổ nổi) - Always present
                className
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Neon Border SVG Overlay */}
            <svg
                className="absolute inset-0 pointer-events-none z-10"
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
                    rx="12" // Match rounded-xl
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeOpacity="0"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>

            {/* Content */}
            <div className="relative z-20 h-full">
                {children}
            </div>
        </Container>
    );
};
