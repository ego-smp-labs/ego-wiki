"use client";

import { cn } from "@core/lib/utils";
import React, { useEffect, useRef } from "react";
import { NeonCard } from "@presentation/components/ui/NeonCard";
import { animate, stagger } from "animejs";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!gridRef.current) return;
        const items = gridRef.current.querySelectorAll(".bento-item");
        if (!items.length) return;

        // Initial state
        items.forEach((el) => {
            (el as HTMLElement).style.opacity = "0";
            (el as HTMLElement).style.transform = "translateY(30px)";
        });

        // Stagger entrance
        const anim = animate(items, {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            delay: stagger(120, { start: 300 }),
            ease: "outCubic",
        });

        return () => {
            anim?.pause?.();
        };
    }, []);

    return (
        <div
            ref={gridRef}
            className={cn(
                "grid md:auto-rows-[24rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export interface BentoGridItemProps {
    className?: string;
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    header?: React.ReactNode; // Optional: custom header content
    icon: React.ReactNode;
    image?: string; // Path to background image
    onClick?: () => void;
    href?: string;
    variant?: "default" | "general" | "ego" | "items" | "advanced" | "community" | "sins";
}

const VARIANT_COLORS: Record<string, string> = {
    default: "#7b00ff",
    general: "#22d3ee",
    ego: "#7b00ff",
    items: "#f59e0b",
    advanced: "#10b981",
    community: "#3b82f6",
    sins: "#ef4444",
};

export const BentoGridItem = ({
    className,
    title,
    description,
    // header, // Deprecated in favor of full BG
    icon,
    image,
    onClick,
    variant = "default",
}: BentoGridItemProps) => {
    const color = VARIANT_COLORS[variant] || VARIANT_COLORS.default;

    return (
        <div
            className={cn(
                "row-span-1 relative rounded-xl group/bento hover:shadow-xl transition duration-300 shadow-none p-4 dark:bg-black dark:border-white/10 border border-transparent justify-end flex flex-col space-y-4 overflow-hidden",
                "h-full",
                className
            )}
            style={{
                borderColor: `${color}40`, // Low opacity border default
                boxShadow: `0 0 0 1px ${color}10`, // Subtle glow
            }}
            onClick={onClick}
        >
            {/* Full Background Image */}
            {image && (
                <div className="absolute inset-0 z-0">
                    <img
                        src={image}
                        alt="bg"
                        className="w-full h-full object-cover opacity-60 group-hover/bento:opacity-40 group-hover/bento:scale-105 transition-all duration-700 blur-[2px] group-hover/bento:blur-0 filter grayscale group-hover/bento:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300" />
                </div>
            )}

            {/* Hover Reveal Content */}
            <div className="relative z-10 transition-all duration-300 group-hover/bento:-translate-y-2">
                 {/* Icon - Always visible, initially centered or prominent? No, keep layout consistent */}
                <div 
                    className="mb-2 p-2 rounded-lg w-fit transition-colors duration-300"
                    style={{ backgroundColor: `${color}20`, color: color }}
                >
                    {icon}
                </div>

                <div className="font-display font-bold text-neutral-200 mb-2 text-xl transition-colors duration-300 group-hover/bento:text-white">
                    {title}
                </div>
                
                <div className="font-sans font-normal text-neutral-400 text-sm opacity-0 h-0 group-hover/bento:opacity-100 group-hover/bento:h-auto transition-all duration-300 transform translate-y-4 group-hover/bento:translate-y-0">
                    {description}
                </div>
            </div>
            
            {/* Decorative colored line on hover */}
             <div 
                className="absolute bottom-0 left-0 h-1 bg-current transition-all duration-300 w-0 group-hover/bento:w-full"
                style={{ backgroundColor: color }}
            />
        </div>
    );
};
