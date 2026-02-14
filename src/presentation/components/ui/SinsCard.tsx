"use client";

import { useRouter } from "next/navigation";
import { Lock, Skull } from "lucide-react";
import { cn } from "@core/lib/utils";

interface SinsCardProps {
    locale: string;
    title: string;
    description: string;
    className?: string;
}

export const SinsCard = ({ locale, title, description, className }: SinsCardProps) => {
    const router = useRouter();
    
    // Unlock Date: Feb 20, 2026
    const UNLOCK_DATE = new Date("2026-02-20T00:00:00").getTime();
    const now = Date.now();
    const isLocked = now < UNLOCK_DATE;

    const handleClick = () => {
        router.push(`/${locale}/wiki/ego-system/05-sins`);
    };

    return (
        <div
            onClick={handleClick}
            className={cn(
                "col-span-1 md:col-span-3 row-span-1 relative h-48 md:h-64 rounded-xl group/sins overflow-hidden cursor-pointer border border-neon-red/30",
                className
            )}
        >
            {/* Background Image with Glitch/Parallax potential */}
            <div className="absolute inset-0 z-0">
                    <img 
                        src="/bg/sins_bg.png" 
                        alt="Sins" 
                        className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover/sins:scale-105 group-hover/sins:grayscale-0 grayscale" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
                    {/* Scanlines / Noise overlay could go here */}
                    <div className="absolute inset-0 bg-[url('/effects/grid.svg')] opacity-20 mix-blend-overlay" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16">
                
                {/* Header / Lock Status */}
                <div className="flex items-center gap-4 mb-4">
                    <div className={cn(
                        "p-3 rounded-lg border backdrop-blur-md transition-all duration-300",
                        isLocked 
                            ? "bg-neon-red/10 border-neon-red/50 text-neon-red group-hover/sins:bg-neon-red/20 group-hover/sins:shadow-[0_0_15px_rgba(239,68,68,0.4)]" 
                            : "bg-neon-purple/10 border-neon-purple/50 text-neon-purple"
                    )}>
                        {isLocked ? <Lock size={28} /> : <Skull size={28} />}
                    </div>
                    
                    {isLocked && (
                        <div className="flex flex-col">
                            <span className="text-neon-red font-mono text-xs tracking-[0.2em] font-bold">CLASSIFIED // SEALED</span>
                            <span className="text-white/50 font-mono text-[10px]">UNLOCK_DATE: 2026.02.20</span>
                        </div>
                    )}
                </div>

                {/* Title & Description with Glitch Text Effect (CSS based or simple class) */}
                <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-2 tracking-tight group-hover/sins:text-neon-red transition-colors duration-300">
                    {title}
                </h2>
                
                <p className="font-sans text-white/70 max-w-lg text-sm md:text-base border-l-2 border-neon-red/50 pl-4 py-1">
                    {description}
                </p>

                {/* Decorative Elements */}
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-black/80 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 right-8 text-white/20 font-mono text-xs tracking-widest group-hover/sins:text-neon-red/60 transition-colors">
                    PROJECT_SINS_V1.0
                </div>

                {/* Anime-style corner borders */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/20 group-hover/sins:border-neon-red/80 transition-all duration-500" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/20 group-hover/sins:border-neon-red/80 transition-all duration-500" />
            </div>
        </div>
    );
};
