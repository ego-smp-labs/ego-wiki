"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface UpdateItem {
    title: string;
    version: string;
    date: string;
    content: string[];
}

export const RecentUpdatesGrid = ({ updates }: { updates: UpdateItem[] }) => {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!gridRef.current) return;
        const items = gridRef.current.querySelectorAll(".update-card");
        
        // Initial state
        items.forEach((el) => {
            (el as HTMLElement).style.opacity = "0";
            (el as HTMLElement).style.transform = "translateX(-20px)";
        });

        // Stagger animation
        animate(items, {
            opacity: [0, 1],
            translateX: [-20, 0],
            duration: 800,
            delay: stagger(100, { start: 200 }),
            easing: "easeOutExpo"
        });
    }, []);

    return (
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {updates.map((update, i) => (
                <div key={i} className="update-card bg-black/40 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-display font-bold text-lg text-neon-cyan">{update.version}</h3>
                        <span className="text-xs text-white/40 font-mono">{update.date}</span>
                    </div>
                    <h4 className="text-white font-medium mb-3">{update.title}</h4>
                    <ul className="space-y-2">
                        {update.content.map((point, j) => (
                            <li key={j} className="text-sm text-white/60 flex items-start gap-2">
                                <span className="text-neon-purple mt-1">•</span>
                                {point.replace(/^- /, "")}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
