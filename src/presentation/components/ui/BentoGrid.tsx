"use client";

import { cn } from "@core/lib/utils";
import React, { useRef } from "react";
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
    const bgRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (!cardRef.current || !bgRef.current) return;

        // Animate Container Scale and Shadow (Violet Glow)
        anime({
            targets: cardRef.current,
            scale: 1.02,
            boxShadow: "0 0 20px 5px rgba(139, 92, 246, 0.5)", // Violet glow
            borderColor: "rgba(139, 92, 246, 0.5)",
            duration: 400,
            easing: "easeOutExpo",
        });

        // Animate Background Gradient Opacity
        anime({
            targets: bgRef.current,
            opacity: [0, 1],
            duration: 600,
            easing: "easeOutQuad",
        });
    };

    const handleMouseLeave = () => {
        if (!cardRef.current || !bgRef.current) return;

        // Reset Container
        anime({
            targets: cardRef.current,
            scale: 1,
            boxShadow: "0 0 0px 0px rgba(0, 0, 0, 0)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            duration: 400,
            easing: "easeOutExpo",
        });

        // Reset Background
        anime({
            targets: bgRef.current,
            opacity: 0,
            duration: 400,
            easing: "easeOutQuad",
        });
    };

    // Define background styles based on variant (Static)
    const getBackgroundStyle = () => {
        switch (variant) {
            case "general": return "bg-neutral-900";
            case "ego": return "bg-void-bg";
            case "items": return "bg-neutral-900";
            default: return "bg-void-surface";
        }
    };

    return (
        <div
            ref={cardRef}
            className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] border border-transparent justify-between flex flex-col space-y-4 relative overflow-hidden",
                getBackgroundStyle(),
                className
            )}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ borderColor: "rgba(255, 255, 255, 0.1)" }} // Initial explicit style for animejs to latch onto
        >
            {/* Animated Violet Gradient Background Layer */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0 opacity-0 pointer-events-none"
                style={{
                    background: "linear-gradient(135deg, rgba(88, 28, 135, 0.8) 0%, rgba(15, 23, 42, 1) 100%)",
                }}
            />

            <div className="relative z-10 transition duration-200 group-hover/bento:translate-x-2">
                {header}
                <div className="font-display font-bold text-neutral-200 mb-2 mt-2 text-xl">
                    {title}
                </div>
                <div className="font-sans font-normal text-neutral-400 text-xs">
                    {description}
                </div>
            </div>
            <div className="relative z-10 mt-auto ml-auto">
                {icon}
            </div>
        </div>
    );
};
