"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Lock, Skull } from "lucide-react";
import { cn } from "@core/lib/utils";
import { animate } from "animejs";

interface SinsCardProps {
    locale: string;
    title: string;
    description: string;
    className?: string;
}

export const SinsCard = ({ locale, title, description, className }: SinsCardProps) => {
    const router = useRouter();
    const [isHolding, setIsHolding] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    
    // Unlock Date: Feb 20, 2026
    const UNLOCK_DATE = new Date("2026-02-20T00:00:00").getTime();
    const now = Date.now();
    const isLocked = now < UNLOCK_DATE;

    const progressRef = useRef<SVGCircleElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const animationRef = useRef<any>(null);

    const handleCardClick = () => {
        setShowOverlay(true);
    };

    const startHold = () => {
        setIsHolding(true);
        const el = progressRef.current;
        if (el) {
            animationRef.current = animate(el, {
                strokeDashoffset: [283, 0],
                duration: 2000,
                easing: "linear",
                onComplete: () => {
                    if (isLocked) {
                         setIsHolding(false);
                         alert(locale === "vi" ? "Phong ấn chưa được giải trừ..." : "The seal remains unbroken...");
                    } else {
                        router.push(`/${locale}/wiki/ego-system/05-sins`);
                    }
                }
            });
        }
    };

    const endHold = () => {
        setIsHolding(false);
        if (animationRef.current) {
            animationRef.current.pause();
            const el = progressRef.current;
            if (el) {
                animate(el, {
                    strokeDashoffset: 283,
                    duration: 300,
                    easing: "easeOutQuad"
                });
            }
        }
    };

    return (
        <>
            <div
                onClick={handleCardClick}
                className={cn(
                    "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-black border border-white/10 justify-between flex flex-col space-y-4 cursor-pointer relative overflow-hidden",
                    className
                )}
            >
                {/* Background */}
                <div className="absolute inset-0 z-0">
                     <img src="/bg/sins_bg.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover/bento:scale-110 grayscale group-hover/bento:grayscale-0" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                <div className="group-hover/bento:translate-x-2 transition duration-200 relative z-10">
                    <div className="text-neon-red mb-2 mt-2">
                        {isLocked ? <Lock size={24} /> : <Skull size={24} />}
                    </div>
                    <div className="font-display font-bold text-neutral-200 mb-2 mt-2 text-xl">
                        {title}
                    </div>
                    <div className="font-sans font-normal text-neutral-400 text-xs text-shadow-sm">
                        {description}
                    </div>
                     {isLocked && (
                        <div className="mt-2 text-[10px] font-mono text-neon-red/80 border border-neon-red/30 px-2 py-1 inline-block rounded">
                            LOCKED UNTIL 20.02.2026
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay for Hold Interaction */}
            {showOverlay && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={() => setShowOverlay(false)}>
                    <div className="relative flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        
                        <div 
                            className="relative w-32 h-32 flex items-center justify-center cursor-pointer select-none"
                            onMouseDown={startHold}
                            onMouseUp={endHold}
                            onMouseLeave={endHold}
                            onTouchStart={startHold}
                            onTouchEnd={endHold}
                        >
                            {/* Static Ring */}
                            <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="45"
                                    fill="transparent"
                                    stroke="#333"
                                    strokeWidth="4"
                                />
                                <circle
                                    ref={progressRef}
                                    cx="64"
                                    cy="64"
                                    r="45"
                                    fill="transparent"
                                    stroke={isLocked ? "#ef4444" : "#22d3ee"}
                                    strokeWidth="4"
                                    strokeDasharray="283"
                                    strokeDashoffset="283"
                                />
                            </svg>
                            
                            {/* Icon */}
                            <div className={cn("transition-transform duration-200", isHolding ? "scale-90" : "scale-100")}>
                                {isLocked ? <Lock size={40} className="text-neon-red" /> : <Skull size={40} className="text-neon-cyan" />}
                            </div>
                        </div>

                        <p className="mt-8 text-white/60 font-display animate-pulse select-none">
                            {isHolding 
                                ? (isLocked ? "BREAKING SEAL..." : "ENTERING...") 
                                : (isLocked ? "HOLD TO BREAK SEAL" : "HOLD TO ENTER")}
                        </p>
                        
                        {isLocked && (
                             <p className="mt-2 text-neon-red text-sm font-mono">
                                 SEALED UNTIL 2026-02-20
                             </p>
                        )}
                        
                         <button 
                            onClick={() => setShowOverlay(false)}
                            className="mt-12 text-white/30 hover:text-white text-sm"
                        >
                            [ CANCEL ]
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
