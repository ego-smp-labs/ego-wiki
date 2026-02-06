"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface StatRow {
    label: string;
    value: string | number;
    highlight?: boolean;
}

interface ItemStatsProps {
    name: string;
    description: string;
    type: string;
    rarity: "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythic" | "void";
    stats: StatRow[];
    image?: string;
}

const RARITY_COLORS = {
    common: "text-gray-400 border-gray-700",
    uncommon: "text-green-400 border-green-700",
    rare: "text-blue-400 border-blue-700",
    epic: "text-purple-400 border-purple-700",
    legendary: "text-yellow-400 border-yellow-700",
    mythic: "text-red-500 border-red-800",
    void: "text-neon-cyan border-neon-cyan",
};

export default function ItemStats({
    name,
    description,
    type,
    rarity,
    stats,
    image
}: ItemStatsProps) {
    const rarityClass = RARITY_COLORS[rarity] || RARITY_COLORS.common;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full max-w-md bg-void-surface border-2 rounded-xl overflow-hidden shadow-2xl ${rarityClass.split(' ')[1]}`}
        >
            {/* Header */}
            <div className={`p-4 border-b border-void-border bg-void-surface-light flex items-center justify-between`}>
                <div>
                    <h3 className={`font-display font-bold text-xl ${rarityClass.split(' ')[0]}`}>{name}</h3>
                    <span className="text-xs uppercase tracking-widest text-white/40">{type}</span>
                </div>
                {image && (
                    <div className="w-12 h-12 bg-void-bg rounded-lg p-1 border border-void-border relative">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            sizes="48px"
                            className="object-contain pixelated"
                        />
                    </div>
                )}
            </div>

            {/* Description */}
            <div className="p-4 bg-void-bg/50 text-sm text-white/70 italic border-b border-void-border">
                {description}
            </div>

            {/* Stats Table */}
            <div className="p-2">
                <table className="w-full text-sm">
                    <tbody>
                        {stats.map((stat, i) => (
                            <tr key={i} className={`border-b border-void-border/30 last:border-0 ${stat.highlight ? 'bg-neon-purple/10' : ''}`}>
                                <td className="py-2 px-3 text-white/50">{stat.label}</td>
                                <td className={`py-2 px-3 text-right font-mono ${stat.highlight ? 'text-neon-cyan' : 'text-white'}`}>
                                    {stat.value}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-void-surface-light text-xs text-center text-white/20 font-mono uppercase">
                ID: {name.toLowerCase().replace(/\s+/g, '_')}
            </div>
        </motion.div>
    );
}
