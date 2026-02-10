"use client";

import React, { useRef, useEffect } from "react";
import { animate } from "animejs";
import { ArrowRight, BookOpen, Zap, Sword, Settings, HelpCircle, LucideIcon } from "lucide-react";
import { NeonCard } from "@presentation/components/ui/NeonCard";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
    general: BookOpen,
    "ego-system": Zap,
    advanced: Sword,
    miscellaneous: Settings,
    faq: HelpCircle,
};

interface CategoryCardProps {
    categorySlug: string;
    categoryColor: "cyan" | "purple" | "pink";
    title: string;
    description: string;
    locale: string;
    articleCount?: number;
    index?: number;
}

export default function CategoryCard({
    categorySlug,
    categoryColor,
    title,
    description,
    locale,
    articleCount = 0,
    index = 0,
}: CategoryCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const Icon = CATEGORY_ICONS[categorySlug] || BookOpen;

    useEffect(() => {
        if (!cardRef.current) return;
        cardRef.current.style.opacity = "0";
        cardRef.current.style.transform = "translateY(15px)";

        animate(cardRef.current, {
            opacity: [0, 1],
            translateY: [15, 0],
            duration: 400,
            delay: index * 50,
            easing: "easeOutCubic"
        });
    }, [index]);

    const colorClasses = {
        cyan: { icon: "text-neon-cyan", hex: "#22d3ee", bg: "from-neon-cyan/5 to-transparent" },
        purple: { icon: "text-neon-purple", hex: "#7b00ff", bg: "from-neon-purple/5 to-transparent" },
        pink: { icon: "text-neon-pink", hex: "#ec4899", bg: "from-neon-pink/5 to-transparent" },
    };

    const colors = colorClasses[categoryColor];

    return (
        <div ref={cardRef} className="h-full">
            <NeonCard
                href={`/${locale}/wiki/${categorySlug}`}
                className="p-6 h-full flex flex-col justify-between"
                color={colors.hex}
            >
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-void-bg border border-void-border mb-4 ${colors.icon}`}>
                        <Icon size={24} />
                    </div>

                    <h3 className="font-display text-lg font-semibold text-white mb-2 flex items-center gap-2">
                        {title}
                        <ArrowRight
                            size={16}
                            className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white"
                        />
                    </h3>

                    <p className="text-sm text-white/50 line-clamp-2">{description}</p>
                </div>

                {articleCount > 0 && (
                    <div className="mt-4 text-xs text-white/30 relative z-10">
                        {articleCount} {locale === "vi" ? "bài viết" : "articles"}
                    </div>
                )}
            </NeonCard>
        </div>
    );
}
