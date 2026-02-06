"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Zap, Sword, Settings, HelpCircle, LucideIcon } from "lucide-react";

// Icon map to avoid passing functions from server components
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
    const Icon = CATEGORY_ICONS[categorySlug] || BookOpen;

    const colorClasses = {
        cyan: {
            icon: "text-neon-cyan",
            border: "group-hover:border-neon-cyan/30",
            shadow: "group-hover:shadow-glow-cyan",
            bg: "from-neon-cyan/5 to-transparent",
        },
        purple: {
            icon: "text-neon-purple",
            border: "group-hover:border-neon-purple/30",
            shadow: "group-hover:shadow-glow-purple",
            bg: "from-neon-purple/5 to-transparent",
        },
        pink: {
            icon: "text-neon-pink",
            border: "group-hover:border-neon-pink/30",
            shadow: "group-hover:shadow-glow-purple",
            bg: "from-neon-pink/5 to-transparent",
        },
    };

    const colors = colorClasses[categoryColor];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <Link
                href={`/${locale}/wiki/${categorySlug}`}
                className={`
                    group block relative overflow-hidden rounded-xl p-6
                    bg-void-surface border border-void-border
                    transition-all duration-300
                    ${colors.border} ${colors.shadow}
                `}
            >
                {/* Gradient overlay */}
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10">
                    {/* Icon */}
                    <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-void-bg border border-void-border mb-4 ${colors.icon}`}
                    >
                        <Icon size={24} />
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg font-semibold text-white mb-2 flex items-center gap-2">
                        {title}
                        <ArrowRight
                            size={16}
                            className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        />
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-white/50 line-clamp-2">{description}</p>

                    {/* Article count */}
                    {articleCount > 0 && (
                        <div className="mt-4 text-xs text-white/30">
                            {articleCount} {locale === "vi" ? "bài viết" : "articles"}
                        </div>
                    )}
                </div>
            </Link>
        </motion.div>
    );
}
