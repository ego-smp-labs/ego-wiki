"use client";

import { useState, useRef } from "react";
import { Lock, ArrowLeft } from "lucide-react";
import { animate } from "animejs";
import Link from "next/link";
import { cn } from "@core/lib/utils";

interface LockedArticleViewProps {
    locale: string;
    lockedUntil: string;
}

export const LockedArticleView = ({ locale, lockedUntil }: LockedArticleViewProps) => {
    const [isHolding, setIsHolding] = useState(false);
    const [shake, setShake] = useState(false);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const animationRef = useRef<any>(null);
    const progressRef = useRef<SVGCircleElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const startHold = () => {
        setIsHolding(true);
        const el = progressRef.current;
        if (el) {
            animationRef.current = animate(el, {
                strokeDashoffset: [377, 0],
                duration: 2000,
                easing: "linear",
                onComplete: () => {
                     // Failure Animation
                     setIsHolding(false);
                     setShake(true);
                     setTimeout(() => setShake(false), 500);
                     
                     // Reset circle immediately
                     animate(el, {
                        strokeDashoffset: 377,
                        duration: 100,
                     });
                }
            });
        }
    };

    const endHold = () => {
        if (animationRef.current) {
            animationRef.current.pause();
            const el = progressRef.current;
            if (el) {
                animate(el, {
                    strokeDashoffset: 377,
                    duration: 300,
                    easing: "easeOutQuad"
                });
            }
        }
        setIsHolding(false);
    };

    return (
        <div 
            ref={containerRef}
            className={cn(
                "container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[60vh] text-center select-none",
                shake && "animate-shake" // Need to ensure this class exists or use inline style for shake
            )}
            style={shake ? { animation: "shake 0.5s cubic-bezier(.36,.07,.19,.97) both" } : {}}
        >
            {/* Hold Interaction Ring */}
            <div 
                className="relative w-40 h-40 flex items-center justify-center cursor-pointer mb-8 active:scale-95 transition-transform"
                onMouseDown={startHold}
                onMouseUp={endHold}
                onMouseLeave={endHold}
                onTouchStart={startHold}
                onTouchEnd={endHold}
            >
                {/* Static Background Ring */}
                <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 160 160">
                    <circle
                        cx="80"
                        cy="80"
                        r="60"
                        fill="transparent"
                        stroke="#1a1a2e"
                        strokeWidth="6"
                    />
                    {/* Progress Ring */}
                    <circle
                        ref={progressRef}
                        cx="80"
                        cy="80"
                        r="60"
                        fill="transparent"
                        stroke="#ef4444"
                        strokeWidth="6"
                        strokeDasharray="377"
                        strokeDashoffset="377"
                        strokeLinecap="round"
                    />
                </svg>

                <div className="relative">
                    <div className={cn("absolute inset-0 bg-neon-red/20 blur-[50px] rounded-full", isHolding && "animate-pulse-fast")} />
                    <Lock size={64} className={cn("text-neon-red relative z-10 transition-transform duration-200", isHolding && "scale-90")} />
                </div>
            </div>
            
            <h1 className="font-display text-4xl font-bold text-white mb-2">
                {locale === "vi" ? "DỮ LIỆU BỊ PHONG ẤN" : "DATA SEALED"}
            </h1>
            
            <div className="px-4 py-2 border border-neon-red/30 bg-neon-red/5 rounded-lg mb-8">
                <p className="font-mono text-neon-red text-sm">
                    {locale === "vi" ? "GIẢI PHONG ẤN:" : "UNLOCK DATE:"} {lockedUntil}
                </p>
            </div>

            <p className={cn("text-white/40 max-w-md mx-auto mb-8 font-mono text-xs transition-colors", isHolding && "text-neon-red")}>
                {isHolding 
                    ? (locale === "vi" ? "ĐANG CỐ GẮNG GIẢI MÃ..." : "ATTEMPTING DECRYPTION...")
                    : (locale === "vi" ? "GIỮ KHÓA ĐỂ THỬ GIẢI PHONG ẤN" : "HOLD LOCK TO ATTEMPT BREAK")}
            </p>

            {shake && (
                <div className="text-neon-red font-bold animate-pulse mb-6">
                    ACCESS DENIED. CLEARANCE LEVEL INSUFFICIENT.
                </div>
            )}

            <Link 
                href={`/${locale}/wiki`}
                className="text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm"
            >
                <ArrowLeft size={16} />
                {locale === "vi" ? "Quay lại Wiki" : "Return to Wiki"}
            </Link>

            <style jsx>{`
                @keyframes shake {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                    40%, 60% { transform: translate3d(4px, 0, 0); }
                }
            `}</style>
        </div>
    );
};
