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
    const pathRef = useRef<SVGPathElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (buttonRef.current) {
            setDimensions({
                width: buttonRef.current.offsetWidth,
                height: buttonRef.current.offsetHeight,
            });
        }
    }, [children]);

    const handleMouseEnter = () => {
        if (!pathRef.current) return;

        // Animate Stroke Drawing (Clockwise)
        anime({
            targets: pathRef.current,
            strokeDashoffset: [anime.setDashoffset, 0],
            opacity: [0, 1],
            easing: "easeInOutSine",
            duration: 400,
        });

        // Animate Button Glow
        if (buttonRef.current) {
            anime({
                targets: buttonRef.current,
                boxShadow: "0 0 15px rgba(123, 0, 255, 0.4)", // Subtle violet glow
                duration: 400,
                easing: "easeOutQuad",
            });
        }
    };

    const handleMouseLeave = () => {
        if (!pathRef.current) return;

        // Reverse Stroke (Undraw)
        anime({
            targets: pathRef.current,
            strokeDashoffset: anime.setDashoffset,
            opacity: {
                value: 0,
                duration: 200,
                easing: "linear"
            },
            easing: "easeInOutSine",
            duration: 400,
        });

        // Remove Glow
        if (buttonRef.current) {
            anime({
                targets: buttonRef.current,
                boxShadow: "0 0 0px rgba(0, 0, 0, 0)",
                duration: 400,
                easing: "easeOutQuad",
            });
        }
    };

    // Construct SVG Path (Rectangle)
    const rectPath = `M0,0 L${dimensions.width},0 L${dimensions.width},${dimensions.height} L0,${dimensions.height} Z`;

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "relative group px-6 py-3 bg-transparent text-white font-mono uppercase tracking-wider overflow-hidden",
                "border border-white/30", // Idle subtle border
                className
            )}
            style={{
                borderRadius: "4px" // Keep it slightly sharp for tech look
            }}
        >
            {/* SVG Overlay for Animated Stroke */}
            <svg
                className="absolute inset-0 pointer-events-none"
                width="100%"
                height="100%"
                style={{ overflow: "visible" }}
            >
                <path
                    ref={pathRef}
                    d={rectPath}
                    fill="none"
                    stroke="#7b00ff" // Neon Purple
                    strokeWidth="2"
                    strokeOpacity="0" // Hidden by default
                    vectorEffect="non-scaling-stroke"
                />
            </svg>

            {/* Content */}
            <span className="relative z-10 group-hover:text-neon-cyan transition-colors duration-300">
                {children}
            </span>
        </button>
    );
};
