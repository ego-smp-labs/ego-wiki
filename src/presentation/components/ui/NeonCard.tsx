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
        rectRef.current.style.opacity = "1";

        // 1. Animate Stroke
        anime({
            targets: rectRef.current,
            strokeDashoffset: [perimeter, 0],
            easing: "easeInOutSine",
            duration: 400,
            filter: [`drop-shadow(0 0 0px ${color})`, `drop-shadow(0 0 12px ${color})`] // Stronger Glow
        });

        // 2. Scale/Lift Effect (User Requested)
        if (cardRef.current) {
            anime({
                targets: cardRef.current,
                scale: 1.02,
                translateY: -5,
                duration: 400,
                easing: "easeOutExpo"
            });
        }
    };

    const handleMouseLeave = () => {
        if (!rectRef.current) return;

        // 1. Reverse Stroke
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

        // 2. Reset Scale/Lift
        if (cardRef.current) {
            anime({
                targets: cardRef.current,
                scale: 1,
                translateY: 0,
                duration: 300,
                easing: "easeOutQuad"
            });
        }
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
            style={{ willChange: "transform" }} // Optimize for anime.js
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Neon Border SVG Overlay - Increased Z-index and Visibility */}
            <svg
                className="absolute inset-0 pointer-events-none z-20"
                width="100%"
                height="100%"
                style={{ overflow: "visible" }}
            >
                <rect
                    ref={rectRef}
                    x="2"
                    y="2"
                    width="calc(100% - 4px)"
                    height="calc(100% - 4px)"
                    rx="10" // Adjusted for padding
                    fill="none"
                    stroke={color}
                    strokeWidth="4" // Thicker stroke for visibility
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
