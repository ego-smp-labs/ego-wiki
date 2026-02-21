"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface ItemCardProps {
    name: string;
    image: string;
    children: ReactNode;
    rarity?: "common" | "rare" | "epic" | "legendary" | "mythic";
    id?: string;
}

const RARITY_STYLES = {
    common: {
        border: "border-white/20",
        glow: "shadow-[0_0_15px_rgba(255,255,255,0.1)]",
        label: "text-white/60",
        bg: "from-white/5 to-transparent",
    },
    rare: {
        border: "border-cyan-500/40",
        glow: "shadow-[0_0_20px_rgba(6,182,212,0.2)]",
        label: "text-cyan-400",
        bg: "from-cyan-500/10 to-transparent",
    },
    epic: {
        border: "border-purple-500/40",
        glow: "shadow-[0_0_20px_rgba(168,85,247,0.25)]",
        label: "text-purple-400",
        bg: "from-purple-500/10 to-transparent",
    },
    legendary: {
        border: "border-amber-500/40",
        glow: "shadow-[0_0_25px_rgba(245,158,11,0.3)]",
        label: "text-amber-400",
        bg: "from-amber-500/10 to-transparent",
    },
    mythic: {
        border: "border-rose-500/40",
        glow: "shadow-[0_0_25px_rgba(225,29,72,0.3)]",
        label: "text-rose-400",
        bg: "from-rose-500/10 to-transparent",
    },
};

export default function ItemCard({
    name,
    image,
    children,
    rarity = "common",
    id,
}: ItemCardProps) {
    const style = RARITY_STYLES[rarity];

    return (
        <div
            id={id}
            className={`
                relative my-8 rounded-xl overflow-hidden
                border ${style.border} ${style.glow}
                bg-gradient-to-br ${style.bg}
                bg-void-surface/50 backdrop-blur-sm
            `}
        >
            {/* Header with item name */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-void-border/50 bg-void-bg/30">
                <div className="relative w-8 h-8 flex-shrink-0">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-contain"
                        style={{ imageRendering: "pixelated" }}
                        sizes="32px"
                        unoptimized
                    />
                </div>
                <h3 className={`font-display font-bold text-lg ${style.label} m-0`}>
                    {name}
                </h3>
            </div>

            {/* Body: info left, image right */}
            <div className="flex flex-col md:flex-row gap-4 p-5">
                {/* Left: Content */}
                <div className="flex-1 min-w-0 [&>p]:mb-3 [&>ul]:my-2 [&>blockquote]:my-3 [&>h3]:mt-4 [&>h3]:mb-2 [&>h4]:mt-3 [&>h4]:mb-1 [&>div]:my-3">
                    {children}
                </div>

                {/* Right: Large item image */}
                <div className="flex-shrink-0 flex items-start justify-center md:justify-end">
                    <div
                        className={`
                            relative w-32 h-32 md:w-40 md:h-40
                            rounded-xl overflow-hidden
                            border ${style.border}
                            bg-void-bg/50
                            flex items-center justify-center
                            ${style.glow}
                        `}
                    >
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-contain p-3"
                            style={{ imageRendering: "pixelated" }}
                            sizes="(max-width: 768px) 128px, 160px"
                            unoptimized
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
