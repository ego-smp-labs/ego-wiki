"use client";

import React, { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import anime from "animejs";
import { cn } from "@core/lib/utils";

interface NeonCardProps {
    children: React.ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
    color?: string;
}

export const NeonCard = ({
    children,
    className,
    href,
    onClick,
    color = "#7b00ff",
}: NeonCardProps) => {
    const cardRef = useRef<HTMLDivElement | HTMLAnchorElement>(null);
    const rectRef = useRef<SVGRectElement>(null);
    const perimeterRef = useRef<number>(0);

    useEffect(() => {
        if (!rectRef.current) return;
        const rect = rectRef.current;
        const perimeter = rect.getTotalLength();
        perimeterRef.current = perimeter;
        rect.style.strokeDasharray = `${perimeter}`;
        rect.style.strokeDashoffset = `${perimeter}`;
        rect.style.opacity = "1";
    }, []);

    const handleMouseEnter = useCallback(() => {
        const rect = rectRef.current;
        const card = cardRef.current;
        const perimeter = perimeterRef.current;
        if (!rect || perimeter === 0) return;

        anime.remove(rect);
        if (card) anime.remove(card);

        anime({
            targets: rect,
            strokeDashoffset: [perimeter, 0],
            duration: 500,
            easing: "easeInOutQuad",
        });

        anime({
            targets: rect,
            filter: [`drop-shadow(0 0 0px ${color})`, `drop-shadow(0 0 15px ${color})`],
            duration: 500,
            easing: "easeOutQuad",
        });

        if (card) {
            anime({
                targets: card,
                scale: 1.02,
                translateY: -4,
                duration: 400,
                easing: "easeOutExpo",
            });
        }
    }, [color]);

    const handleMouseLeave = useCallback(() => {
        const rect = rectRef.current;
        const card = cardRef.current;
        const perimeter = perimeterRef.current;
        if (!rect || perimeter === 0) return;

        anime.remove(rect);
        if (card) anime.remove(card);

        anime({
            targets: rect,
            strokeDashoffset: perimeter,
            duration: 300,
            easing: "easeInOutQuad",
        });

        anime({
            targets: rect,
            filter: `drop-shadow(0 0 0px ${color})`,
            duration: 300,
            easing: "easeOutQuad",
        });

        if (card) {
            anime({
                targets: card,
                scale: 1,
                translateY: 0,
                duration: 300,
                easing: "easeOutQuad",
            });
        }
    }, [color]);

    const commonProps = {
        ref: cardRef as any,
        className: cn(
            "relative group block rounded-xl bg-void-surface",
            "border border-white/10",
            "shadow-lg shadow-black/40",
            className
        ),
        style: { willChange: "transform" } as React.CSSProperties,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
    };

    const content = (
        <>
            <svg
                className="absolute inset-0 pointer-events-none z-30 overflow-visible"
                width="100%"
                height="100%"
                preserveAspectRatio="none"
            >
                <rect
                    ref={rectRef}
                    x="1"
                    y="1"
                    width="calc(100% - 2px)"
                    height="calc(100% - 2px)"
                    rx="12"
                    ry="12"
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
            <div className="relative z-10 h-full">
                {children}
            </div>
        </>
    );

    if (href) {
        return (
            <Link href={href} {...commonProps}>
                {content}
            </Link>
        );
    }

    return (
        <div {...commonProps} onClick={onClick}>
            {content}
        </div>
    );
};
