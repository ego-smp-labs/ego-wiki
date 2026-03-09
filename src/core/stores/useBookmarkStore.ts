"use client";

import { create } from "zustand";

export interface BookmarkItem {
    title: string;
    slug: string;
    category: string;
    locale: string;
    savedAt: number;
}

const STORAGE_KEY = "ego-wiki-bookmarks";

function loadBookmarks(): BookmarkItem[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveBookmarks(bookmarks: BookmarkItem[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

interface BookmarkStore {
    bookmarks: BookmarkItem[];
    initialized: boolean;
    init: () => void;
    addBookmark: (item: Omit<BookmarkItem, "savedAt">) => void;
    removeBookmark: (slug: string, category: string) => void;
    isBookmarked: (slug: string, category: string) => boolean;
    getBookmarks: (locale: string) => BookmarkItem[];
}

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
    bookmarks: [],
    initialized: false,

    init: () => {
        if (get().initialized) return;
        set({ bookmarks: loadBookmarks(), initialized: true });
    },

    addBookmark: (item) => {
        const existing = get().bookmarks;
        if (existing.some((b) => b.slug === item.slug && b.category === item.category)) return;
        const updated = [...existing, { ...item, savedAt: Date.now() }];
        set({ bookmarks: updated });
        saveBookmarks(updated);
    },

    removeBookmark: (slug, category) => {
        const updated = get().bookmarks.filter(
            (b) => !(b.slug === slug && b.category === category)
        );
        set({ bookmarks: updated });
        saveBookmarks(updated);
    },

    isBookmarked: (slug, category) => {
        return get().bookmarks.some((b) => b.slug === slug && b.category === category);
    },

    getBookmarks: (locale) => {
        return get().bookmarks
            .filter((b) => b.locale === locale)
            .sort((a, b) => b.savedAt - a.savedAt);
    },
}));
