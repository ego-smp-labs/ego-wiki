"use client";

import React from "react";
import { cn } from "@core/lib/utils";

interface MovingBorderProps {
    children: React.ReactNode;
    className?: string; // Class for the outer container
    containerClassName?: string; // Class for the inner content container/button
    duration?: number; // Animation duration in ms
    lineColor?: string; // Default gradient color if not using CSS vars directly
}

export const MovingBorder = ({
    children,
    className,
    containerClassName,
    duration = 2000,
}: MovingBorderProps) => {
    return (
        <div
            className={cn(
                "relative text-xl p-[1px] overflow-hidden group/border", // p-[1px] creates the border width
                className
            )}
            style={{
                borderRadius: "inherit", // Inherit radius from parent if set, or set explicitly
            }}
        >
            {/* 
               The Moving Gradient Layer 
               We use a conic gradient that rotates. 
               The 'mask' technique or simple z-index layering can work.
               Here we use a spinning absolute div behind the content.
            */}
            <div
                className="absolute inset-[-100%] opacity-0 group-hover/border:opacity-100 transition-opacity duration-500"
                style={{
                    background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 50%, var(--text-primary) 70%, var(--neon-purple) 100%)`,
                    animation: `spin ${duration}ms linear infinite`,
                }}
            />

            {/* 
                Static Border Fallback / Base 
                (Optional: visible when not hovering, or if we want a subtle border always)
            */}
            <div className="absolute inset-0 border border-void-border rounded-[inherit] z-0" />

            {/* Content Container */}
            <div
                className={cn(
                    "relative h-full w-full bg-void-surface rounded-[inherit] z-10",
                    containerClassName
                )}
            >
                {children}
            </div>
        </div>
    );
};
