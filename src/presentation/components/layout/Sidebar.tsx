"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { CATEGORIES, getCategory } from "@core/lib/categories";
import { type ArticleMeta, type Heading } from "@core/services/WikiService";
import { getTranslations } from "@core/lib/i18n";

interface SidebarProps {
    locale: string;
    currentCategory?: string;
    articles?: ArticleMeta[];
    headings?: Heading[];
    className?: string;
}

export default function Sidebar({
    locale,
    currentCategory,
    articles = [],
    headings = [],
    className = "",
}: SidebarProps) {
    const pathname = usePathname();
    const t = getTranslations(locale);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-100px 0px -66% 0px" }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.slug);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    const categoriesLabel = locale === "vi" ? "Danh mục" : "Categories";
    const articlesLabel = getCategory(currentCategory || "")?.title[locale as "en" | "vi"]
        || (locale === "vi" ? "Bài viết" : "Articles");

    return (
        <aside
            className={`w-64 flex-shrink-0 hidden lg:block sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto ${className}`}
        >
            <nav className="pr-4 pb-8">
                <div className="mb-8">
                    <h4 className="text-xs font-medium uppercase tracking-wider text-white/40 mb-3">
                        {categoriesLabel}
                    </h4>
                    <ul className="space-y-1">
                        {CATEGORIES.map((category) => {
                            const isActive = currentCategory === category.slug;
                            const Icon = category.icon;

                            return (
                                <li key={category.slug}>
                                    <Link
                                        href={`/${locale}/wiki/${category.slug}`}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${isActive
                                            ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20"
                                            : "text-white/60 hover:text-white hover:bg-void-surface"
                                            }`}
                                    >
                                        <Icon
                                            size={16}
                                            className={isActive ? "text-neon-cyan" : "text-white/40"}
                                        />
                                        <span>
                                            {locale === "vi" ? category.title.vi : category.title.en}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {articles.length > 0 && (
                    <div className="mb-8">
                        <h4 className="text-xs font-medium uppercase tracking-wider text-white/40 mb-3">
                            {articlesLabel}
                        </h4>
                        <ul className="space-y-1">
                            {articles.map((article) => {
                                const isActive = pathname.includes(`/${article.slug}`);

                                return (
                                    <li key={article.slug}>
                                        <Link
                                            href={`/${locale}/wiki/${article.category}/${article.slug}`}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${isActive
                                                ? "bg-neon-purple/10 text-neon-purple border-l-2 border-neon-purple"
                                                : "text-white/60 hover:text-white hover:bg-void-surface border-l-2 border-transparent"
                                                }`}
                                        >
                                            <span className="text-xs text-white/30 font-mono w-5">
                                                {String(article.order).padStart(2, "0")}
                                            </span>
                                            <span className="truncate">{article.title}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                {headings.length > 0 && (
                    <div>
                        <h4 className="text-xs font-medium uppercase tracking-wider text-white/40 mb-3">
                            {t.wiki.onThisPage}
                        </h4>
                        <ul className="space-y-1">
                            {headings
                                .filter((h) => h.level <= 3)
                                .map((heading, index) => {
                                    const isActive = activeId === heading.slug;
                                    return (
                                        <li key={`${heading.slug}-${index}`}>
                                            <a
                                                href={`#${heading.slug}`}
                                                className={`block text-sm transition-colors ${isActive
                                                    ? "text-neon-cyan font-medium"
                                                    : "text-white/50 hover:text-neon-cyan"
                                                    } ${heading.level === 2 ? "pl-0" : "pl-4"}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    document.getElementById(heading.slug)?.scrollIntoView({
                                                        behavior: "smooth"
                                                    });
                                                }}
                                            >
                                                <span className="flex items-center gap-1">
                                                    {heading.level === 3 && (
                                                        <ChevronRight size={12} className={isActive ? "text-neon-cyan" : "text-white/30"} />
                                                    )}
                                                    {heading.text}
                                                </span>
                                            </a>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                )}
            </nav>
        </aside>
    );
}
