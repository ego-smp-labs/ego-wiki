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
    header,
    icon,
    onClick,
    variant = "default",
}: BentoGridItemProps) => {
    const color = VARIANT_COLORS[variant];

    return (
        <NeonCard
            className={cn(
                "bento-item row-span-1 h-full flex flex-col justify-between p-4",
                "bg-black/20",
                className
            )}
            onClick={onClick}
            color={color}
        >
            <div className="transition duration-200 group-hover:translate-x-1 h-full flex flex-col">
                {header}
                <div className="font-display font-bold text-neutral-200 mb-2 mt-4 text-xl group-hover:text-white transition-colors">
                    {title}
                </div>
                <div className="font-sans font-normal text-white/50 text-xs">
                    {description}
                </div>
                <div className="mt-auto pt-4 text-white/30 group-hover:text-white transition-colors">
                    {icon}
                </div>
            </div>
        </NeonCard>
    );
};
