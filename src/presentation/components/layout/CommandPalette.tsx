"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, ArrowRight, Loader2 } from "lucide-react";
import { type ArticleMeta } from "@core/services/WikiService";
import { getCategory } from "@core/lib/categories";
import { getTranslations } from "@core/lib/i18n";

interface CommandPaletteProps {
    locale: string;
    isOpen: boolean;
    onClose: () => void;
}

const SEARCH_DEBOUNCE_MS = 300;
const MIN_QUERY_LENGTH = 2;

export default function CommandPalette({
    locale,
    isOpen,
    onClose,
}: CommandPaletteProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<(ArticleMeta & { excerpt?: string })[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const t = getTranslations(locale);

    useEffect(() => {
        if (!query || query.length < MIN_QUERY_LENGTH) {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `/api/search?q=${encodeURIComponent(query)}&locale=${locale}`
                );
                const data = await res.json();
                setResults(data.results || []);
            } catch (error) {
                console.error("Search error:", error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, SEARCH_DEBOUNCE_MS);

        return () => clearTimeout(timer);
    }, [query, locale]);

    const handleSelect = useCallback(
        (article: ArticleMeta & { hash?: string }) => {
            const hashPart = article.hash ? `#${article.hash}` : "";
            router.push(`/${locale}/wiki/${article.category}/${article.slug}${hashPart}`);
            onClose();
            setQuery("");
        },
        [router, locale, onClose]
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    const noResultsText = locale === "vi" ? "Không tìm thấy kết quả" : "No results found";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2"
                    >
                        <Command className="rounded-xl overflow-hidden shadow-2xl">
                            <div className="relative border-b border-void-border bg-void-surface">
                                <Search
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                                />
                                <Command.Input
                                    value={query}
                                    onValueChange={setQuery}
                                    placeholder={t.nav.searchPlaceholder}
                                    className="w-full pl-12 pr-4 py-4 bg-transparent text-white outline-none placeholder:text-white/40"
                                    autoFocus
                                />
                                {loading && (
                                    <Loader2
                                        size={18}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neon-cyan animate-spin"
                                    />
                                )}
                            </div>

                            <Command.List className="max-h-80 overflow-y-auto bg-void-surface p-2">
                                {query.length >= MIN_QUERY_LENGTH && !loading && results.length === 0 && (
                                    <Command.Empty className="py-8 text-center text-white/40">
                                        {noResultsText}
                                    </Command.Empty>
                                )}

                                {results.map((article) => {
                                    const category = getCategory(article.category);
                                    return (
                                        <Command.Item
                                            key={`${article.category}-${article.slug}`}
                                            value={`${article.title} ${article.category}`}
                                            onSelect={() => handleSelect(article)}
                                            className="group flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer data-[selected=true]:bg-neon-cyan/10"
                                        >
                                            <div className="flex-shrink-0 p-2 rounded-lg bg-void-bg border border-void-border group-data-[selected=true]:border-neon-cyan/30">
                                                <FileText size={16} className="text-neon-cyan" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm text-white group-data-[selected=true]:text-neon-cyan truncate">
                                                    {article.title}
                                                </div>
                                                <div className="text-xs text-white/40 mb-1 flex items-center gap-1.5">
                                                    <span>{category
                                                        ? locale === "vi"
                                                            ? category.title.vi
                                                            : category.title.en
                                                        : article.category}</span>
                                                </div>
                                                {article.excerpt && (
                                                    <div className="text-xs text-white/60 line-clamp-1 italic">
                                                        {article.excerpt}
                                                    </div>
                                                )}
                                            </div>
                                            <ArrowRight
                                                size={14}
                                                className="text-white/20 group-data-[selected=true]:text-neon-cyan"
                                            />
                                        </Command.Item>
                                    );
                                })}
                            </Command.List>

                            <div className="border-t border-void-border bg-void-surface px-4 py-2.5 flex items-center gap-4 text-xs text-white/40">
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 rounded bg-void-bg border border-void-border">
                                        ↵
                                    </kbd>
                                    <span>to select</span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 rounded bg-void-bg border border-void-border">
                                        esc
                                    </kbd>
                                    <span>to close</span>
                                </span>
                            </div>
                        </Command>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
