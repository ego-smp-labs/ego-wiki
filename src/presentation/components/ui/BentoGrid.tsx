"use client";

import { cn } from "@core/lib/utils";
import React from "react";
import { NeonCard } from "@presentation/components/ui/NeonCard";

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

const VARIANT_COLORS: Record<string, string> = {
    default: "#7b00ff",
    general: "#22d3ee",
    ego: "#7b00ff",
    items: "#f59e0b",
    advanced: "#10b981",
    community: "#3b82f6",
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
                "row-span-1 h-full flex flex-col justify-between p-4",
                "bg-black/20 backdrop-blur-sm",
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
