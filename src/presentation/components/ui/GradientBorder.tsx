"use client";

import React, { CSSProperties } from "react";
import { clsx } from "clsx";

interface GradientBorderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    containerClassName?: string;
}

export function GradientBorder({
    children,
    className,
    containerClassName,
    ...props
}: GradientBorderProps) {
    return (
        <div
            className={clsx(
                "group relative inline-block p-[1px] overflow-hidden rounded-xl",
                containerClassName
            )}
            style={
                {
                    "--angle": "0deg",
                } as CSSProperties
            }
        >
            {/* Moving Gradient Border */}
            <div
                className="absolute inset-0 z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background:
                        "conic-gradient(from var(--angle), transparent 50%, var(--neon-purple), var(--neon-cyan), transparent 90%)",
                    animation: "rotate 4s linear infinite",
                }}
            />

            {/* Inner Content */}
            <div
                className={clsx(
                    "relative z-10 bg-void-surface rounded-[11px] h-full w-full",
                    className
                )}
                {...props}
            >
                {children}
            </div>

            <style jsx>{`
                @property --angle {
                    syntax: "<angle>";
                    initial-value: 0deg;
                    inherits: false;
                }

                @keyframes rotate {
                    to {
                        --angle: 360deg;
                    }
                }
            `}</style>
        </div>
    );
}
