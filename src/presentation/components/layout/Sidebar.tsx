"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// @ts-expect-error - lucide-react type declarations lag behind runtime exports
import { ChevronRight, Bookmark, X } from "lucide-react";
import { useState, useEffect } from "react";
import { CATEGORIES, getCategory } from "@core/lib/categories";
import { type ArticleMeta, type Heading } from "@core/services/WikiService";
import { getTranslations } from "@core/lib/i18n";
import { useBookmarkStore, type BookmarkItem } from "@core/stores/useBookmarkStore";

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
    const { init, getBookmarks, removeBookmark } = useBookmarkStore();
    const [savedPages, setSavedPages] = useState<BookmarkItem[]>([]);

    // Initialize bookmark store
    useEffect(() => {
        init();
        setSavedPages(getBookmarks(locale));
    }, [init, getBookmarks, locale]);

    // Re-sync on store changes
    useEffect(() => {
        return useBookmarkStore.subscribe((state) => {
            setSavedPages(
                state.bookmarks
                    .filter((b) => b.locale === locale)
                    .sort((a, b) => b.savedAt - a.savedAt)
            );
        });
    }, [locale]);

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
            className={`w-64 flex-shrink-0 hidden lg:block sticky top-20 h-[calc(100vh-6rem)] overflow-y-auto bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/5 ${className}`}
        >
            {/* Logo Section */}
            <div className="mb-6 flex justify-center pb-6 border-b border-void-border/50">
                <Image
                    src="/images/general/ego-logo.png"
                    alt="Ego Logo"
                    width={150}
                    height={60}
                    className="object-contain drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                    priority
                />
            </div>

            <nav className="pb-4">
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

                {/* Saved Pages */}
                {savedPages.length > 0 && (
                    <div className="mb-8">
                        <h4 className="text-xs font-medium uppercase tracking-wider text-white/40 mb-3 flex items-center gap-1.5">
                            <Bookmark size={12} />
                            {t.wiki.savedPages}
                        </h4>
                        <ul className="space-y-1">
                            {savedPages.map((bookmark) => (
                                <li key={`${bookmark.category}-${bookmark.slug}`} className="group/bm">
                                    <div className="flex items-center gap-1">
                                        <Link
                                            href={`/${locale}/wiki/${bookmark.category}/${bookmark.slug}`}
                                            className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                                                pathname.includes(`/${bookmark.slug}`)
                                                    ? "bg-neon-cyan/10 text-neon-cyan"
                                                    : "text-white/60 hover:text-white hover:bg-void-surface"
                                            }`}
                                        >
                                            <span className="truncate">{bookmark.title}</span>
                                        </Link>
                                        <button
                                            onClick={() => removeBookmark(bookmark.slug, bookmark.category)}
                                            className="opacity-0 group-hover/bm:opacity-100 p-1 rounded text-white/30 hover:text-red-400 transition-all"
                                            title="Remove"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

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
