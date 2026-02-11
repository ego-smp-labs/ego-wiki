"use client";

import { Search } from "lucide-react";

interface HeroSearchBarProps {
    placeholder: string;
}

export default function HeroSearchBar({ placeholder }: HeroSearchBarProps) {
    const triggerCommandPalette = () => {
        window.dispatchEvent(
            new KeyboardEvent("keydown", { key: "k", metaKey: true })
        );
    };

    return (
        <div className="max-w-xl mx-auto">
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan rounded-xl opacity-20 group-hover:opacity-40 blur transition-opacity" />
                <div className="relative flex items-center bg-void-surface border border-void-border rounded-xl overflow-hidden">
                    <Search size={20} className="ml-4 text-white/40" />
                    <input
                        type="text"
                        placeholder={placeholder}
                        className="flex-1 px-4 py-4 bg-transparent text-white outline-none placeholder:text-white/40 cursor-pointer"
                        readOnly
                        onClick={triggerCommandPalette}
                    />
                    <kbd className="mr-4 px-2 py-1 text-xs bg-void-bg rounded border border-void-border text-white/40">
                        ⌘K
                    </kbd>
                </div>
            </div>
        </div>
    );
}
