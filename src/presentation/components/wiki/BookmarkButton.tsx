"use client";

import { useEffect, useState } from "react";
// @ts-expect-error - Bookmark/BookmarkCheck exist at runtime in lucide-react v0.563
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useBookmarkStore } from "@core/stores/useBookmarkStore";

interface BookmarkButtonProps {
    title: string;
    slug: string;
    category: string;
    locale: string;
    labels: { save: string; unsave: string };
}

export default function BookmarkButton({
    title,
    slug,
    category,
    locale,
    labels,
}: BookmarkButtonProps) {
    const { init, addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        init();
        setSaved(isBookmarked(slug, category));
    }, [init, isBookmarked, slug, category]);

    // Re-sync when store changes
    useEffect(() => {
        return useBookmarkStore.subscribe((state) => {
            setSaved(state.bookmarks.some((b) => b.slug === slug && b.category === category));
        });
    }, [slug, category]);

    const handleToggle = () => {
        if (saved) {
            removeBookmark(slug, category);
        } else {
            addBookmark({ title, slug, category, locale });
        }
    };

    const Icon = saved ? BookmarkCheck : Bookmark;

    return (
        <button
            onClick={handleToggle}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                saved
                    ? "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30 hover:bg-neon-cyan/20"
                    : "bg-void-surface text-white/50 border-void-border hover:text-white hover:border-white/20"
            }`}
            title={saved ? labels.unsave : labels.save}
        >
            <Icon size={14} />
            <span>{saved ? labels.unsave : labels.save}</span>
        </button>
    );
}
