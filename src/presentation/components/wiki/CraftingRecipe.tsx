"use client";

import Image from "next/image";

interface CraftingSlot {
    item?: string; // Image URL or initial
    label?: string;
}

interface CraftingRecipeProps {
    grid: (CraftingSlot | null)[]; // Array of 9 items (3x3)
    result: {
        item: string;
        label: string;
        count?: number;
    };
}

export default function CraftingRecipe({ grid, result }: CraftingRecipeProps) {
    // Ensure grid has 9 items
    const slots = [...grid];
    while (slots.length < 9) slots.push(null);

    return (
        <div className="inline-block p-1 rounded-lg bg-[#c6c6c6] border-2 border-[#555555] shadow-[inset_2px_2px_0_#ffffff,2px_2px_0_#000000]">
            <div className="flex items-center gap-4 bg-[#c6c6c6] p-2">
                {/* 3x3 Grid */}
                <div className="grid grid-cols-3 gap-1">
                    {slots.slice(0, 9).map((slot, i) => (
                        <div
                            key={i}
                            className="w-10 h-10 bg-[#8b8b8b] border-2 border-[#373737] shadow-[inset_2px_2px_0_#373737,1px_1px_0_#ffffff] flex items-center justify-center relative hover:bg-[#9b9b9b] transition-colors"
                            title={slot?.label || ""}
                        >
                            {slot?.item && (
                                <div className="relative w-8 h-8">
                                    <Image
                                        src={slot.item}
                                        alt={slot.label || "Crafting ingredient"}
                                        fill
                                        sizes="32px"
                                        className="object-contain pixelated rendering-pixelated"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Arrow */}
                <div className="text-[#555555] opacity-80">
                    <svg width="32" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {/* Result */}
                <div className="w-16 h-16 bg-[#8b8b8b] border-2 border-[#373737] shadow-[inset_2px_2px_0_#373737,1px_1px_0_#ffffff] flex items-center justify-center relative group">
                    {result.item && (
                        <div className="relative w-10 h-10">
                            <Image
                                src={result.item}
                                alt={result.label}
                                fill
                                sizes="40px"
                                className="object-contain pixelated rendering-pixelated"
                            />
                        </div>
                    )}
                    {result.count && result.count > 1 && (
                        <span className="absolute bottom-0 right-1 text-white font-bold text-xs drop-shadow-[1px_1px_0_#000000] z-10">
                            {result.count}
                        </span>
                    )}

                    {/* Tooltip */}
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[#100010] border-2 border-[#2a004a] text-neon-purple text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                        {result.label}
                    </div>
                </div>
            </div>

            <div className="text-[10px] text-[#555555] font-mono text-center mt-1 uppercase tracking-widest">
                Bench Layout
            </div>
        </div>
    );
}
