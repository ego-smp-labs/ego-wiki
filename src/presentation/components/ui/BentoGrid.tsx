"use client";

import { cn } from "@core/lib/utils";
import React, { useRef, useState, useEffect } from "react";
import anime from "animejs";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

interface BentoGridItemProps {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
    variant?: "default" | "general" | "ego" | "items" | "advanced" | "community";
}

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
    onClick,
    variant = "default",
}: BentoGridItemProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const rectRef = useRef<SVGRectElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Handle Resize/Mount for SVG
    useEffect(() => {
        const updateDimensions = () => {
            if (cardRef.current) {
                setDimensions({
                    width: cardRef.current.offsetWidth,
                    height: cardRef.current.offsetHeight,
                });
            }
        };

        updateDimensions();
        // Delay to catch layout settlement
        const timer = setTimeout(updateDimensions, 200);
        window.addEventListener("resize", updateDimensions);
        return () => {
            window.removeEventListener("resize", updateDimensions);
            clearTimeout(timer);
        };
    }, []);

    const handleMouseEnter = () => {
        if (!rectRef.current || !cardRef.current) return;

        // 1. Animate Stroke (Clockwise)
        const perimeter = rectRef.current.getTotalLength();
        anime.remove(rectRef.current);
        rectRef.current.style.strokeDasharray = `${perimeter}`;
        rectRef.current.style.strokeDashoffset = `${perimeter}`;
        rectRef.current.style.opacity = "1";

        anime({
            targets: rectRef.current,
            strokeDashoffset: [perimeter, 0],
            easing: "easeInOutSine",
            duration: 500,
            filter: ["drop-shadow(0 0 0px #7b00ff)", "drop-shadow(0 0 10px #7b00ff)"]
        });

        // NO Container Box-Shadow/Glow
        anime.remove(cardRef.current);
        cardRef.current.style.boxShadow = "none";

        // Optional: Keep slight lift if desired, but user is strict. Let's remove lift too to be safe/pure.
        // anime({ targets: cardRef.current, translateY: -2 ... }) -> Removing to coincide with "don't animate background/shadow"
    };

    const handleMouseLeave = () => {
        if (!rectRef.current || !cardRef.current) return;

        // 1. Reverse Stroke
        const perimeter = rectRef.current.getTotalLength();
        anime.remove(rectRef.current);
        anime({
            targets: rectRef.current,
            strokeDashoffset: perimeter,
            filter: "drop-shadow(0 0 0px #7b00ff)",
            easing: "easeInOutSine",
            duration: 300,
            complete: () => {
                if (rectRef.current) rectRef.current.style.opacity = "0";
            }
        });

        // Reset any potential leftovers
        anime.remove(cardRef.current);
        cardRef.current.style.boxShadow = "none";
    };

    return (
        <div
            ref={cardRef}
            className={cn(
                "row-span-1 rounded-xl group/bento transition-colors duration-200",
                "bg-black/20 backdrop-blur-sm border border-white/10", // Idle state matches request (White borders)
                "justify-between flex flex-col space-y-4 relative overflow-hidden",
                className
            )}
            onClick={onClick}
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
                    rx="12" // Match rounded-xl (approx 12px)
                    fill="none"
                    stroke="#7b00ff" // Neon Violet
                    strokeWidth="2"
                    strokeOpacity="0"
                />
            </svg>

            <div className="relative z-0 p-4 h-full flex flex-col">
                <div className="transition duration-200 group-hover/bento:translate-x-1">
                    {header}
                    <div className="font-display font-bold text-neutral-200 mb-2 mt-4 text-xl group-hover/bento:text-white transition-colors">
                        {title}
                    </div>
                    <div className="font-sans font-normal text-white/50 text-xs">
                        {description}
                    </div>
                </div>
                <div className="mt-auto ml-auto pt-4 text-white/30 group-hover/bento:text-neon-cyan transition-colors">
                    {icon}
                </div>
            </div>
        </div>
    );
};
